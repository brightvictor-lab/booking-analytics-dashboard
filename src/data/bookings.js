// ============================================================
//  SAMPLE DATA
//  In a real app this would come from Supabase. For now we use
//  realistic fake bookings so we can focus on learning React.
//  Everything the dashboard shows is calculated from this array.
// ============================================================

// The styles this salon offers, with a starting price for each.
const SERVICES = [
  { name: 'Knotless Braids', price: 180 },
  { name: 'Box Braids', price: 160 },
  { name: 'Boho Braids', price: 200 },
  { name: 'Senegalese Twists', price: 190 },
  { name: 'Cornrows', price: 90 },
  { name: 'Fulani Braids', price: 170 },
  { name: 'Goddess Braids', price: 210 },
  { name: 'Feed-In Braids', price: 110 },
]

const FIRST_NAMES = ['Amara', 'Jasmine', 'Keisha', 'Tiana', 'Nia', 'Zola', 'Maya', 'Aaliyah', 'Simone', 'Destiny', 'Imani', 'Ebony']
const LAST_NAMES = ['Johnson', 'Williams', 'Brown', 'Davis', 'Okafor', 'Adeyemi', 'Clark', 'Lewis', 'Bello', 'Carter']
const STATUSES = ['approved', 'approved', 'approved', 'pending', 'completed', 'completed']

// A tiny predictable random generator so the data is the same every reload.
// (Real randomness would make the charts jump around on every refresh.)
let seed = 42
function rand() {
  seed = (seed * 9301 + 49297) % 233280
  return seed / 233280
}
function pick(list) {
  return list[Math.floor(rand() * list.length)]
}

// Build ~75 bookings spread across the last 60 days.
function generateBookings() {
  const bookings = []
  const today = new Date()

  for (let i = 0; i < 75; i++) {
    const service = pick(SERVICES)
    const daysAgo = Math.floor(rand() * 60)          // 0–59 days back
    const date = new Date(today)
    date.setDate(today.getDate() - daysAgo)

    bookings.push({
      id: i + 1,
      client: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
      service: service.name,
      price: service.price,
      status: pick(STATUSES),
      date: date.toISOString().slice(0, 10),         // 'YYYY-MM-DD'
    })
  }

  // Newest first
  return bookings.sort((a, b) => b.date.localeCompare(a.date))
}

export const bookings = generateBookings()

// ---------- DERIVED STATS ----------
// Small helper functions that turn the raw bookings into the numbers
// and chart data the dashboard needs. Each one does exactly one job.

// Total number of bookings.
export function getTotalBookings() {
  return bookings.length
}

// Total revenue (sum of every booking's price).
export function getTotalRevenue() {
  return bookings.reduce((sum, b) => sum + b.price, 0)
}

// How many bookings are still waiting for the owner to approve.
export function getPendingCount() {
  return bookings.filter((b) => b.status === 'pending').length
}

// The single most-booked style.
export function getTopService() {
  const counts = {}
  for (const b of bookings) {
    counts[b.service] = (counts[b.service] || 0) + 1
  }
  let top = { name: '—', count: 0 }
  for (const name in counts) {
    if (counts[name] > top.count) top = { name, count: counts[name] }
  }
  return top
}

// Bookings grouped by week, for the line chart (oldest → newest).
export function getBookingsOverTime() {
  const weeks = {}
  for (const b of bookings) {
    // Find the Monday of that booking's week as a bucket label.
    const d = new Date(b.date)
    const day = (d.getDay() + 6) % 7            // Monday = 0
    d.setDate(d.getDate() - day)
    const label = d.toISOString().slice(5, 10)  // 'MM-DD'
    weeks[label] = (weeks[label] || 0) + 1
  }
  return Object.keys(weeks)
    .sort()
    .map((label) => ({ week: label, bookings: weeks[label] }))
}

// Count of bookings per service, for the bar chart (highest first).
export function getServiceBreakdown() {
  const counts = {}
  for (const b of bookings) {
    counts[b.service] = (counts[b.service] || 0) + 1
  }
  return Object.keys(counts)
    .map((name) => ({ service: name, count: counts[name] }))
    .sort((a, b) => b.count - a.count)
}

// Revenue split by booking status, for the donut chart.
export function getStatusBreakdown() {
  const totals = {}
  for (const b of bookings) {
    totals[b.status] = (totals[b.status] || 0) + b.price
  }
  return Object.keys(totals).map((status) => ({ status, value: totals[status] }))
}
