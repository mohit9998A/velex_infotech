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
 * Every entry in testimonials.json is currently flagged `placeholder: true`.
 * Publishing invented quotes from named people at named companies is a
 * credibility problem on the page we're driving traffic to.
 *
 * To restore the section: add real entries to content/testimonials.json without
 * the `placeholder` flag. Nothing else needs changing.
 */
const testimonials = (testimonialsData as Testimonial[]).filter((t) => !t.placeholder);

export function TestimonialsSection() {
  // If no approved testimonials exist, do not mount the carousel or run hooks
  if (testimonials.length === 0) return null;

  return <TestimonialsContent testimonials={testimonials} />;
}

function TestimonialsContent({ testimonials }: { testimonials: Testimonial[] }) {
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

  return (
    <section className="section-pad relative overflow-hidden bg-white dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-500">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 glow-blob opacity-40" />
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
                <figure className="relative flex h-full flex-col p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md shadow-sm">
                  <Quote className="size-9 text-[#7138FF]/40 dark:text-[#8B4DFF]/40" />
                  <blockquote className="mt-4 font-serif text-xl leading-relaxed text-slate-900 dark:text-white md:text-2xl font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-[#7138FF] to-[#5424D6] font-sans text-sm font-bold text-white">
                      {t.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-sans text-sm font-semibold text-slate-900 dark:text-white">{t.author}</span>
                      <span className="font-sans text-xs text-slate-500 dark:text-white/60">
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
            className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 dark:border-white/15 text-slate-600 dark:text-white/70 transition hover:border-[#7138FF] hover:text-[#7138FF] dark:hover:border-[#8B4DFF] dark:hover:text-white"
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
                  i === selected ? "w-6 bg-[#7138FF] dark:bg-[#8B4DFF]" : "w-2 bg-slate-200 dark:bg-white/20",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => emblaApi?.scrollNext()}
            className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 dark:border-white/15 text-slate-600 dark:text-white/70 transition hover:border-[#7138FF] hover:text-[#7138FF] dark:hover:border-[#8B4DFF] dark:hover:text-white"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
