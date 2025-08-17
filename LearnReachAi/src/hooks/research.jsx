import { useApi } from "../hooks/useApi";

export default function ResearchPage() {
  const { results, loading, error } = useApi("/api/research");
  if (loading) return <div className="p-6">Loading research…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest AI Research</h1>
      <div className="space-y-3">
        {results.map(p => (
          <a key={p.id} href={p.url} target="_blank" rel="noreferrer"
             className="block p-4 bg-white rounded-2xl shadow hover:shadow-md transition">
            <div className="font-semibold">{p.title}</div>
            {p.authors && <div className="text-sm text-gray-600">{p.authors}</div>}
            <div className="text-xs opacity-70">{p.year || ""} • {p.source}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
