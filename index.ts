import {Bot} from './src/Structures/Client';
import {config} from "dotenv";
config();
new Bot(process.env.TOKEN as string);
