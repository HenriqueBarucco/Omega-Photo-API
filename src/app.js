import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
routes(app);

export default app;
