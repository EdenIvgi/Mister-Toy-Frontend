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

  return (
    <section className="toy-filter">
      <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', marginInlineEnd: 12 }}>
        <span>Search:</span>
        <input
          type="text"
          name="name"
          value={localFilter.name}
          placeholder="Search toys by name…"
          onChange={onNameChange}
        />
      </label>

      <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', marginInlineEnd: 12 }}>
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

      <fieldset className="labels" style={{ display:'inline-block', marginInlineStart: 12 }}>
        <legend>Labels</legend>
        <ul className="clean-list" style={{ display:'grid', gap:4, gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', padding:0 }}>
          {LABELS.map(label => (
            <li key={label} style={{ listStyle:'none' }}>
              <label style={{ display:'flex', gap:6, alignItems:'center' }}>
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
