import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    toyService.get(toyId)
      .then(toy => setToy(toy))
      .catch(err => {
        console.log('Had issues in toy details', err)
        navigate('/toy')
      })
  }

  if (!toy) return <div>Loading...</div>

  return (
    <section className="toy-details">
      <h1>Toy name: {toy.name}</h1>
      <h5>Price: ${toy.price}</h5>
      <p>{toy.inStock ? '✅ In stock' : '❌ Out of stock'}</p>
      {toy.labels?.length ? <p>Labels: {toy.labels.join(', ')}</p> : null}
      {toy.imgUrl && <img src={toy.imgUrl} alt={toy.name} style={{ maxWidth: 240 }} />}
      <p>Created: {new Date(toy.createdAt).toLocaleString()}</p>

      <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
      <Link to={`/toy`}>Back</Link>
      {/* אפשר להוסיף "Next Toy" בהמשך אם תרצה לוגיקת next/prev */}
    </section>
  )
}
