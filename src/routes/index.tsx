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
          "آخرین اخبار و گزارش‌های سوانح طبیعی، زلزله، اقلیم و آتش‌سوزی از منابع علمی معتبر جهانی.",
      },
      { property: "og:title", content: "پژوهشکده سوانح طبیعی — سرخط خبرها" },
      {
        property: "og:description",
        content: "آخرین اخبار و گزارش‌های سوانح طبیعی از منابع علمی معتبر جهانی.",
      },
    ],
  }),
});

type Article = {
  href: string;
  featured: boolean;
  image: string | null;
  source: string;
  title: string;
  date: string;
};

const articles = articlesData as Article[];

const sourceAccent: Record<string, string> = {
  "NASA Earth Observatory": "text-seismic-blue",
  "Phys.org": "text-seismic-brown",
  "BGS World Earthquakes": "text-seismic-red",
};

function accentOf(source: string) {
  return sourceAccent[source] ?? "text-seismic-brown";
}

function Fallback({ source }: { source: string }) {
  return (
    <div className="grain-paper flex h-full w-full items-center justify-center bg-secondary">
      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
        {source}
      </span>
    </div>
  );
}

function Index() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return articles;
    return articles.filter((a) => a.title.includes(q) || a.source.toLowerCase().includes(q.toLowerCase()));
  }, [query]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="flex min-h-screen flex-col" dir="rtl">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1240px] flex-1 px-5 pt-12 sm:px-8">
        <section className="fade-up flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-6 w-[3px] seismic-rule" style={{ backgroundImage: "linear-gradient(180deg,var(--seismic-red),var(--seismic-brown),var(--seismic-blue))" }} />
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">سرخط خبرها</h1>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              پایش پیوسته رویدادهای سوانح طبیعی جهان؛ زلزله، سیل، آتش‌سوزی و تغییرات اقلیمی.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 font-bold ring-1 ring-border">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-seismic-red opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-seismic-red" />
              </span>
              {articles.length} خبر فعال
            </span>
            <span>
              آخرین بروزرسانی: <strong className="text-foreground">۱۴۰۵/۰۵/۱۱ — ۲۱:۴۴</strong>
            </span>
          </div>
        </section>

        <div className="fade-up mt-8" style={{ animationDelay: "80ms" }}>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="جستجو در اخبار…"
              aria-label="جستجوی اخبار"
              className="w-full rounded-md border border-border bg-card py-4 pe-12 ps-4 text-sm font-medium outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/12"
            />
            <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-muted-foreground">
              ⌕
            </span>
          </div>
        </div>

        <section id="news" className="mt-10">
          {featured ? (
            <a
              href={featured.href}
              className="fade-up card-lift group grid overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-[1.15fr_1fr]"
              style={{ animationDelay: "140ms" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[380px]">
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <Fallback source={featured.source} />
                )}
                <span className="absolute end-4 top-4 rounded-sm bg-seismic-red px-3 py-1 text-[11px] font-black text-white shadow-lg">
                  تازه‌ترین
                </span>
              </div>
              <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
                <span className={`text-[11px] font-black uppercase tracking-[0.22em] ${accentOf(featured.source)}`}>
                  {featured.source}
                </span>
                <h2 className="text-2xl font-black leading-[1.45] transition-colors group-hover:text-primary sm:text-3xl">
                  {featured.title}
                </h2>
                <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                  <span>{featured.date}</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>۱ دقیقه مطالعه</span>
                </div>
              </div>
            </a>
          ) : (
            <p className="py-24 text-center text-sm text-muted-foreground">
              خبری با این عبارت یافت نشد.
            </p>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <a
                key={a.href + i}
                href={a.href}
                className="fade-up card-lift group flex flex-col overflow-hidden rounded-lg border border-border bg-card"
                style={{ animationDelay: `${Math.min(i, 8) * 60 + 180}ms` }}
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-border">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  ) : (
                    <Fallback source={a.source} />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className={`text-[10px] font-black uppercase tracking-[0.22em] ${accentOf(a.source)}`}>
                    {a.source}
                  </span>
                  <h3 className="text-base font-bold leading-8 transition-colors group-hover:text-primary">
                    {a.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-3 text-xs font-semibold text-muted-foreground">
                    <span>{a.date}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      ←
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <nav className="mt-14 flex items-center justify-center gap-2 border-t border-border pt-8 text-sm font-bold">
            <span className="flex h-10 min-w-10 items-center justify-center rounded-sm bg-primary px-3 text-primary-foreground">
              ۱
            </span>
            {["۲", "۳"].map((p) => (
              <a
                key={p}
                href="#news"
                className="flex h-10 min-w-10 items-center justify-center rounded-sm border border-border bg-card px-3 transition-colors hover:border-primary hover:text-primary"
              >
                {p}
              </a>
            ))}
            <span className="ms-3 text-xs font-semibold text-muted-foreground">صفحه ۱ از ۳</span>
          </nav>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
