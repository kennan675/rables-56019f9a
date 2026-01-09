import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLightbox } from "@/components/ImageLightbox";
import { MessageCircle } from "lucide-react";

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

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
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
        window.open(`https://wa.me/254704209055?text=${message}`, '_blank');
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative h-[400px] w-full rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-colors duration-300 perspective-1000"
        >
            {/* Image container - clickable for lightbox */}
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 rounded-xl shadow-lg overflow-hidden bg-white cursor-pointer"
                onClick={handleImageClick}
            >
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                />
            </div>

            {/* Info panel with Order button */}
            <div
                style={{
                    transform: "translateZ(75px)",
                }}
                className="absolute bottom-8 left-8 right-8 p-4 bg-black/70 backdrop-blur-md rounded-lg text-white shadow-xl"
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold font-serif mb-1 line-clamp-1">{name}</h3>
                        {price && <p className="text-sm font-medium opacity-90">{price}</p>}
                    </div>
                    <button
                        onClick={handleOrderClick}
                        className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-medium rounded-full transition-colors duration-300"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">Order</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
