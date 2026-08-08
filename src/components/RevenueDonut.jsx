// A donut chart showing how revenue splits across booking statuses
// (approved / pending / completed).
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

// `data` comes in as: [{ status: 'approved', value: 2400 }, ...]
export default function RevenueDonut({ data }) {
  const colorFor = {
    approved: '#3b82f6',
    pending: '#f59e0b',
    completed: '#22c55e',
  }

  return (
    <div className="panel">
      <div className="panel__head">
        <div className="panel__title">Revenue by status</div>
        <div className="panel__hint">in USD</div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="status"
            innerRadius={58}      /* innerRadius > 0 turns a pie into a donut */
            outerRadius={90}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={colorFor[entry.status] || '#8b5cf6'} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            contentStyle={{
              background: '#1e2433', border: '1px solid #262c3d',
              borderRadius: 10, color: '#e6e9ef', fontSize: 13,
            }}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 13, color: '#8b93a7', textTransform: 'capitalize' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
