import { SerialPort } from "serialport";
import { ReadlineParser } from "serialport";
import { autoDetect } from "@serialport/bindings-cpp";
import { save } from "./db.js";

const idBoard = "7523";

type DATA_DB = { value: string; date: Date };
type DB = ({}: DATA_DB) => void;

const connect = () => {
  const port = autoDetect().list();

  port.then((information) => {
    let path = "COM5";
    const [obj] = information;

    if (obj?.productId === idBoard) {
      path = obj.path;
      console.log(`Dispositivo conectado al puerto ${path}`);
    }

    const serialport = new SerialPort({ path, baudRate: 9600 });
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
      const date = new Date().getTime();
      const arr=data.split(",")
      const [voltage,current,temperature]=arr
      const res = { voltage:+voltage,current:+current,temperature:+temperature,date };
      save(res);
    });
  });
};

const reconnect = () => {
  console.log("Initiate re-connection");
  setTimeout(() => {
    console.log("Reconnecting");
    connect();
  }, 2000);
};

export { connect };
