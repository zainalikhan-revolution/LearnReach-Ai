const { remember, recall } = require("./_lib");

module.exports = async (req, res) => {
  const cached = recall("events");
  if (cached) return res.status(200).json(cached);

  const results = [];

  // Eventbrite (optional key)
  if (process.env.EVENTBRITE_TOKEN) {
    try {
      const eb = await fetch(
        "https://www.eventbriteapi.com/v3/events/search/?q=AI%20machine%20learning&sort_by=date",
        { headers: { Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}` } }
      ).then(r => r.json());
      (eb?.events || []).forEach(e =>
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

  // arXiv (as “activity”)
  try {
    const text = await fetch(
      "http://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&max_results=25"
    ).then(r => r.text());
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
  res.status(200).json(payload);
};

