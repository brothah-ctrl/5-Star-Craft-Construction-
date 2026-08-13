import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 36 }) => (
    <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

export const Overline = ({ children, light = false }) => (
    <p
        className={`text-xs uppercase tracking-[0.28em] ${
            light ? "text-[#D4A373]" : "text-[#B07D4A]"
        }`}
    >
        {children}
    </p>
);
