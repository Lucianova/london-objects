<img src="public/logo.png" alt="London Objects logo" width="96" />

# London Objects

A small shop website for **London Objects** — ceramics, lighting and textiles
for the home, made or found around London.

This repo is intentionally small and tidy: it exists partly as a real website
and partly as a friendly playground for learning **git**, **npm**, **semantic
versioning** and **CI pipelines**.

## Getting started

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install        # install dependencies into node_modules/
npm run dev        # start the site at http://localhost:5173
```

## Scripts

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Start a local dev server with instant reload        |
| `npm test`          | Run the unit tests once                             |
| `npm run test:watch`| Run the tests continuously while you edit           |
| `npm run typecheck` | Check the TypeScript compiles without errors        |
| `npm run build`     | Build the production site into `dist/`              |
| `npm run preview`   | Serve the built `dist/` folder locally              |

## Project structure

```
├── index.html                  The page shell Vite serves and builds
├── public/
│   ├── favicon.svg             The browser-tab icon (an arch, of course)
│   ├── logo.png                The same mark as a PNG, used in this README
│   └── products/               One little SVG illustration per product,
│                               named after the product's slug
├── src/
│   ├── main.ts                 Renders the page and wires up the filters
│   ├── styles.css              All the styling
│   ├── data/
│   │   └── products.ts         The product catalogue (edit me!)
│   └── lib/
│       ├── format.ts           Price formatting and URL slugs
│       ├── format.test.ts      ...and its unit tests
│       ├── catalogue.ts        Filtering and sorting the catalogue
│       └── catalogue.test.ts   ...and its unit tests
└── .github/
    └── workflows/
        └── ci.yml              Runs typecheck + tests + build on every PR
```

A nice first change: add a new product to `src/data/products.ts`, watch it
appear in the browser, then commit it on a branch and open a pull request.

## How the pieces fit together

- **TypeScript** — the code in `src/` is typed; `npm run typecheck` catches
  mistakes before they reach the browser.
- **Vite** — the dev server and bundler. It serves `index.html` in
  development and produces an optimised `dist/` folder for production.
- **Vitest** — the unit test runner. Test files live next to the code they
  test and end in `.test.ts`.
- **Semantic versioning** — every dependency in `package.json` has a version
  like `^7.3.1` (major.minor.patch). `package-lock.json` records the exact
  versions installed so everyone (including CI) gets the same ones.
- **GitHub Actions** — `.github/workflows/ci.yml` runs the typecheck, tests
  and build on every pull request, so a broken change never merges silently.
