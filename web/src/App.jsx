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



 



  useEffect(() => {


    const db = async () => {
    

      const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
      const collection =  mongodb
        ?.db("power-metter")
        .collection("voltages");
  
      //Everytime a change happens in the stream, add it to the list of events
    
      for await (const change of collection.watch()) {
       let a=(change)
       console.log(a)
       // setEvents((events) => [...events, change.fullDocument]);
      }
  
  
      // const currentTime = new Date().getTime();
      // const filter = 24 * 60 * 60 * 1000;
      // const filtered = currentTime - filter;
  
    //  const  list=await collection
    //     .find({ date: { $gt: filtered } }, { sort: { _id: -1 } });
  
    //     setData(list)
  
  
  
    };
     db()
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
              <ChartGraphOnline data={data}></ChartGraphOnline>
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
