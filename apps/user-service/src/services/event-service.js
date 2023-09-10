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

  app;

  /**
   *
   * @param {Types.App} app
   */
  constructor(app) {
    this.app = app;
  }

  async init() {
    const queue = "user-service";
    this.connection = await amqplib.connect(process.env.RABBIT_MQ_HOST ?? "localhost");
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(exchanges.USER_CREATED, "fanout", {});
    await this.channel.assertQueue(queue);
    await this.channel.bindQueue(queue, exchanges.USER_CREATED, "");

    this.channel.consume(queue, async (msg) => {
      try {
        if (msg !== null) {
          const { uuid, email, handle, name } = JSON.parse(msg.content.toString());
          this.channel.ack(msg);
          await this.app.userService.create(uuid, email, handle, name);
        } else {
          console.log("Consumer cancelled by server");
        }
      } catch (e) {
        console.log("Error creating user:", e);
      }
    });
  }
}

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const eventServiceSingleton = async (app, options) => {
  const service = new EventService(app);
  await service.init();
  app.decorate("eventService", service);
};

export { eventServiceSingleton, EventService };
