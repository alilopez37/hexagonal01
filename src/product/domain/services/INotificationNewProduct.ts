import { Product } from "../Product";

export interface INotificationNewProduct {
  sendNotification(product: Product): Promise<boolean>;
}
