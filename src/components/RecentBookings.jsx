// A table of the most recent bookings.
// Shows how to turn an array of data into rows with .map().

export default function RecentBookings({ bookings }) {
  // Only show the newest 6 so the panel stays tidy.
  const recent = bookings.slice(0, 6)

  // Format '2026-06-14' into 'Jun 14' for readability.
  const prettyDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div className="panel" style={{ paddingBottom: 20 }}>
      <div className="panel__head">
        <div className="panel__title">Recent bookings</div>
        <div className="panel__hint">latest 6</div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Style</th>
            <th>Date</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {/* For each booking, render one <tr>. The `key` helps React track rows. */}
          {recent.map((b) => (
            <tr key={b.id}>
              <td className="table__name">{b.client}</td>
              <td>{b.service}</td>
              <td style={{ color: 'var(--muted)' }}>{prettyDate(b.date)}</td>
              <td><span className={`pill pill--${b.status}`}>{b.status}</span></td>
              <td className="mono" style={{ textAlign: 'right' }}>${b.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
