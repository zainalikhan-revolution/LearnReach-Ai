// api/jobs.js
export default async function handler(req, res) {
  try {
    const response = await fetch("https://remotive.com/api/remote-jobs");
    const data = await response.json();

    // Map into smaller format
    const jobs = (data.jobs || []).map(job => ({
      id: job.id,
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location,
      url: job.url,
      source: "Remotive"
    }));

    res.status(200).json({ results: jobs });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
}
