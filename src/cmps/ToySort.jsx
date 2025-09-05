import { useState, useEffect } from 'react'
import { useEffectUpdate } from '../hooks/useEffectUpdate.js'

export default function ToySort({
  value = { type: '', sortDir: 1 },
  onChange = () => {},
}) {
  const [sortByToEdit, setSortByToEdit] = useState({
    type: value.type || '',
    sortDir: Number(value.sortDir) === -1 ? -1 : 1,
  })

  useEffect(() => {
    setSortByToEdit({
      type: value.type || '',
      sortDir: Number(value.sortDir) === -1 ? -1 : 1,
    })
  }, [value.type, value.sortDir])

  useEffectUpdate(() => {
    onChange(sortByToEdit)
  }, [sortByToEdit])

  function handleChange({ target }) {
    const field = target.name
    const next =
      field === 'sortDir'
        ? { ...sortByToEdit, sortDir: sortByToEdit.sortDir * -1 }
        : { ...sortByToEdit, [field]: target.value }
    setSortByToEdit(next)
  }

  return (
    <form className="toy-sort">
      <select name="type" value={sortByToEdit.type} onChange={handleChange}>
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="createdAt">Date</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="sortDir"
          checked={sortByToEdit.sortDir < 0}
          onChange={handleChange}
          disabled={!sortByToEdit.type}
        />
        <span>Descending</span>
      </label>
    </form>
  )
}
