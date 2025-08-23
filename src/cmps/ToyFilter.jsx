import { useEffect, useMemo, useState } from "react"
import { utilService } from "../services/util.service.js"

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

      <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
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
    </section>
  )
}
