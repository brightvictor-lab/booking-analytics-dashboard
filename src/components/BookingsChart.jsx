// A line chart showing how bookings trend week by week.
// Recharts gives us ready-made chart pieces; we arrange and style them.
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip,
} from 'recharts'

// `data` comes in as: [{ week: '06-02', bookings: 5 }, ...]
export default function BookingsChart({ data }) {
  return (
    <div className="panel">
      <div className="panel__head">
        <div className="panel__title">Bookings over time</div>
        <div className="panel__hint">by week</div>
      </div>

      {/* ResponsiveContainer makes the chart fill whatever width it's given */}
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#262c3d" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" stroke="#8b93a7" fontSize={12} tickLine={false} />
          <YAxis stroke="#8b93a7" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: '#1e2433', border: '1px solid #262c3d',
              borderRadius: 10, color: '#e6e9ef', fontSize: 13,
            }}
            cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="bookings"
            stroke="#3b82f6"          /* the blue star of our palette */
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#3b82f6' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
