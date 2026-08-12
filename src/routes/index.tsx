import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import articlesData from "@/data/articles.json";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "پژوهشکده سوانح طبیعی — سرخط خبرها" },
      {
        name: "description",
        content:
          "آخرین اخبار، هشدارها و مقالات سوانح طبیعی، زلزله، اقلیم و آتش‌سوزی از منابع علمی معتبر جهانی.",
      },
      { property: "og:title", content: "پژوهشکده سوانح طبیعی — سرخط خبرها" },
      {
        property: "og:description",
        content: "اخبار، هشدارها و مقالات سوانح طبیعی از منابع علمی معتبر جهانی.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Category = "alert" | "article" | "news";

type Article = {
  href: string;
  featured: boolean;
  image: string | null;
  source: string;
  title: string;
  date: string;
  category: Category;
};

const articles = articlesData as Article[];

const CATEGORY_META: Record<Category, { label: string; dot: string; chip: string }> = {
  alert: {
    label: "هشدار",
    dot: "bg-seismic-red",
    chip: "bg-seismic-red/15 text-seismic-red border-seismic-red/30",
  },
  article: {
    label: "مقاله",
    dot: "bg-seismic-blue",
    chip: "bg-seismic-blue/15 text-seismic-blue border-seismic-blue/30",
  },
  news: {
    label: "خبر",
    dot: "bg-seismic-brown",
    chip: "bg-seismic-brown/15 text-seismic-brown border-seismic-brown/30",
  },
};

const TABS: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "همه" },
  { key: "alert", label: "هشدارها" },
  { key: "article", label: "مقالات" },
  { key: "news", label: "اخبار" },
];

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
function fa(value: string | number) {
  return String(value).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)] ?? d);
}

function CategoryChip({ category, className = "" }: { category: Category; className?: string }) {
  const meta = CATEGORY_META[category];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-black ${meta.chip} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

function Fallback({ source }: { source: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,oklch(1_0_0_/_0.08),transparent_70%)]">
      <span className="font-tech text-center text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
        {source}
      </span>
    </div>
  );
}

function SideTitle({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className={`h-4 w-[3px] rounded-full ${accent}`} />
      <h2 className="font-display text-xl leading-[1.6]">{title}</h2>
    </div>
  );
}

function SideItem({ a, index }: { a: Article; index?: number }) {
  return (
    <a href={a.href} className="group flex gap-3 border-b border-white/8 py-3 last:border-0">
      {typeof index === "number" ? (
        <span className="font-tech mt-0.5 text-lg font-bold leading-none text-seismic-gradient opacity-70">
          {fa(index + 1)}
        </span>
      ) : (
        <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10">
          {a.image ? (
            <img
              src={a.image}
              alt={fa(a.title)}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <Fallback source={a.source} />
          )}
        </div>
      )}
      <div className="min-w-0">
        <h3 className="line-clamp-3 text-[13px] font-bold leading-6 transition-colors group-hover:text-primary">
          {fa(a.title)}
        </h3>
        <span className="mt-1 block text-[11px] font-semibold text-muted-foreground">{fa(a.date)}</span>
      </div>
    </a>
  );
}

function Index() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | Category>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (tab === "all" || a.category === tab) &&
        (!q || a.title.toLowerCase().includes(q) || a.source.toLowerCase().includes(q)),
    );
  }, [query, tab]);

  const featured = filtered[0];
  const centerRest = filtered.slice(1, 7);
  const more = filtered.slice(7);

  const alerts = useMemo(() => articles.filter((a) => a.category === "alert").slice(0, 5), []);
  const papers = useMemo(() => articles.filter((a) => a.category === "article").slice(0, 4), []);
  const latest = useMemo(() => articles.slice(0, 6), []);

  return (
    <div className="flex min-h-screen flex-col" dir="rtl">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 pt-8 sm:px-8">
        {/* breaking bar */}
        <div className="glass fade-up flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3">
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-seismic-red px-3 py-1 text-[11px] font-black text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            فوری
          </span>
          <p className="truncate text-[13px] font-bold text-muted-foreground">
            {featured ? fa(featured.title) : "خبری موجود نیست"}
          </p>
        </div>

        {/* tabs + search */}
        <div className="fade-up mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5" style={{ animationDelay: "60ms" }}>
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`rounded-full px-4 py-2 text-[13px] font-black transition-all ${
                  tab === t.key
                    ? "bg-primary text-primary-foreground shadow-[0_8px_24px_-10px_rgba(220,38,38,0.9)]"
                    : "glass glass-lift text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="جستجو در مطالب…"
              aria-label="جستجوی مطالب"
              className="glass w-full rounded-xl py-3 pe-10 ps-4 text-[13px] font-medium outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-4 focus:ring-primary/15"
            />
            <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-muted-foreground">⌕</span>
          </div>
        </div>

        {/* newspaper layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
          {/* right sidebar (first in RTL) */}
          <aside className="fade-up order-2 lg:order-1" style={{ animationDelay: "120ms" }}>
            <div className="glass rounded-2xl p-5">
              <SideTitle title="هشدارها" accent="bg-seismic-red" />
              {alerts.map((a, i) => (
                <SideItem key={a.href + i} a={a} />
              ))}
            </div>
            <div className="glass mt-6 rounded-2xl p-5">
              <SideTitle title="مقالات" accent="bg-seismic-blue" />
              {papers.map((a, i) => (
                <SideItem key={a.href + i} a={a} />
              ))}
            </div>
          </aside>

          {/* center column */}
          <section id="news" className="order-1 lg:order-2">
            {featured ? (
              <a
                href={featured.href}
                className="glass glass-lift fade-up group block overflow-hidden rounded-2xl"
                style={{ animationDelay: "80ms" }}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {featured.image ? (
                    <img
                      src={featured.image}
                      alt={fa(featured.title)}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <Fallback source={featured.source} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 sm:p-8">
                    <div className="flex items-center gap-2">
                      <CategoryChip category={featured.category} />
                      <span className="font-tech text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                        {featured.source}
                      </span>
                    </div>
                    <h1 className="font-display text-2xl leading-[1.5] text-white sm:text-4xl">
                      {fa(featured.title)}
                    </h1>
                    <span className="text-xs font-semibold text-white/70">{fa(featured.date)}</span>
                  </div>
                </div>
              </a>
            ) : (
              <p className="py-24 text-center text-sm text-muted-foreground">مطلبی با این عبارت یافت نشد.</p>
            )}

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {centerRest.map((a, i) => (
                <a
                  key={a.href + i}
                  href={a.href}
                  className="glass glass-lift fade-up group flex flex-col overflow-hidden rounded-2xl"
                  style={{ animationDelay: `${i * 60 + 160}ms` }}
                >
                  <div className="aspect-[16/10] overflow-hidden border-b border-white/10">
                    {a.image ? (
                      <img
                        src={a.image}
                        alt={fa(a.title)}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <Fallback source={a.source} />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <CategoryChip category={a.category} className="self-start" />
                    <h3 className="text-[15px] font-extrabold leading-7 transition-colors group-hover:text-primary">
                      {fa(a.title)}
                    </h3>
                    <div className="mt-auto flex items-center justify-between pt-2 text-[11px] font-semibold text-muted-foreground">
                      <span>{fa(a.date)}</span>
                      <span className="font-tech uppercase tracking-[0.18em]">{a.source}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {more.length > 0 && (
              <div className="glass mt-6 rounded-2xl p-5">
                <SideTitle title="سایر مطالب" accent="bg-seismic-brown" />
                {more.map((a, i) => (
                  <a
                    key={a.href + i}
                    href={a.href}
                    className="group flex items-center gap-3 border-b border-white/8 py-3 last:border-0"
                  >
                    <CategoryChip category={a.category} />
                    <h3 className="line-clamp-2 flex-1 text-[13px] font-bold leading-6 transition-colors group-hover:text-primary">
                      {fa(a.title)}
                    </h3>
                    <span className="hidden shrink-0 text-[11px] font-semibold text-muted-foreground sm:block">
                      {fa(a.date)}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </section>

          {/* left sidebar */}
          <aside className="fade-up order-3" style={{ animationDelay: "160ms" }}>
            <div className="glass rounded-2xl p-5">
              <SideTitle title="آخرین مطالب" accent="bg-seismic-brown" />
              {latest.map((a, i) => (
                <SideItem key={a.href + i} a={a} index={i} />
              ))}
            </div>
            <div className="glass-strong mt-6 rounded-2xl p-5">
              <SideTitle title="آمار پایش" accent="bg-seismic-blue" />
              <ul className="space-y-3 text-[13px] font-bold">
                {(
                  [
                    ["هشدارها", articles.filter((a) => a.category === "alert").length, "text-seismic-red"],
                    ["مقالات", articles.filter((a) => a.category === "article").length, "text-seismic-blue"],
                    ["اخبار", articles.filter((a) => a.category === "news").length, "text-seismic-brown"],
                  ] as const
                ).map(([label, count, color]) => (
                  <li key={label} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className={`font-display text-lg ${color}`}>{fa(count)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-white/10 pt-3 text-[11px] leading-6 text-muted-foreground">
                آخرین بروزرسانی: <strong className="text-foreground">۱۴۰۵/۰۵/۱۱ — ۲۱:۴۴</strong>
              </p>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
