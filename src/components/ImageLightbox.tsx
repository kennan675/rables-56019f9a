import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface LightboxContextType {
    openLightbox: (images: string[], startIndex?: number) => void;
    closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | null>(null);

export const useLightbox = () => {
    const context = useContext(LightboxContext);
    if (!context) {
        throw new Error("useLightbox must be used within a LightboxProvider");
    }
    return context;
};

interface LightboxProviderProps {
    children: React.ReactNode;
}

export const LightboxProvider = ({ children }: LightboxProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const openLightbox = useCallback((imgs: string[], startIndex = 0) => {
        setImages(imgs);
        setCurrentIndex(startIndex);
        setIsOpen(true);
        setIsZoomed(false);
        document.body.style.overflow = "hidden";
    }, []);

    const closeLightbox = useCallback(() => {
        setIsOpen(false);
        setIsZoomed(false);
        document.body.style.overflow = "";
    }, []);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        setIsZoomed(false);
    }, [images.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        setIsZoomed(false);
    }, [images.length]);

    const toggleZoom = useCallback(() => {
        setIsZoomed((prev) => !prev);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case "Escape":
                    closeLightbox();
                    break;
                case "ArrowLeft":
                    goToPrevious();
                    break;
                case "ArrowRight":
                    goToNext();
                    break;
                case " ":
                    e.preventDefault();
                    toggleZoom();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeLightbox, goToPrevious, goToNext, toggleZoom]);

    return (
        <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
            {children}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
                            aria-label="Close lightbox"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Zoom button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleZoom();
                            }}
                            className="absolute top-4 left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
                            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                        >
                            {isZoomed ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
                        </button>

                        {/* Navigation arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToPrevious();
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToNext();
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </>
                        )}

                        {/* Image container */}
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                                opacity: 1,
                                scale: isZoomed ? 1.5 : 1
                            }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className={`relative max-w-[90vw] max-h-[85vh] ${isZoomed ? 'cursor-zoom-out overflow-auto' : 'cursor-zoom-in'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleZoom();
                            }}
                        >
                            <img
                                src={images[currentIndex]}
                                alt={`Image ${currentIndex + 1} of ${images.length}`}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                                draggable={false}
                            />
                        </motion.div>

                        {/* Image counter */}
                        {images.length > 1 && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
                                {currentIndex + 1} / {images.length}
                            </div>
                        )}

                        {/* Thumbnail strip for multiple images */}
                        {images.length > 1 && (
                            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto p-2">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentIndex(index);
                                            setIsZoomed(false);
                                        }}
                                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${index === currentIndex
                                                ? "border-white shadow-lg scale-110"
                                                : "border-transparent opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </LightboxContext.Provider>
    );
};
