export type RSSItem = {
  id: string;
  title: string;
  link: string;
  pubDate?: string;
  isoDate?: string;
  author?: string;
  source?: string; // hostname
  description?: string;
  image?: string;
};

// CORS-friendly proxy for public RSS (no API keys). Replace with Supabase Edge Function later if desired.
const proxyFetch = async (url: string): Promise<string> => {
  const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const res = await fetch(proxied);
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
  return res.text();
};

const textContent = (parent: Element | null, tag: string) =>
  parent?.getElementsByTagName(tag)?.[0]?.textContent?.trim() || undefined;

const attr = (el: Element | null, tag: string, attrName: string) =>
  el?.getElementsByTagName(tag)?.[0]?.getAttribute(attrName) || undefined;

const pickImage = (item: Element): string | undefined => {
  // enclosure url
  const enclosureUrl = item.getElementsByTagName('enclosure')?.[0]?.getAttribute('url');
  if (enclosureUrl) return enclosureUrl;
  // media:content url
  const media = item.getElementsByTagName('media:content')?.[0]?.getAttribute('url');
  if (media) return media;
  // description <img src>
  const desc = textContent(item, 'description') || textContent(item, 'content:encoded');
  if (desc) {
    const match = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match) return match[1];
  }
  return undefined;
};

const normalizeItem = (node: Element): RSSItem => {
  const title = textContent(node, 'title') || 'Untitled';
  const link = textContent(node, 'link') || '#';
  const pubDate = textContent(node, 'pubDate') || textContent(node, 'updated');
  const author = textContent(node, 'author') || textContent(node, 'dc:creator');
  const description = textContent(node, 'description') || textContent(node, 'content:encoded');
  const image = pickImage(node);
  let source: string | undefined;
  try {
    source = link && link !== '#' ? new URL(link).hostname.replace('www.', '') : undefined;
  } catch {}
  return {
    id: `${link}-${pubDate || title}`,
    title,
    link,
    pubDate: pubDate,
    author,
    source,
    description,
    image,
  };
};

export async function fetchAndParseRSS(url: string): Promise<RSSItem[]> {
  const xml = await proxyFetch(url);
  const doc = new DOMParser().parseFromString(xml, 'text/xml');

  // Handle both RSS (<item>) and Atom (<entry>)
  const items = Array.from(doc.getElementsByTagName('item'));
  if (items.length > 0) return items.map(normalizeItem);

  const entries = Array.from(doc.getElementsByTagName('entry'));
  if (entries.length > 0) {
    return entries.map((entry) => {
      const title = textContent(entry, 'title') || 'Untitled';
      const link = (entry.getElementsByTagName('link')?.[0]?.getAttribute('href') || '#').trim();
      const updated = textContent(entry, 'updated') || textContent(entry, 'published');
      const author = textContent(entry, 'author') || undefined;
      const summary = textContent(entry, 'summary') || textContent(entry, 'content');
      let source: string | undefined;
      try {
        source = link && link !== '#' ? new URL(link).hostname.replace('www.', '') : undefined;
      } catch {}
      return {
        id: `${link}-${updated || title}`,
        title,
        link,
        pubDate: updated,
        author,
        source,
        description: summary,
      } as RSSItem;
    });
  }

  return [];
}

export async function fetchCategoryFeeds(urls: string[], limit = 24): Promise<RSSItem[]> {
  const results = await Promise.allSettled(urls.map((u) => fetchAndParseRSS(u)));
  const items = results
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
    .filter((x) => x && x.link)
    .sort((a, b) => {
      const d1 = new Date(a.pubDate || a.isoDate || 0).getTime();
      const d2 = new Date(b.pubDate || b.isoDate || 0).getTime();
      return d2 - d1;
    });
  return items.slice(0, limit);
}

export function timeAgo(dateStr?: string) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const sec = Math.floor(diff / 1000);
  const m = Math.floor(sec / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  if (m > 0) return `${m}m ago`;
  return `${sec}s ago`;
}
