import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Award, Globe, Sparkles, ArrowRight } from 'lucide-react';
import abstractBg from '@/assets/abstract-bg.jpg';

export const AboutSection = () => {
  const stats = [
    { icon: Users, label: "Active Users", value: "500K+", color: "text-primary" },
    { icon: Award, label: "Success Stories", value: "25K+", color: "text-secondary" },
    { icon: Globe, label: "Countries", value: "195+", color: "text-accent" },
    { icon: Target, label: "Opportunities", value: "1M+", color: "text-success" }
  ];

  const features = [
    {
      title: "AI-Powered Matching",
      description: "Our advanced AI analyzes your profile, skills, and preferences to match you with the most relevant opportunities worldwide.",
      icon: Sparkles
    },
    {
      title: "Global Network",
      description: "Access opportunities from leading companies, universities, and organizations across 195+ countries.",
      icon: Globe
    },
    {
      title: "Expert Guidance",
      description: "Get personalized career advice from industry experts and successful professionals in your field.",
      icon: Users
    },
    {
      title: "Verified Opportunities",
      description: "All listings are verified and regularly updated to ensure accuracy and legitimacy.",
      icon: Award
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${abstractBg})` }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-secondary text-secondary-foreground mb-6" variant="secondary">
            About LearnReach AI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Empowering Your <span className="text-gradient">Educational</span> Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to democratize access to global educational and career opportunities through the power of artificial intelligence.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="card-3d p-6 text-center group hover:scale-105 transition-transform duration-300">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:animate-glow`}>
                <stat.icon className={`w-6 h-6 text-primary-foreground`} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="card-glow card-3d p-8 group">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:animate-glow flex-shrink-0">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="card-glow card-3d p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-8">
            At LearnReach AI, we believe that everyone deserves access to quality education and meaningful career opportunities, regardless of their background or location. Our platform leverages cutting-edge artificial intelligence to break down barriers and connect talented individuals with life-changing opportunities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button className="btn-hero px-8 py-3">
              Join Our Community
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};