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
        res.status(500).json({ success: false, error: "Something went wrong" });
    }


});

ideaRouter.put("/:id", async (req, res) => {

    try {
        const updatedIdea = await Idea.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    text: req.body.text,
                    tag: req.body.tag
                }
            }, { new: true });


        res.json({ status: true, data: updatedIdea });
    } catch (err) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }


});

ideaRouter.delete("/:id", async (req, res) => {



    try {
        const deletedIdea = await Idea.findByIdAndDelete(req.params.id);
        res.json({ status: true, data: deletedIdea });
    } catch (err) {
        res.status(500).json({ success: false, error: "Something went wrong" });
    }

});




