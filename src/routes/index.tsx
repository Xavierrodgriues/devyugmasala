import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Reveal } from "@/components/Reveal";
import { categories, products } from "@/lib/products";
import heritage from "@/assets/heritage-1960.jpg";
import manufacturing from "@/assets/manufacturing.jpg";
import heroPure from "@/assets/hero-pure-spices.jpg";
import heroBlended from "@/assets/hero-blended-spices.jpg";
import heroSeasoning from "@/assets/hero-seasoning.jpg";

const categoryHero: Record<string, string> = {
  "pure-spices": heroPure,
  "blended-spices": heroBlended,
  seasoning: heroSeasoning,
};

export const Route = createFileRoute("/")({
  component: HomePage,
});

const featured = ["kashmiri-lal-chilli", "biryani-masala", "garam-masala", "kitchen-king-masala"];

function HomePage() {
  const featuredProducts = featured
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <HeroCarousel />

      {/* Trust Bar */}
      <section className="py-14 border-y border-border bg-cream">
        <div className="container-luxury flex flex-wrap justify-between items-center gap-6">
          {["Since 1980", "Single-Origin Sourcing", "Stone-Ground Purity", "Zero Additives"].map(
            (item, i) => (
              <Reveal key={item} delay={i * 0.08} className="font-display italic text-xl md:text-2xl text-charcoal/70">
                {item}
              </Reveal>
            ),
          )}
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-24 md:py-32">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-20">
            <div>
              <Reveal className="text-clay text-eyebrow mb-4">Our Collections</Reveal>
              <Reveal as="h2" delay={0.1} className="font-display text-4xl md:text-6xl font-light text-charcoal max-w-2xl leading-tight">
                Three families, one obsession with purity.
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link
                to="/products"
                className="text-[11px] uppercase tracking-[0.2em] border-b border-charcoal pb-1 hover:text-clay hover:border-clay transition-all"
              >
                View All Products
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 0.12} className={i === 1 ? "md:mt-16" : ""}>
                <Link
                  to="/products"
                  search={{ category: cat.slug }}
                  className="group block"
                >
                  <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-stone-warm">
                    <img
                      src={categoryHero[cat.slug]}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-cream">
                      <span className="text-[10px] uppercase tracking-[0.3em]">0{i + 1}</span>
                      <span className="hidden md:inline text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore →
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mb-2 text-charcoal">{cat.name}</h3>
                  <p className="text-sm text-charcoal/60 font-light leading-relaxed">{cat.description}</p>
                  <div className="mt-4 md:hidden">
                    <div className="inline-flex items-center gap-3 text-clay text-[10px] uppercase tracking-[0.25em] font-semibold">
                      Explore
                      <span className="w-8 h-px bg-clay" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section className="bg-charcoal text-cream py-24 md:py-32 overflow-hidden">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <Reveal>
              <div className="relative">
                <img
                  src={heritage}
                  alt="A traditional Dehyug spice storehouse circa 1980"
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover rounded-sm"
                />
                <div className="hidden md:block absolute -bottom-10 -right-10 w-1/2 aspect-square bg-clay text-cream p-8 grid place-items-center text-center">
                  <div>
                    <div className="font-display text-6xl md:text-7xl italic leading-none">40+</div>
                    <div className="mt-3 text-[10px] uppercase tracking-[0.3em]">Years of Mastery</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-10 -left-4 md:-left-10 font-display text-[120px] md:text-[180px] text-cream/5 leading-none select-none pointer-events-none">
              1980
            </div>
            <Reveal as="h2" className="font-display text-4xl md:text-6xl font-light mb-8 leading-tight relative">
              A Journey Through <br />
              <span className="italic text-gold">Generations.</span>
            </Reveal>
            <Reveal delay={0.1} className="space-y-6 text-cream/70 font-light leading-relaxed text-base md:text-lg relative">
              <p>
                Ambica Gruh Udhyog is the proud manufacturer of all these premium spices and masalas, which was established in 1980. 
                Our products are marketed by Devyug Masala, a child company of Ambica Gruh Udhyog itself.
              </p>
              <p>
                Because we are our own manufacturer and seller, we avoid third-party manufacturing issues, 
                maintaining complete independence while keeping our product prices extremely low for you.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 relative">
              <Link to="/about" className="inline-flex items-center gap-4 group">
                <span className="w-12 h-px bg-gold transition-all duration-500 group-hover:w-20" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                  Read Our Heritage Story
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 md:py-32">
        <div className="container-luxury">
          <div className="text-center mb-16 md:mb-20">
            <Reveal className="text-clay text-eyebrow mb-4">Featured Blends</Reveal>
            <Reveal as="h2" delay={0.1} className="font-display text-4xl md:text-5xl text-charcoal">
              Our most-loved expressions
            </Reveal>
            <Reveal delay={0.2} className="flex justify-center items-center gap-2 mt-8 text-clay">
              <span className="w-8 h-px bg-clay/35" />
              <span className="w-1.5 h-1.5 bg-clay rotate-45" />
              <span className="w-3.5 h-px bg-clay/60" />
              <span className="w-2.5 h-2.5 bg-clay rotate-45 flex items-center justify-center">
                <span className="w-1 h-1 bg-[#F7F2EB] rounded-full" />
              </span>
              <span className="w-3.5 h-px bg-clay/60" />
              <span className="w-1.5 h-1.5 bg-clay rotate-45" />
              <span className="w-8 h-px bg-clay/35" />
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group block bg-cream border border-border/40 rounded-xl p-5 shadow-sm hover:shadow-luxury hover:border-clay/30 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-stone-warm mb-6 overflow-hidden relative rounded-lg">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-cream/90 backdrop-blur-sm text-[9px] uppercase tracking-[0.22em] font-semibold text-charcoal shadow-sm rounded-md">
                        {categoryLabel(p.category)}
                      </span>
                    </div>
                  </div>
                  <div className="px-1">
                    <h4 className="text-base md:text-lg font-medium uppercase tracking-[0.12em] mb-2 text-charcoal group-hover:text-clay transition-colors font-display">
                      {p.name}
                    </h4>
                    <p className="text-charcoal/65 text-xs font-light leading-relaxed line-clamp-2 min-h-[40px]">
                      {p.subtitle}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="py-24 md:py-32 bg-stone-warm">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="bg-cream p-6 md:p-8 shadow-luxury">
              <img
                src={manufacturing}
                alt="Dehyug stainless-steel manufacturing facility"
                loading="lazy"
                className="w-full aspect-[16/10] object-cover"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal className="text-clay text-eyebrow mb-6">State-of-the-Art Production</Reveal>
            <Reveal as="h2" delay={0.1} className="font-display text-4xl md:text-5xl font-light mb-8 text-charcoal">
              Purity guaranteed by modern science.
            </Reveal>
            <Reveal delay={0.15} className="text-charcoal/60 font-light leading-relaxed mb-8 text-base">
              Our plant integrates cold-grinding technology with rigorous quality control. Each batch
              undergoes multi-stage cleaning and metal detection — what reaches your kitchen is
              nothing but the essence of the spice.
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="space-y-4">
                {[
                  "Cold-grinding process",
                  "ISO 22000 certified",
                  "Zero human-touch packaging",
                  "Direct-to-farmer sourcing",
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-charcoal/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-clay" />
                    {feat}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container-luxury max-w-3xl text-center">
          <Reveal as="h2" className="font-display text-4xl md:text-6xl text-charcoal mb-8 leading-tight">
            Bring the Dehyug legacy <br />
            <span className="italic">to your kitchen.</span>
          </Reveal>
          <Reveal delay={0.1} className="text-charcoal/60 font-light mb-12 max-w-xl mx-auto">
            Available for retail, wholesale, and export inquiries worldwide.
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-charcoal text-cream px-10 py-5 text-[11px] uppercase tracking-[0.2em] hover:bg-clay transition-colors"
            >
              Get In Touch
              <span className="w-6 h-px bg-cream" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function categoryLabel(slug: string) {
  if (slug === "pure-spices") return "Pure";
  if (slug === "blended-spices") return "Blended";
  return "Seasoning";
}
