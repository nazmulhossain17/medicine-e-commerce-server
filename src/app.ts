import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import categoryRouter from "./routes/categoryRoutes";
import productRouter from "./routes/productRoutes";
import shippingRouter from "./routes/shippingRoutes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the actual front-end URL
    credentials: true, // This allows cookies to be sent along with the request
  })
);
app.use(cookieParser());

// routes
app.use("/api/v1", userRouter);
app.use("/api/v2", categoryRouter);
app.use("/api/v3", productRouter);
app.use("/api/v4", shippingRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Working");
});

export default app;
