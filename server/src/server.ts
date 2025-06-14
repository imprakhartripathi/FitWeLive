import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./router";
import { connectMongoDB } from "./mongodb/mongodb.config";
import { backupPort, corsConfig } from "./app.config";

dotenv.config();

const app = express();
const PORT = process.env.PORT || backupPort;

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.status(200).send('01110000 01101111 01101110 01100111');
});

app.use(router);
// Connect to MongoDB
connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
