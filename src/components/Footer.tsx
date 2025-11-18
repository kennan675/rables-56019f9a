import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-warm-brown py-12 text-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-bold font-serif">Rables Bakes</h3>
            <p className="text-cream/80">
              Crafting sweet memories since 2015
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-cream/80 text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">About</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Services</h4>
            <ul className="space-y-2 text-cream/80 text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">Custom Cakes</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Wedding Cakes</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Catering</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Gift Boxes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-all hover:bg-gold hover:text-warm-brown">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-all hover:bg-gold hover:text-warm-brown">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-all hover:bg-gold hover:text-warm-brown">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-cream/10 pt-8 text-center text-cream/60 text-sm">
          <p>&copy; 2024 Rables Bakes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
