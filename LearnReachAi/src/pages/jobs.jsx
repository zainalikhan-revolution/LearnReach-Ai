import { useState } from "react";

export default function JobsPage() {
  const [q, setQ] = useState("developer");
  const [location, setLocation] = useState("Lahore");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  async function search(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const r = await fetch(`/api/jobs?q=${encodeURIComponent(q)}&location=${encodeURIComponent(location)}`);
      const data = await r.json();
      if (!r.ok) throw new Error(data?.detail || data?.error || "Request failed");
      setResults(data?.data || []);
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>Find Jobs (Live from JSearch)</h1>

      <form onSubmit={search} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Job title"
          style={{ flex: 2, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
          required
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          style={{ flex: 2, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
          required
        />
        <button
          type="submit"
          style={{ padding: "10px 16px", borderRadius: 8, border: 0, cursor: "pointer" }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div style={{ background: "#fee", border: "1px solid #f99", padding: 12, borderRadius: 8 }}>{error}</div>}

      {!loading && results.length === 0 && !error && (
        <div style={{ opacity: 0.7 }}>No results yet. Try searching!</div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {results.map((job) => (
          <div key={job.job_id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 700 }}>{job.job_title}</div>
            <div>
              {job.employer_name} • {job.job_city || ""} {job.job_state || ""} {job.job_country || ""}
            </div>
            <div style={{ fontSize: 14 }}>
              {(job.job_description || "").slice(0, 220)}...
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
              {job.job_apply_link && (
                <a href={job.job_apply_link} target="_blank" rel="noreferrer"
                   style={{ padding: "8px 12px", borderRadius: 8, background: "#efefef", textDecoration: "none" }}>
                  Apply
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
