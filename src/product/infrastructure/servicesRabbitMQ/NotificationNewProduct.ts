import amqplib from "amqplib";

import { Product } from "../../domain/Product";
import { INotificationNewProduct } from "../../domain/services/INotificationNewProduct";

export class NotificationNewProduct implements INotificationNewProduct {
  private options: any;
  private url: any;
  private exch: any;
  //private server: any;

  constructor() {
    this.options = {
      vhost: process.env.AMQP_VHOST,
      username: process.env.AMQP_USERNAME,
      password: process.env.AMQP_PASSWORD,
      port: process.env.AMQP_PORT,
    };
    this.url = process.env.AMQP_URL;
    this.exch = process.env.AMQP_EXCH;
    //Options solo para cloudamqp
    //this.server = process.env.AMQP_SERVER;
  }

  async sendNotification(product: Product): Promise<boolean> {
    //Opción de conexión para instancia EC2
    const conn = await amqplib.connect(this.url, this.options);
    //Opción de conexión para cloudamqp
    //const conn  = await amqplib.connect(this.server);
    const ch = await conn.createChannel();
    const status = await ch.publish(this.exch, "", Buffer.from("Prueba"));
    return status;
  }
}
