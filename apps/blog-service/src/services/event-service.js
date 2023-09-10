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
    const queue = "blog-service";
    this.connection = await amqplib.connect(process.env.RABBIT_MQ_HOST ?? "localhost");
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(exchanges.POST_MODIFIED, "fanout", {});
    await this.channel.assertQueue(queue);
    await this.channel.bindQueue(queue, exchanges.POST_MODIFIED, "");

    this.channel.consume(queue, async (msg) => {
      try {
        if (msg !== null) {
          const { postUuid, authorUuid } = JSON.parse(msg.content.toString());
          this.channel.ack(msg);
          this.app.blogpostService.createOrUpdateBlogpost(postUuid, authorUuid);
        } else {
          console.log("Consumer cancelled by server");
        }
      } catch (e) {
        console.log("Error updating post: ", e);
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
