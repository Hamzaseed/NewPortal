import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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

function SubscriptionCartPage() {
  const [searchParams] = useSearchParams()
  const [packages] = useState(() => {
    const savedPackages = localStorage.getItem('subscription_packages')

    if (savedPackages) {
      return JSON.parse(savedPackages)
    }

    return defaultPackages
  })
  const [paid, setPaid] = useState(false)
  const packageId = Number(searchParams.get('package'))
  const plan = searchParams.get('plan') === 'yearly' ? 'yearly' : 'monthly'
  const selectedPackage = packages.find((item) => item.id === packageId) || packages[0]
  const packagePrice = plan === 'yearly' ? selectedPackage?.yearlyPrice || selectedPackage?.price || '0' : selectedPackage?.monthlyPrice || selectedPackage?.price || '0'
  const salePrice = plan === 'yearly' ? selectedPackage?.yearlySalePrice || '' : selectedPackage?.monthlySalePrice || selectedPackage?.salePrice || ''
  const total = salePrice || packagePrice
  const billingLabel = plan === 'yearly' ? 'Yearly' : 'Monthly'

  return (
    <div className="flex min-h-screen flex-col bg-background-light">
      <Header />

      <main className="container-shell flex-1 py-10">
        <div className="mb-6">
          <AppLink to="/subscriptions" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
            <Icon name="chevron_left" className="h-4 w-4" />
            Back to packages
          </AppLink>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm">
            <h1 className="mb-6 text-3xl font-black text-slate-950">Card Payment</h1>

            {paid ? (
              <div className="rounded-lg border border-green-200 bg-green-50 p-5">
                <div className="mb-3 flex items-center gap-2 text-green-700">
                  <Icon name="check_circle" className="h-6 w-6" />
                  <h2 className="text-xl font-black">Subscription Active</h2>
                </div>
                <p className="text-sm leading-6 text-green-800">
                  Your {selectedPackage.name} {billingLabel.toLowerCase()} package is now subscribed. This is a frontend payment confirmation screen.
                </p>
              </div>
            ) : (
              <form onSubmit={(event) => { event.preventDefault(); setPaid(true) }} className="space-y-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-bold text-slate-700">Name On Card</span>
                  <input className="w-full rounded border border-primary/10 bg-primary/5 px-3 py-3 text-sm outline-none focus:border-primary" placeholder="Hamza Khan" />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-bold text-slate-700">Card Number</span>
                  <input className="w-full rounded border border-primary/10 bg-primary/5 px-3 py-3 text-sm outline-none focus:border-primary" placeholder="4242 4242 4242 4242" />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="mb-1 block text-sm font-bold text-slate-700">Expiry</span>
                    <input className="w-full rounded border border-primary/10 bg-primary/5 px-3 py-3 text-sm outline-none focus:border-primary" placeholder="12/28" />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-bold text-slate-700">CVC</span>
                    <input className="w-full rounded border border-primary/10 bg-primary/5 px-3 py-3 text-sm outline-none focus:border-primary" placeholder="123" />
                  </label>
                </div>

                <button type="submit" className="flex h-12 w-full items-center justify-center rounded bg-primary px-5 text-sm font-black text-white transition hover:bg-primary/90">
                  Pay ${total} And Subscribe
                </button>
              </form>
            )}
          </div>

          <aside className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-black text-slate-950">Cart Summary</h2>

            <div className="mb-5 rounded border border-primary/10 bg-primary/5 p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="text-lg font-black text-slate-950">{selectedPackage.name}</h3>
                {selectedPackage.badge ? <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">{selectedPackage.badge}</span> : null}
              </div>
              <p className="text-sm leading-6 text-slate-600">{selectedPackage.description}</p>
            </div>

            <div className="space-y-3 border-b border-slate-200 pb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Package price</span>
                <span className={salePrice ? 'font-bold text-slate-400 line-through' : 'font-bold text-slate-900'}>${packagePrice}</span>
              </div>
              {salePrice ? (
                <div className="flex justify-between">
                  <span className="text-slate-600">Sale price</span>
                  <span className="font-bold text-primary">${salePrice}</span>
                </div>
              ) : null}
              <div className="flex justify-between">
                <span className="text-slate-600">Billing</span>
                <span className="font-bold text-slate-900">{billingLabel}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-black text-slate-950">Total</span>
              <span className="text-3xl font-black text-primary">${total}</span>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default SubscriptionCartPage
