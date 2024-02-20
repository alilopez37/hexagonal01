import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";
import { IEcryptService } from "./Services/IEncryptService";
import { NotificationProductUSeCase } from "./Services/NotificationNewProduct";

export class CreateProductUseCase {
  constructor(
    readonly productRepository: ProductRepository,
    readonly encryptPassword: IEcryptService,
    readonly sendNotification: NotificationProductUSeCase
  ) {}

  async run(
    name: string,
    description: string,
    price: number
  ): Promise<Product | null> {
    const encode = this.encryptPassword.encodePassword(name);
    const prod = new Product(0, encode, description, price);
    try {
      const product = await this.productRepository.createProduct(prod);
      if (product)
        //Se valida que la creación del recurso sea exitosa
        this.sendNotification.run(product);
      return product;
    } catch (error) {
      return null;
    }
  }
}
