import mongoose from "mongoose";

interface ISerialData {
  voltage: number;
  current: number;
  temperature: number;
  date: number;
}

const dataSchema = new mongoose.Schema<ISerialData>({
  voltage: Number,
  current: Number,
  temperature: Number,
  date: Number,
});

const Voltage = mongoose.model<ISerialData>("Voltage", dataSchema);

const save = (obj: ISerialData) => {
  const data = new Voltage({
    voltage: obj.voltage,
    current: obj.current,
    temperature: obj.temperature,
    date: obj.date,
  });

  data.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

export { save };
