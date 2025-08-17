const { remember, recall, safeJsonFetch, dedupeByUrl } = require("./_lib");

module.exports = async (req, res) => {
  const cached = recall("jobs");
  if (cached) return res.status(200).json(cached);

  const greenhouseCompanies = ["openai", "stripe", "notion"];
  const leverCompanies = ["ramp", "robinhood", "chime"];

  const gh = (await Promise.all(
    greenhouseCompanies.map(async c => {
      const data = await safeJsonFetch(`https://boards-api.greenhouse.io/v1/boards/${c}/jobs`);
      return (data?.jobs || []).map(j => ({
        id: `gh_${c}_${j.id}`,
        title: j.title,
        company: c,
        location: j.location?.name,
        url: j.absolute_url,
        source: "greenhouse",
      }));
    })
  )).flat();

  const lv = (await Promise.all(
    leverCompanies.map(async c => {
      const data = await safeJsonFetch(`https://api.lever.co/v0/postings/${c}?mode=json`);
      return (data || []).map(j => ({
        id: `lever_${c}_${j.id}`,
        title: j.text,
        company: c,
        location: j.categories?.location,
        url: j.hostedUrl,
        source: "lever",
      }));
    })
  )).flat();

  const rmData = await safeJsonFetch("https://remotive.com/api/remote-jobs");
  const rm = (rmData?.jobs || []).map(j => ({
    id: `remotive_${j.id}`,
    title: j.title,
    company: j.company_name,
    location: j.candidate_required_location,
    url: j.url,
    source: "remotive",
  }));

  const results = dedupeByUrl([...gh, ...lv, ...rm]).slice(0, 300);
  const payload = { count: results.length, results };
  remember("jobs", payload);
  res.status(200).json(payload);
};



