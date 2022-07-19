require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

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
