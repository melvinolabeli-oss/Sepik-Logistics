# Sepik Logistics

A multi-page website for a freight and passenger transport service in the Sepik region of Papua
New Guinea. Built for **IS229 Web Design, Assessment 4** (BBIT 2026).

- **Live site:** https://melvinolabeli-oss.github.io/Sepik-Logistics/
- **Repository:** https://github.com/melvinolabeli-oss/Sepik-Logistics

## The problem

People and businesses in the Sepik region find it hard to learn what transport is available, how
long it takes and what it costs. Sepik Logistics shows services and routes in one place, gives a
quick cost estimate and lets visitors request a quote.

## Target audience

Villagers and families, small businesses and trade stores, NGOs and church groups, schools and
health centres.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home: overview and calls to action |
| `services.html` | Four transport modes and an FAQ accordion |
| `routes.html` | Searchable, filterable route list loaded from JSON |
| `estimator.html` | Freight cost calculator |
| `quote.html` | Accessible quote request form |
| `about.html` | Mission, audience and team |
| `contact.html` | Contact details, hours and sketch map |

## Features

- Semantic HTML5, one `h1` per page, skip link, labelled form fields and ARIA where needed
- CSS design system with variables, Flexbox, Grid, mobile-first responsive layout and visible
  focus styles
- JavaScript (vanilla): responsive menu, FAQ accordion, route search and filter using `fetch()`
  on `data/routes.json`, cost estimator, quote form validation, form draft saved in
  `localStorage`

## Folder structure

```
Sepik-Logistics/
  index.html, services.html, routes.html, estimator.html,
  quote.html, about.html, contact.html
  css/styles.css
  js/main.js, routes.js, estimator.js, quote.js
  data/routes.json
  images/            (photos, drawings and wave.svg)
    services/        (pictures for the four service cards)
  docs/              (project PDF, testing report, screenshots)
```

## Run locally

`fetch()` does not work when you open a file directly. Use the **Live Server** extension in VS
Code (right-click `index.html`, Open with Live Server), or run `python -m http.server` in the
project folder and visit http://localhost:8000.

## Technologies

HTML5, CSS3, vanilla JavaScript, Git and GitHub, GitHub Pages. No frameworks, templates or
website builders.

## Team and roles

| Member | Role |
|---|---|
| Mel | Team lead, Git, deployment |
| Anthon | CSS and images |
| Brandon | HTML content pages |
| Moyo | JavaScript, routes page, route data |
| Danda | Quote form, estimator |
| Yapa | Documentation and testing |

## Image credits

**Fill this in before submitting.** For each photo, write where it came from and who owns it.

| File | Where it came from | Owner or photographer |
|---|---|---|
| `images/hero-logistics.jpg` | (add the website or source) | (add) |
| `images/coast.jpg` | (add the website or source) | (add) |
| `images/services/road.jpg` | (add the website or source) | (add) |
| `images/services/sea.jpg` | (add the website or source) | (add) |
| `images/services/air.jpg` | (add the website or source) | (add) |
| `images/services/river.svg` | Drawn by the team with AI help | Team |
| `images/wave.svg` | Drawn by the team with AI help | Team |

The coast photo is a tropical beach and is used only as a decorative banner. It does not show the
Sepik River.

## Known limitations

- The quote form checks input but does not send it anywhere (there is no backend).
- Route distances, journey times and estimator rates are illustrative, not real prices.
- Contact details are placeholders.

## AI use

The team used an AI assistant (Claude) for parts of the code and planning. Each member's details
are in the AI Use Declaration in the `docs/` folder.
