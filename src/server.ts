import express from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "./config/swagger.json";
import router from "./routes";

import "./database";

const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3333);
console.log("Server Running!");