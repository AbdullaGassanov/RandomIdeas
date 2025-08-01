import express from "express";
import Idea from "../models/ideas.js";

export const ideaRouter = express.Router();

ideaRouter.get("/", async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({ success: true, data: ideas });
    } catch (e) {
        console.log(e.message);
        res.status(404).json({ status: false, mag: "Coudn't find data" });
    }
});

ideaRouter.get("/:id", async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        res.json({ success: true, data: idea });

    } catch (error) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }



});

ideaRouter.post("/", async (req, res) => {

    const idea = new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username
    });

    try {
        const savedIdea = await idea.save();
        res.json({ status: true, data: savedIdea });
    } catch (error) {
        console.log("Idea valudation failed");
        res.status(500).json({ success: false, error: "Something went wrong" });
    }


});

ideaRouter.put("/:id", async (req, res) => {

    try {

        const idea = await Idea.findById(req.params.id);

        // Match the usernames
        if (idea.username === req.body.username) {
            const updatedIdea = await Idea.findByIdAndUpdate(req.params.id,
                {
                    $set: {
                        text: req.body.text,
                        tag: req.body.tag
                    }
                }, { new: true });


            return res.json({ status: true, data: updatedIdea });
        }
        res.status(403).json({ success: false, error: "You are not authorized to update this resource" });

    } catch (err) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }


});

ideaRouter.delete("/:id", async (req, res) => {

    try {

        const idea = await Idea.findById(req.params.id);

        // Match the usernames
        if (idea.username === req.body.username) {
            await Idea.findByIdAndDelete(req.params.id);
            return res.json({ status: true, data: {} });
        }

        // Usernames do not match
        res.status(403).json({ success: false, error: "You are not authorized to delete this resource " });

    } catch (err) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }

});




