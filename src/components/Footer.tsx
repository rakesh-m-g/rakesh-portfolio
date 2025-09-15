import React from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import portfolioData from '../portfolioData';

const Footer: React.FC = () => {
  const { footer } = portfolioData;
  const currentYear = new Date().getFullYear();

  const socialLinks = footer.socialLinks.map(link => ({
    name: link.name,
    url: link.url,
    icon: link.icon === 'Github' ? Github : link.icon === 'Linkedin' ? Linkedin : link.icon === 'Mail' ? Mail : ExternalLink,
    color: link.color
  }));

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Rakesh M G</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#works" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="/resume" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-300 ${link.color} transition-colors duration-200`}
                  aria-label={link.name}
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <p className="text-gray-300 text-sm">
              Available for freelance work and collaboration
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Rakesh MG. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 sm:mt-0">
              Built with React & TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;