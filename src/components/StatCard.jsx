// A StatCard is ONE of the four number cards along the top.
// We write it once, then reuse it four times with different props.
// "props" are the inputs a component receives — like arguments to a function.

export default function StatCard({ label, value, foot, accent }) {
  return (
    // The `accent` prop sets the color of the left edge line via a CSS variable.
    <div className="stat" style={{ '--accent': accent }}>
      <div className="stat__label">{label}</div>
      <div className="stat__value mono">{value}</div>
      {foot && <div className="stat__foot">{foot}</div>}
    </div>
  )
}
