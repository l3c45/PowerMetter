import mongoose from "mongoose";

interface IVoltage {
  value: string;
  date: number;
}

const dataSchema = new mongoose.Schema<IVoltage>({
  value: String,
  date: Number
});

const Voltage  = mongoose.model<IVoltage>("Voltage", dataSchema);

const save = (obj:IVoltage) => {
  const data = new Voltage({
    value: obj.value,
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
