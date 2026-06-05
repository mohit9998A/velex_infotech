"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useLeadModal } from "@/lib/store/lead-modal";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  const openModal = useLeadModal((s) => s.openModal);

  return (
    <section className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 radial-glow" />
      <div className="pointer-events-none absolute inset-0 noise-overlay" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6"
      >
        <span className="font-mono-label text-purple-glow">Ready when you are</span>
        <h2 className="mt-4 font-display text-h1 text-balance text-primary">
          Ready to transform <span className="text-gradient">your business?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-secondary">
          Join {siteConfig.stats.clients} companies that chose intelligence over
          mediocrity. Book a free consultation and see what Velex can build for you.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="btn-glow" onClick={() => openModal()}>
            Schedule a Free Consultation
          </Button>
          <Button size="lg" variant="crystal" asChild>
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" /> WhatsApp Us Now
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
