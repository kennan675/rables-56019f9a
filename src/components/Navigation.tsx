import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle, Search, Instagram } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 50;
  const navigate = useNavigate();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/cakes", label: "Cakes" },
    { href: "/custom-orders", label: "Custom Orders" },
    { href: "/baking-classes", label: "Classes" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.includes('#')) {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href.split('#')[1] ? `#${href.split('#')[1]}` : '#home');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        e.preventDefault();
        const element = document.querySelector(href.split('#')[1] ? `#${href.split('#')[1]}` : '#home');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${isScrolled
        ? 'bg-white backdrop-blur-md border-border/70 shadow-sm'
        : 'bg-white backdrop-blur-md border-transparent'
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-12 h-20">
        <Link to="/" className="relative flex items-center" aria-label="Rable Bakes home">
          <span className="pointer-events-none absolute -left-4 -top-4 hidden text-6xl font-serif text-primary/20 md:block">
            R
          </span>
          <div className="relative flex flex-col leading-tight text-foreground">
            <span className="text-xl font-serif tracking-[0.15em] uppercase md:text-2xl md:tracking-[0.3em]">
              Rable
            </span>
            <span className="text-[0.55rem] uppercase tracking-[0.35em] text-muted-foreground md:text-xs md:tracking-[0.6em]">
              Bakes
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => handleNavClick(link.href, e)}
              className={`relative text-sm font-medium tracking-wide transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${isScrolled
                ? 'text-foreground hover:text-primary'
                : 'text-foreground hover:text-primary'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-foreground hover:text-primary"
            aria-label="Search menu"
            onClick={() => handleNavClick('/#products', new MouseEvent('click') as unknown as React.MouseEvent)}
          >
            <Search className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="https://instagram.com/rablebakes" target="_blank" rel="noreferrer" className="transition-colors hover:text-primary" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://tiktok.com/@rablebakes" target="_blank" rel="noreferrer" className="transition-colors hover:text-primary" aria-label="TikTok">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
          <a
            href="https://wa.me/254729063060?text=Hi%20Rable%20Bakes!%20I'd%20like%20to%20place%20an%20order."
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </nav>

        <div className="flex lg:hidden gap-2">
          <a
            href="https://wa.me/254729063060?text=Hi%20Rable%20Bakes!%20I'd%20like%20to%20place%20an%20order."
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <Button variant="ghost" size="icon" className="text-foreground" aria-label="Instagram" asChild>
            <a href="https://instagram.com/rablebakes" target="_blank" rel="noreferrer">
              <Instagram className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={isScrolled ? 'text-foreground hover:bg-muted/60' : 'text-foreground hover:bg-muted/60'}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-[5rem] z-[60] h-[calc(100vh-5rem)] overflow-y-auto border-t border-border/70 bg-white shadow-lg lg:hidden">
          <nav className="flex flex-col gap-6 p-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className="text-lg font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </nav>
  );
};
