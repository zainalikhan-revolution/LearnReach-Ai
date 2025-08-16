const { Parser, remember, recall } = require("./_lib");

module.exports = async (req, res) => {
  const cached = recall("scholarships");
  if (cached) return res.status(200).json(cached);

  const feeds = [
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
    } catch {}
  }

  const results = out.filter(x => x.url).slice(0, 200);
  const payload = { count: results.length, results };
  remember("scholarships", payload);
  res.status(200).json(payload);
};

