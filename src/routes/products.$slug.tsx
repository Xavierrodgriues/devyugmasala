import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { getProduct, getRelated, categories } from "@/lib/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <h1 className="font-display text-5xl text-charcoal mb-4">Product not found</h1>
        <Link to="/products" className="text-clay text-[11px] uppercase tracking-[0.2em] border-b border-clay">
          Browse all products
        </Link>
      </div>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const related = getRelated(product.slug, product.category);
  const categoryName = categories.find((c) => c.slug === product.category)?.name ?? "";

  const gallery = [product.image, product.image, product.image];

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-28 pb-6 md:pt-32">
        <div className="container-luxury">
          <Link
            to="/products"
            search={{ category: product.category }}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-charcoal/60 hover:text-clay transition-colors"
          >
            <ArrowLeft size={12} strokeWidth={1.5} />
            Back to {categoryName}
          </Link>
        </div>
      </div>

      {/* Detail */}
      <section className="pb-24">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <Reveal className="aspect-[4/3] bg-stone-warm mb-4 overflow-hidden">
              <img
                src={gallery[active]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </Reveal>
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-[4/3] bg-stone-warm overflow-hidden transition-all ${
                    i === active ? "ring-2 ring-clay ring-offset-4 ring-offset-cream" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={g} alt="" loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="text-clay text-eyebrow">{categoryName}</span>
              <h1 className="font-display text-4xl md:text-5xl font-light text-charcoal mt-4 mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-charcoal/60 font-light italic">{product.subtitle}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <p className="text-charcoal/70 leading-relaxed font-light">{product.description}</p>
            </Reveal>

            <Reveal delay={0.15} className={`mt-10 py-6 border-y border-border ${product.category !== "seasoning" ? "grid grid-cols-2 gap-6" : ""}`}>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40 mb-2">Origin</div>
                <div className="text-sm text-charcoal font-light">{product.origin}</div>
              </div>
              {product.category !== "seasoning" && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40 mb-2">Available Sizes</div>
                  <div className="flex flex-wrap gap-1.5">
                    {(product.category === "pure-spices"
                      ? ["100gm", "200gm", "500gm", "1kg"]
                      : ["50gm", "100gm"]
                    ).map((size) => (
                      <span
                        key={size}
                        className="px-2.5 py-1 bg-stone-warm border border-charcoal/5 text-[10px] tracking-wider text-charcoal/70 rounded-md font-semibold"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-charcoal mb-5">Benefits</h3>
              <ul className="space-y-3">
                {product.benefits.map((b: string) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-charcoal/70 font-light">
                    <Check size={14} strokeWidth={1.5} className="mt-1 text-clay shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.25} className="mt-8">
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-charcoal mb-5">Features</h3>
              <ul className="space-y-3">
                {product.features.map((f: string) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-charcoal/70 font-light">
                    <Check size={14} strokeWidth={1.5} className="mt-1 text-clay shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.3} className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/917874374333?text=${encodeURIComponent(`Hi Devyug Masala, I would like to inquire about ${product.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center inline-flex items-center justify-center gap-3 bg-charcoal text-cream px-8 py-5 text-[11px] uppercase tracking-[0.2em] hover:bg-clay transition-colors"
              >
                <MessageCircle size={14} strokeWidth={2} />
                Inquire via WhatsApp
              </a>
              <Link
                to="/contact"
                className="flex-1 text-center inline-flex items-center justify-center gap-3 border border-charcoal/20 text-charcoal px-8 py-5 text-[11px] uppercase tracking-[0.2em] hover:bg-charcoal/5 transition-colors"
              >
                Other Inquiries
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 md:py-28 bg-stone-warm">
          <div className="container-luxury">
            <Reveal className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="font-display text-3xl md:text-4xl text-charcoal">You may also like</h2>
              <Link
                to="/products"
                search={{ category: product.category }}
                className="text-[11px] uppercase tracking-[0.2em] border-b border-charcoal pb-1 hover:text-clay hover:border-clay transition-all"
              >
                View All {categoryName}
              </Link>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <Link to="/products/$slug" params={{ slug: p.slug }} className="group block">
                    <div className="aspect-[4/3] bg-cream mb-5 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                    <h4 className="text-sm uppercase tracking-[0.15em] text-charcoal group-hover:text-clay transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-charcoal/50 mt-1">{p.subtitle}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
