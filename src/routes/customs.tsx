import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText, Phone, Mail, MapPin, Search, X, ArrowRight } from "lucide-react";
import { customsSections } from "@/data/customs";

export const Route = createFileRoute("/customs")({
  head: () => ({
    meta: [
      { title: "گومرگی ئیبراهیم خەلیل — نرخی گومرگی ئۆتۆمبێل" },
      {
        name: "description",
        content:
          "خزمەتگوزاری دەرکردنی گومرگی ئۆتۆمبێل لە دەروازەی ئیبراهیم خەلیل — خشتەی نرخەکان بۆ ساڵانی 2024، 2025 و 2026.",
      },
      { property: "og:title", content: "گومرگی ئیبراهیم خەلیل — نرخی گومرگی ئۆتۆمبێل" },
      {
        property: "og:description",
        content: "خشتەی تەواوی رسومی گومرگی ئۆتۆمبێل لە دەروازەی ئیبراهیم خەلیل.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomsPage,
});

function formatUSD(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function CustomsPage() {
  const [q, setQ] = useState("");

  const sections = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return customsSections;
    return customsSections
      .map((s) => ({
        ...s,
        rows: s.rows.filter(
          (r) => r.name.toLowerCase().includes(t) || s.title.toLowerCase().includes(t),
        ),
      }))
      .filter((s) => s.rows.length > 0);
  }, [q]);

  const total = useMemo(() => sections.reduce((a, s) => a + s.rows.length, 0), [sections]);

  return (
    <div dir="rtl" className="min-h-screen bg-canvas font-kurdish text-ink">
      {/* Header */}
      <header className="border-b border-navy/10 bg-navy text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-8">
          <div className="flex min-w-0 items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <FileText className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold leading-tight sm:text-lg">
                گومرگی ئیبراهیم خەلیل
              </h1>
              <p dir="ltr" className="mt-0.5 truncate text-right text-sm text-white sm:text-base">
                Ibrahim Khalil Border Crossing
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

      {/* Service provider / contact */}
      <section className="border-b border-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <h2 className="text-xl font-bold text-navy sm:text-2xl">
            دەرکردن و تەخلیسی گومرگی ئۆتۆمبێل، کەلوپەل و ماکینە
          </h2>
          <p className="mt-2 text-sm text-ink">
            بەڕێوەبردنی کاروبارێن گومرگی لە دەروازەی سنووری ئیبراهیم خەلیل
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <InfoCard icon={<MapPin className="h-4 w-4" />} label="بەڕێوەبەری خزمەتگوزاری">
              <span>نیچەرڤان عیسمەت</span>
              <span dir="ltr" className="mt-0.5 block text-right text-xs text-ink">
                Nichervan Esmat
              </span>
            </InfoCard>
            <InfoCard icon={<Phone className="h-4 w-4" />} label="ژمارەی مۆبایل">
              <a dir="ltr" href="tel:+9647504445538" className="block text-right hover:underline">
                +964-750-444-55-38
              </a>
            </InfoCard>
            <InfoCard icon={<Mail className="h-4 w-4" />} label="ئیمەیڵ">
              <a
                dir="ltr"
                href="mailto:nichervanbosali89@gmail.com"
                className="block break-all text-right hover:underline"
              >
                nichervanbosali89@gmail.com
              </a>
            </InfoCard>
          </div>

          <p className="mt-4 rounded-xl border border-navy/15 bg-canvas px-4 py-3 text-sm font-medium text-ink">
            تێبینی: ئەم نرخانە بێ مەسروفات و ئیجازە (بەڵگەنامە) ن.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="border-b border-navy/10 bg-canvas">
        <div className="mx-auto max-w-3xl px-5 py-8 text-center">
          <div className="relative mx-auto max-w-xl">
            <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="BMW, MERCEDES GLE, صالون 4 بستن..."
              className="w-full rounded-2xl border-2 border-[#111827] bg-white py-4 pl-16 pr-14 text-right text-base text-ink shadow-[0_2px_8px_rgba(0,0,0,0.08)] outline-none transition placeholder:text-[#374151] focus:border-navy focus:ring-4 focus:ring-navy/10"
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
          <p className="mt-4 text-xs text-muted">{total} تۆمار</p>
        </div>
      </section>

      {/* Tables */}
      <main className="mx-auto max-w-6xl space-y-8 px-5 py-10">
        {sections.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy/20 bg-white p-10 text-center">
            <p className="text-sm text-ink">هیچ ئەنجامێک نەدۆزرایەوە</p>
          </div>
        ) : (
          sections.map((s) => (
            <section key={s.title} className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft">
              <div className="flex items-center justify-between gap-3 border-b border-navy/10 bg-navy px-5 py-3.5 text-white">
                <h3 className="truncate text-sm font-bold sm:text-base">{s.title}</h3>
                <span className="shrink-0 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-bold">
                  {s.rows.length}
                </span>
              </div>

              {/* Desktop table */}
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full text-right text-sm">
                  <thead className="bg-canvas text-xs font-bold text-ink">
                    <tr>
                      <th className="px-5 py-3">جۆری ئۆتۆمبێل</th>
                      <th className="px-4 py-3 w-28">2024</th>
                      <th className="px-4 py-3 w-28">2025</th>
                      <th className="px-4 py-3 w-28">2026</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.rows.map((r, i) => (
                      <tr key={i} className="border-t border-navy/5 transition hover:bg-navy/5">
                        <td className="px-5 py-3 font-medium text-ink">{r.name}</td>
                        <td dir="ltr" className="px-4 py-3 text-right font-bold text-ink">
                          {formatUSD(r.y2024)}
                        </td>
                        <td dir="ltr" className="px-4 py-3 text-right font-bold text-ink">
                          {formatUSD(r.y2025)}
                        </td>
                        <td dir="ltr" className="px-4 py-3 text-right font-bold text-navy">
                          {formatUSD(r.y2026)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="divide-y divide-navy/5 sm:hidden">
                {s.rows.map((r, i) => (
                  <div key={i} className="px-4 py-4">
                    <p className="text-sm font-bold text-ink">{r.name}</p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <PriceCell year="2024" value={formatUSD(r.y2024)} />
                      <PriceCell year="2025" value={formatUSD(r.y2025)} />
                      <PriceCell year="2026" value={formatUSD(r.y2026)} highlight />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-navy/10 bg-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row">
          <p className="text-center text-sm sm:text-right">
            نیچەرڤان عیسمەت —{" "}
            <a dir="ltr" href="tel:+9647504445538" className="hover:underline">
              +964-750-444-55-38
            </a>
          </p>
          <p className="text-xs text-white">© {new Date().getFullYear()} PNYANSH CARS SHIPPING</p>
        </div>
      </footer>
    </div>
  );
}

function PriceCell({
  year,
  value,
  highlight,
}: {
  year: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-2 py-2 text-center ${
        highlight ? "border-navy/20 bg-navy/5" : "border-navy/10 bg-canvas"
      }`}
    >
      <p className="text-[10px] font-bold text-ink">{year}</p>
      <p dir="ltr" className={`text-xs font-bold ${highlight ? "text-navy" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-canvas p-4">
      <div className="flex items-center gap-2 text-xs font-bold text-ink">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-1.5 text-sm font-medium text-ink">{children}</div>
    </div>
  );
}
