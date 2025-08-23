import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy }) {
  if (!toys.length) return <p>No toys to show...</p>
  return (
    <ul className="toy-list clean-list">
      {toys.map(toy =>
        <li key={toy._id}>
          <ToyPreview toy={toy} />
        </li>
      )}
    </ul>
  )
}
