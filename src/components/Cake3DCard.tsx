import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Cake3DCardProps {
    image: string;
    name: string;
    price?: string;
    onClick?: () => void;
}

export const Cake3DCard = ({ image, name, price, onClick }: Cake3DCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

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

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative h-[400px] w-full rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-colors duration-300 cursor-pointer perspective-1000"
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 rounded-xl shadow-lg overflow-hidden bg-white"
            >
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                />
            </div>

            <div
                style={{
                    transform: "translateZ(75px)",
                }}
                className="absolute bottom-8 left-8 right-8 p-4 bg-black/70 backdrop-blur-md rounded-lg text-white pointer-events-none shadow-xl"
            >
                <h3 className="text-xl font-bold font-serif mb-1 line-clamp-1">{name}</h3>
                {price && <p className="text-sm font-medium opacity-90">{price}</p>}
            </div>
        </motion.div>
    );
};
