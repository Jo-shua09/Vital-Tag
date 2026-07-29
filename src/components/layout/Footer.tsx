import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";
import vitalTagLogo from "@/assets/vital-tag-logo.png";

const productLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

const legalLinks = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { name: "GitHub", href: "#", icon: Github },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="bg-background/50 border-t border-border/30 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img src={vitalTagLogo} alt="VITAL-TAG Logo" className="h-8 w-auto" />
              <span className="font-bold text-foreground">VITAL-TAG</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">AI-powered livestock health monitoring.</p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/30 pt-8">
          <p className="text-sm text-muted-foreground text-center">&copy; {new Date().getFullYear()} VITAL-TAG Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
