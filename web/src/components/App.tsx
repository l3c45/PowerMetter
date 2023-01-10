/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { collection } from "../db/conection";
import About from "./About";
import ChartGraph from "./ChartGraph";
import Header from "./Header";
import Table from "./Table";
import ChartGraphOnline from "./ChartGraphOnline";

type Event = { date: number; value: string }[];

function App() {
  const [events, setEvents] = useState<Event>([]);
  const [data, setData] = useState([]);

  const initialData = async (range = 3) => {
  
    const currentTime = new Date().getTime();
    const filter = range * 60 * 60 * 1000;
    const filtered = currentTime - filter;

    const list = await collection.find(
      { date: { $gt: filtered } },
      { sort: { _id: -1 } }
    );
    setData(list);
  };

  const listener = async () => {
    for await (const change of collection.watch()) {
      setEvents((events) => [...events, change.fullDocument]);
    }
  };

  useEffect(() => {
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
        <div className="w-75  p-3">
          <ChartGraph data={data} update={initialData}></ChartGraph>
        </div>
        {events[0] ? (
          <>
            <div className=" w-75 p-3 mb-5">
              <ChartGraphOnline data={events}></ChartGraphOnline>
            </div>

            <div className=" w-25  ">
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
