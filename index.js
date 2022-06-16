import posts from './content_data/posts.json' assert {type: 'json'};
const initial_post_amount = 5;
const main_content_container_id = "contentSection";
const main_content_parent_id = "mainContentParent";

"use strict";

let state = "recent_posts";
// recent_posts, all_posts, about_me, projects
function load_posts() {
    let out = [];
    let i = 0;
    while (i < posts.length) {
        out.push(new Post(posts[i].title, posts[i].content, null, posts[i].date, "tags"));
        i += 1;
    }
    return out;
}
let post_elements = load_posts();

function Post(title, content, image, date, tag)
{
    let $self = this;
    this.title = title;
    this.content = content;
    this.image = image;
    this.date = date;

    this.root = document.createElement("div");
    this.root.setAttribute("class", "post");

    let postMetaElement = document.createElement("div");
    postMetaElement.setAttribute("class", "postMeta");
    let postTitleElement = document.createElement("div");
    postTitleElement.setAttribute("class", "postTitle");
    postTitleElement.innerHTML = "<h3>" + title + "</h3>";
    postTitleElement.addEventListener("mouseenter", (ev) => {
        $self.root.style.opacity = "50%";
    });
    postTitleElement.addEventListener("mouseleave", (ev) => {
        $self.root.style.opacity = "initial";
    });
    let postMetaBufferElement = document.createElement("div");
    postMetaBufferElement.setAttribute("style", "width: 20px; flex: 1 0 auto;");
    let postDateElement = document.createElement("div");
    postDateElement.setAttribute("style", "flex: 0 0 auto;");
    postDateElement.innerHTML = "<i>" + date + "</i>";
    let placeholderElement = document.createElement("div");
    placeholderElement.setAttribute("style", "flex: 0 0 auto;");
    placeholderElement.innerHTML = tag;
    postMetaElement.appendChild(postTitleElement);
    postMetaElement.appendChild(postMetaBufferElement);
    postMetaElement.appendChild(postDateElement);
    postMetaElement.appendChild(placeholderElement);

    let postVerticalBufferElement = document.createElement("div");
    postVerticalBufferElement.setAttribute("style", "width: 20px; flex: 0 0 auto;");

    let postContentElement = document.createElement("div");
    postContentElement.setAttribute("class", "postContent");
    postContentElement.innerHTML = "<p>" + content + "</p>";
    postContentElement.addEventListener("mouseenter", (ev) => {
        $self.root.style.opacity = "50%";
    });
    postContentElement.addEventListener("mouseleave", (ev) => {
        $self.root.style.opacity = "initial";
    });


    this.root.appendChild(postMetaElement);
    this.root.appendChild(postVerticalBufferElement);
    this.root.appendChild(postContentElement);
}

function change_content_background_color(content_parent_id, content_container_id, new_color) {
    document.getElementById(content_parent_id).style.backgroundColor = new_color;
    document.getElementById(content_container_id).style.backgroundColor = new_color;
}

function create_break() {
    let break_element = document.createElement("hr");
    break_element.setAttribute("class", "dropDownBreak");
    return break_element;
}

function display_posts(from, to, content_container_id, init_html) {
    let content_container = document.getElementById(content_container_id);
    content_container.innerHTML = init_html;
    while (from <= to && from < post_elements.length) {
        content_container.appendChild(post_elements[from].root);
        from += 1;
    }
}

function load_about_me_page(content_container_id) {
    document.getElementById(content_container_id).innerHTML = `<h2>My name is Jonathan Lee ...</h2>
    <div style = "flex-direction: row; flex-wrap: wrap; width: 100%;" id = "about_me_content">
        <img src="content_data/profile_pics/t_wedding1.PNG" style = "width: 40%; flex: 0 0 auto; max-width: 300px; max-height: 900px;">
        <div style = "width: 20px; flex: 0 0 auto;"></div>
        <div style = "flex: 1; margin: 0px auto;" class = "breaking_wrap">
            <p><i>I plan on graduating</i> in the Fall of 2022 with a BS in Statistics.</p>
            <hr class = "dropDownBreak">
            <p>I am very interested in new and novel technologies related to Artifical Intelligence. I believe that a statistical viewpoint on the subject of intelligent automata offers a strong basis for meaningful progress in the field.</p>
            <hr class = "dropDownBreak">
            <p>Peruse some of my posts to find discussions on topics and projects related AI, independent automata, statistics, and gaming!</p>
        </div>
    </div>`;
}

function switch_state(l_state) {
    // here we do things uninvolved in the actual page change, but other relevant tasks like changing color palette
    if (l_state === state) {
        return;
    }
    if (l_state === "recent_posts") {
        change_content_background_color(main_content_parent_id, main_content_container_id, "lightsalmon");
    }
    else if (l_state === "all_posts") {
        change_content_background_color(main_content_parent_id, main_content_container_id, "lightsalmon");
    }
    else if (l_state === "about_me") {
        // change_content_background_color(main_content_parent_id, main_content_container_id, "white");
    }
    else if (l_state === "projects") {

    }
    else if (l_state === "post") {

    }
    else if (l_state === "project") {

    }
    else {
        throw Error("Non-listed or expected state change");
    }
    state = l_state;
}

display_posts(0, initial_post_amount, main_content_container_id, `<h2>Most recent posts</h2>`);

document.getElementById("about_me_header_item").addEventListener("click", (ev) => {
    load_about_me_page(main_content_container_id);
    switch_state("about_me");
});

document.getElementById("projects_header_item").addEventListener("click", (ev) => {
    //
    switch_state("projects");
});

document.getElementById("posts_header_item").addEventListener("click", (ev) => {
    display_posts(0, post_elements.length - 1, main_content_container_id, `<h2>All posts</h2>`);
    switch_state("all_posts");
});
