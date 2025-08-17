import { useApi } from "../hooks/useApi";

export default function ScholarshipsPage() {
  const { results, loading, error } = useApi("/api/scholarships");
  if (loading) return <div className="p-6">Loading scholarships…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Scholarships</h1>
      <div className="space-y-3">
        {results.map(item => (
          <a key={item.id} href={item.url} target="_blank" rel="noreferrer"
             className="block p-4 bg-white rounded-2xl shadow hover:shadow-md transition">
            <div className="font-semibold">{item.title}</div>
            <div className="text-sm text-gray-600">{item.org}</div>
            <div className="text-xs opacity-70">{item.published?.slice(0,10)}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
