
const projects = {
    "real-estate": {
        category: "POWER BI • REAL ESTATE ANALYTICS",
        title: "Real Estate Analytics Dashboard",
        intro: "An interactive dashboard for exploring property sales, revenue, and performance across property types and locations.",
        tags: ["Power BI", "DAX", "Data Cleaning", "Data Modeling", "Visualization"],
        cover: "images/dashboard-real-estate.jpg",
        coverType: "image",
        overview: "This project presents real estate information through an interactive dashboard. It helps users explore sales performance, revenue, property categories, and trends over time.",
        objectives: [
            "Analyze sales and revenue performance.",
            "Compare different property types.",
            "Explore trends by period and location.",
            "Present key metrics in a clear visual format."
        ],
        tools: ["Microsoft Power BI", "DAX", "Power Query", "Data Cleaning", "Data Modeling"],
        gallery: [
            { src: "images/landing-page-real-estate.jpg", caption: "Real Estate Landing Page" },
            { src: "images/dashboard-real-estate.jpg", caption: "Real Estate Dashboard" }
        ]
    },

    "hospital": {
        category: "POWER BI • HEALTHCARE ANALYTICS",
        title: "Hospital Performance Dashboard",
        intro: "A healthcare analytics dashboard designed to present hospital performance and operational information through visual reports.",
        tags: ["Power BI", "DAX", "Healthcare", "Data Visualization"],
        cover: "images/dashboard-hospital.jpg",
        coverType: "image",
        overview: "This project organizes healthcare and hospital performance information into a dashboard. The available data can be explored using relevant time, department, and status filters.",
        objectives: [
            "Present hospital performance indicators.",
            "Explore healthcare information by time period.",
            "Organize operational information into dashboard sections.",
            "Make reports easier to read and explore."
        ],
        tools: ["Microsoft Power BI", "DAX", "Power Query", "Data Cleaning", "Data Modeling"],
        gallery: [
            { src: "images/landing-page-hospital.jpg", caption: "Hospital Landing Page" },
            { src: "images/dashboard-hospital.jpg", caption: "Hospital Dashboard" }
        ]
    },

    "spam-detection": {
        category: "PYTHON • MACHINE LEARNING",
        title: "Spam Detection System",
        intro: "A Python application that classifies text messages as spam or not spam using text processing and a machine learning model.",
        tags: ["Python", "Machine Learning", "TF-IDF", "Naive Bayes"],
        cover: "videos/spam.mp4",
        coverType: "video",
        overview: "The Spam Detection System analyzes a text message and predicts whether it is spam or not spam. The project uses TF-IDF to represent text numerically and a Multinomial Naive Bayes classifier to make predictions. The application provides a graphical interface for testing messages.",
        objectives: [
            "Process text messages for machine learning.",
            "Convert text into numerical features using TF-IDF.",
            "Classify messages as spam or not spam.",
            "Provide a graphical interface for entering and testing messages.",
            "Display prediction results to the user."
        ],
        tools: ["Python", "Tkinter", "scikit-learn", "TF-IDF Vectorizer", "Multinomial Naive Bayes"],
        gallery: []
    },

    "movieverse": {
        category: "WEB DEVELOPMENT • VUE.JS",
        title: "MovieVerse",
        intro: "A movie discovery web application built with Vue.js, featuring movie browsing and a favorites feature.",
        tags: ["Vue.js", "Vuex", "JavaScript", "Web Development"],
        coverType: "placeholder",
        overview: "MovieVerse is a web development project built with Vue.js. Its favorites feature uses Vuex to manage selected movies, check whether a movie is already a favorite, and keep track of saved favorites.",
        objectives: [
            "Build a component-based web interface using Vue.js.",
            "Manage favorites through a Vuex store.",
            "Allow users to add or remove movies from favorites.",
            "Organize application state for reuse across components."
        ],
        cover: "videos/movieverse.mp4",
         coverType: "video",
        tools: ["Vue.js", "Vuex", "JavaScript", "HTML", "CSS"],
        gallery: []
    },

    "maze": {
        category: "PYTHON • A* PATHFINDING",
        title: "A* Maze Pathfinding",
        intro: "A maze-solving visualization using the A* search algorithm to find a path from the starting point to the goal while navigating around obstacles.",
        tags: ["Python", "Pygame", "A* Algorithm", "Pathfinding"],
        cover: "videos/Algorithm.mp4",
        coverType: "video",
        overview: "This project visualizes pathfinding in a grid-based maze using the A* search algorithm. The algorithm uses a heuristic to help find a route from the start to the goal while avoiding blocked cells.",
        objectives: [
            "Represent a maze as a grid with obstacles.",
            "Define a starting point and a goal.",
            "Apply the A* search algorithm to find a path.",
            "Use Manhattan distance as the heuristic.",
            "Visualize the pathfinding process in a Pygame window."
        ],
        tools: ["Python", "Pygame", "A* Search", "Heuristic Search", "Manhattan Distance"],
        gallery: []
    }
};

const params = new URLSearchParams(window.location.search);
const projectKey = params.get("project");
const project = projects[projectKey];

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function renderTags(tags) {
    const container = document.getElementById("detailTags");
    if (!container) return;

    container.replaceChildren();

    tags.forEach((tag) => {
        const span = document.createElement("span");
        span.textContent = tag;
        container.appendChild(span);
    });
}

function renderList(id, items, className) {
    const container = document.getElementById(id);
    if (!container) return;

    container.replaceChildren();
    container.className = className;

    items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        container.appendChild(li);
    });
}

function renderCover(data) {
    const container = document.getElementById("detailCoverMedia");
    if (!container) return;

    container.replaceChildren();

    if (data.coverType === "video") {
        const video = document.createElement("video");
        video.className = "detail-cover-video";
        video.controls = true;
        video.preload = "metadata";
        video.playsInline = true;
        video.setAttribute("aria-label", `${data.title} demonstration video`);

        const source = document.createElement("source");
        source.src = data.cover;
        source.type = "video/mp4";

        video.appendChild(source);
        video.appendChild(
            document.createTextNode("Your browser does not support video playback.")
        );

        video.addEventListener("error", () => {
            showMediaError(container, "Video could not be loaded. Check the video file path.");
        });

        container.appendChild(video);
        return;
    }

    if (data.coverType === "image") {
        const image = document.createElement("img");
        image.className = "detail-cover";
        image.src = data.cover;
        image.alt = `${data.title} preview`;

        image.onerror = () => {
            showMediaError(container, "Cover image could not be loaded. Check the image file path.");
        };

        container.appendChild(image);
        return;
    }

    if (data.coverType === "placeholder") {
        const placeholder = document.createElement("div");
        placeholder.className = "detail-placeholder";

        const title = document.createElement("strong");
        title.textContent = data.title;

        const subtitle = document.createElement("span");
        subtitle.textContent = "Project Preview";

        placeholder.append(title, subtitle);
        container.appendChild(placeholder);
    }
}

function showMediaError(container, message) {
    container.replaceChildren();

    const error = document.createElement("div");
    error.className = "gallery-missing";
    error.textContent = message;

    container.appendChild(error);
}

function renderGallery(gallery) {
    const container = document.getElementById("detailGallery");
    const section = document.getElementById("gallerySection");
    const note = document.getElementById("galleryNote");

    if (!container || !section) return;

    container.replaceChildren();

    if (!gallery || gallery.length === 0) {
        section.hidden = true;
        return;
    }

    section.hidden = false;

    if (note) {
        note.textContent = "Select an image to open it in a larger window.";
    }

    gallery.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "gallery-item";
        button.setAttribute("aria-label", `View ${item.caption}`);

        const image = document.createElement("img");
        image.src = item.src;
        image.alt = item.caption;
        image.loading = "lazy";

        const caption = document.createElement("span");
        caption.className = "gallery-caption";
        caption.textContent = item.caption;

        image.onerror = () => {
            button.replaceChildren();

            const message = document.createElement("span");
            message.className = "gallery-missing";
            message.textContent = `Image not found: ${item.src}`;

            button.appendChild(message);
        };

        button.append(image, caption);

        button.addEventListener("click", () => {
            if (image.complete && image.naturalWidth > 0) {
                window.open(image.src, "_blank", "noopener,noreferrer");
            }
        });

        container.appendChild(button);
    });
}

function renderProject(data) {
    document.title = `${data.title} | Shahd Hossam`;

    setText("detailCategory", data.category);
    setText("detailTitle", data.title);
    setText("detailIntro", data.intro);
    setText("detailOverview", data.overview);

    renderTags(data.tags);
    renderCover(data);
    renderList("detailObjectives", data.objectives, "detail-list");
    renderList("detailTools", data.tools, "tools-list");
    renderGallery(data.gallery);
}

function showProjectNotFound() {
    document.title = "Project Not Found | Shahd Hossam";

    const main = document.querySelector("main");
    if (!main) return;

    main.innerHTML = `
        <section class="not-found">
            <p class="eyebrow">OOPS!</p>
            <h1>Project Not Found</h1>
            <p>The project you're looking for doesn't exist or the link is incorrect.</p>
            <a href="index.html#projects" class="btn btn-primary">Back to Projects</a>
        </section>
    `;
}

if (project) {
    renderProject(project);
} else {
    showProjectNotFound();
}
