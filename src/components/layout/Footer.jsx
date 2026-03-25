import { footerColumns, siteMeta } from '../../data/newsData'
import Icon from '../ui/Icon'

function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-[#111111] text-slate-300">
      <div className="container-shell">
        <div className="border-b border-white/10 py-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500">Daily Edition</p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-[0.1em] text-white">{siteMeta.brand}</h2>
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.5fr_2fr]">
          <div className="space-y-8">
            <div>
              <p className="max-w-md text-slate-400">
                Reporting with clarity, context, and depth across politics, business, culture, technology, and the stories shaping everyday life.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-white">Stay In The Loop</h4>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-white/30 focus:outline-none"
                />
                <button type="button" className="border border-white bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-transparent hover:text-white">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="flex gap-3 text-sm">
              {['social_leaderboard', 'share', 'rss_feed'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 transition hover:border-white hover:bg-white hover:text-slate-950"
                >
                  <Icon name={icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white">{column.title}</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2023 {siteMeta.brand}. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-5">
            {['Site Map', 'Accessibility', 'Archived Content', 'Editorial Standards'].map((link) => (
              <a key={link} href="#" className="transition hover:text-white">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
            <span className="h-2 w-2 rounded-full bg-white/70" />
            Live News Desk
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
