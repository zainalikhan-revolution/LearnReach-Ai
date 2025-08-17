// Common helpers for all functions (Node on Vercel)
const Parser = require("rss-parser"); // used by scholarships only

// simple in-function cache (persists briefly on warm lambdas)
const cache = {};
const TTL_MS = 10 * 60 * 1000;
function remember(key, data) { cache[key] = { at: Date.now(), data }; }
function recall(key) {
  const hit = cache[key];
  if (!hit) return null;
  if (Date.now() - hit.at > TTL_MS) return null;
  return hit.data;
}

async function safeJsonFetch(url, options) {
  try {
    const r = await fetch(url, options);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } catch {
    return null;
  }
}

function dedupeByUrl(items) {
  const seen = new Set();
  return items.filter(x => {
    if (!x.url) return false;
    if (seen.has(x.url)) return false;
    seen.add(x.url);
    return true;
  });
}

module.exports = { Parser, remember, recall, safeJsonFetch, dedupeByUrl, TTL_MS };

