import { Bot } from "./Client";


export abstract class BaseEvent {
    protected client: Bot;
    constructor(client: Bot) {
        this.client = client;
    }
    abstract run(...args: any[]) : void
}