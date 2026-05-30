import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLightbox } from "@/components/ImageLightbox";
import { MessageCircle, Eye } from "lucide-react";

interface Cake3DCardProps {
    image: string;
    name: string;
    price?: string;
    category?: string;
    onClick?: () => void;
}

export const Cake3DCard = ({ image, name, price, category, onClick }: Cake3DCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { openLightbox } = useLightbox();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / rect.width - 0.5);
        y.set(mouseY / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleImageClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onClick) {
            onClick();
        } else {
            openLightbox([image]);
        }
    };

    const handleOrderClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const message = encodeURIComponent(
            `Hi Rable Bakes! 🎂\n\nI'd like to order this cake:\n\n📸 Name: ${name}\n💰 Price: ${price || "Please quote"}\n${category ? `📂 Category: ${category}` : ""}\n\nPlease let me know availability and next steps!`
        );
        window.open(`https://wa.me/254729063060?text=${message}`, '_blank');
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="group relative perspective-1000"
        >
            {/* Main card container */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-cream/50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50">

                {/* Image container */}
                <div
                    className="relative h-72 overflow-hidden cursor-pointer"
                    onClick={handleImageClick}
                >
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Elegant overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* View icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                            <Eye className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    {/* Category tag */}
                    {category && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground/80 shadow-sm">
                            {category}
                        </div>
                    )}
                </div>

                {/* Content section */}
                <div className="p-5 space-y-4">
                    {/* Title and price */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold text-foreground line-clamp-1 mb-1">
                            {name}
                        </h3>
                        {price && (
                            <p className="text-primary font-medium text-sm">
                                {price}
                            </p>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleImageClick}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary/50 hover:bg-secondary text-foreground text-sm font-medium rounded-xl transition-all duration-300"
                        >
                            <Eye className="w-4 h-4" />
                            View
                        </button>
                        <button
                            onClick={handleOrderClick}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Order
                        </button>
                    </div>
                </div>

                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px] pointer-events-none" />
            </div>
        </motion.div>
    );
};
