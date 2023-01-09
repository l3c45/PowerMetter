import About from "./components/About";
import ChartGraph from "./components/ChartGraph";
import Header from "./components/Header";
import * as Realm from "realm-web";
import { useEffect, useState } from "react";
import Table from "./components/Table";
import ChartGraphOnline from "./components/ChartGraphOnline";

function App() {
  const app = new Realm.App({ id: "application-0-zqfsi" });
  const [user, setUser] = useState();
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);

      // Connect to the database
      const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
      const collection = await mongodb
        ?.db("power-metter")
        .collection("voltages");

      //Everytime a change happens in the stream, add it to the list of events
      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change.fullDocument]);
      }
    };

    const listUser = async () => {
      const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
      const currentTime = new Date().getTime();
      const filter = 1 * 60 * 60 * 1000;
      const filtered = currentTime - filter;

      let list = await mongodb
        ?.db("power-metter")
        .collection("voltages")
        .find({ date: { $gt: filtered } }, { sort: { _id: -1 } });

      setData(list);
    };
    listUser();
    login();
  }, []);

  return (
    <div>
      <Header />
      <div
        id={"chart"}
        className="d-flex flex-column justify-content-center align-items-center"
      >
 <div className="container mx-auto">
          <h1 className="text-danger text-center">----SITIO EN CONSTRUCCIÓN ---</h1>
        </div>

        <div className=" w-75 p-3">
          <ChartGraph data={data}></ChartGraph>
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
