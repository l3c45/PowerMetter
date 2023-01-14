/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import * as Realm from "realm-web";
import Header from "./Header";
import ChartGraph from "./ChartGraph";
import ChartGraphOnline from "./ChartGraphOnline";
import Table from "./Table";
import About from "./About";
import { LTTB } from "../utils/LTTB";
import type { DataState, INIT } from "../types";

const app = new Realm.App({ id: "application-0-zqfsi" });

function App() {
  const [events, setEvents] = useState<INIT[]>([]);
  const [data, setData] = useState<DataState>({
    voltage: [],
    current: [],
    temperature: [],
  });
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
    const parsedV = [...list].map((item: INIT) => ({
      x: item.date,
      y: item.voltage,
    }));
    const parsedC = [...list].map((item: INIT) => ({
      x: item.date,
      y: item.current,
    }));
    const parsedT = [...list].map((item: INIT) => ({
      x: item.date,
      y: item.temperature,
    }));

    const downsampledV = LTTB(parsedV, 100, "x", "y");
    const downsampledC = LTTB(parsedC, 100, "x", "y");
    const downsampledT = LTTB(parsedT, 100, "x", "y");

    setData((prev) => ({
      voltage: downsampledV,
      current: downsampledC,
      temperature: downsampledT,
    }));
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
      <Header active={events[0]?true:false}/>
      <div className="container">
        <div className=" position-relative  d-flex justify-content-center align-items-center">
          <ChartGraph data={data} update={initialData}></ChartGraph>
          {loading ? (
            <div className="overlay position-absolute w-100 h-100 d-flex justify-content-center align-items-center ">
              <div
                style={{ width: "3rem", height: "3rem" }}
                className=" spinner-border text-primary "
                role="status"
              ></div>
            </div>
          ) : null}
        </div>

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
