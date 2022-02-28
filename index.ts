import { Bot } from './src/Structures/Client';
import { config } from "dotenv";
import "reflect-metadata";
config();

new Bot(process.env.TOKEN as string);
