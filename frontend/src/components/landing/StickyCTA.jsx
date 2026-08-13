import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_URL, PHONE_URL } from "@/pages/LandingPage";

export const StickyCTA = () => (
    <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        data-testid="sticky-cta"
    >
        <a
            href={PHONE_URL}
            data-testid="sticky-call-button"
            aria-label="Call Clive"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E3D5CA] bg-[#F9F8F6]/85 text-[#2D241E] shadow-lg backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
        >
            <Phone className="h-4.5 w-4.5" size={18} />
        </a>
        <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="sticky-whatsapp-cta"
            className="flex items-center gap-2 rounded-full bg-[#2D241E] px-6 py-3.5 text-sm font-medium text-[#F9F8F6] shadow-xl transition-transform duration-300 hover:-translate-y-1"
        >
            <MessageCircle className="h-4 w-4" />
            Chat with Clive
        </a>
    </motion.div>
);
