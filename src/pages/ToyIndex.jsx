import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadToys, removeToyOptimistic, setFilterBy } from "../store/actions/toy.actions.js"
import { ToyList } from "../cmps/ToyList.jsx"
import { ToyFilter } from "../cmps/ToyFilter.jsx"

import { Link } from 'react-router-dom' 
import { showErrorMsg } from "../services/event-bus.service.js"


export default function ToyIndex() {
  const { toys, isLoading, filterBy } = useSelector(state => state.toyModule)

  useEffect(() => {
    loadToys().catch(err => {
      showErrorMsg('Cannot load toys')})
  }, [])

  function onRemoveToy(toyId) {
    removeToyOptimistic(toyId)
  }

  function onSetFilter(newFilter) {
    setFilterBy(newFilter)
    loadToys()
  }

  return (
    <section className="toy-index">
<div>

      <Link to="/toy/edit" className="btn">Add Toy</Link>
      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
</div>

      {isLoading && <p>Loading...</p>}
      {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
    </section>
  )
}
