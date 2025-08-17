import { Button } from '@/components/ui/button';
import { Star, GraduationCap, Briefcase, Laptop, MessageSquare, FlaskConical, CalendarDays, HeartHandshake, type LucideIcon } from 'lucide-react';

export const CategoryShowcase = () => {
  const categories: { key: string; title: string; subtitle: string; icon: LucideIcon; gradient: string; description: string }[] = [
    {
      key: 'scholarships',
      title: 'Fully Funded Scholarships',
      subtitle: 'BS · MS · PhD · Global',
      icon: GraduationCap,
      gradient: 'from-primary to-accent',
      description: 'Top curated scholarships from all over the world with full funding.',
    },
    {
      key: 'jobs',
      title: 'Jobs',
      subtitle: 'Remote · Hybrid · On-site',
      icon: Briefcase,
      gradient: 'from-secondary to-secondary-glow',
      description: 'High-quality roles across industries and experience levels.',
    },
    {
      key: 'internships',
      title: 'Internships',
      subtitle: 'Paid · Remote · Global',
      icon: Laptop,
      gradient: 'from-accent to-primary',
      description: 'Kickstart your career with the best internships worldwide.',
    },
    {
      key: 'guidance',
      title: 'Career Guidance',
      subtitle: 'Personalized · AI-Powered',
      icon: MessageSquare,
      gradient: 'from-primary to-secondary',
      description: 'Tailored roadmaps, resume tips, and interview prep for every field.',
    },
    {
      key: 'research',
      title: 'Research Opportunities',
      subtitle: 'Labs · Grants · Fellowships',
      icon: FlaskConical,
      gradient: 'from-secondary to-accent',
      description: 'Find cutting-edge research positions and funding opportunities.',
    },
    {
      key: 'conferences',
      title: 'Conferences',
      subtitle: 'Submit · Attend · Network',
      icon: CalendarDays,
      gradient: 'from-accent to-secondary',
      description: 'Discover global academic and industry conferences.',
    },
    {
      key: 'volunteer',
      title: 'Volunteer',
      subtitle: 'Impact · Experience',
      icon: HeartHandshake,
      gradient: 'from-primary to-primary-glow',
      description: 'Give back while building real-world experience and networks.',
    },
  ];

  return (
    <section aria-labelledby="categories-heading" className="py-14 animate-fade-in">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h2 id="categories-heading" className="text-3xl md:text-4xl font-bold">
            Explore Top <span className="text-gradient">Opportunities</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Big, clear categories to jump straight into fully funded scholarships, jobs, internships, guidance, research, conferences, and volunteer work.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 bg-card/60">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-muted-foreground">AI match accuracy</span>
            <span className="font-semibold">97%</span>
          </div>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map(({ key, title, subtitle, icon: Icon, gradient, description }) => (
            <article key={key} id={key} className="card-3d p-6 group hover:shadow-float transition-all duration-300 hover-scale">
              <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r ${gradient} p-3 mb-4 text-primary-foreground shadow-[var(--shadow-glow)]`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold leading-tight">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              <p className="text-muted-foreground mt-3">
                {description}
              </p>
              <div className="mt-5">
                <Button className="btn-hero">Explore</Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
