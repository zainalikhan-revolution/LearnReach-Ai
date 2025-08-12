import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RSS_FEEDS, type CategoryKey } from '@/data/rssFeeds';
import { fetchCategoryFeeds, timeAgo, type RSSItem } from '@/lib/rss';

export type RSSCategoryFeedProps = {
  category: CategoryKey;
};

export const RSSCategoryFeed = ({ category }: RSSCategoryFeedProps) => {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    const urls = RSS_FEEDS[category] || [];

    if (urls.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }

    fetchCategoryFeeds(urls)
      .then((res) => {
        if (!active) return;
        setItems(res);
      })
      .catch((e) => {
        if (!active) return;
        setError('Failed to load feeds');
        console.error(e);
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [category]);

  return (
    <section aria-live="polite" className="mt-6">
      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card-3d animate-pulse rounded-xl border border-border bg-card p-6 h-40" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-muted-foreground">
          Could not load feeds. You can provide your preferred RSS links for better results.
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="text-center text-muted-foreground">
          No feeds configured yet for this category.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              aria-label={`Open ${item.title}`}
            >
              <Card className="card-3d hover:shadow-float transition-all duration-300 hover-scale h-full">
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:underline">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {item.source && <Badge variant="secondary">{item.source}</Badge>}
                    <span>{timeAgo(item.pubDate)}</span>
                  </div>
                  {item.description && (
                    <p className="mt-3 text-muted-foreground line-clamp-3">
                      {item.description.replace(/<[^>]+>/g, '')}
                    </p>
                  )}
                  <div className="mt-4">
                    <Button size="sm" className="btn-hero">Read more</Button>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default RSSCategoryFeed;
