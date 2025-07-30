import express from "express";
import dotenv from "dotenv";
import { ideaRouter } from "./routes/ideas.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 5100;

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.json({ status: true, message: "success" });
});

app.use("/api/ideas", ideaRouter);


app.listen(port, () => console.log(`Server listening on ${port}`));