// /api/internships.js
const { recall, remember, safeJsonFetch, dedupeByUrl } = require("./lib");

export default async function handler(req, res) {
  const cached = recall("internships");
  if (cached) return res.json(cached);

  // Example: GitHub, Google, Microsoft internships (replace slugs as needed)
  const companies = ["github", "google", "microsoft"];
  const results = [];

  for (const c of companies) {
    try {
      const data = await safeJsonFetch(`https://boards-api.greenhouse.io/v1/boards/${c}/jobs`);
      (data?.jobs || [])
        .filter((j) => j.title.toLowerCase().includes("intern"))
        .forEach((j) =>
          results.push({
            id: `gh_${c}_${j.id}`,
            title: j.title,
            company: c,
            location: j.location?.name,
            url: j.absolute_url,
            source: "greenhouse",
          })
        );
    } catch {}
  }

  const payload = { count: results.length, results: dedupeByUrl(results).slice(0, 200) };
  remember("internships", payload);
  res.json(payload);
}

