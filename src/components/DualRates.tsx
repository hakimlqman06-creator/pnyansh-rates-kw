import { useMemo, useState } from "react";
import { Search, X, Ship, Anchor } from "lucide-react";
import { shippingRates, type ShippingRate } from "@/data/shipping";
import { jabalAliRates } from "@/data/jabalAli";

function money(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function norm(s: string) {
  return s.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

type Pair = {
  state: string;
  city: string;
  branch: string;
  mersin: number | null;
  jabalAli: number | null;
};

const pairs: Pair[] = (() => {
  const map = new Map<string, Pair>();
  const put = (r: ShippingRate, kind: "mersin" | "jabalAli") => {
    const key = norm(r.branch) || norm(r.state + r.city);
    const cur = map.get(key);
    if (cur) {
      cur[kind] = r.total;
      if (!cur.city) cur.city = r.city;
      return;
    }
    map.set(key, {
      state: r.state,
      city: r.city,
      branch: r.branch,
      mersin: kind === "mersin" ? r.total : null,
      jabalAli: kind === "jabalAli" ? r.total : null,
    });
  };
  shippingRates.forEach((r) => put(r, "mersin"));
  jabalAliRates.forEach((r) => put(r, "jabalAli"));
  return [...map.values()];
})();

export default function DualRates() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return pairs
      .filter(
        (p) =>
          p.state.toLowerCase().includes(t) ||
          p.city.toLowerCase().includes(t) ||
          p.branch.toLowerCase().includes(t),
      )
      .slice(0, 60);
  }, [q]);

  return (
    <section id="dual-rates" className="border-t border-navy/10 bg-canvas">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="text-center">
          <h2 className="text-xl font-bold text-navy sm:text-2xl">
            بەراوردی نرخی مێرسین و جەبەل عەلی
          </h2>
          <p className="mt-2 text-sm text-ink">
            ناوی ویلایەت، شار یان لق بنووسە — نرخی هەردوو ڕێگا پیشان دەدرێت
          </p>
        </div>

        <div className="relative mx-auto mt-6 max-w-xl">
          <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink" />
          <input
            dir="ltr"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Texas, Los Angeles, Miami..."
            className="w-full rounded-2xl border-2 border-[#111827] bg-white py-4 pl-16 pr-14 text-right text-base text-ink shadow-[0_2px_8px_rgba(0,0,0,0.08)] outline-none transition placeholder:text-[#374151] focus:border-navy focus:ring-4 focus:ring-navy/10"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ(q.slice(0, -1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-navy p-2.5 text-white transition hover:bg-navy/90 active:scale-95"
              aria-label="سڕینەوەی پیتێک"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {q.trim() === "" ? (
          <p className="mt-6 text-center text-sm text-ink">
            بۆ بینینی نرخەکان گەڕان بکە
          </p>
        ) : results.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-navy/20 bg-white p-8 text-center">
            <p className="text-sm text-ink">هیچ ئەنجامێک نەدۆزرایەوە</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {results.map((p, i) => (
              <article
                key={i}
                className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft"
              >
                <div className="border-b border-navy/10 bg-navy/5 px-5 py-3">
                  <p className="text-[11px] font-bold text-ink">ویلایەت / شار</p>
                  <p dir="ltr" className="truncate text-right text-base font-bold text-navy">
                    {p.state} — {p.city}
                  </p>
                  <p dir="ltr" className="truncate text-right text-xs font-medium text-ink">
                    {p.branch}
                  </p>
                </div>

                <div className="divide-y divide-navy/10">
                  <RouteRow
                    icon={<Ship className="h-5 w-5" />}
                    label="مێرسین"
                    en="MERSIN"
                    price={p.mersin}
                  />
                  <RouteRow
                    icon={<Anchor className="h-5 w-5" />}
                    label="جەبەل عەلی"
                    en="JABAL ALI"
                    price={p.jabalAli}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function RouteRow({
  icon,
  label,
  en,
  price,
}: {
  icon: React.ReactNode;
  label: string;
  en: string;
  price: number | null;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy text-white">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="truncate font-bold text-navy">{label}</p>
          <p dir="ltr" className="truncate text-right text-[11px] font-bold tracking-wide text-ink">
            {en}
          </p>
        </div>
      </div>
      {price === null ? (
        <span className="shrink-0 rounded-xl bg-navy/5 px-3 py-1.5 text-xs font-bold text-ink">
          بەردەست نییە
        </span>
      ) : (
        <span
          dir="ltr"
          className="shrink-0 rounded-xl bg-navy px-3 py-1.5 text-sm font-bold text-white"
        >
          {money(price)}
        </span>
      )}
    </div>
  );
}
