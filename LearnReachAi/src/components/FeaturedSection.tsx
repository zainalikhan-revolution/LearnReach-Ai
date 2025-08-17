import { OpportunityCard } from './OpportunityCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';

export const FeaturedSection = () => {
  const featuredOpportunities = [
    {
      title: "Senior Software Engineer - AI/ML",
      company: "TechCorp Global",
      location: "San Francisco, CA",
      type: "hybrid" as const,
      category: "job" as const,
      salary: "$150K - $200K",
      deadline: "Dec 31, 2024",
      rating: 5,
      description: "Join our cutting-edge AI team to develop next-generation machine learning solutions. Work with state-of-the-art technology and contribute to groundbreaking research.",
      tags: ["Machine Learning", "Python", "TensorFlow", "Remote-friendly"]
    },
    {
      title: "Full PhD Scholarship in Computer Science",
      company: "MIT",
      location: "Cambridge, MA",
      type: "onsite" as const,
      category: "scholarship" as const,
      salary: "$45K/year + Benefits",
      deadline: "Jan 15, 2025",
      rating: 5,
      description: "Fully funded PhD position in artificial intelligence and machine learning. Includes full tuition, stipend, and research opportunities with leading faculty.",
      tags: ["PhD", "AI Research", "Fully Funded", "Prestigious"]
    },
    {
      title: "Research Intern - Climate Science",
      company: "Stanford Research Institute",
      location: "Palo Alto, CA",
      type: "hybrid" as const,
      category: "research" as const,
      salary: "$25/hour",
      deadline: "Feb 28, 2025",
      rating: 4,
      description: "Contribute to groundbreaking climate research using advanced data analytics and modeling techniques. Perfect for graduate students in environmental sciences.",
      tags: ["Climate Science", "Data Analytics", "Research", "Graduate Level"]
    },
    {
      title: "International Conference on AI Ethics",
      company: "Global AI Consortium",
      location: "London, UK",
      type: "onsite" as const,
      category: "conference" as const,
      deadline: "Mar 20, 2025",
      rating: 5,
      description: "Premier conference bringing together researchers, industry leaders, and policymakers to discuss the ethical implications of artificial intelligence.",
      tags: ["AI Ethics", "Networking", "Research", "International"]
    },
    {
      title: "Frontend Developer Bootcamp",
      company: "CodeAcademy Pro",
      location: "Online",
      type: "remote" as const,
      category: "job" as const,
      salary: "$80K - $120K",
      deadline: "Ongoing",
      rating: 4,
      description: "Intensive 12-week program that prepares you for a career in frontend development. Includes job placement assistance and mentorship.",
      tags: ["Bootcamp", "Frontend", "React", "Job Guarantee"]
    },
    {
      title: "Volunteer Data Analyst - NGO",
      company: "Global Health Initiative",
      location: "Remote",
      type: "remote" as const,
      category: "volunteer" as const,
      deadline: "Open",
      rating: 4,
      description: "Help analyze health data to support global health initiatives. Flexible schedule, meaningful impact, and opportunity to build your portfolio.",
      tags: ["Volunteer", "Data Analysis", "Global Health", "Flexible"]
    }
  ];

  return (
    <section id="opportunities" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>Featured Opportunities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Trending</span> Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the most sought-after positions, scholarships, and opportunities carefully curated by our AI system.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredOpportunities.map((opportunity, index) => (
            <div key={index} className="animate-scaleIn" style={{ animationDelay: `${index * 0.1}s` }}>
              <OpportunityCard {...opportunity} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button className="btn-hero text-lg px-8 py-4 shadow-glow">
            View All Opportunities
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-muted-foreground mt-4">
            Over 10,000+ new opportunities added weekly
          </p>
        </div>
      </div>
    </section>
  );
};