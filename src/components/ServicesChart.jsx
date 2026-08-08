// A horizontal bar chart showing which styles are booked most.
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from 'recharts'

// `data` comes in as: [{ service: 'Box Braids', count: 12 }, ...]
export default function ServicesChart({ data }) {
  // A coordinated set of colors so each bar is distinct but on-brand.
  const colors = ['#3b82f6', '#14b8a6', '#8b5cf6', '#f59e0b', '#f43f5e', '#22c55e', '#3b82f6', '#14b8a6']

  return (
    <div className="panel">
      <div className="panel__head">
        <div className="panel__title">Most popular styles</div>
        <div className="panel__hint">by bookings</div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 12, left: 8, bottom: 0 }}
        >
          <XAxis type="number" stroke="#8b93a7" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            type="category" dataKey="service" width={110}
            stroke="#8b93a7" fontSize={12} tickLine={false} axisLine={false}
          />
          <Tooltip
            cursor={{ fill: 'rgba(59,130,246,0.08)' }}
            contentStyle={{
              background: '#1e2433', border: '1px solid #262c3d',
              borderRadius: 10, color: '#e6e9ef', fontSize: 13,
            }}
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]}>
            {/* Give each bar its own color from the list above */}
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
