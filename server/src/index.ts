import * as db from "./modules/dbConection.js";
 import * as board from "./modules/serial.js";
import { save } from "./modules/db.js";

db.connect();
board.connect(save)




