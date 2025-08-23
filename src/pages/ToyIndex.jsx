import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadToys, removeToyOptimistic, setFilterBy } from "../store/actions/toy.actions.js"
import { ToyList } from "../cmps/ToyList.jsx"
import { ToyFilter } from "../cmps/ToyFilter.jsx"

import { Link } from 'react-router-dom' 


export default function ToyIndex() {
  const { toys, isLoading, filterBy } = useSelector(state => state.toyModule)

  useEffect(() => {
    loadToys()
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
      <h2>Toy Shop</h2>

      <Link to="/toy/edit" className="btn">Add Toy</Link>
      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

      {isLoading && <p>Loading...</p>}
      {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
    </section>
  )
}
