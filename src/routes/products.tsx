import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { categories, products, type CategorySlug } from "@/lib/products";

const searchSchema = z.object({
  category: z.enum(["pure-spices", "blended-spices", "seasoning"]).optional(),
});

export const Route = createFileRoute("/products")({
  validateSearch: searchSchema,
  component: ProductsPage,
});

function ProductsPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState("");

  const activeCategory: CategorySlug | "all" = category ?? "all";

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchQuery =
        !query.trim() ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeCategory, query]);

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 border-b border-border">
        <div className="container-luxury">
          <Reveal className="text-clay text-eyebrow mb-4">The Collection</Reveal>
          <Reveal as="h1" delay={0.1} className="font-display text-5xl md:text-7xl font-light text-charcoal max-w-3xl leading-[0.95]">
            Every spice, <span className="italic">obsessively crafted.</span>
          </Reveal>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-20 z-30 bg-cream/85 backdrop-blur-xl border-b border-border">
        <div className="container-luxury py-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2 md:gap-1">
            <CategoryButton
              active={activeCategory === "all"}
              onClick={() => navigate({ search: {} })}
              label="All"
              count={products.length}
            />
            {categories.map((cat) => (
              <CategoryButton
                key={cat.slug}
                active={activeCategory === cat.slug}
                onClick={() => navigate({ search: { category: cat.slug } })}
                label={cat.name}
                count={products.filter((p) => p.category === cat.slug).length}
              />
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              type="search"
              placeholder="Search spices…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-stone-warm border border-transparent focus:border-charcoal/20 outline-none text-sm font-light placeholder:text-charcoal/40 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-20">
        <div className="container-luxury">
          {filtered.length === 0 ? (
            <div className="text-center py-32 text-charcoal/50">
              <p className="font-display text-2xl mb-4">No spices found.</p>
              <p className="text-sm">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-12">
              {filtered.map((p, i) => (
                <Reveal key={p.slug} delay={Math.min(i * 0.04, 0.4)}>
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="group flex flex-col h-full bg-cream border border-border/40 rounded-xl p-5 shadow-sm hover:shadow-luxury hover:border-clay/30 transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] bg-stone-warm mb-6 overflow-hidden relative rounded-lg shrink-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-cream/90 backdrop-blur-sm text-[9px] uppercase tracking-[0.22em] font-semibold text-charcoal shadow-sm rounded-md">
                          {categoryShort(p.category)}
                        </span>
                      </div>
                    </div>
                    <div className="px-1 flex flex-col flex-grow justify-between">
                      <div className="mb-4">
                        <h3 className="text-base md:text-lg font-medium uppercase tracking-[0.12em] mb-2 text-charcoal group-hover:text-clay transition-colors font-display">
                          {p.name}
                        </h3>
                        <p className="text-charcoal/65 text-xs font-light leading-relaxed line-clamp-2 min-h-[40px]">
                          {p.subtitle}
                        </p>
                      </div>

                      <div>
                        {/* Specifications */}
                        {p.category !== "seasoning" && (
                          <div className="mb-5">
                            <span className="text-[9px] uppercase tracking-[0.15em] text-charcoal/40 block mb-2 font-semibold">
                              Available Sizes:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {(p.category === "pure-spices"
                                ? ["100gm", "200gm", "500gm", "1kg"]
                                : ["50gm", "100gm"]
                              ).map((size) => (
                                <span
                                  key={size}
                                  className="px-2 py-0.5 bg-stone-warm border border-charcoal/5 text-[9px] tracking-wider text-charcoal/70 rounded-md font-semibold"
                                >
                                  {size}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const message = encodeURIComponent(`Hi Devyug Masala, I would like to inquire about ${p.name}.`);
                            window.open(`https://wa.me/917874374333?text=${message}`, "_blank");
                          }}
                          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-charcoal/10 hover:border-charcoal/40 hover:bg-charcoal/5 transition-all duration-300 text-[10px] font-semibold uppercase tracking-[0.15em] text-charcoal rounded-lg"
                        >
                          <MessageCircle size={13} strokeWidth={2} className="text-emerald-600" />
                          Inquire via WhatsApp
                        </button>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function CategoryButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all border ${
        active
          ? "bg-charcoal text-cream border-charcoal"
          : "bg-transparent text-charcoal/70 border-transparent hover:border-charcoal/20"
      }`}
    >
      {label} <span className="opacity-50 ml-1">({count})</span>
    </button>
  );
}

function categoryShort(slug: string) {
  if (slug === "pure-spices") return "Pure";
  if (slug === "blended-spices") return "Blended";
  return "Seasoning";
}
