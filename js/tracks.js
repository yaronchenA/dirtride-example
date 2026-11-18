// =========================================================
// tracks.js: the interactive parts of the page "מסלולי רכיבה בישראל"
// =========================================================

// x, y = where the pin sits on the map picture (percent of its width and height)
const regions = [
    { num: 1, name: "רמת הגולן", x: 90, y: 13, level: 4, img: "images/scene_golan.svg",
      terrain: "סלעי בזלת, עליות ודרכי עפר בין שדות", season: "אביב וסתיו",
      challenge: "הסלעים קשים ומחליקים, והצמיגים והמתלים עובדים קשה. צריך טכניקה טובה בעמידה.",
      fun: "נופים פתוחים, ירוק בחורף ובאביב, ומבט על הכנרת." },
    { num: 2, name: "הגליל", x: 70, y: 14.5, level: 3, img: "images/scene_forest.svg",
      terrain: "דרכי עפר ביערות, עליות וירידות", season: "כל השנה, בזהירות אחרי גשם",
      challenge: "שורשים, אבנים ובוץ בחורף. הרבה מטיילים ורוכבי אופניים בדרך.",
      fun: "צל של עצים, ריח של יער ונקודות תצפית יפות." },
    { num: 3, name: "מסלולי מוטוקרוס מוסדרים", x: 51, y: 37.5, level: 2, img: "images/scene_track.svg",
      terrain: "מסלול סגור עם קפיצות, פניות ומשטחים מוכנים", season: "כל השנה",
      challenge: "קפיצות ופניות חדות, ורוכבים נוספים במסלול. דורש ריכוז מלא.",
      fun: "המקום הבטוח ביותר להתאמן ולשפר טכניקה, עם מדריכים ורוכבים מנוסים." },
    { num: 4, name: "הנגב המערבי", x: 29, y: 61, level: 3, img: "images/scene_dunes.svg",
      terrain: "חולות ודיונות", season: "חורף",
      challenge: "בחול רך האופנוע שוקע ומחליק. צריך לשמור על מהירות ולשבת אחורה.",
      fun: "תחושת חופש: דיונות רחבות ושקיעות מדבריות." },
    { num: 5, name: "הערבה", x: 54, y: 84, level: 5, img: "images/scene_arava.svg",
      terrain: "נחלים יבשים, חצץ, מצוקים ומרחקים גדולים", season: "חורף בלבד (בקיץ חם מאוד)",
      challenge: "חום, מרחקים ארוכים ומעט מקורות מים. חובה לתכנן מסלול ולקחת הרבה מים.",
      fun: "שקט מדברי, נופים צבעוניים ותחושה של הרפתקה אמיתית." }
];

function stars(level) {
    let s = "";
    for (let i = 1; i <= 5; i++) {
        s += i <= level ? "★" : "☆";
    }
    return s;
}

// ---------- the map with pins ----------
function showPins() {
    const map = document.getElementById("map");
    for (let i = 0; i < regions.length; i++) {
        const pin = document.createElement("div");
        pin.className = "pin";
        pin.style.left = regions[i].x + "%";
        pin.style.top = regions[i].y + "%";
        pin.title = regions[i].name;
        pin.innerHTML = "<span>" + regions[i].num + "</span>";
        pin.onclick = function () { showRegion(i); };
        map.append(pin);
    }
}

function showRegion(i) {
    const r = regions[i];
    document.getElementById("regionInfo").innerHTML =
        "<img class=\"zoom\" src=\"" + r.img + "\" alt=\"" + r.name + "\" style=\"max-height:200px\">" +
        "<h3>" + r.num + ". " + r.name + "</h3>" +
        "<div class=\"stars\" title=\"רמת קושי\">" + stars(r.level) + "</div>" +
        "<p><b>השטח:</b> " + r.terrain + "</p>" +
        "<p><b>עונה מומלצת:</b> " + r.season + "</p>" +
        "<p><b>האתגר:</b> " + r.challenge + "</p>" +
        "<p><b>הכיף:</b> " + r.fun + "</p>";
    document.querySelectorAll(".pin").forEach(function (p, k) { p.classList.toggle("active", k === i); });
}

// ---------- the region cards, with a filter by difficulty ----------
function showCards(maxLevel) {
    let html = "";
    for (let i = 0; i < regions.length; i++) {
        if (maxLevel === 0 || regions[i].level <= maxLevel) {
            html += "<div class=\"card\"><img class=\"zoom\" src=\"" + regions[i].img + "\" alt=\"\"><h3>" + regions[i].name + "</h3>" +
                    "<div class=\"stars\">" + stars(regions[i].level) + "</div><p>" + regions[i].terrain + "</p></div>";
        }
    }
    document.getElementById("regionCards").innerHTML = html;
}

document.querySelectorAll("#levelFilter .tab").forEach(function (btn) {
    btn.onclick = function () {
        document.querySelectorAll("#levelFilter .tab").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        showCards(Number(btn.dataset.level));
    };
});

// ---------- slideshow (changes by itself every 4 seconds) ----------
let slide = 0;
function showSlide(n) {
    slide = (n + regions.length) % regions.length;
    document.getElementById("slideImg").src = regions[slide].img;
    document.getElementById("slideCaption").textContent = regions[slide].name + ": " + regions[slide].fun;
}
document.getElementById("nextBtn").onclick = function () { showSlide(slide + 1); };
document.getElementById("prevBtn").onclick = function () { showSlide(slide - 1); };
setInterval(function () { showSlide(slide + 1); }, 4000);

showPins();
showCards(0);
showSlide(0);
