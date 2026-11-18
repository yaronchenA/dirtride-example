# DirtRide IL

An example website for the mid-term project in web programming (Ramon High School).
It is built like an ASP.NET Web Forms site with a master page and three content pages,
but in plain HTML, CSS and JavaScript:

- `js/master.js` builds the shared header, menu and footer for every page (like `Site.Master`).
- Each page fills only its own `<main id="MainContent">` (like a ContentPlaceHolder).
- The "study mode" button at the bottom of each page shows which part is the master and which is the page content.

Pages: `index.html` (home), `challenges.html`, `bikes.html`, `tracks.html`. All the pictures are original SVG illustrations.
