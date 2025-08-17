export type CategoryKey =
  | 'scholarships'
  | 'jobs'
  | 'internships'
  | 'guidance'
  | 'research'
  | 'conferences'
  | 'volunteer';

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  scholarships: 'Scholarships',
  jobs: 'Jobs',
  internships: 'Internships',
  guidance: 'Career Guidance',
  research: 'Research',
  conferences: 'Conferences',
  volunteer: 'Volunteer',
};

// Provide default example feeds where dependable. You can replace or add your own.
// For best results, share your preferred RSS/Atom URLs per category and I'll plug them in.
export const RSS_FEEDS: Record<CategoryKey, string[]> = {
  scholarships: [
    'https://www.scholars4dev.com/feed/',
    'https://www.scholarship-positions.com/feed/',
    'https://opportunitydesk.org/category/scholarships/feed/',
    'https://www.afterschoolafrica.com/category/scholarships/feed/',
  ],
  jobs: [
    'https://weworkremotely.com/categories/remote-programming-jobs.rss',
    'https://remoteok.com/remote-jobs.rss',
    'https://remotive.com/remote-jobs/rss',
    'https://remote.co/remote-jobs/developer/feed/',
    'https://nodesk.co/remote-jobs/rss/',
  ],
  internships: [
    'https://remotive.com/remote-jobs/internships/rss',
    'https://opportunitydesk.org/category/internships/feed/',
    'https://www.opportunitiesforafricans.com/category/internships/feed/',
  ],
  guidance: [
    'https://www.askamanager.org/feed',
    'https://www.careercontessa.com/feed/',
    'https://hbr.org/feeds/section/career.rss',
    'https://www.glassdoor.com/blog/rss/',
  ],
  research: [
    'http://export.arxiv.org/rss/cs.AI',
    'http://export.arxiv.org/rss/cs.LG',
    'http://export.arxiv.org/rss/cs.CV',
    'http://export.arxiv.org/rss/cs.CL',
    'http://export.arxiv.org/rss/stat.ML',
    'https://ai.googleblog.com/feeds/posts/default',
    'https://www.nature.com/subjects/artificial-intelligence.rss',
    'https://openai.com/blog/rss',
  ],
  conferences: [
    'http://www.wikicfp.com/cfp/rss?cat=AI',
    'http://www.wikicfp.com/cfp/rss?cat=Computer%20Science',
    'http://www.wikicfp.com/cfp/rss?cat=Machine%20Learning',
    'http://www.wikicfp.com/cfp/rss?cat=Data%20Mining',
  ],
  volunteer: [
    'https://www.unv.org/rss.xml',
    'https://www.idealist.org/en/rss',
    'https://www.volunteermatch.org/search/rss?l=Remote',
  ],
};
