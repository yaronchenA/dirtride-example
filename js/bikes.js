// =========================================================
// bikes.js: the interactive parts of the page "סוגי אופנועים ויצרנים"
// =========================================================

// ---------- the bike types ----------
// tags: track = closed tracks, road = road legal, beginner = good for beginners
const bikes = [
    { id: "mx", name: "מוטוקרוס", img: "images/bike_motocross.svg", tags: ["track"],
      short: "קל, חזק ומהיר, למסלולים סגורים עם קפיצות.",
      long: "אופנוע המוטוקרוס נבנה למרוצים קצרים ואינטנסיביים במסלול סגור: מנוע חזק, מתלים ארוכים שבולעים נחיתות מקפיצות, ומשקל נמוך. אין לו פנסים ולוחית רישוי, ולכן אסור לרכוב עליו בכביש.",
      where: "מסלול סגור", road: "לא", weight: "קל", engine: "125–450 סמ\"ק" },
    { id: "enduro", name: "אנדורו", img: "images/bike_enduro.svg", tags: ["road"],
      short: "לרכיבות ארוכות בשטח פתוח, עם פנסים ולוחית רישוי.",
      long: "אופנוע אנדורו דומה לאופנוע מוטוקרוס, אבל מותאם לרכיבות ארוכות: מיכל דלק גדול יותר, הילוכים נוחים לשטח, ופנסים ולוחית רישוי. כך אפשר לרכוב בדרכי עפר ובכביש שמחבר ביניהן.",
      where: "שטח פתוח ודרכי עפר", road: "כן", weight: "בינוני", engine: "250–500 סמ\"ק" },
    { id: "trial", name: "טריאל", img: "images/bike_trial.svg", tags: ["track", "beginner"],
      short: "קל מאוד וכמעט בלי מושב: מטפסים על סלעים ומכשולים.",
      long: "בטריאל לא מתחרים במהירות אלא בשליטה: עוברים על סלעים, בולי עץ ומדרגות בלי לגעת ברגל בקרקע. האופנוע קל מאוד (בערך 70 ק\"ג), והרוכב עומד כל הזמן. מצוין ללימוד שיווי משקל.",
      where: "מכשולים ושטח סלעי", road: "לא", weight: "קל מאוד", engine: "125–300 סמ\"ק" },
    { id: "supermoto", name: "סופרמוטו", img: "images/bike_supermoto.svg", tags: ["road"],
      short: "אופנוע שטח עם גלגלי כביש: גם אספלט וגם קצת עפר.",
      long: "סופרמוטו הוא אופנוע שטח שקיבל גלגלים קטנים יותר וצמיגי כביש חלקים. הוא נועד למסלולים שמשלבים אספלט וקטעי עפר, ופופולרי גם לרכיבה בעיר בגלל שהוא קל וזריז.",
      where: "אספלט ומעט עפר", road: "כן", weight: "בינוני", engine: "450–700 סמ\"ק" },
    { id: "rally", name: "ראלי", img: "images/bike_rally.svg", tags: ["road"],
      short: "לנסיעות ארוכות במדבר, עם מיכל גדול וציוד ניווט.",
      long: "אופנועי ראלי נבנו למרוצים כמו ראלי דקאר: מיכלי דלק גדולים, מגן רוח, ועמדת ניווט מול הרוכב. הם כבדים יותר, אבל יציבים במהירות גבוהה בחולות ובמישורים פתוחים.",
      where: "מדבר ומרחקים ארוכים", road: "כן", weight: "כבד", engine: "450 סמ\"ק ומעלה" },
    { id: "electric", name: "חשמלי", img: "images/bike_electric.svg", tags: ["track", "beginner"],
      short: "שקט, בלי הילוכים ובלי פליטת גזים.",
      long: "אופנועי שטח חשמליים כמעט לא משמיעים רעש, אין להם מצמד והילוכים, והכוח זמין מיד. הם נוחים למתחילים ומפריעים פחות לסביבה. החיסרון: זמן רכיבה מוגבל עד שצריך לטעון את הסוללה.",
      where: "מסלולים ושבילים", road: "תלוי בדגם", weight: "בינוני", engine: "מנוע חשמלי" },
    { id: "pit", name: "פיט בייק", img: "images/bike_pit.svg", tags: ["track", "beginner"],
      short: "אופנוע קטן ונמוך, לילדים ולמתחילים.",
      long: "פיט בייק הוא אופנוע שטח קטן ונמוך. עליו ילדים ומתחילים לומדים את הבסיס: מצערת, בלמים, עמידה על הדוושות ופניות. הרבה אלופים התחילו על אופנועים של 50 או 65 סמ\"ק.",
      where: "מסלולי אימון", road: "לא", weight: "קל מאוד", engine: "50–150 סמ\"ק" }
];

function showBikes(filter) {
    let html = "";
    for (let i = 0; i < bikes.length; i++) {
        const b = bikes[i];
        if (filter === "all" || b.tags.includes(filter)) {
            let tags = "";
            for (let t = 0; t < b.tags.length; t++) {
                tags += "<span class=\"tag\">" + tagName(b.tags[t]) + "</span>";
            }
            html += "<div class=\"card\" data-id=\"" + b.id + "\" style=\"cursor:pointer\"><img src=\"" + b.img + "\" alt=\"" + b.name + "\">" +
                    "<h3>" + b.name + "</h3><p>" + b.short + "</p>" + tags + "</div>";
        }
    }
    document.getElementById("bikeCards").innerHTML = html;
    document.querySelectorAll("#bikeCards .card").forEach(function (card) {
        card.onclick = function () { showDetails(card.dataset.id); };
    });
    document.getElementById("bikeDetails").classList.remove("show");
}

function tagName(tag) {
    if (tag === "track") return "מסלול סגור";
    if (tag === "road") return "מותר בכביש";
    return "למתחילים";
}

function findBike(id) {
    for (let i = 0; i < bikes.length; i++) {
        if (bikes[i].id === id) return bikes[i];
    }
    return null;
}

function showDetails(id) {
    const b = findBike(id);
    const box = document.getElementById("bikeDetails");
    box.innerHTML = "<img src=\"" + b.img + "\" alt=\"" + b.name + "\"><div><h3>" + b.name + "</h3><p>" + b.long + "</p>" +
                    "<p><b>איפה רוכבים:</b> " + b.where + " · <b>מותר בכביש:</b> " + b.road + " · <b>נפח מנוע:</b> " + b.engine + "</p></div>";
    box.classList.add("show");
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.querySelectorAll("#filters .tab").forEach(function (btn) {
    btn.onclick = function () {
        document.querySelectorAll("#filters .tab").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        showBikes(btn.dataset.filter);
    };
});

function showTable() {
    let html = "";
    for (let i = 0; i < bikes.length; i++) {
        html += "<tr><td><b>" + bikes[i].name + "</b></td><td>" + bikes[i].where + "</td><td>" + bikes[i].road + "</td><td>" + bikes[i].weight + "</td><td>" + bikes[i].engine + "</td></tr>";
    }
    document.getElementById("compareTable").innerHTML = html;
}

// ---------- the manufacturers ----------
const brands = [
    { name: "KTM", country: "אוסטריה", color: "#F26B21", models: "סדרות SX למוטוקרוס ו-EXC לאנדורו" },
    { name: "Husqvarna", country: "שוודיה (היום חלק מקבוצת KTM)", color: "#1A3A6B", models: "סדרות TC/FC למוטוקרוס ו-TE/FE לאנדורו" },
    { name: "GasGas", country: "ספרד (היום חלק מקבוצת KTM)", color: "#D32F2F", models: "סדרות MC למוטוקרוס ו-EC לאנדורו" },
    { name: "Honda", country: "יפן", color: "#C62828", models: "סדרת CRF" },
    { name: "Yamaha", country: "יפן", color: "#1565C0", models: "סדרות YZ למוטוקרוס ו-WR לאנדורו" },
    { name: "Kawasaki", country: "יפן", color: "#2E9E55", models: "סדרת KX" },
    { name: "Suzuki", country: "יפן", color: "#F9A825", models: "סדרת RM-Z" },
    { name: "Beta", country: "איטליה", color: "#B71C1C", models: "סדרות RR לאנדורו ו-RX למוטוקרוס" },
    { name: "TM Racing", country: "איטליה", color: "#0277BD", models: "אופנועי מוטוקרוס ואנדורו" },
    { name: "Sherco", country: "צרפת", color: "#283593", models: "סדרות SE לאנדורו ו-ST לטריאל" },
    { name: "Stark Future", country: "ספרד", color: "#00ACC1", models: "Varg: אופנוע מוטוקרוס חשמלי" }
];

function showBrands() {
    let html = "";
    for (let i = 0; i < brands.length; i++) {
        const initials = brands[i].name.substring(0, 2).toUpperCase();
        html += "<div class=\"brand-card\"><div class=\"badge\" style=\"background:" + brands[i].color + "\">" + initials + "</div>" +
                "<div><h3>" + brands[i].name + "</h3><p>" + brands[i].country + "</p><p>" + brands[i].models + "</p></div></div>";
    }
    document.getElementById("brands").innerHTML = html;
}

// ---------- quiz: which bike suits me? ----------
const questions = [
    { q: "איפה תרצו לרכוב?", answers: [["מסלול סגור עם קפיצות", "mx"], ["שבילים ודרכי עפר, גם כמה שעות", "enduro"], ["סלעים ומכשולים", "trial"], ["מדבר ומרחקים ארוכים", "rally"]] },
    { q: "מה הניסיון שלכם?", answers: [["אף פעם לא רכבתי", "beginner"], ["רכבתי קצת", "some"], ["רוכב/ת מנוסה", "expert"]] },
    { q: "מה חשוב לכם?", answers: [["מהירות ואדרנלין", "speed"], ["שקט ושמירה על הסביבה", "quiet"], ["לרכוב גם בכביש", "road"]] }
];
const chosen = [null, null, null];

function showQuiz() {
    let html = "";
    for (let i = 0; i < questions.length; i++) {
        html += "<div class=\"quiz-q\"><p>" + (i + 1) + ". " + questions[i].q + "</p>";
        for (let a = 0; a < questions[i].answers.length; a++) {
            html += "<button class=\"btn\" data-q=\"" + i + "\" data-v=\"" + questions[i].answers[a][1] + "\">" + questions[i].answers[a][0] + "</button>";
        }
        html += "</div>";
    }
    document.getElementById("quiz").innerHTML = html;
    document.querySelectorAll("#quiz .btn").forEach(function (btn) {
        btn.onclick = function () {
            const q = Number(btn.dataset.q);
            chosen[q] = btn.dataset.v;
            document.querySelectorAll("#quiz .btn[data-q=\"" + q + "\"]").forEach(function (b) { b.classList.remove("chosen"); });
            btn.classList.add("chosen");
        };
    });
}

document.getElementById("quizBtn").onclick = function () {
    const result = document.getElementById("quizResult");
    if (chosen[0] === null || chosen[1] === null || chosen[2] === null) {
        result.style.display = "block";
        result.innerHTML = "ענו קודם על שלוש השאלות.";
        return;
    }
    let id = chosen[0];
    if (chosen[1] === "beginner") id = "pit";
    if (chosen[2] === "quiet") id = "electric";
    if (chosen[2] === "road" && (id === "mx" || id === "pit")) id = "enduro";
    const b = findBike(id);
    result.style.display = "block";
    result.innerHTML = "<b>ההמלצה שלנו: " + b.name + "</b><br>" + b.short + "<br><img src=\"" + b.img + "\" alt=\"\" style=\"width:220px\">";
};

showBikes("all");
showTable();
showBrands();
showQuiz();
