import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import Cards from "./dbCards.js";

dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = process.env.MONGODB_URL;

// Middlewares
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect(connection_url, {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
});

// API Endpoints
app.get("/", (req, res) =>
  res.status(200).send("Hello every one in my server!!")
);

app.post("/tinder/cards", async (req, res) => {
  const dbCard = req.body;

  await Cards.create(dbCard);
  try {
    res.status(201).send(dbCard);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/tinder/cards", async (req, res) => {
  try {
    const cards = await Cards.find({});
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Listner
app.listen(port, () => {
  console.log(`listening on localhost: ${port}`);
});
