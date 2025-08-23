import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"

export default function ToyDetails() {
  const [toy, setToy] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    toyService.get(toyId)
      .then(setToy)
      .catch(() => navigate('/toy'))
  }

  if (!toy) return <div>Loading...</div>

  return (
    <section className="toy-details">
      <header className="toy-details__header">
        <h1>Toy name: {toy.name}</h1>
        <button
          className="icon-btn spacer"
          title="Open chat"
          onClick={() => setIsChatOpen(true)}
        >
          💬
        </button>
      </header>

      {toy.imgUrl && (
        <img className="toy-details__img" src={toy.imgUrl} alt={toy.name} />
      )}

      <h5>Price: ${toy.price}</h5>
      <p>{toy.inStock ? '✅ In stock' : '❌ Out of stock'}</p>
      {toy.labels?.length ? <p>Labels: {toy.labels.join(', ')}</p> : null}
      <p>Created: {new Date(toy.createdAt).toLocaleString()}</p>

      <div className="toy-details__actions">
        <Link to={`/toy/edit/${toy._id}`} className="btn">Edit</Link>
        <Link to="/toy" className="btn">Back</Link>
      </div>

      <PopUp
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        heading={<span>Chat about <b>{toy.name}</b></span>}
        footing={<button className="btn" onClick={() => setIsChatOpen(false)}>Close</button>}
      >
        <Chat />
      </PopUp>
    </section>
  )
}
