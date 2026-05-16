import { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { AppLink } from '../components/ui/AppLink'
import Icon from '../components/ui/Icon'

const defaultPackages = [
  {
    id: 1,
    name: 'Digital Starter',
    description: 'Daily stories, market briefs, and saved articles for one reader.',
    monthlyPrice: '9',
    monthlySalePrice: '6',
    yearlyPrice: '90',
    yearlySalePrice: '70',
    badge: 'Popular',
    features: 'Unlimited articles, Daily newsletter, Save stories',
    active: true,
  },
  {
    id: 2,
    name: 'Editorial Plus',
    description: 'Full access to premium reporting, videos, and archive coverage.',
    monthlyPrice: '19',
    monthlySalePrice: '14',
    yearlyPrice: '190',
    yearlySalePrice: '149',
    badge: 'Best Value',
    features: 'Premium articles, Video access, Archive access, Weekly insights',
    active: true,
  },
]

function SubscriptionPackagesPage() {
  const [packages] = useState(() => {
    const savedPackages = localStorage.getItem('subscription_packages')

    if (savedPackages) {
      return JSON.parse(savedPackages)
    }

    return defaultPackages
  })
  const [billing, setBilling] = useState('monthly')

  return (
    <div className="flex min-h-screen flex-col bg-background-light">
      <Header />

      <main className="container-shell flex-1 py-10">
        <section className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-primary">Subscriptions</p>
          <h1 className="font-display text-4xl font-black leading-tight text-slate-950 sm:text-5xl">Choose your newspaper access</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Pick a package, review it in the cart, and complete the card payment screen to subscribe.
          </p>
        </section>

        <div className="mb-8 inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${billing === 'monthly' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-primary'}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling('yearly')}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${billing === 'yearly' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-primary'}`}
          >
            Yearly · Save 17%
          </button>
        </div>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {packages.filter((item) => item.active).map((item) => (
            <article key={item.id} className="flex rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
              <div className="flex w-full flex-col">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    {item.badge ? <span className="mb-3 inline-flex rounded bg-red-100 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-red-700">{item.badge}</span> : null}
                    <h2 className="text-2xl font-black text-slate-950">{item.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </div>

                <div className="mb-5 flex items-end gap-2">
                  {billing === 'yearly' && item.yearlySalePrice ? <span className="text-4xl font-black text-primary">${item.yearlySalePrice}</span> : null}
                  {billing === 'monthly' && (item.monthlySalePrice || item.salePrice) ? <span className="text-4xl font-black text-primary">${item.monthlySalePrice || item.salePrice}</span> : null}
                  <span
                    className={`${
                      (billing === 'yearly' && item.yearlySalePrice) || (billing === 'monthly' && (item.monthlySalePrice || item.salePrice))
                        ? 'text-base text-slate-400 line-through'
                        : 'text-4xl font-black text-primary'
                    }`}
                  >
                    ${billing === 'yearly' ? item.yearlyPrice || item.price : item.monthlyPrice || item.price}
                  </span>
                  <span className="pb-1 text-sm font-bold text-slate-500">/ {billing === 'yearly' ? 'year' : 'month'}</span>
                </div>

                <ul className="mb-6 space-y-3">
                  {item.features.split(',').map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm font-semibold text-slate-700">
                      <Icon name="check_circle" className="mt-0.5 h-4 w-4 text-green-600" />
                      <span>{feature.trim()}</span>
                    </li>
                  ))}
                </ul>

                <AppLink
                  to={`/subscription-cart?package=${item.id}&plan=${billing}`}
                  className="mt-auto flex h-11 items-center justify-center rounded bg-primary px-5 text-sm font-black text-white transition hover:bg-primary/90"
                >
                  Subscribe
                </AppLink>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default SubscriptionPackagesPage
