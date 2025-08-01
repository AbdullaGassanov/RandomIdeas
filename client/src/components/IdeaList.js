import ideasApi from "../services/ideasApi.js";
import IdeasApi from "../services/ideasApi.js";

export class IdeaList {
    constructor() {
        this._ideaListEl = document.querySelector("#idea-list");
        this._ideas = [];
        this.getIdeas();

        this._validTags = new Set();
        this._validTags.add("technology");
        this._validTags.add("software");
        this._validTags.add("business");
        this._validTags.add("education");
        this._validTags.add("helth");
        this._validTags.add("inventions");



    }

    addEventListeners() {
        this._ideaListEl.addEventListener("click", (e) => {
            if (e.target.classList.contains("fa-times")) {
                e.stopImmediatePropagation();
                const id = e.target.closest(".card").dataset.id;

                this.deleteIdea(id);
            }
        });
    }

    async deleteIdea(ideaID) {
        try {
            //Delete from server 
            const res = await ideasApi.deleteIdea(ideaID);
            this._ideas.filter((idea) => idea._id !== ideaID);
            this.getIdeas();

        } catch (error) {
            console.log("You cannot delete this resource");
        }
    }

    async getIdeas() {
        try {
            const res = await IdeasApi.getIdeas();
            this._ideas = res.data.data;
            this.render();
        } catch (error) {
            console.log(error);
        }
    }

    addIdeaToList(idea) {
        this._ideas.push(idea);
        this.render();
    }

    getTagClass(tag) {
        tag = tag.toLowerCase();
        let tagClass = "";
        if (this._validTags.has(tag)) {
            tagClass = `tag-${tag}`;
        } else {
            tagClass = "";
        }
        return tagClass;
    }

    render() {


        const ideas = this._ideas.map(idea => {
            const tagClass = this.getTagClass(idea.tag);
            const deleteBtn = idea.username === localStorage.getItem("username") ? ` <button class="delete"><i class="fas fa-times"></i></button>` : "";
            return `<div class="card" data-id=${idea._id}>
            ${deleteBtn}
            <h3>
            ${idea.text}
            </h3>
            <p class="tag ${tagClass}">${idea.tag}</p>
            <p>
                Posted on <span class="date">${idea.date}</span> by
                <span class="author">${idea.username}</span>
            </p> </div>`;
        }).join("");


        this._ideaListEl.innerHTML = ideas;

        this.addEventListeners();

    }




}