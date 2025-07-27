import express from "express";

const app = express();

const port = 5000;

const ideas = [
    {
        "id": 0,
        "todo": "Contribute code or a monetary donation to an open-source software project",
        "completed": false,
        "userId": 69
    },
    { "id": 1, "todo": "Solve a Rubik's cube", "completed": true, "userId": 76 },
    {
        "id": 2,
        "todo": "Bake pastries for yourself and neighbor",
        "completed": true,
        "userId": 198
    },
    {
        "id": 3,
        "todo": "Go see a Broadway production",
        "completed": false,
        "userId": 7
    }
];

app.get("/", (req, res) => {
    res.json({ status: true, message: "success" });
});

app.get("/api/ideas/", (req, res) => {

    res.json({ success: true, data: ideas });
});

app.get("/api/ideas/:id", (req, res) => {
    const idea = ideas.find(idea => idea.id === +req.params.id);

    if (!idea) { res.status(404).json({ success: false, error: "Resourse not found" }); }
    else {
        res.json({ success: true, data: idea });
    }
});

app.listen(port, () => console.log(`Server listening on ${port}`));