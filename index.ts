import {Bot} from './src/Structures/Client';
import {config} from "dotenv";
config();
const client = new Bot(process.env.TOKEN as string);
