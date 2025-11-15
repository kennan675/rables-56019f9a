import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary py-12 text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-bold font-serif">Rables Bakes</h3>
            <p className="text-primary-foreground/80">
              Crafting sweet memories since 2015
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Custom Cakes</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Wedding Cakes</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Catering</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Gift Boxes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-all hover:bg-accent hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-all hover:bg-accent hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-all hover:bg-accent hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Rables Bakes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
