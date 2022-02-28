import { Bot } from "./Client";


export abstract class BaseEvent {

    protected client: Bot;

    constructor(client: Bot) {
        this.client = client;
    }

    public abstract run(...args: any[]) : void
}