import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connect = () => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(
      `mongodb+srv://admin-lucas:${process.env.PASS}@cluster0.vgzfnyk.mongodb.net/power-metter`,
      // {
      //   useNewUrlParser: true,
      // }
    )
    .then(() => console.log("Conectado a DB"))
    .catch((e) => console.log(e));
};

export { connect };
