import { useEffect, useState } from "react";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data.results || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Live Job Listings</h2>
      {jobs.map(job => (
        <div key={job.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{job.title}</h3>
          <p>{job.company} — {job.location || "Remote"}</p>
          <a href={job.url} target="_blank">View Job</a>
          <p style={{ fontSize: "12px", color: "gray" }}>Source: {job.source}</p>
        </div>
      ))}
    </div>
  );
}
