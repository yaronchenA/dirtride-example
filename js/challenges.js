// =========================================================
// challenges.js: the interactive parts of the page "אתגר, כיף ותחרויות"
// =========================================================

// ---------- 1. protective gear checklist ----------
const gear = [
    { id: "helmet", name: "קסדת שטח", icon: "images/icon_helmet.svg" },
    { id: "goggles", name: "משקפי מגן", icon: "images/icon_goggles.svg" },
    { id: "chest", name: "מגן חזה וגב", icon: "images/icon_chest.svg" },
    { id: "gloves", name: "כפפות", icon: "images/icon_gloves.svg" },
    { id: "knee", name: "מגני ברכיים", icon: "images/icon_knee.svg" },
    { id: "boots", name: "מגפי רכיבה", icon: "images/icon_boots.svg" }
];

function showGear() {
    let html = "";
    for (let i = 0; i < gear.length; i++) {
        html += "<div><input type=\"checkbox\" id=\"g_" + gear[i].id + "\">" +
                "<label for=\"g_" + gear[i].id + "\"><img src=\"" + gear[i].icon + "\" alt=\"\"><br>" + gear[i].name + "</label></div>";
    }
    document.getElementById("gearList").innerHTML = html;
    for (let i = 0; i < gear.length; i++) {
        document.getElementById("g_" + gear[i].id).onchange = updateGear;
    }
    updateGear();
}

function updateGear() {
    let checked = 0;
    for (let i = 0; i < gear.length; i++) {
        if (document.getElementById("g_" + gear[i].id).checked) checked++;
    }
    document.getElementById("gearBar").style.width = (checked * 100 / gear.length) + "%";
    const msg = document.getElementById("gearMessage");
    if (checked === gear.length) {
        msg.textContent = "מוכנים לרכיבה! שיהיה בכיף ובזהירות.";
        msg.style.color = "#2E9E55";
    } else {
        msg.textContent = "חסרים עוד " + (gear.length - checked) + " פריטים. בלי ציוד מלא לא רוכבים.";
        msg.style.color = "#C2410C";
    }
}

// ---------- 2. competitions (tabs: Israel / world) ----------
const contests = {
    israel: [
        { name: "אליפות ישראל במוטוקרוס", img: "images/comp_israel.svg",
          text: "עונה של כמה מרוצים במסלולים סגורים ברחבי הארץ. הרוכבים מתחרים בקטגוריות לפי גיל ונפח מנוע, ונאספות נקודות לאורך כל העונה." },
        { name: "אליפות ישראל באנדורו", img: "images/scene_forest.svg",
          text: "מרוצים ארוכים בשטח פתוח: קטעי ניווט בדרכי עפר וקטעים מדודים על זמן. כאן הסיבולת חשובה לא פחות מהמהירות." },
        { name: "מרוצי ילדים ונוער", img: "images/comp_mxgp.svg",
          text: "רוכבים צעירים מתחילים על אופנועים קטנים (כמו 50 ו-65 סמ\"ק) ומתקדמים בהדרגה. הרבה מהרוכבים המובילים התחילו כילדים." }
    ],
    world: [
        { name: "אליפות העולם במוטוקרוס (MXGP)", img: "images/comp_mxgp.svg",
          text: "סדרת המוטוקרוס החשובה בעולם. מתקיימת מאז 1957, בעשרות מרוצים במדינות שונות בכל עונה." },
        { name: "סופרקרוס אמריקאי (AMA Supercross)", img: "images/comp_supercross.svg",
          text: "מרוצים באצטדיונים בארצות הברית, על מסלולים מלאכותיים צפופים עם קפיצות גבוהות. מתקיים מאז 1974." },
        { name: "ראלי דקאר", img: "images/comp_rally.svg",
          text: "מרוץ הראלי הקשה בעולם: כשבועיים של רכיבה וניווט במדבר. התחיל ב-1978 מפריז לדקאר, ומאז 2020 נערך בערב הסעודית." },
        { name: "ארצברג רודאו (Erzbergrodeo)", img: "images/comp_mountain.svg",
          text: "מרוץ \"אנדורו קיצוני\" על הר של מכרה ברזל באוסטריה. רק מעטים מצליחים לסיים אותו. מתקיים מאז 1995." },
        { name: "ששת הימים הבינלאומיים (ISDE)", img: "images/scene_forest.svg",
          text: "תחרות האנדורו הוותיקה בעולם, מאז 1913. נבחרות של מדינות מתחרות במשך שישה ימים רצופים." },
        { name: "אליפות העולם בטריאל", img: "images/comp_trial.svg",
          text: "לא מהירות, אלא שליטה: עוברים על סלעים ומכשולים בלי לגעת ברגל בקרקע. מתקיימת כאליפות עולם מאז 1975." }
    ]
};

function showContests(tab) {
    const list = contests[tab];
    let html = "";
    for (let i = 0; i < list.length; i++) {
        html += "<div class=\"card\"><img class=\"zoom\" src=\"" + list[i].img + "\" alt=\"\"><h3>" + list[i].name + "</h3><p>" + list[i].text + "</p></div>";
    }
    document.getElementById("contests").innerHTML = html;
    // the pictures we just added can also be enlarged
    const box = document.getElementById("lightbox");
    document.querySelectorAll("#contests img.zoom").forEach(function (img) {
        img.onclick = function () { box.querySelector("img").src = img.src; box.classList.add("show"); };
    });
}

document.querySelectorAll(".tab").forEach(function (btn) {
    btn.onclick = function () {
        document.querySelectorAll(".tab").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        showContests(btn.dataset.tab);
    };
});

// ---------- 3. timeline of the big competitions (sorted by year) ----------
const firstYears = [
    { year: 1913, name: "ששת הימים הבינלאומיים באנדורו (ISDE)" },
    { year: 1947, name: "מוטוקרוס האומות, \"האולימפיאדה\" של המוטוקרוס (Motocross of Nations)" },
    { year: 1957, name: "אליפות העולם במוטוקרוס (היום MXGP)" },
    { year: 1974, name: "סופרקרוס בארצות הברית (AMA Supercross)" },
    { year: 1975, name: "אליפות העולם בטריאל" },
    { year: 1978, name: "ראלי פריז-דקאר הראשון" },
    { year: 1995, name: "ארצברג רודאו באוסטריה (Erzbergrodeo)" },
    { year: 2004, name: "רד בול רומניאקס ברומניה (Red Bull Romaniacs)" }
];

function showTimeline() {
    let html = "";
    for (let i = 0; i < firstYears.length; i++) {
        html += "<div class=\"event\"><span class=\"year\">" + firstYears[i].year + "</span><span>" + firstYears[i].name + "</span></div>";
    }
    document.getElementById("timeline").innerHTML = html;
}

showGear();
showContests("israel");
showTimeline();
