const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const serialport = new SerialPort({ path: "COM5", baudRate: 9600 });
const parser = serialport.pipe(new ReadlineParser({ delimiter: "\r\n" }));

exports.getData = () => {
    
  parser.on("data", console.log);

  serialport.on("error", (err) => console.log(err));
  // parser.on('data', function (data) {
  //   let temp = parseInt(data, 10) + " °C";
  //   console.log(temp);
  //   io.emit('temp', data.toString());
  // });
};
