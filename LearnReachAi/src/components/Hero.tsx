import { Button } from '@/components/ui/button';
import { Search, Sparkles, Globe, Users } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/70"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-secondary rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-accent to-primary rounded-full opacity-15 animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-60 left-1/3 w-12 h-12 bg-secondary rounded-full opacity-25 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium mb-8 animate-scaleIn">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Career Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Gateway to{' '}
            <span className="text-gradient">Global</span>
            <br />
            <span className="text-gradient-secondary">Educational</span> Success
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover thousands of opportunities worldwide - from dream jobs and scholarships to research positions and conferences. Let our AI guide your career journey.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="card-3d p-6 text-center">
              <div className="text-3xl font-bold text-gradient">10K+</div>
              <div className="text-sm text-muted-foreground mt-1">Job Opportunities</div>
            </div>
            <div className="card-3d p-6 text-center">
              <div className="text-3xl font-bold text-gradient-secondary">5K+</div>
              <div className="text-sm text-muted-foreground mt-1">Scholarships</div>
            </div>
            <div className="card-3d p-6 text-center">
              <div className="text-3xl font-bold text-gradient">2K+</div>
              <div className="text-sm text-muted-foreground mt-1">Research Projects</div>
            </div>
            <div className="card-3d p-6 text-center">
              <div className="text-3xl font-bold text-gradient-secondary">1K+</div>
              <div className="text-sm text-muted-foreground mt-1">Global Events</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Button className="btn-hero text-lg px-10 py-4 shadow-glow">
              <Search className="w-5 h-5 mr-3" />
              Explore Opportunities
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
              <Users className="w-5 h-5 mr-3" />
              Get Career Guidance
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card-glow card-3d p-6 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                <Globe className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-muted-foreground">Access opportunities from 195+ countries worldwide</p>
            </div>
            
            <div className="card-glow card-3d p-6 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                <Sparkles className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">Smart matching and personalized career guidance</p>
            </div>
            
            <div className="card-glow card-3d p-6 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                <Users className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-muted-foreground">Professional mentorship and career counseling</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};