import path from "path";
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
// import dashboardRoutes from "./routes/dashboardRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
// app.use("/api/dashboard", dashboardRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is Runn....");
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () =>
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
  );
} catch (error) {
  console.error(`Error starting server: ${error.message}`);
}
//runingin