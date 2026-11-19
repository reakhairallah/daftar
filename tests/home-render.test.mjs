import { before, after, test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { homeReviews, seedUsers } from "../src/data/mockData.js";

let server;
let Home;
let Layout;
let AppProvider;

before(async () => {
  server = await createServer({
    root: path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
    configFile: false,
    plugins: [react()],
    logLevel: "error",
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  Home = (await server.ssrLoadModule("/src/home/Home.jsx")).default;
  Layout = (await server.ssrLoadModule("/src/components/Layout.jsx")).default;
  AppProvider = (await server.ssrLoadModule("/src/state/AppProvider.jsx")).default;
});

after(async () => { await server?.close(); });

function render(Component, url = "/", providerProps = {}) {
  return renderToStaticMarkup(
    createElement(MemoryRouter, { initialEntries: [url] },
      createElement(AppProvider, providerProps, createElement(Component))
    )
  );
}

test("Home renders populated cards in the correct order", () => {
  const html = render(Home);
  assert.match(html, /38 reviews/);
  assert.match(html, /4\.2/);
  const positions = ["CSC443", "CSC375", "CSC310"].map((code) => html.indexOf(`href="/courses/${code}"`));
  assert.ok(positions[0] >= 0 && positions[0] < positions[1] && positions[1] < positions[2]);
});

test("the shared provider's review array determines Home's numbers", () => {
  const edited = homeReviews.map((review, index) => index === 0 ? { ...review, rating: 1 } : review);
  const deleted = homeReviews.filter((review) => review.id !== homeReviews[0].id);
  assert.match(render(Home, "/", { initialReviews: edited }), /4\.1/);
  assert.match(render(Home, "/", { initialReviews: deleted }), /37 reviews/);
});

test("all simulated data states render and preserve the static introduction", () => {
  const loading = render(Home, "/?state=loading");
  const empty = render(Home, "/?state=empty");
  const error = render(Home, "/?state=error&keep=example");
  assert.equal((loading.match(/role="status"/g) ?? []).length, 2);
  assert.match(empty, /Nobody has reviewed CSC443 yet/);
  assert.match(empty, /No reviewed courses this term/);
  assert.equal((error.match(/role="alert"/g) ?? []).length, 2);
  assert.match(error, /Try again/);
  for (const html of [loading, empty, error]) {
    assert.match(html, /Nobody should/);
    assert.match(html, /One review each/);
    assert.doesNotMatch(html, /38 reviews/);
  }
});

test("genuinely empty shared reviews also render an empty state", () => {
  const html = render(Home, "/", { initialReviews: [] });
  assert.match(html, /No reviewed courses this term/);
  assert.doesNotMatch(html, /NaN|Infinity|href="\/courses\/CSC443"/);
});

test("the header uses shared identity and supports signed-out visitors", () => {
  const owner = render(Layout);
  const other = render(Layout, "/", { initialUser: seedUsers[1] });
  const guest = render(Layout, "/", { initialUser: null });
  assert.match(owner, /signed in as Rea Khairallah/);
  assert.match(owner, />RK<\/a>/);
  assert.match(other, new RegExp(`signed in as ${seedUsers[1].fullName}`));
  assert.match(guest, /href="\/signin"/);
  assert.doesNotMatch(guest, /signed in as|href="\/me\/reviews"/);
});
