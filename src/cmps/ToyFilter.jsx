import { useEffect, useMemo, useState } from "react"
import { utilService } from "../services/util.service.js"

const LABELS = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered'
]

export function ToyFilter({ filterBy, onSetFilter }) {
  const [localFilter, setLocalFilter] = useState(filterBy)

  const DEBOUNCE_MS = 400
  const debouncedSetName = useMemo(
    () => utilService.debounce((name) => onSetFilter({ name }), DEBOUNCE_MS),
    [onSetFilter, DEBOUNCE_MS]
  )

  useEffect(() => {
    setLocalFilter(filterBy)
  }, [filterBy])

  function onNameChange({ target }) {
    const name = target.value
    setLocalFilter(prev => ({ ...prev, name }))
    debouncedSetName(name)
  }

  function onInStockChange({ target }) {
    const val = target.value
    const inStock =
      val === 'all' ? null :
      val === 'in'  ? true :
      val === 'out' ? false : null

    setLocalFilter(prev => ({ ...prev, inStock }))
    onSetFilter({ inStock })
  }

  function onToggleLabel(label) {
    const curr = new Set(localFilter.labels || [])
    if (curr.has(label)) curr.delete(label)
    else curr.add(label)
    const labels = [...curr]
    setLocalFilter(prev => ({ ...prev, labels }))
    onSetFilter({ labels })
  }

  function onSortChange({ target }) {
    const sortBy = target.value
    setLocalFilter(prev => ({ ...prev, sortBy }))
    onSetFilter({ sortBy })
  }

  return (
    <section className="toy-filter">
      <label className="group">
        <span>Search:</span>
        <input
          type="text"
          name="name"
          value={localFilter.name}
          placeholder="Search toys by name…"
          onChange={onNameChange}
        />
      </label>

            <label className="group">
        <span>Sort by:</span>
        <select value={localFilter.sortBy || ''} onChange={onSortChange}>
          <option value="">None</option>
          <option value="name">Name (A→Z)</option>
          <option value="price">Price (Low→High)</option>
          <option value="created">Created (New→Old)</option>
        </select>
      </label>

      <label className="group">
        <span>Stock:</span>
        <select
          value={
            localFilter.inStock === null || localFilter.inStock === undefined
              ? 'all'
              : localFilter.inStock ? 'in' : 'out'
          }
          onChange={onInStockChange}
        >
          <option value="all">All</option>
          <option value="in">In stock</option>
          <option value="out">Out of stock</option>
        </select>
      </label>

      <fieldset className="labels">
        <legend>Labels</legend>
        <ul className="labels-grid clean-list">
          {LABELS.map(label => (
            <li key={label}>
              <label className="group">
                <input
                  type="checkbox"
                  checked={localFilter.labels?.includes(label) || false}
                  onChange={() => onToggleLabel(label)}
                />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>


    </section>
  )
}
