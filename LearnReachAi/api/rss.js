import Parser from "rss-parser";

const parser = new Parser();

export default async function handler(req, res) {
  try {
    // Replace this with your RSS feed URL
    const feed = await parser.parseURL("https://rss.app/feeds/JnGKkB5yUhuHEvgV.xml");

    // Format results
    const items = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      date: item.pubDate,
      description: item.contentSnippet || item.content,
    }));

    res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
}
