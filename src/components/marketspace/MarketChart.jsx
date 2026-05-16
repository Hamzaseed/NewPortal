import { useState } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const filters = ['1D', '1W', '1M', '1Y']

function ChartTooltip({ active, payload, label, prefix }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="border border-slate-200 bg-white px-4 py-3 shadow-xl">
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-950">
        {prefix}
        {Number(payload[0].value).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  )
}

function MarketChart({ asset }) {
  const [activeFilter, setActiveFilter] = useState('1D')

  return (
    <section className="border border-slate-200 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_40%),linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">Price Action</p>
          <div className="mt-2 flex items-end gap-3">
            <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">{asset.name}</h2>
            <span className="pb-1 text-sm font-semibold text-slate-400">{asset.symbol}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className={`text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl ${asset.flashClass}`}>
              {asset.prefix || ''}
              {asset.displayPrice}
            </p>
            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${
                asset.change >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}
            >
              {asset.change >= 0 ? '+' : ''}
              {asset.change.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] transition ${
                activeFilter === filter ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-[260px] w-full sm:h-[320px]">
        <ResponsiveContainer>
          <LineChart data={asset.series[activeFilter]} margin={{ top: 12, right: 10, left: -16, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} minTickGap={24} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              width={62}
              domain={['dataMin - 2', 'dataMax + 2']}
              tickFormatter={(value) => `${asset.prefix || ''}${Math.round(value).toLocaleString('en-US')}`}
            />
            <Tooltip content={<ChartTooltip prefix={asset.prefix || ''} />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={asset.change >= 0 ? '#34d399' : '#fb7185'}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5, fill: '#ffffff', stroke: asset.change >= 0 ? '#34d399' : '#fb7185', strokeWidth: 2 }}
              isAnimationActive
              animationDuration={700}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
        <span>
          Open {asset.prefix || ''}
          {asset.open.toLocaleString('en-US', { maximumFractionDigits: 2 })}
        </span>
        <span>
          High {asset.prefix || ''}
          {asset.high.toLocaleString('en-US', { maximumFractionDigits: 2 })}
        </span>
        <span>
          Low {asset.prefix || ''}
          {asset.low.toLocaleString('en-US', { maximumFractionDigits: 2 })}
        </span>
      </div>
    </section>
  )
}

export default MarketChart
