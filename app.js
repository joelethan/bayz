import express from "express";
import { json } from "body-parser";

const authRoutes = require("./api/routes/auth");
const protectedRoutes = require("./api/routes/protected");
const app = express();
const port = process.env.PORT || 3000;

// parse application/json
app.use(json())


// Routes which should handle requests
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.listen(port, ()=>console.log(`http://localhost:${port}/`));
