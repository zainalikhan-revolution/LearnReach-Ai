import { useApi } from "../hooks/useApi";

export default function JobsPage() {
  const { results, loading, error } = useApi("/api/jobs");
  if (loading) return <div className="p-6">Loading jobs…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Live Jobs</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {results.map(job => (
          <a key={job.id} href={job.url} target="_blank" rel="noreferrer"
             className="block p-4 bg-white rounded-2xl shadow hover:shadow-md transition">
            <div className="text-lg font-semibold">{job.title}</div>
            <div className="text-sm text-gray-600">{job.company} • {job.location || "Location N/A"}</div>
            <div className="mt-1 text-xs opacity-70">Source: {job.source}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
