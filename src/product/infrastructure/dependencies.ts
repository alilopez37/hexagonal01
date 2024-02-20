import { CreateProductUseCase } from "../application/CreateProductUseCase";
import { GetAllProductUseCase } from "../application/GetAllProductUseCase";
import { GetByIdProductUseCase } from "../application/GetByIdProductUseCase";
import { NotificationProductUSeCase } from "../application/Services/NotificationNewProduct";
import { CreateProductController } from "./controllers/CreateProductController";
import { GetAllProductController } from "./controllers/GetAllProductController";
import { GetByIdProductController } from "./controllers/GetByIdProductController";
import { EncryptService } from "./helpers/EncryptService";
import { MysqlProductRepository } from "./MysqlProductRepository";
import { NotificationNewProduct } from "./servicesRabbitMQ/NotificationNewProduct";

export const mysqlProductRepository = new MysqlProductRepository();
export const servicesNotification = new NotificationNewProduct();
export const encryptPassword = new EncryptService();
export const serviceNotificationUseCase = new NotificationProductUSeCase(
  servicesNotification
);
export const createProductUseCase = new CreateProductUseCase(
  mysqlProductRepository,
  encryptPassword,
  serviceNotificationUseCase
);
export const getAllUseCase = new GetAllProductUseCase(mysqlProductRepository);
export const getByIdProductUseCase = new GetByIdProductUseCase(
  mysqlProductRepository
);
export const createProductController = new CreateProductController(
  createProductUseCase
);
export const getAllProductController = new GetAllProductController(
  getAllUseCase
);
export const getByIdProductController = new GetByIdProductController(
  getByIdProductUseCase
);
