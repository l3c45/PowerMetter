import About from "./components/About";
import ChartGraph from "./components/ChartGraph";
import Header from "./components/Header";
import * as Realm from "realm-web";
import { useEffect, useState } from "react";
import Table from "./components/Table";

function App() {
  const app = new Realm.App({ id: "application-0-zqfsi" });
  const [user, setUser] = useState();
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);

      // Connect to the database
      const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
      const collection = await mongodb?.db("power-metter").collection("voltages");

      //Everytime a change happens in the stream, add it to the list of events
      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
      }
    };



    const listUser = async () => {

      const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
      let list =  await (await mongodb?.db("power-metter").collection("voltages").find({}, { sort: { _id:-1 }, limit:20}) )

      setData(...data,list)
  }
  listUser()
    login();
  }, []);

  return (
    <>
      <Header />

   {user&&   <h1>Connected as user ${user.id}</h1>}

      <div
        id={"chart"}
        className="d-flex justify-content-center align-items-center"
      >
        <div className=" w-75 p-3">
          <ChartGraph></ChartGraph>
        </div>
      </div>
      <div
        id={"about"}
        className=" container  d-flex  flex-column  justify-content-center align-items-center"
      >
        <About></About>
      </div>
      <div className=" container  d-flex  flex-column  justify-content-center align-items-center">
      <Table  dataDB={events}></Table>
      </div>
    </>
  );
}

export default App;
