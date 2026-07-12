import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Truck, Phone, Mail, MapPin, Info, ChevronDown, X } from "lucide-react";
import { shippingRates } from "@/data/shipping";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "گواستنەوەی ئۆتۆمبێل - PNYANSH CARS SHIPPING" },
      {
        name: "description",
        content:
          "داشبۆردی نرخی گواستنەوەی ئۆتۆمبێل بۆ کۆمپانیای PNYANSH — گەڕان بەپێی ویلایەت و شار و لق.",
      },
    ],
  }),
  component: Dashboard,
});

function formatUSD(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function Dashboard() {
  const [q, setQ] = useState("");
  const [showRules, setShowRules] = useState(false);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return shippingRates;
    return shippingRates.filter(
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
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-6">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
            <Truck className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold leading-tight sm:text-2xl">
              گواستنەوەی ئۆتۆمبێل
            </h1>
            <p dir="ltr" className="truncate text-right text-xs text-white sm:text-sm">
              PNYANSH CARS SHIPPING
            </p>
          </div>
        </div>
      </header>

      {/* Hero + Search */}
      <section className="border-b border-navy/10 bg-gradient-to-b from-navy/5 to-transparent">
        <div className="mx-auto max-w-3xl px-5 py-10 text-center sm:py-14">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            گەڕان بۆ نرخی گواستنەوە
          </h2>
          <p className="mt-2 text-sm text-muted">
            ناوی ویلایەت یان شار بنووسە بە ئینگلیزی — ئەنجامەکان دیار دەبن
          </p>

          <div className="relative mx-auto mt-6 max-w-xl">
            <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              dir="ltr"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Texas, Los Angeles, Miami..."
              className="w-full rounded-2xl border border-navy/15 bg-white py-4 pl-12 pr-12 text-right text-base text-ink shadow-soft outline-none transition placeholder:text-muted/70 focus:border-navy focus:ring-4 focus:ring-navy/10"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted hover:bg-navy/5"
                aria-label="پاککردنەوە"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <p className="mt-4 text-xs text-muted">
            {results.length} ئەنجام لە {shippingRates.length} تۆمار
          </p>
        </div>
      </section>

      {/* Results */}
      <main className="mx-auto max-w-6xl px-5 py-8">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy/20 bg-white p-10 text-center">
            <p className="text-sm text-muted">هیچ ئەنجامێک نەدۆزرایەوە</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r, i) => (
              <article
                key={i}
                className="group rounded-2xl border border-navy/10 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
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
                  <span className="text-[11px] font-bold text-emerald-700">بەردەستە</span>
                </div>

              </article>
            ))}
          </div>
        )}
      </main>

      {/* Rules */}
      <section className="border-t border-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <button
            onClick={() => setShowRules((s) => !s)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-navy/15 bg-canvas px-5 py-4 text-right transition hover:bg-navy/5"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-white">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-navy">تێبینی و وردەکارییەکان</p>
                <p className="text-xs text-muted">یاسا و کرێی زیادە</p>
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-navy transition ${showRules ? "rotate-180" : ""}`}
            />
          </button>

          {showRules && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <RuleCard
                title="ئۆتۆمبێلی گەورە"
                body="زیادەی $300 بۆ گشت ناوچەکان (جگە لە Texas، California، Washington کە زیادەکەی $500 دەبێت)."
              />
              <RuleCard
                title="ئۆتۆمبێلی هایبرید"
                body="زیادەی $150 بۆ عەقەبە، جەبەل عەلی، ئوم قەسڕ."
              />
              <RuleCard title="کۆمسیۆنی مەزادی مەنهایم" body="$100" />
              <RuleCard
                title="غەرامەی مانەوە"
                body="دوای 7 ڕۆژ، $10 بۆ هەر ڕۆژێک."
              />
            </div>
          )}
        </div>
      </section>

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
          <p className="mx-auto max-w-6xl px-5 py-4 text-center text-xs text-white">
            © {new Date().getFullYear()} PNYANSH CARS SHIPPING
          </p>
        </div>
      </footer>
    </div>
  );
}

function RuleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-canvas p-4">
      <p className="font-bold text-navy">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink">{body}</p>
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
      <div className="flex items-center gap-2 text-xs text-white">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-1 text-sm text-white">{children}</div>
    </div>
  );
}
