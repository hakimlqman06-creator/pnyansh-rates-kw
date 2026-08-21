import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Moon, Settings as SettingsIcon, Sun } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "ڕێکخستن — PNYANSH CARS SHIPPING" },
      {
        name: "description",
        content: "ڕێکخستنی ماڵپەر — هەڵکردن و کوژاندنەوەی دۆخی تاریک (Dark Mode).",
      },
      { property: "og:title", content: "ڕێکخستن — PNYANSH CARS SHIPPING" },
      { property: "og:description", content: "دۆخی تاریک و ڕێکخستنی دیمەنی ماڵپەر." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setDark(saved === "dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-canvas font-kurdish text-ink">
      <header className="border-b border-navy/10 bg-navy text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-7">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <SettingsIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-base font-bold sm:text-lg">ڕێکخستن</h1>
              <p dir="ltr" className="mt-0.5 text-right text-sm text-white">
                Settings
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <ArrowRight className="h-4 w-4" />
            سەرەکی
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-10">
        <div className="rounded-2xl border border-navy/10 bg-surface p-5 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy/10 text-navy">
                {dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-bold text-ink">دۆخی تاریک (Dark Mode)</p>
                <p className="mt-0.5 text-xs text-ink-soft">
                  هەموو بەشەکان و کاردەکان بە ڕەنگی تاریک نیشان دەدرێن
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={dark}
              onClick={toggle}
              className={`relative h-8 w-14 shrink-0 rounded-full transition ${
                dark ? "bg-success" : "bg-navy/20"
              }`}
              aria-label="دۆخی تاریک"
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-surface shadow-soft transition-all ${
                  dark ? "right-1" : "right-7"
                }`}
              />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
