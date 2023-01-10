/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import About from "./components/About";
import ChartGraph from "./components/ChartGraph";
import Header from "./components/Header";
import * as Realm from "realm-web";
import { useEffect, useState } from "react";
import Table from "./components/Table";
import ChartGraphOnline from "./components/ChartGraphOnline";

function App() {
  const app = new Realm.App({ id: "application-0-zqfsi" });
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);

  const initialData = async (range=3) => {
    const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
    const collection = mongodb?.db("power-metter").collection("voltages");

    const currentTime = new Date().getTime();
    const filter = range * 60 * 60 * 1000;
    const filtered = currentTime - filter;

    const list = await collection.find(
      { date: { $gt: filtered } },
      { sort: { _id: -1 } }
    );

    setData(list);
  };

  useEffect(() => {
    const user = app.logIn(Realm.Credentials.anonymous());

    const listener = async () => {
      const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
      const collection = mongodb?.db("power-metter").collection("voltages");
      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change.fullDocument]);
      }
    };

    initialData();
    listener();
  }, []);

  return (
    <div>
      <Header />
      <div
        id={"chart"}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className="container mx-auto">
          <h1 className="text-danger text-center">
            ----SITIO EN CONSTRUCCIÓN ---
          </h1>
        </div>

        <div className=" w-75 p-3">
          <ChartGraph data={data} update={initialData}></ChartGraph>
        </div>
        {events[0] ? (
          <>
            <div className=" w-75 p-3">
              <ChartGraphOnline data={events}></ChartGraphOnline>
            </div>

            <div className=" container  d-flex  flex-column  justify-content-center align-items-center">
              <Table dataDB={events}></Table>
            </div>
          </>
        ) : null}
        <div
          id={"about"}
          className=" container  d-flex  flex-column  justify-content-center align-items-center"
        >
          <About></About>
        </div>
      </div>
    </div>
  );
}

export default App;
