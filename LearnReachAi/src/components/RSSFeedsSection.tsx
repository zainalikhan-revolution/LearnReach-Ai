import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RSSCategoryFeed from '@/components/RSSCategoryFeed';
import { CATEGORY_LABELS, type CategoryKey } from '@/data/rssFeeds';

const KEYS: CategoryKey[] = [
  'scholarships',
  'jobs',
  'internships',
  'guidance',
  'research',
  'conferences',
  'volunteer',
];

export const RSSFeedsSection = () => {
  return (
    <section aria-labelledby="rss-section-heading" className="py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h2 id="rss-section-heading" className="text-3xl md:text-4xl font-bold">
            Latest from the <span className="text-gradient">Web</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Live RSS updates from trusted sources across each category.
          </p>
        </header>

        <Tabs defaultValue={KEYS[0]} className="w-full">
          <TabsList className="flex flex-wrap gap-2 justify-center">
            {KEYS.map((key) => (
              <TabsTrigger key={key} value={key} className="capitalize">
                {CATEGORY_LABELS[key]}
              </TabsTrigger>
            ))}
          </TabsList>

          {KEYS.map((key) => (
            <TabsContent key={key} value={key} className="mt-6">
              <RSSCategoryFeed category={key} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default RSSFeedsSection;
