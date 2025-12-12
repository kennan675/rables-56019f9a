import { Truck, ShieldCheck, Clock, Phone, MessageCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const phoneNumber = "+254 704 209 055";
const whatsappLink = "https://wa.me/254704209055";

export const TrustStrip = () => {
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPhoneOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const items = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same day available",
    },
    {
      icon: ShieldCheck,
      title: "100% Fresh",
      description: "Baked same day",
    },
    {
      icon: Clock,
      title: "Open Daily",
      description: "24 Hours",
    },
  ];

  return (
    <div className="border-b border-border/60 bg-secondary">
      <div className="container mx-auto flex flex-col gap-4 px-6 py-3 text-sm md:flex-row md:items-center md:justify-between">
        {items.map((item, index) => (
          <div 
            key={item.title} 
            className={`flex items-center gap-3 ${index !== 0 ? 'md:border-l md:border-border/40 md:pl-6' : ''}`}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <item.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-muted-foreground text-xs">{item.description}</p>
            </div>
          </div>
        ))}
        
        {/* Phone Number with Contact Options */}
        <div 
          ref={dropdownRef}
          className="relative flex items-center gap-3 md:border-l md:border-border/40 md:pl-6"
        >
          <button
            onClick={() => setShowPhoneOptions(!showPhoneOptions)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Phone className="h-4 w-4" />
            </span>
            <div className="text-left">
              <p className="font-medium text-foreground">Phone Number</p>
              <p className="text-muted-foreground text-xs">{phoneNumber}</p>
            </div>
          </button>
          
          {showPhoneOptions && (
            <div className="absolute top-full left-0 mt-2 bg-card rounded-lg shadow-lg border border-border overflow-hidden z-50 min-w-[180px]">
              <a
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                onClick={() => setShowPhoneOptions(false)}
              >
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Call Now</span>
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors border-t border-border"
                onClick={() => setShowPhoneOptions(false)}
              >
                <MessageCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-foreground">WhatsApp</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};