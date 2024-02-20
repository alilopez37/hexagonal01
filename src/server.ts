import express from "express";
import morgan from "morgan";
import { Signale } from "signale";

import { loadRouter } from "./event/LoadRouter";
import { productRouter } from "./product/infrastructure/ProductRouter";

const app = express();

const signale = new Signale();

app.use(express.json());
app.use(morgan("dev"));
app.use("/products", productRouter);
app.use("/load", loadRouter);

app.listen(3000, () => {
  signale.success("Server online in port 3000");
});
