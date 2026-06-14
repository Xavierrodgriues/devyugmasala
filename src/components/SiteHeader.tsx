import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Our Story" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FDFCFB]/90 backdrop-blur-xl border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-luxury h-20 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center"
          >
            <img
              src="/product/logo.png"
              alt="Dehyug Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-charcoal/80">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-clay" }}
                className="hover:text-clay transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:inline-flex px-5 py-2 border border-charcoal text-[10px] uppercase tracking-[0.2em] text-charcoal hover:bg-charcoal hover:text-cream transition-all"
            >
              Inquiry
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="md:hidden p-2 -mr-2 text-charcoal"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-[#FDFCFB] md:hidden flex flex-col">
          <div className="container-luxury h-20 flex items-center justify-between">
            <img
              src="/product/logo.png"
              alt="Dehyug Logo"
              className="h-16 w-auto object-contain"
            />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="p-2 -mr-2"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-6 mt-12">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-charcoal py-3 border-b border-border"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
