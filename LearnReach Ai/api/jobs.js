const { remember, recall, safeJsonFetch, dedupeByUrl } = require("./_lib");

// Vercel style default export
module.exports = async (req, res) => {
  const cached = recall("jobs");
  if (cached) return res.status(200).json(cached);

  const greenhouseCompanies = ["openai", "stripe", "notion"];  // edit these
  const leverCompanies = ["ramp", "robinhood", "chime"];       // edit these

  // Greenhouse
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

  // Lever
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

  // Remotive (no key)
  const rmData = await safeJsonFetch("https://remotive.com/api/remote-jobs");
  const rm = (rmData?.jobs || []).map(j => ({
    id: `remotive_${j.id}`,
    title: j.title,
    company: j.company_name,
    location: j.candidate_required_location,
    url: j.url,
    source: "remotive",
  }));

  // USAJOBS (optional free key)
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

  const results = dedupeByUrl([...gh, ...lv, ...rm, ...us]).slice(0, 300);
  const payload = { count: results.length, results };
  remember("jobs", payload);
  res.status(200).json(payload);
};

