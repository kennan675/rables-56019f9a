import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/rable-logo.jpg";

export const PageLoader = () => {
  const [isActive, setIsActive] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Hide loader after animation
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          aria-live="polite"
          aria-label="Loading Rable Bakes"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1d1411] via-[#2f1f1c] to-[#3d2a26]">
            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/30"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Glowing orb behind logo */}
          <motion.div
            className="absolute w-80 h-80 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(201,169,133,0.3) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo with rotating ring */}
            <div className="relative">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner rotating ring (opposite direction) */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-primary/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />

              {/* Spinning gradient ring */}
              <motion.div
                className="absolute -inset-6 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(201,169,133,0.6), transparent)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              {/* Logo container */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl"
              >
                <img
                  src={logo}
                  alt="Rable Bakes"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Brand name with stagger animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <h1 className="text-4xl font-serif font-bold text-cream tracking-wider">
                {"Rable Bakes".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-2 text-sm text-cream/60 tracking-[0.3em] uppercase"
              >
                Crafting sweet memories
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="mt-8 h-1 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-gold to-primary rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 flex gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
