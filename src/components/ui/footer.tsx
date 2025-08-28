import React from 'react';
import { Separator } from './separator';
import { LogoLink } from './logo';
import { Star } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <LogoLink 
              onNavigate={onNavigate}
              size="md"
            />
            <p className="text-muted-foreground mb-6 max-w-md">
              A platform where people connect to share knowledge, 
              learn new skills, and build meaningful relationships 
              through authentic human interaction.
            </p>
            
            {/* Trust Elements */}
            <div className="space-y-3">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-skillswap-success rounded-full"></div>
                  <span className="text-skillswap-success font-medium">Growing</span>
                  <span className="text-muted-foreground">Community</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-skillswap-accent rounded-full"></div>
                  <span className="text-skillswap-accent font-medium">Real</span>
                  <span className="text-muted-foreground">Connections</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-skillswap-accent fill-current" />
                  <span className="text-foreground font-medium">Human</span>
                  <span className="text-muted-foreground">Learning</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Platform
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => onNavigate("signup")}
                  className="hover:text-foreground transition-colors"
                >
                  Get Started
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("landing")}
                  className="hover:text-foreground transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("landing")}
                  className="hover:text-foreground transition-colors"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => onNavigate('help')}
                  className="hover:text-foreground transition-colors"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('community')}
                  className="hover:text-foreground transition-colors"
                >
                  Community
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('safety')}
                  className="hover:text-foreground transition-colors"
                >
                  Safety
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-foreground transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm text-muted-foreground">
            <button 
              onClick={() => {
                // Placeholder for privacy policy
                alert('Privacy Policy: We prioritize your data protection. Full policy available soon.');
              }}
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => {
                // Placeholder for terms of service
                alert('Terms of Service: Fair usage and community guidelines. Full terms available soon.');
              }}
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </button>
            <span className="hidden sm:inline text-xs text-muted-foreground/60">
              Made with ❤️ for learners worldwide
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};