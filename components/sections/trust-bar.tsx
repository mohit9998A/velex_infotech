const clients = [
  "Bonn",
  "FabXpert Metal",
  "Northline Logistics",
  "Aether Studios",
  "Bloom Retail",
  "TechCorp India",
  "Vertex Labs",
  "Solace Health",
];

export function TrustBar() {
  return (
    <section className="border-y border-vx-border bg-surface/50 py-10">
      <p className="mb-7 text-center font-mono-label text-muted">
        Trusted by forward-thinking companies
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-scroll-left items-center gap-16 pr-16 group-hover:[animation-play-state:paused]">
          {[...clients, ...clients].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-xl text-secondary/70 transition-colors hover:text-primary"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
