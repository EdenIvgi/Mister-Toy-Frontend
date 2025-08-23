import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function ToyEdit() {
  const navigate = useNavigate()
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()

  useEffect(() => {
    if (toyId) loadToy()
  }, [])

  function loadToy() {
    toyService.get(toyId)
      .then(toy => setToyToEdit(toy))
      .catch(err => {
        console.log('Had issues in toy edit', err)
        navigate('/toy')
      })
  }

  function handleChange({ target }) {
    let { value, type, name: field, checked } = target
    if (type === 'number') value = +value
    if (type === 'checkbox') value = checked
    setToyToEdit(prev => ({ ...prev, [field]: value }))
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    if (!toyToEdit.name) return showErrorMsg('Name is required')
    if (!toyToEdit.price) toyToEdit.price = 1

    saveToy(toyToEdit)
      .then(() => {
        showSuccessMsg('Toy Saved!')
        navigate('/toy')
      })
      .catch(err => {
        console.log('Had issues in toy save', err)
        showErrorMsg('Had issues in toy save')
      })
  }

  return (
    <section className="toy-edit">
      <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

      <form onSubmit={onSaveToy}>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter name..."
          value={toyToEdit.name}
          onChange={handleChange}
        />

        <label htmlFor="price">Price : </label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Enter price"
          value={toyToEdit.price}
          onChange={handleChange}
          min="0"
        />

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            name="inStock"
            checked={!!toyToEdit.inStock}
            onChange={handleChange}
          />
          In stock
        </label>

        <label htmlFor="imgUrl">Image URL : </label>
        <input
          type="text"
          name="imgUrl"
          id="imgUrl"
          placeholder="https://..."
          value={toyToEdit.imgUrl}
          onChange={handleChange}
        />

        {/* labels נוסיף בהמשך כ-multiselect */}
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
          <Link to="/toy">Cancel</Link>
        </div>
      </form>
    </section>
  )
}
