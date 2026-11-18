// =========================================================
// master.js: plays the role of Site.Master (the master page)
// ---------------------------------------------------------
// In ASP.NET Web Forms, Site.Master holds the header, the menu and the footer,
// and every page fills only its own content (ContentPlaceHolder).
// Here, in plain HTML, this one file builds the same frame for every page:
// each page has only <main id="MainContent"> with its own content.
// Change the menu here once, and all the pages change.
// =========================================================

const pages = [
    { file: "index.html", title: "דף הבית" },
    { file: "challenges.html", title: "אתגר, כיף ותחרויות" },
    { file: "bikes.html", title: "סוגי אופנועים ויצרנים" },
    { file: "tracks.html", title: "מסלולי רכיבה בישראל" }
];

// which page are we on? (the file name at the end of the address)
function currentFile() {
    const parts = window.location.pathname.split("/");
    const name = parts[parts.length - 1];
    return name === "" ? "index.html" : name;
}

function buildHeader() {
    const header = document.createElement("header");
    header.className = "site-header";

    let links = "";
    for (let i = 0; i < pages.length; i++) {
        const active = pages[i].file === currentFile() ? " class=\"active\"" : "";
        links += "<a href=\"" + pages[i].file + "\"" + active + ">" + pages[i].title + "</a>";
    }

    header.innerHTML =
        "<a class=\"brand\" href=\"index.html\">" +
        "  <img src=\"images/logo.svg\" alt=\"לוגו\">" +
        "  <div><div class=\"brand-title\">Dirt<span>Ride</span> IL</div>" +
        "  <div class=\"brand-sub\">אתר הרכיבה על אופנועי שטח</div></div>" +
        "</a>" +
        "<nav class=\"site-nav\">" + links + "</nav>";
    document.body.prepend(header);
}

function buildBreadcrumb() {
    if (currentFile() === "index.html") return;
    let title = "";
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].file === currentFile()) title = pages[i].title;
    }
    const div = document.createElement("div");
    div.className = "breadcrumb";
    div.innerHTML = "<a href=\"index.html\">דף הבית</a> &gt; " + title;
    document.querySelector("header").after(div);
}

function buildFooter() {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    // like the label that the server fills with the date in Site.Master
    const today = new Date();
    const date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    footer.innerHTML =
        "DirtRide IL · אתר לדוגמה לפרויקט אמצע השנה בתכנות אינטרנט · היום: " + date + "<br>" +
        "רוכבים רק עם ציוד מגן, ורק במסלולים מוסדרים ובדרכים מסומנות." + "<br>" +
        "<button id=\"studyBtn\">מצב לימוד: מה בדף האב ומה בדף התוכן?</button>";
    document.body.append(footer);

    document.getElementById("studyBtn").onclick = function () {
        document.body.classList.toggle("study");
    };
}

// a button that goes back to the top of the page
function buildToTop() {
    const btn = document.createElement("button");
    btn.id = "toTop";
    btn.title = "לראש הדף";
    btn.textContent = "↑";
    btn.onclick = function () { window.scrollTo({ top: 0, behavior: "smooth" }); };
    document.body.append(btn);
    window.addEventListener("scroll", function () {
        btn.style.display = window.scrollY > 400 ? "block" : "none";
    });
}

// click a picture with the class "zoom" to see it bigger
function buildLightbox() {
    const box = document.createElement("div");
    box.id = "lightbox";
    box.innerHTML = "<img alt=\"\">";
    box.onclick = function () { box.classList.remove("show"); };
    document.body.append(box);
    document.querySelectorAll("img.zoom").forEach(function (img) {
        img.onclick = function () {
            box.querySelector("img").src = img.src;
            box.classList.add("show");
        };
    });
}

// parts with the class "reveal" appear when they scroll into view
function revealOnScroll() {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) e.target.classList.add("visible");
        });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
}

buildHeader();
buildBreadcrumb();
buildFooter();
buildToTop();
buildLightbox();
revealOnScroll();
