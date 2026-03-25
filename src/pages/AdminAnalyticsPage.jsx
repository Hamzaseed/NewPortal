import Icon from '../components/ui/Icon'

const topCategories = [
  { rank: 1, name: 'Politics', views: '12.4k views', trend: 'up' },
  { rank: 2, name: 'World Affairs', views: '9.2k views', trend: 'flat' },
  { rank: 3, name: 'Technology', views: '7.8k views', trend: 'up' },
  { rank: 4, name: 'Local News', views: '4.5k views', trend: 'down' },
  { rank: 5, name: 'Lifestyle', views: '3.1k views', trend: 'flat' },
]

const articles = [
  {
    title: 'The Shift in Global Markets: A Detailed Analysis',
    published: 'Published 2 days ago',
    author: 'Elena Rossi',
    views: '12,482',
    avgTime: '05:12',
    bounce: '18%',
    bounceClass: 'text-green-500',
    status: 'Trending',
    statusClass: 'bg-green-100 text-green-700',
  },
  {
    title: 'Sustainable Cities: Urban Planning for 2050',
    published: 'Published 5 days ago',
    author: 'Marcus Chen',
    views: '8,102',
    avgTime: '03:45',
    bounce: '24%',
    bounceClass: 'text-slate-700',
    status: 'Stable',
    statusClass: 'bg-slate-100 text-slate-600',
  },
  {
    title: 'Interview: The New Age of Digital Journalism',
    published: 'Published 1 week ago',
    author: 'Sarah Jenkins',
    views: '6,541',
    avgTime: '08:22',
    bounce: '12%',
    bounceClass: 'text-green-500',
    status: 'Viral',
    statusClass: 'bg-green-100 text-green-700',
  },
  {
    title: 'Artificial Intelligence in the Healthcare Sector',
    published: 'Published 3 days ago',
    author: 'David Miller',
    views: '5,820',
    avgTime: '02:30',
    bounce: '45%',
    bounceClass: 'text-red-500',
    status: 'Low Engage',
    statusClass: 'bg-red-100 text-red-700',
  },
]

function AdminAnalyticsPage() {
  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="font-medium text-slate-500">Overview</p>
          <h1 className="text-4xl font-bold">Traffic &amp; Performance</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg border border-primary/10 bg-white p-1">
            <button type="button" className="rounded bg-primary px-4 py-1.5 text-sm font-bold text-white">
              Daily
            </button>
            <button type="button" className="rounded px-4 py-1.5 text-sm font-medium hover:bg-slate-50">
              Weekly
            </button>
            <button type="button" className="rounded px-4 py-1.5 text-sm font-medium hover:bg-slate-50">
              Monthly
            </button>
          </div>

          <button type="button" className="flex items-center gap-2 rounded-lg border border-primary/10 bg-white px-4 py-2 text-sm font-bold">
            <Icon name="calendar_today" className="h-4 w-4" />
            Oct 24 - Oct 30, 2023
          </button>

          <button type="button" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20">
            <Icon name="file_download" className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-slate-500">Real-time Visitors</p>
            <Icon name="groups" className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="cms-numeric text-3xl font-bold">1,284</p>
            <span className="cms-numeric flex items-center text-xs font-bold text-green-500">
              <Icon name="trending_up" className="h-4 w-4" /> 12%
            </span>
          </div>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-3/4 bg-primary" />
          </div>
        </article>

        <article className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-slate-500">Page Views</p>
            <Icon name="visibility" className="h-5 w-5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="cms-numeric text-3xl font-bold">42.5k</p>
            <span className="cms-numeric flex items-center text-xs font-bold text-green-500">
              <Icon name="trending_up" className="h-4 w-4" /> 8.4%
            </span>
          </div>
          <p className="mt-4 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">vs Last Period</p>
        </article>

        <article className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-slate-500">Avg. Read Time</p>
            <Icon name="timer" className="h-5 w-5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="cms-numeric text-3xl font-bold">4m 12s</p>
            <span className="cms-numeric text-xs font-bold text-slate-400">-0.5%</span>
          </div>
          <p className="mt-4 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">Site Average</p>
        </article>

        <article className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-slate-500">Bounce Rate</p>
            <Icon name="exit_to_app" className="h-5 w-5 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="cms-numeric text-3xl font-bold">32.8%</p>
            <span className="cms-numeric flex items-center text-xs font-bold text-green-500">
              <Icon name="arrow_downward" className="h-4 w-4" /> 2.1%
            </span>
          </div>
          <p className="mt-4 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">Engagement Health</p>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-lg font-bold">Traffic Trends</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-primary" />
                <span className="text-xs font-medium">Visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-slate-300" />
                <span className="text-xs font-medium">Last Week</span>
              </div>
            </div>
          </div>

          <div className="flex h-64 items-end justify-between gap-1">
            {['h-1/4', 'h-2/4', 'h-3/4', 'h-2/5', 'h-3/5', 'h-full', 'h-4/5'].map((heightClass, index) => (
              <div
                key={index}
                className={`relative w-full rounded-t-sm transition-all ${
                  index === 5
                    ? 'bg-rose-700 hover:bg-rose-800'
                    : index >= 2 && index <= 6
                      ? 'bg-rose-300 hover:bg-rose-400'
                      : 'bg-rose-100 hover:bg-rose-200'
                } ${heightClass}`}
              >
                <div className="absolute inset-x-0 bottom-full mb-1 h-1 bg-rose-700" />
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
          <h3 className="mb-8 text-lg font-bold">Device Split</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Icon name="smartphone" className="h-4 w-4 text-slate-400" />
                  Mobile
                </span>
                <span className="cms-numeric font-bold">64%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[64%] bg-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Icon name="laptop" className="h-4 w-4 text-slate-400" />
                  Desktop
                </span>
                <span className="cms-numeric font-bold">28%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[28%] bg-primary/60" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Icon name="tablet" className="h-4 w-4 text-slate-400" />
                  Tablet
                </span>
                <span className="cms-numeric font-bold">8%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[8%] bg-primary/30" />
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-lg border border-primary/10 bg-primary/5 p-4">
            <p className="text-xs leading-relaxed text-primary">
              <span className="font-bold">Insight:</span> Mobile traffic peaked on Friday evening during the breaking news event.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="flex flex-col rounded-xl border border-primary/5 bg-white p-6 shadow-sm lg:col-span-1">
          <h3 className="mb-6 text-lg font-bold">Top Categories</h3>
          <div className="flex-1 space-y-4">
            {topCategories.map((item) => (
              <div key={item.rank} className="flex items-center gap-4">
                <span className={`cms-numeric flex size-8 items-center justify-center rounded-full text-xs font-bold ${item.rank === 1 ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>
                  {item.rank}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-[10px] font-medium text-slate-400">{item.views}</p>
                </div>
                {item.trend === 'up' && <Icon name="arrow_upward" className="h-4 w-4 text-green-500" />}
                {item.trend === 'down' && <Icon name="arrow_downward" className="h-4 w-4 text-red-500" />}
                {item.trend === 'flat' && <Icon name="remove" className="h-4 w-4 text-slate-400" />}
              </div>
            ))}
          </div>
          <button type="button" className="mt-6 flex items-center justify-center gap-1 text-sm font-bold text-primary hover:underline">
            View All Categories <Icon name="chevron_right" className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold">Top Performing Articles</h3>
            <button type="button" className="text-sm font-medium text-slate-500 transition-colors hover:text-primary">
              Filter by Author
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="cms-numeric w-full text-left">
              <thead>
                <tr className="border-b border-primary/10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <th className="px-2 pb-3">Article Title</th>
                  <th className="px-2 pb-3">Author</th>
                  <th className="px-2 pb-3">Views</th>
                  <th className="px-2 pb-3">Avg. Time</th>
                  <th className="px-2 pb-3">Bounce</th>
                  <th className="px-2 pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5 text-sm">
                {articles.map((article) => (
                  <tr key={article.title} className="group transition-colors hover:bg-primary/5">
                    <td className="px-2 py-4">
                      <p className="line-clamp-1 font-bold">{article.title}</p>
                      <p className="mt-0.5 text-[10px] text-slate-400">{article.published}</p>
                    </td>
                    <td className="px-2 py-4">{article.author}</td>
                    <td className="px-2 py-4 font-medium">{article.views}</td>
                    <td className="px-2 py-4">{article.avgTime}</td>
                    <td className={`px-2 py-4 font-medium ${article.bounceClass}`}>{article.bounce}</td>
                    <td className="px-2 py-4">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${article.statusClass}`}>{article.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-primary/10 bg-white/50 p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <p>© 2023 The Daily Observer CMS. All rights reserved.</p>
        <div className="flex flex-wrap gap-6">
          <a href="#" className="transition-colors hover:text-primary">
            System Status: Healthy
          </a>
          <a href="#" className="transition-colors hover:text-primary">
            Data Privacy
          </a>
          <a href="#" className="transition-colors hover:text-primary">
            Support Portal
          </a>
        </div>
      </footer>
    </section>
  )
}

export default AdminAnalyticsPage
