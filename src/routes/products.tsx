import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { categories, products, isPacketProduct, isLandscapeFallback, type CategorySlug } from "@/lib/products";

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
      <section className="sticky top-20 z-30 bg-[#F7F2EB]/90 backdrop-blur-xl border-b border-border">
        <div className="container-luxury py-3 md:py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="relative flex-grow overflow-hidden w-full md:w-auto">
            <div className="flex overflow-x-auto flex-nowrap gap-2 pb-3 -mx-4 px-4 scrollbar-thin md:mx-0 md:px-0 md:pb-0 md:flex-wrap">
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
            {/* Subtle Right Fade Gradient to indicate scroll availability on mobile */}
            <div className="absolute right-0 top-0 bottom-3 w-12 bg-gradient-to-l from-[#F7F2EB] to-transparent pointer-events-none md:hidden" />
          </div>
          <div className="relative w-full md:w-64">
            <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              type="search"
              placeholder="Search spices…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-warm border border-transparent focus:border-charcoal/20 outline-none text-xs font-light placeholder:text-charcoal/40 transition-colors"
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
                    className="group flex flex-col h-full bg-transparent transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className={`aspect-square bg-[#FAF6F2] hover:bg-[#F3EBE1] border border-charcoal/5 mb-5 relative flex items-center justify-center rounded-lg transition-colors duration-500 overflow-hidden ${isPacketProduct(p.slug) ? 'p-10' : 'p-0'}`}>
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className={`transition-transform duration-700 ease-out group-hover:scale-105 ${isPacketProduct(p.slug) ? 'max-h-full max-w-full object-contain' : `w-full h-full object-cover ${isLandscapeFallback(p.slug) ? 'object-left' : ''}`}`}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 bg-cream/95 backdrop-blur-sm text-[8px] uppercase tracking-[0.2em] font-semibold text-charcoal shadow-sm rounded">
                          {categoryShort(p.category)}
                        </span>
                      </div>
                    </div>
                    <div className="px-1 flex flex-col flex-grow justify-between">
                      <div className="mb-3">
                        <h3 className="text-sm md:text-base font-semibold uppercase tracking-[0.15em] mb-1.5 text-charcoal group-hover:text-clay transition-colors font-display">
                          {p.name}
                        </h3>
                        <p className="text-charcoal/60 text-xs font-light leading-relaxed line-clamp-2 min-h-[36px]">
                          {p.subtitle}
                        </p>
                      </div>

                      <div>
                        {/* Specifications */}
                        {p.category !== "seasoning" && (
                          <div className="mb-4">
                            <span className="text-[9px] uppercase tracking-[0.15em] text-charcoal/40 block mb-1 font-semibold">
                              Sizes:
                            </span>
                            <p className="text-[10px] text-charcoal/60 font-light tracking-wide">
                              {(p.category === "pure-spices"
                                ? ["100g", "200g", "500g", "1kg"]
                                : ["50g", "100g"]
                              ).join(" · ")}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between border-t border-charcoal/10 pt-4 mt-2">
                          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-clay group-hover:underline transition-all">
                            Explore Details →
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const message = encodeURIComponent(`Hi Devyug Masala, I would like to inquire about ${p.name}.`);
                              window.open(`https://wa.me/917874374333?text=${message}`, "_blank");
                            }}
                            className="flex items-center gap-1 text-[9px] uppercase tracking-[0.15em] text-charcoal/60 hover:text-charcoal transition-colors font-semibold"
                          >
                            <MessageCircle size={11} strokeWidth={2} className="text-emerald-600" />
                            WhatsApp
                          </button>
                        </div>
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
      className={`px-4 py-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-all border rounded-full shrink-0 whitespace-nowrap ${
        active
          ? "bg-charcoal text-cream border-charcoal"
          : "bg-transparent text-charcoal/70 border-charcoal/15 hover:border-charcoal/40"
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
