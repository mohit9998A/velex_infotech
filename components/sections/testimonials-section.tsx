"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";
import testimonialsData from "@/content/testimonials.json";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { SectionHeader } from "@/components/common/section-header";

/**
 * Only real, attributable testimonials render.
 *
 * Every entry in testimonials.json is currently flagged `placeholder: true`,
 * and the section used to say so out loud on the homepage ("Placeholder
 * testimonials shown for layout"). Publishing invented quotes from named people
 * at named companies is a credibility problem on the page we're about to drive
 * traffic to, and it paired with a fabricated aggregateRating in the contact
 * page schema (since removed) that risked a Google manual action.
 *
 * To restore the section: add real entries to content/testimonials.json without
 * the `placeholder` flag. Nothing else needs changing.
 */
const testimonials = (testimonialsData as Testimonial[]).filter((t) => !t.placeholder);

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const paused = useRef(false);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay (skipped for reduced motion)
  useEffect(() => {
    if (!emblaApi || reducedMotion) return;
    const id = setInterval(() => {
      if (!paused.current) emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(id);
  }, [emblaApi, reducedMotion]);

  // After all hooks — `testimonials` is module-scoped so this is stable.
  if (testimonials.length === 0) return null;

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 glow-blob" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader eyebrow="Testimonials" title="What our clients say" />

        <div
          className="mt-12 overflow-hidden"
          ref={emblaRef}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <div className="flex">
            {testimonials.map((t) => (
              <div key={t.id} className="min-w-0 flex-[0_0_100%] px-2 md:flex-[0_0_80%]">
                <figure className="glass-card relative flex h-full flex-col p-8 md:p-10">
                  <Quote className="size-9 text-purple-core/40" />
                  <blockquote className="mt-4 font-display text-xl leading-relaxed text-primary md:text-2xl">
                    {t.quote}
                  </blockquote>
                  <div className="mt-6 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-core to-purple-deep font-display text-sm font-bold text-white">
                      {t.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-primary">{t.author}</span>
                      <span className="text-xs text-secondary">
                        {t.role}, {t.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => emblaApi?.scrollPrev()}
            className="inline-flex size-10 items-center justify-center rounded-full border border-vx-border text-secondary transition hover:border-purple-glow hover:text-primary"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === selected ? "w-6 bg-purple-glow" : "w-2 bg-vx-border",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => emblaApi?.scrollNext()}
            className="inline-flex size-10 items-center justify-center rounded-full border border-vx-border text-secondary transition hover:border-purple-glow hover:text-primary"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
