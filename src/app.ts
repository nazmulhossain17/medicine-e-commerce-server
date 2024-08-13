import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import categoryRouter from "./routes/categoryRoutes";
import productRouter from "./routes/productRoutes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// routes
app.use("/api/v1", userRouter);
app.use("/api/v2", categoryRouter);
app.use("/api/v3", productRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Working");
});

export default app;
