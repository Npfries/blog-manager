import { exchanges } from "@blog-manager/events";
import amqplib from "amqplib";
import * as Types from "../types.js";

class EventService {
  /**
   * @type {import('amqplib').Connection}
   */
  connection;
  /**
   * @type {import('amqplib').Channel}
   */
  channel;

  async init() {
    this.connection = await amqplib.connect(process.env.RABBIT_MQ_HOST ?? "localhost");
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(exchanges.USER_CREATED, "fanout", {});
  }

  /**
   * @param {import('@blog-manager/events').IUserCreatedEvent} data
   */
  sendUserCreatedEvent(data) {
    this.channel.publish(exchanges.USER_CREATED, "", Buffer.from(JSON.stringify(data)));
  }
}

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const eventServiceSingleton = async (app, options) => {
  const service = new EventService();
  await service.init();
  app.decorate("eventService", service);
};

export { eventServiceSingleton, EventService };
