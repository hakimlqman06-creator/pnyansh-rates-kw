import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Ship, Phone, Mail, MapPin, ArrowRight, X } from "lucide-react";
import { jabalAliRates } from "@/data/jabalAli";

export const Route = createFileRoute("/jabal-ali")({
  head: () => ({
    meta: [
      { title: "نرخەکانی جەبەل عەلی — PNYANSH CARS SHIPPING" },
      {
        name: "description",
        content:
          "نرخی گواستنەوەی ئۆتۆمبێل لە ئەمریکاوە بۆ جەبەل عەلی — گەڕان بەپێی ویلایەت و شار و لق.",
      },
      { property: "og:title", content: "نرخەکانی جەبەل عەلی — PNYANSH CARS SHIPPING" },
      {
        property: "og:description",
        content: "خشتەی تەواوی نرخی گواستنەوەی ئۆتۆمبێل بۆ جەبەل عەلی.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JabalAliPage,
});

function formatUSD(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function JabalAliPage() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return jabalAliRates;
    return jabalAliRates.filter(
      (r) =>
        r.state.toLowerCase().includes(t) ||
        r.city.toLowerCase().includes(t) ||
        r.branch.toLowerCase().includes(t),
    );
  }, [q]);

  return (
    <div dir="rtl" className="min-h-screen bg-canvas font-kurdish text-ink">
      {/* Header */}
      <header className="border-b border-navy/10 bg-navy text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-7 sm:py-8">
          <div className="flex min-w-0 items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <Ship className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold leading-tight sm:text-lg">
                نرخەکانی جەبەل عەلی
              </h1>
              <p dir="ltr" className="mt-0.5 truncate text-right text-sm text-white sm:text-base">
                Jabal Ali Shipping Rates
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <ArrowRight className="h-4 w-4" />
            سەرەکی
          </Link>
        </div>
      </header>

      {/* Hero + Search */}
      <section className="border-b border-navy/10 bg-gradient-to-b from-navy/5 to-transparent">
        <div className="mx-auto max-w-3xl px-5 pb-10 pt-8 text-center sm:pb-14 sm:pt-10">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            گەڕان بۆ نرخی جەبەل عەلی
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            ناوی ویلایەت یان شار بنووسە بە ئینگلیزی — ئەنجامەکان دیار دەبن
          </p>

          <div className="relative mx-auto mt-6 max-w-xl">
            <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink" />
            <input
              dir="ltr"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Texas, Los Angeles, Miami..."
              className="w-full rounded-2xl border-2 border-ink/70 bg-surface py-4 pl-16 pr-14 text-right text-base text-ink shadow-[0_2px_8px_rgba(0,0,0,0.08)] outline-none transition placeholder:text-ink/60 focus:border-navy focus:shadow-[0_4px_12px_rgba(0,0,0,0.12)] focus:ring-4 focus:ring-navy/10"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ(q.slice(0, -1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-navy p-2.5 text-white shadow-sm transition hover:bg-navy/90 active:scale-95"
                aria-label="سڕینەوەی پیتێک"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <p className="mt-4 text-xs text-ink-soft">
            {results.length} ئەنجام لە {jabalAliRates.length} تۆمار
          </p>
        </div>
      </section>

      {/* Results */}
      <main className="mx-auto max-w-6xl px-5 py-8">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy/20 bg-surface p-10 text-center">
            <p className="text-sm text-ink-soft">هیچ ئەنجامێک نەدۆزرایەوە</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r, i) => (
              <article
                key={i}
                className="group rounded-2xl border border-navy/10 bg-surface p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-ink">
                      ویلایەت
                    </p>
                    <p dir="ltr" className="truncate text-right text-base font-bold text-navy">
                      {r.state}
                    </p>
                  </div>
                  <span
                    dir="ltr"
                    className="shrink-0 rounded-xl bg-navy px-3 py-1.5 text-sm font-bold text-white"
                  >
                    {formatUSD(r.total)}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-navy/5 pt-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-ink">شار</p>
                    <p dir="ltr" className="truncate text-right text-sm font-medium text-ink">
                      {r.city}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-ink">لق</p>
                    <p dir="ltr" className="truncate text-right text-sm font-medium text-ink">
                      {r.branch}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-navy/5 pt-3">
                  <span className="text-[11px] font-semibold text-ink">تێچووی گواستنەوە</span>
                  <span className="text-[11px] font-bold text-success">بەردەستە</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-navy/10 bg-navy text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold">کۆمپانیای PNYANSH</h3>
            <p className="mt-2 text-sm text-white">
              خزمەتگوزاری گواستنەوەی ئۆتۆمبێل لە ئەمریکاوە بۆ عێراق
            </p>
          </div>
          <FooterItem icon={<Phone className="h-4 w-4" />} label="ژمارەی مۆبایل">
            <a dir="ltr" href="tel:+9647504800464" className="hover:underline">
              009647504800464
            </a>
          </FooterItem>
          <FooterItem icon={<Mail className="h-4 w-4" />} label="ئیمەیڵ">
            <a dir="ltr" href="mailto:pnyanshco@gmail.com" className="hover:underline">
              pnyanshco@gmail.com
            </a>
          </FooterItem>
          <FooterItem icon={<MapPin className="h-4 w-4" />} label="ناونیشان">
            <span dir="ltr" className="block text-right">
              Iraq - Duhok - Akre
            </span>
            <span dir="ltr" className="block text-right">
              Iraq - Erbil - 100M Street
            </span>
          </FooterItem>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-4 sm:flex-row">
            <p className="text-center text-xs text-white sm:text-right">
              © {new Date().getFullYear()} PNYANSH CARS SHIPPING
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              aria-label="گەڕانەوە بۆ سەرەوەی پەڕە"
            >
              Home
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-bold text-white">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-1 text-sm text-white">{children}</div>
    </div>
  );
}
