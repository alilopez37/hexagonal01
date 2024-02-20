import { Product } from "./Product";

export interface ProductRepository {
  getAll(): Promise<Product[] | null>;
  getById(userId: number): Promise<Product | null>;
  createProduct(product: Product): Promise<Product | null>;
}
