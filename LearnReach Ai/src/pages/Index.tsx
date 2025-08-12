import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SearchFilters } from '@/components/SearchFilters';
import CategoryShowcase from '@/components/CategoryShowcase';
import { FeaturedSection } from '@/components/FeaturedSection';
import RSSFeedsSection from '@/components/RSSFeedsSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { ChatBot } from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CategoryShowcase />
        
        {/* Search Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Find Your Perfect <span className="text-gradient">Opportunity</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Search through thousands of verified opportunities worldwide. Our AI will help you find the perfect match.
              </p>
            </div>
            <SearchFilters />
          </div>
        </section>

        <FeaturedSection />
        {/* External Feeds Section */}
        <RSSFeedsSection />
        <AboutSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
