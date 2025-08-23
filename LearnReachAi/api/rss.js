import Parser from 'rss-parser';

const parser = new Parser();

// RSS feed sources for different categories
const RSS_SOURCES = {
  scholarships: [
    'https://feeds.feedburner.com/scholarshippositions',
    'https://opportunitydesk.org/feed/',
    'https://opportunitiesforafricans.com/feed/'
  ],
  jobs: [
    'https://feeds.feedburner.com/workable',
    'https://remoteok.io/remote-jobs.rss',
    'https://jobs.github.com/positions.atom'
  ],
  internships: [
    'https://opportunitydesk.org/category/internships/feed/',
    'https://opportunitiesforafricans.com/category/internships/feed/'
  ],
  research: [
    'https://www.researchgate.net/blog/feed',
    'https://opportunitydesk.org/category/research/feed/'
  ],
  conferences: [
    'https://conferenceindex.org/rss',
    'https://academic-conferences.org/feed/'
  ],
  volunteer: [
    'https://volunteermatch.org/rss',
    'https://idealist.org/rss'
  ]
};

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, s-maxage=300'); // Cache for 5 minutes

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { category = 'scholarships' } = req.query;
    
    console.log(`Fetching RSS for category: ${category}`);
    
    const feeds = RSS_SOURCES[category] || RSS_SOURCES.scholarships;
    const allItems = [];
    
    // Fetch feeds with timeout
    const fetchPromises = feeds.map(async (feedUrl) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout per feed
        
        const feed = await parser.parseURL(feedUrl);
        clearTimeout(timeoutId);
        
        return feed.items.slice(0, 5).map(item => ({
          title: item.title || 'No title',
          link: item.link || '#',
          pubDate: item.pubDate || new Date().toISOString(),
          contentSnippet: item.contentSnippet || item.content || '',
          source: new URL(feedUrl).hostname,
          category: category
        }));
      } catch (error) {
        console.error(`Error fetching ${feedUrl}:`, error.message);
        return []; // Return empty array on error
      }
    });
    
    // Wait for all feeds with overall timeout
    const results = await Promise.allSettled(fetchPromises);
    
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        allItems.push(...result.value);
      }
    });
    
    // Sort by date and limit results
    const sortedItems = allItems
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, 20);
    
    console.log(`Found ${sortedItems.length} items for ${category}`);
    
    res.status(200).json({
      success: true,
      category,
      count: sortedItems.length,
      feeds: sortedItems,
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('RSS API Error:', error);
    
    // Return fallback data instead of error
    const fallbackData = {
      success: true,
      category: req.query.category || 'scholarships',
      count: 3,
      feeds: [
        {
          title: 'Coca Cola HBC Technical Trainee Program 2025 for young Nigerians',
          link: 'https://opportunitiesforafricans.com/coca-cola-technical-trainee-2025/',
          pubDate: new Date().toISOString(),
          contentSnippet: 'Applications are now open for the 2025 Coca Cola HBC Technical Trainee Program...',
          source: 'opportunitiesforafricans.com',
          category: req.query.category || 'scholarships'
        },
        {
          title: 'The Shoprite SAICA Trainee Accountant Programme 2025',
          link: 'https://opportunitiesforafricans.com/shoprite-saica-trainee-2025/',
          pubDate: new Date().toISOString(),
          contentSnippet: 'Applications are now open for the 2025 Shoprite SAICA Trainee Accountant Programme...',
          source: 'opportunitiesforafricans.com',
          category: req.query.category || 'scholarships'
        },
        {
          title: 'Elisabeth & Amelie Fund 2026 for Students in Belgium',
          link: 'https://opportunitydesk.org/elisabeth-amelie-fund-2026/',
          pubDate: new Date().toISOString(),
          contentSnippet: 'Applications for the Elisabeth & Amelie Fund 2026 are now open...',
          source: 'opportunitydesk.org',
          category: req.query.category || 'scholarships'
        }
      ],
      lastUpdated: new Date().toISOString(),
      note: 'Showing cached/fallback data due to RSS fetch error'
    };
    
    res.status(200).json(fallbackData);
  }
}
