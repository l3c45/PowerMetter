/* eslint-disable react-hooks/exhaustive-deps */
import * as Realm from "realm-web";
import { useEffect, useState } from "react";
import About from "./About";
import ChartGraph from "./ChartGraph";
import Header from "./Header";
import Table from "./Table";
import ChartGraphOnline from "./ChartGraphOnline";
import { LTTB } from "../utils/LTTB";
import { Point } from "../types";

const app = new Realm.App({ id: "application-0-zqfsi" });

type Event = { date: number; value: string };
type INIT = { _id: number; value: string; date: number; _v: number };

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [data, setData] = useState<Point[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const listener = async () => {
    const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
    const collection: any = mongodb?.db("power-metter").collection("voltages");

    for await (const change of collection.watch()) {
      setEvents((events) => [...events, change.fullDocument]);
    }
  };

  const initialData = async (range = 24) => {
    setLoading(true);
    const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
    const collection: any = mongodb?.db("power-metter").collection("voltages");

    const currentTime = new Date().getTime();
    const filter = range * 60 * 60 * 1000;
    const filtered = currentTime - filter;

    const list = await collection.find({ date: { $gt: filtered } });
    const parsed = list.map((item: INIT) => ({ x: item.date, y: +item.value }));

    const downsampled = LTTB(parsed, 100, "x", "y");

    setData(downsampled);
    setLoading(false);
  };

  const login = async () => {
    await app.logIn(Realm.Credentials.anonymous());
    initialData();
    listener();
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
      <div className="vh-100 d-flex justify-content-center align-items-center">
        {loading ? (
         
            <div
            style={{width: "3rem", height: "3rem"}}
              className="  spinner-border text-primary "
              role="status"
            >
          </div>
        ) :<ChartGraph data={data} update={initialData}></ChartGraph>}</div>
        

        {events[0] ? (
          <>
            <ChartGraphOnline data={events}></ChartGraphOnline>
            <Table dataDB={events}></Table>
          </>
        ) : null}

        <About></About>
      </div>
    </>
  );
}

export default App;
