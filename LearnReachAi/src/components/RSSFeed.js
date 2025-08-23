import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink } from 'lucide-react';

const RSSFeedSection = ({ category = 'scholarships' }) => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching RSS feeds for: ${category}`);
        
        const response = await fetch(`/api/rss?category=${category}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          // Add timeout
          signal: AbortSignal.timeout(15000) // 15 second timeout
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('RSS API Response:', data);
        
        if (data.success && Array.isArray(data.feeds)) {
          setFeeds(data.feeds);
        } else {
          throw new Error('Invalid RSS response format');
        }
        
      } catch (err) {
        console.error('RSS Error:', err);
        setError(err.message);
        
        // Set fallback data
        setFeeds([
          {
            title: 'RSS feeds are being updated...',
            link: '#',
            contentSnippet: 'Please check back in a few minutes.',
            source: 'System',
            pubDate: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
  }, [category]);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Recent';
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600">Loading {category} feeds...</span>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            RSS feeds are temporarily unavailable. Showing cached content.
          </p>
        </div>
      )}
      
      {feeds.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No {category} feeds available at the moment.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Refresh page
          </button>
        </div>
      ) : (
        feeds.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
            <h3 className="font-semibold text-gray-900 mb-2 leading-tight">
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                {item.title}
              </a>
            </h3>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
              <span className="font-medium">{item.source}</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{formatDate(item.pubDate)}</span>
              </div>
            </div>
            
            {item.contentSnippet && (
              <p className="text-gray-700 text-sm mb-3">
                {truncateText(item.contentSnippet)}
              </p>
            )}
            
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <span>Read more</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default RSSFeedSection;
