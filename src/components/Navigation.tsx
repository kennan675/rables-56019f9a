import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useCart } from "@/contexts/CartContext";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 50;
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/custom-orders", label: "Custom Orders" },
    { href: "/baking-classes", label: "Classes" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-12 h-20">
        <Link
          to="/"
          className={`text-2xl font-serif font-bold transition-colors duration-300 ${
            isScrolled ? 'text-foreground' : 'text-primary-foreground'
          }`}
        >
          Rable <span className="gradient-text">Bakes</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => handleNavClick(link.href, e)}
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-primary-foreground hover:text-accent'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className={isScrolled ? '' : 'text-primary-foreground hover:text-accent hover:bg-primary-foreground/10'}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </nav>

        <div className="flex lg:hidden gap-2">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className={isScrolled ? '' : 'text-primary-foreground hover:text-accent hover:bg-primary-foreground/10'}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={isScrolled ? '' : 'text-primary-foreground hover:text-accent hover:bg-primary-foreground/10'}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-background/98 backdrop-blur-lg z-40">
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
