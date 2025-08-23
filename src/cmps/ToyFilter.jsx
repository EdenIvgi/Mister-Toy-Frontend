import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {
  const [localFilter, setLocalFilter] = useState(filterBy)

const debouncedSet = useRef(
  utilService.debounce((name) => {
    onSetFilter({ name })
  }, 400)
).current


  useEffect(() => {
    setLocalFilter(filterBy)
  }, [filterBy])

  function onNameChange({ target }) {
    const name = target.value
    setLocalFilter(prev => ({ ...prev, name }))
    debouncedSet(name) 
  }

  return (
    <section className="toy-filter">
      <input
        type="text"
        name="name"
        value={localFilter.name}
        placeholder="Search toys by name…"
        onChange={onNameChange}
      />
    </section>
  )
}
