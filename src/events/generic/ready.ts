import { Bot } from "../../Structures/Client";
import {BaseEvent} from "../../Structures/Event";

export class Event extends BaseEvent {
    constructor(client: Bot) {
        super(client)
    }
    async run() {
        console.log(`${(this.client.user || {}).tag} ready to help ${this.client.guilds.cache.size}`);
    }
}