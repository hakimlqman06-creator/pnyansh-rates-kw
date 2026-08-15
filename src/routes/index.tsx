import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, Truck, Phone, Mail, MapPin, Info, ChevronDown, X, Menu } from "lucide-react";
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
      <header className="relative z-50 border-b border-white/10 bg-navy text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-5">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20 sm:h-12 sm:w-12">
              <Truck className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold leading-tight sm:text-xl">
                گواستنەوەی ئۆتۆمبێل
              </h1>
              <p dir="ltr" className="truncate text-right text-[11px] text-white sm:text-xs">
                PNYANSH CARS SHIPPING
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 sm:flex sm:gap-3" aria-label="ناوبەرگری سەرەوە">
            <a
              href="#details"
              className="rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              وردەکاریەکان
            </a>
            <a
              href="#about-company"
              className="rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              دەربارەی کۆمپانیا
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((s) => !s)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20 sm:hidden"
            aria-label={menuOpen ? "داخستنی مێنو" : "کردنەوەی مێنو"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-navy px-4 pb-4 sm:hidden">
            <nav className="flex flex-col gap-1 pt-3" aria-label="ناوبەرگری مۆبایل">
              <a
                href="#details"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                وردەکاریەکان
              </a>
              <a
                href="#about-company"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                دەربارەی کۆمپانیا
              </a>
            </nav>
          </div>
        )}
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
            <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink" />
            <input
              dir="ltr"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Texas, Los Angeles, Miami..."
              className="w-full rounded-2xl border-2 border-[#111827] bg-white py-4 pl-16 pr-14 text-right text-base text-ink shadow-[0_2px_8px_rgba(0,0,0,0.08)] outline-none transition placeholder:text-[#374151] focus:border-navy focus:shadow-[0_4px_12px_rgba(0,0,0,0.12)] focus:ring-4 focus:ring-navy/10"
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
      <section id="details" className="border-t border-navy/10 bg-white">
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
                body="زیادەی $300 بۆ گشت ناوچەکان، جگە لە ویلایەتەکانی (Texas، California، Washington) کە زیادەکەی $500 دەبێت بۆ گەیاندن بە (عەقەبە، ئوم قەسر، مێرسین)."
              />
              <RuleCard
                title="ئۆتۆمبێلی هایبرید"
                body="بۆ (عەقەبە، جەبەل عەلی، ئوم قەسر) بڕی $150 وەردەگیرێت. بۆ گەیاندن بە (مێرسین): $150 بۆ ویلایەتەکانی (New Jersey، Georgia، Texas) و $300 بۆ (California، Washington)."
              />
              <RuleCard title="کۆمسیۆنی مەزادی مەنهایم" body="$100 کۆمسیۆن بۆ هەر ئۆتۆمبێلێک کە لەو مەزادە کڕدرێت." />
              <RuleCard
                title="پێشانگای ئازاد"
                body="ماوەی 7 ڕۆژ مۆڵەتی مانەوە هەیە دوای کردنەوەی کۆنتێنەر، دواتر $10 غەرامە بۆ هەر ڕۆژێک."
              />
              <RuleCard
                title="نرخەکان چی ناگرێتەخۆ"
                body="نرخەکانی سەرەوە کرێی کردنەوەی کۆنتێنەر لە عەقەبە، هەروەها مەترسییەکانی گواستنەوە و زیادەی سووتەمەنی ناگرێتەخۆ."
              />

              <RuleCard

                title="پەسەندکردنی بەڵگەنامە"
                body="ڕسومی سەلماندنی ئۆراقی خاوەندارێتی لە نێوان $100 - $300 دەبێت."
              />
              <RuleCard
                title="گواستنەوەی دوور"
                body="زیادەی $50 - $150 بۆ ئەو ئۆتۆمبێلانەی لە ناوچەی (Offsite, Sublot) دەگوازرێنەوە."
              />
              <RuleCard
                title="کۆمسیۆنی بروکەر"
                body="$100 بۆ ناوچە جێگەی نیگەرانییەکان."
              />
              <RuleCard
                title="بەرپرسیارێتی کۆمپانیا"
                body="کۆمپانیا بەرپرس نییە لە هەر زیانێکی پێش وەرگرتن لە کۆگا، هەروەها گەرەنتی بۆ بوونی کلیل، کەتالیزەر (حەجەر)، یان پارچەکانی تری ئۆتۆمبێل لە مەزاددا ناکات (بەپێی ڕێنماییەکانی مەزاد)."
              />
              <RuleCard
                title="کارەساتە سروشتییەکان"
                body="کۆمپانیا بەرپرس نییە لە هەر دواکەوتنێک کە بەهۆی کارەساتی سروشتی و دەرەوەی دەسەڵاتی کۆمپانیاوە بێت."
              />
              <RuleCard
                title="کۆنتێنەری 45 پێ"
                body="زیادەی $150 وەک کرێی جیاوازی قەبارە بۆ ئۆتۆمبێلی (SUV)."
              />
              <RuleCard
                title="کۆگای ئیمارات"
                body="ماوەی 7 ڕۆژ مۆڵەتی مانەوە هەیە لە بەرواری گەیشتن، دواتر $20 دەرهەمی ئیماراتی غەرامە بۆ هەر ڕۆژێک."
              />
              <RuleCard
                title="گومرگی جەبەل عەلی"
                body="$100 ڕسومی بدل گومرگ و باج بۆ ئۆتۆمبێلەکان."
              />
              <RuleCard
                title="پەسەندکردنی بەڵگەنامەی جەبەل عەلی"
                body="$150 دەرهەمی ئیماراتی."
              />
              <RuleCard
                title="گومرگ و باجی گشتی"
                body="5% گومرگ و 5% باج لەسەر نرخی پسوولەی مەزاد وەردەگیرێت، دوای هەناردەکردنی ئۆتۆمبێلەکە پارەکە دەگەڕێندرێتەوە."
              />
              <RuleCard
                title="مۆڵەتی پارەدان"
                body="هیچ غەرامەیەک ناکەوێتە سەر کڕیار ئەگەر پارەکە لە ڕۆژی دوای کڕین پێش کاتژمێر 10ی بەیانی بدرێت."
              />

            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="about-company" className="border-t border-navy/10 bg-navy text-white">
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
