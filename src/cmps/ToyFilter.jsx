import { useRef, useState } from 'react'
import { useEffectUpdate } from '../hooks/useEffectUpdate.js'
import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'
import ToySort from './ToySort.jsx'

const ALL_LABELS_VALUE = '__ALL__'

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({
    name: '',
    inStock: '',
    labels: [],
    sortBy: { type: '', sortDir: 1 },
    ...filterBy,
    inStock:
      filterBy?.inStock === true ? 'true' :
      filterBy?.inStock === false ? 'false' : ''
  })

  const debouncedOnSetFilter = useRef(
    utilService.debounce((nextFilter) => {
      const normalized = {
        ...nextFilter,
        inStock:
          nextFilter.inStock === 'true' ? true :
          nextFilter.inStock === 'false' ? false : null,
        labels: Array.isArray(nextFilter.labels) ? nextFilter.labels : [],
        sortBy: nextFilter.sortBy?.type
          ? { type: nextFilter.sortBy.type, sortDir: Number(nextFilter.sortBy.sortDir) === -1 ? -1 : 1 }
          : { type: '', sortDir: 1 },
      }
      onSetFilter(normalized)
    }, 300)
  )

  useEffectUpdate(() => {
    debouncedOnSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type, multiple, selectedOptions } = target
    if (type === 'select-multiple' || multiple) {
      const values = Array.from(selectedOptions, opt => opt.value)
      if (values.includes(ALL_LABELS_VALUE)) {
        const next = { ...filterByToEdit, labels: [] }
        setFilterByToEdit(next)
        debouncedOnSetFilter.current(next)
        return
      }
      value = values.filter(Boolean)
    }
    if (type === 'number') value = +value || ''
    setFilterByToEdit(prev => ({ ...prev, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    debouncedOnSetFilter.current(filterByToEdit)
  }

  function onChangeSort(nextSortBy) {
    setFilterByToEdit(prev => ({ ...prev, sortBy: nextSortBy }))
  }

  const { name, inStock, labels = [], sortBy } = filterByToEdit
  const toyLabels = toyService.getToyLabels()

  return (
    <section className="toy-filter">

      <form onSubmit={onSubmitFilter} className="filter-form flex align-center" style={{ gap: '.5rem', flexWrap: 'wrap' }}>
        <input
          onChange={handleChange}
          value={name}
          type="text"
          placeholder="Search by name"
          name="name"
        />

        <select name="inStock" value={inStock} onChange={handleChange}>
          <option value="">All</option>
          <option value="true">In Stock</option>
          <option value="false">Not in stock</option>
        </select>

        <select
          multiple
          name="labels"
          value={labels}
          onChange={handleChange}
          size={Math.min(4, (toyLabels?.length || 0) + 1)}
          title="Hold Ctrl/Cmd to select multiple"
        >
          <option value={ALL_LABELS_VALUE}>Labels</option>
          {toyLabels.map(label => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </form>

      <ToySort value={sortBy || { type: '', sortDir: 1 }} onChange={onChangeSort} />
    </section>
  )
}
