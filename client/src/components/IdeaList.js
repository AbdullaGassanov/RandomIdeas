export class IdeaList {
    constructor() {
        this._ideaListEl = document.querySelector("#idea-list");
        this._ideas = [
            {
                id: 1,
                text: "Idea 1",
                tag: "Business",
                username: "John",
                date: "02/01/2025"
            },
            {
                id: 2,
                text: "Idea 2",
                tag: "Technology",
                username: "Joe",
                date: "04/11/2025"
            },
            {
                id: 3,
                text: "Idea 3",
                tag: "f",
                username: "Joe",
                date: "04/11/2025"
            }
        ];

        this._validTags = new Set();
        this._validTags.add("technology");
        this._validTags.add("software");
        this._validTags.add("business");
        this._validTags.add("education");
        this._validTags.add("helth");
        this._validTags.add("inventions");


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
            return `<div class="card">
          <button class="delete"><i class="fas fa-times"></i></button>
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

    }




}