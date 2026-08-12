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
    <header className="sticky top-0 z-50">
      <div className="h-[3px] w-full seismic-rule" />
      <div className="glass-strong border-x-0 border-t-0">
        <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
              <img
                src={logo.url}
                alt="نشان پژوهشکده سوانح طبیعی"
                className="h-10 w-10 object-contain"
                width={40}
                height={40}
              />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg tracking-tight sm:text-xl">
                پژوهشکده سوانح طبیعی
              </span>
              <span className="block font-tech text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                Natural Disasters Research Institute
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-md px-3.5 py-2 text-sm font-bold transition-colors ${
                  item.active
                    ? "bg-white/8 text-foreground ring-1 ring-white/12"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="footer" className="mt-24">
      <div className="h-[3px] w-full seismic-rule" />
      <div className="glass border-x-0 border-b-0">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="" aria-hidden className="h-10 w-10 object-contain" />
              <span className="font-display text-lg">پژوهشکده سوانح طبیعی</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-8 text-muted-foreground">
              رصد، ترجمه و انتشار آخرین یافته‌ها و رویدادهای سوانح طبیعی از منابع علمی معتبر جهانی.
            </p>
          </div>
          <div>
            <h3 className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Sections
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
            <h3 className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Sources
            </h3>
            <ul className="mt-4 space-y-2 font-tech text-sm text-muted-foreground">
              <li>NASA Earth Observatory</li>
              <li>Phys.org</li>
              <li>BGS World Earthquakes</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © ۱۴۰۵ پژوهشکده سوانح طبیعی — تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
}
