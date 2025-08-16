// server/index.js
const express = require("express");
const cors = require("cors");
const Parser = require("rss-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ---------- tiny in-memory cache (10 min) ----------
const cache = {};
const TTL_MS = 10 * 60 * 1000;
const remember = (key, data) => (cache[key] = { at: Date.now(), data });
const recall = (key) => {
  const hit = cache[key];
  if (!hit) return null;
  if (Date.now() - hit.at > TTL_MS) return null;
  return hit.data;
};

// ---------- helpers ----------
async function safeJsonFetch(url, options) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

function dedupeByUrl(items) {
  const seen = new Set();
  return items.filter((x) => {
    if (!x.url) return false;
    if (seen.has(x.url)) return false;
    seen.add(x.url);
    return true;
  });
}

// ---------- JOBS ROUTE ----------
app.get("/api/jobs", async (req, res) => {
  const cached = recall("jobs");
  if (cached) return res.json(cached);

  // Add/replace with companies you care about. Handles = the slug in their careers URL.
  const greenhouseCompanies = ["openai", "stripe", "notion"]; // edit safely
  const leverCompanies = ["ramp", "robinhood", "chime"];      // edit safely

  // Greenhouse
  const gh = (
    await Promise.all(
      greenhouseCompanies.map(async (c) => {
        const data = await safeJsonFetch(`https://boards-api.greenhouse.io/v1/boards/${c}/jobs`);
        const jobs = (data?.jobs || []).map((j) => ({
          id: `gh_${c}_${j.id}`,
          title: j.title,
          company: c,
          location: j.location?.name,
          url: j.absolute_url,
          source: "greenhouse",
        }));
        return jobs;
      })
    )
  ).flat();

  // Lever
  const lv = (
    await Promise.all(
      leverCompanies.map(async (c) => {
        const data = await safeJsonFetch(`https://api.lever.co/v0/postings/${c}?mode=json`);
        const jobs = (data || []).map((j) => ({
          id: `lever_${c}_${j.id}`,
          title: j.text,
          company: c,
          location: j.categories?.location,
          url: j.hostedUrl,
          source: "lever",
        }));
        return jobs;
      })
    )
  ).flat();

  // Remotive (no key)
  const rmData = await safeJsonFetch("https://remotive.com/api/remote-jobs");
  const rm = (rmData?.jobs || []).map((j) => ({
    id: `remotive_${j.id}`,
    title: j.title,
    company: j.company_name,
    location: j.candidate_required_location,
    url: j.url,
    source: "remotive",
  }));

  // USAJOBS (free key, optional)
  let us = [];
  if (process.env.USAJOBS_API_KEY) {
    const usData = await safeJsonFetch(
      "https://data.usajobs.gov/api/Search?Keyword=internship%20OR%20machine%20learning%20OR%20AI",
      {
        headers: {
          "User-Agent": "you@example.com",
          "Authorization-Key": process.env.USAJOBS_API_KEY,
        },
      }
    );
    const arr = usData?.SearchResult?.SearchResultItems || [];
    us = arr.map((x, i) => {
      const d = x.MatchedObjectDescriptor || {};
      return {
        id: `usajobs_${d.PositionID || i}`,
        title: d.PositionTitle,
        company: d.OrganizationName,
        location: (d.PositionLocation || [])[0]?.LocationName,
        url: d.PositionURI,
        source: "usajobs",
      };
    });
  }

  const combined = dedupeByUrl([...gh, ...lv, ...rm, ...us]);
  const payload = { count: combined.length, results: combined.slice(0, 300) };
  remember("jobs", payload);
  res.json(payload);
});

// ---------- SCHOLARSHIPS ROUTE (RSS first) ----------
app.get("/api/scholarships", async (req, res) => {
  const cached = recall("scholarships");
  if (cached) return res.json(cached);

  const feeds = [
    // Replace/add your trusted sources:
    "https://www.chevening.org/feed/",
    "https://www.commonwealthscholarships.gov.uk/feed/",
    "https://scholarshipscorner.website/feed/",
  ];
  const parser = new Parser();
  const out = [];

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      const org = feed?.title || "Source";
      for (const item of feed?.items || []) {
        out.push({
          id: `${url}::${item.guid || item.link}`,
          title: item.title,
          org,
          url: item.link,
          published: item.isoDate || item.pubDate,
          source: url,
        });
      }
    } catch {
      // skip broken feed
    }
  }

  const cleaned = out.filter((x) => x.url);
  const payload = { count: cleaned.length, results: cleaned.slice(0, 200) };
  remember("scholarships", payload);
  res.json(payload);
});

// ---------- EVENTS ROUTE ----------
app.get("/api/events", async (req, res) => {
  const cached = recall("events");
  if (cached) return res.json(cached);

  const results = [];

  // Eventbrite (optional key)
  if (process.env.EVENTBRITE_TOKEN) {
    try {
      const eb = await fetch(
        "https://www.eventbriteapi.com/v3/events/search/?q=AI%20machine%20learning&sort_by=date",
        { headers: { Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}` } }
      ).then((r) => r.json());
      (eb?.events || []).forEach((e) =>
        results.push({
          id: `eb_${e.id}`,
          title: e.name?.text,
          url: e.url,
          start: e.start?.utc,
          source: "eventbrite",
        })
      );
    } catch {}
  }

  // Bonus: arXiv as “events” substitute (fresh activity)
  try {
    const text = await fetch(
      "http://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&max_results=25"
    ).then((r) => r.text());
    const items = text.split("<entry>").slice(1);
    for (const raw of items) {
      const title = raw.split("<title>")[1]?.split("</title>")[0]?.trim();
      const link = raw.split('href="')[1]?.split('"')[0];
      const updated = raw.split("<updated>")[1]?.split("</updated>")[0];
      if (title && link) {
        results.push({ id: `arxiv_${link}`, title, url: link, start: updated, source: "arxiv" });
      }
    }
  } catch {}

  const payload = { count: results.length, results: results.slice(0, 200) };
  remember("events", payload);
  res.json(payload);
});

// ---------- RESEARCH ROUTE ----------
app.get("/api/research", async (req, res) => {
  const cached = recall("research");
  if (cached) return res.json(cached);

  const out = [];

  // OpenAlex (no key)
  try {
    const oa = await safeJsonFetch(
      "https://api.openalex.org/works?search=artificial%20intelligence&per-page=25&sort=publication_date:desc"
    );
    (oa?.results || []).forEach((w) =>
      out.push({
        id: `openalex_${w.id}`,
        title: w.title,
        url: w.primary_location?.source?.homepage_url || w.id,
        authors: (w?.authorships || []).map((a) => a.author?.display_name).filter(Boolean).join(", "),
        year: w.publication_year,
        source: "openalex",
      })
    );
  } catch {}

  // arXiv (no key)
  try {
    const text = await fetch(
      "http://export.arxiv.org/api/query?search_query=cat:cs.LG+OR+cat:cs.AI&sortBy=submittedDate&max_results=25"
    ).then((r) => r.text());
    const items = text.split("<entry>").slice(1);
    for (const raw of items) {
      const title = raw.split("<title>")[1]?.split("</title>")[0]?.trim();
      const link = raw.split('href="')[1]?.split('"')[0];
      const updated = raw.split("<updated>")[1]?.split("</updated>")[0];
      if (title && link) {
        out.push({ id: `arxiv_${link}`, title, url: link, year: updated?.slice(0, 4), source: "arxiv" });
      }
    }
  } catch {}

  const payload = { count: out.length, results: out.slice(0, 200) };
  remember("research", payload);
  res.json(payload);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
