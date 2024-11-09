import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;


app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const DataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const Data = mongoose.model("Data", DataSchema);


app.post("/api/add", async (req, res) => {
  try {
    const { name, age } = req.body;
    const newData = new Data({ name, age });
    await newData.save();
    res.status(201).json({ message: "Data added successfully", data: newData });
  } catch (error) {
    res.status(500).json({ message: "Error adding data", error });
  }
});


app.get("/api/users", async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json({ message: "Data retrieved successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
