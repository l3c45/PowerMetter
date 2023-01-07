import { SerialPort } from "serialport";
import { ReadlineParser } from "serialport";
import { save } from "./db.js";

type DATA_DB = { value: string; date: Date };
type DB = ({}: DATA_DB) => void;

const connect = (dbFunc: DB) => {
  const serialport = new SerialPort({ path: "COM5", baudRate: 9600 });
  const parser = serialport.pipe(new ReadlineParser({ delimiter: "\r\n" }));

  serialport.on("error", (err) => {
    console.log(err);
    reconnect();
  });

  serialport.on("close", (err: Error) => {
    console.log(err);
    reconnect();
  });

  parser.on("data", (data) => {
    let date = new Date();
    let res = { value: data, date };

    dbFunc(res);
  });
};

const reconnect = () => {
  console.log("Initiate re-connection");
  setTimeout(() => {
    console.log("Reconnecting");
    connect(save);
  }, 2000);
};

export { connect };
