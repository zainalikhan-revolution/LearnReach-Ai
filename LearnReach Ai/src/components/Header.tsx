import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/ab8807f0-263d-468a-b894-6a2882cee747.png" 
            alt="LearnReach AI Logo" 
            className="h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#opportunities" className="text-foreground hover:text-primary transition-colors font-medium">
            Opportunities
          </a>
          <a href="#scholarships" className="text-foreground hover:text-primary transition-colors font-medium">
            Scholarships
          </a>
          <a href="#research" className="text-foreground hover:text-primary transition-colors font-medium">
            Research
          </a>
          <a href="#courses" className="text-foreground hover:text-primary transition-colors font-medium">
            Courses
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
            About
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
            Contact
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <MessageCircle className="w-4 h-4 mr-2" />
            AI Chat
          </Button>
          <Button className="btn-hero text-sm px-6 py-2">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg border border-border hover:bg-muted transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slideIn">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <a href="#opportunities" className="block text-foreground hover:text-primary transition-colors font-medium">
              Opportunities
            </a>
            <a href="#scholarships" className="block text-foreground hover:text-primary transition-colors font-medium">
              Scholarships
            </a>
            <a href="#research" className="block text-foreground hover:text-primary transition-colors font-medium">
              Research
            </a>
            <a href="#courses" className="block text-foreground hover:text-primary transition-colors font-medium">
              Courses
            </a>
            <a href="#about" className="block text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="block text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
            <div className="pt-4 space-y-3">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Chat
              </Button>
              <Button className="w-full btn-hero">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};