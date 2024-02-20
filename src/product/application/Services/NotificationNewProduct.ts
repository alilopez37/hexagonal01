import { Product } from "../../domain/Product";
import { NotificationNewProduct } from "../../infrastructure/servicesRabbitMQ/NotificationNewProduct";

export class NotificationProductUSeCase {
  constructor(readonly serviceNotifiacion: NotificationNewProduct) {}

  async run(product: Product) {
    await this.serviceNotifiacion.sendNotification(product);
  }
}
