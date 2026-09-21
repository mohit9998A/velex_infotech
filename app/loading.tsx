import { HeroSkeleton } from "@/components/sections/skeletons/hero-skeleton";
import { TrustBarSkeleton } from "@/components/sections/skeletons/trust-bar-skeleton";
import { ServicesSkeleton } from "@/components/sections/skeletons/services-skeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading page content" className="w-full">
      <HeroSkeleton />
      <TrustBarSkeleton />
      <ServicesSkeleton />
    </div>
  );
}
