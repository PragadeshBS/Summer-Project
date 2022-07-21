require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Coonected to MongoDB\nServer running on port ${process.env.PORT}`
    );
  });
});
