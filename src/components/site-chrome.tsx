import logo from "@/assets/ndri-logo.png.asset.json";

const nav = [
  { label: "سرخط خبرها", href: "#news", active: true },
  { label: "زلزله", href: "#news" },
  { label: "اقلیم", href: "#news" },
  { label: "گزارش‌ها", href: "#news" },
  { label: "درباره پژوهشکده", href: "#footer" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="h-[3px] w-full seismic-rule" />
      <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
        <a href="/" className="flex items-center gap-3">
          <img
            src={logo.url}
            alt="نشان پژوهشکده سوانح طبیعی"
            className="h-12 w-12 object-contain"
            width={48}
            height={48}
          />
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-tight sm:text-lg">
              پژوهشکده سوانح طبیعی
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Natural Disasters Research Institute
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`rounded-sm px-3 py-2 text-sm font-bold transition-colors ${
                item.active
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="footer" className="mt-24 border-t border-border bg-card">
      <div className="h-[3px] w-full seismic-rule" />
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="" aria-hidden className="h-10 w-10 object-contain" />
            <span className="text-base font-extrabold">پژوهشکده سوانح طبیعی</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
            رصد، ترجمه و انتشار آخرین یافته‌ها و رویدادهای سوانح طبیعی از منابع علمی معتبر جهانی.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            بخش‌ها
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.slice(0, 4).map((n) => (
              <li key={n.label}>
                <a className="transition-colors hover:text-primary" href={n.href}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            منابع
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>NASA Earth Observatory</li>
            <li>Phys.org</li>
            <li>BGS World Earthquakes</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © ۱۴۰۵ پژوهشکده سوانح طبیعی — تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
