import { Instagram } from "lucide-react";
import logo from "@/assets/rable-logo.jpg";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1d1411] via-[#261916] to-[#2f1f1c] py-12 text-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-gold/50 bg-cream/10">
                <img src={logo} alt="Rable Bakes logo" className="h-full w-full object-cover" loading="lazy" />
              </span>
              <h3 className="text-2xl font-bold font-serif">Rable Bakes</h3>
            </div>
            <p className="text-cream/75">
              Crafting sweet memories, one cake at a time
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold text-cream">Quick Links</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#" className="transition-colors hover:text-gold">Home</a></li>
              <li><a href="#" className="transition-colors hover:text-gold">Menu</a></li>
              <li><a href="#" className="transition-colors hover:text-gold">About</a></li>
              <li><a href="#" className="transition-colors hover:text-gold">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold text-cream">Services</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#" className="transition-colors hover:text-gold">Custom Cakes</a></li>
              <li><a href="#" className="transition-colors hover:text-gold">Wedding Cakes</a></li>
              <li><a href="#" className="transition-colors hover:text-gold">Catering</a></li>
              <li><a href="#" className="transition-colors hover:text-gold">Gift Boxes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold text-cream">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cream transition-all hover:bg-gold hover:text-[#2f1f1c]">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cream transition-all hover:bg-gold hover:text-[#2f1f1c]">
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-cream/60">
          <p>&copy; 2025 Rable Bakes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
