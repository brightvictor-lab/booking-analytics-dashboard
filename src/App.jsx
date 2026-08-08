// ============================================================
//  APP — the top-level component.
//  It pulls the data + stats, then arranges every smaller piece
//  (stat cards, charts, table) into the finished dashboard.
// ============================================================
import StatCard from './components/StatCard'
import BookingsChart from './components/BookingsChart'
import ServicesChart from './components/ServicesChart'
import RevenueDonut from './components/RevenueDonut'
import RecentBookings from './components/RecentBookings'

import {
  bookings,
  getTotalBookings,
  getTotalRevenue,
  getPendingCount,
  getTopService,
  getBookingsOverTime,
  getServiceBreakdown,
  getStatusBreakdown,
} from './data/bookings'

export default function App() {
  // Work out every number and chart dataset once, up front.
  const totalBookings = getTotalBookings()
  const totalRevenue = getTotalRevenue()
  const pending = getPendingCount()
  const topService = getTopService()

  const overTime = getBookingsOverTime()
  const byService = getServiceBreakdown()
  const byStatus = getStatusBreakdown()

  return (
    <div className="app">
      {/* ---------- HEADER ---------- */}
      <header className="header">
        <div>
          <h1 className="header__title">Chronicle <span>Analytics</span></h1>
          <p className="header__sub">Booking performance · Tessy African Hair Braiding</p>
        </div>
        <span className="header__badge"><span className="dot" /> Live · last 60 days</span>
      </header>

      {/* ---------- TOP STAT CARDS ---------- */}
      <div className="stat-grid">
        <StatCard
          label="Total Bookings"
          value={totalBookings}
          foot={<><b>▲ 12%</b> vs last period</>}
          accent="var(--blue)"
        />
        <StatCard
          label="Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          foot={<><b>▲ 8%</b> vs last period</>}
          accent="var(--green)"
        />
        <StatCard
          label="Top Style"
          value={topService.name}
          foot={`${topService.count} bookings`}
          accent="var(--violet)"
        />
        <StatCard
          label="Pending Approval"
          value={pending}
          foot="awaiting owner response"
          accent="var(--amber)"
        />
      </div>

      {/* ---------- ROW: line chart (wide) + donut (narrow) ---------- */}
      <div className="row row--2">
        <BookingsChart data={overTime} />
        <RevenueDonut data={byStatus} />
      </div>

      {/* ---------- ROW: bar chart + recent table ---------- */}
      <div className="row row--2">
        <ServicesChart data={byService} />
        <RecentBookings bookings={bookings} />
      </div>
    </div>
  )
}
