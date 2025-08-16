const { remember, recall, safeJsonFetch } = require("./_lib");

module.exports = async (req, res) => {
  const cached = recall("research");
  if (cached) return res.status(200).json(cached);

  const out = [];

  // OpenAlex (no key)
  try {
    const oa = await safeJsonFetch(
      "https://api.openalex.org/works?search=artificial%20intelligence&per-page=25&sort=publication_date:desc"
    );
    (oa?.results || []).forEach(w =>
      out.push({
        id: `openalex_${w.id}`,
        title: w.title,
        url: w.primary_location?.source?.homepage_url || w.id,
        authors: (w?.authorships || []).map(a => a.author?.display_name).filter(Boolean).join(", "),
        year: w.publication_year,
        source: "openalex",
      })
    );
  } catch {}

  // arXiv
  try {
    const text = await fetch(
      "http://export.arxiv.org/api/query?search_query=cat:cs.LG+OR+cat:cs.AI&sortBy=submittedDate&max_results=25"
    ).then(r => r.text());
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
  res.status(200).json(payload);
};

