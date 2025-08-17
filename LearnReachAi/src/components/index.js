import { useEffect, useState } from "react";

export default function JobList() {
  const [jobs, setJobs] = useState("Loading jobs...");

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("/api/rss"); // calls your API route
        const xmlText = await res.text();
        setJobs(xmlText); // set XML text for now (later we can parse it)
      } catch (err) {
        setJobs("Failed to load jobs");
      }
    }
    loadJobs();
  }, []);

  return (
    <div>
      <h2>Jobs Feed</h2>
      <pre>{jobs}</pre>
    </div>
  );
}
