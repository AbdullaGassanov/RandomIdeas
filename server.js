import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import { ideaRouter } from "./routes/ideas.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

// Initialization and invoke necessary function
const app = express();
dotenv.config();
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 5100;


// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
const corsOprions = {
    origin: ["http://localhost:5000", "http://localhost:3000"],
    methods: ['GET', 'POST'],
    credentials: true
};

app.use(cors(corsOprions));


app.get("/", (req, res) => {
    res.json({ status: true, message: "success" });
});

app.use("/api/ideas", ideaRouter);


app.listen(port, () => console.log(`Server listening on ${port}`));