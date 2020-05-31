import express from "express";
import { json } from "body-parser";

const authRoutes = require("./api/routes/auth");
const protectedRoutes = require("./api/routes/protected");
var port = process.env.PORT || 3001;
const app = express();
if (process.env.NODE_ENV) {
  port = 3002;
}

// parse application/json
app.use(json())


// Routes which should handle requests
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

app.use((req, res, next) => {
  res.status(404).json({Error: 'Resourse Not found'})
  next();
});

app.listen(port, ()=>console.log(`http://localhost:${port}/`));

export var server = app;
