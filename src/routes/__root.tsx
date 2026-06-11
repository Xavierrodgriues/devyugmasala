import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-charcoal">404</h1>
        <h2 className="mt-4 font-display text-3xl text-charcoal">Page not found</h2>
        <p className="mt-2 text-sm text-charcoal/60">
          This page seems to have wandered off the spice route.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-charcoal px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-cream hover:bg-clay transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-charcoal">Something went wrong</h1>
        <p className="mt-2 text-sm text-charcoal/60">
          We're looking into it. Please try again or return home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-charcoal px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-cream hover:bg-clay transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="border border-charcoal/20 px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-charcoal hover:border-charcoal transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dehyug Masala — Premium Indian Spices Since 1960" },
      {
        name: "description",
        content:
          "Dehyug Masala crafts heritage Indian spices, blended masalas and seasonings. Pure, single-origin, stone-ground since 1960.",
      },
      { name: "author", content: "Dehyug Masala" },
      { property: "og:title", content: "Dehyug Masala — Premium Indian Spices Since 1960" },
      {
        property: "og:description",
        content:
          "Heritage Indian spices, masala blends and seasonings. Stone-ground purity since 1960.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dehyug Masala — Premium Indian Spices Since 1960" },
      { name: "description", content: "Dehyug Spice Canvas is a premium website showcasing Dehyug Masala's spice products with an elegant, modern design." },
      { property: "og:description", content: "Dehyug Spice Canvas is a premium website showcasing Dehyug Masala's spice products with an elegant, modern design." },
      { name: "twitter:description", content: "Dehyug Spice Canvas is a premium website showcasing Dehyug Masala's spice products with an elegant, modern design." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fd22bd4f-68c6-4e6a-aa46-b49bfa01e0f9/id-preview-13b64dfa--f39d553f-75fe-42d1-b672-098cd44b61e5.lovable.app-1781156389233.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fd22bd4f-68c6-4e6a-aa46-b49bfa01e0f9/id-preview-13b64dfa--f39d553f-75fe-42d1-b672-098cd44b61e5.lovable.app-1781156389233.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
