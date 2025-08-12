import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 animate-fade-in">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ab8807f0-263d-468a-b894-6a2882cee747.png" 
                alt="LearnReach AI Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your gateway to global educational and career opportunities. Powered by AI to help you reach your dreams.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 hover:bg-primary hover:text-primary-foreground">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 hover:bg-primary hover:text-primary-foreground">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 hover:bg-primary hover:text-primary-foreground">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 hover:bg-primary hover:text-primary-foreground">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 hover:bg-primary hover:text-primary-foreground">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Opportunities</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Job Search</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Internships</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Scholarships</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Research Positions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Conferences</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Volunteer Work</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Career Guidance</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">AI Chat Assistant</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Course Catalog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Resume Builder</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Interview Prep</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Success Stories</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest opportunities delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="w-full"
              />
              <Button className="w-full btn-hero">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium">Email Us</p>
                <p className="text-muted-foreground text-sm">support@learnreach.ai</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-medium">Call Us</p>
                <p className="text-muted-foreground text-sm">+923476097262</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-primary transition-colors">GDPR</a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 LearnReach AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};