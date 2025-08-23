import { Link } from "react-router-dom"

export function ToyPreview({ toy, onRemoveToy }) {
  return (
    <article className="toy-preview">
      <h3 className="toy-title">
        <Link to={`/toy/${toy._id}`}>{toy.name}</Link>
      </h3>

      <h5>Price: ${toy.price}</h5>
      <p>{toy.inStock ? '✅ In stock' : '❌ Out of stock'}</p>
      {toy.labels?.length ? <p>Labels: {toy.labels.join(', ')}</p> : null}

      <div className="actions">
        <Link to={`/toy/${toy._id}`} className="btn">Details</Link>
        <Link to={`/toy/edit/${toy._id}`} className="btn">Edit</Link>
        <button
          onClick={() => onRemoveToy(toy._id)}
          className="btn danger"
        >
          Remove
        </button>
      </div>
    </article>
  )
}
