import { toyService } from "../../services/toy.service.js"
import { showSuccessMsg } from "../../services/event-bus.service.js"
import {
    ADD_TOY,
    TOY_UNDO,
    REMOVE_TOY,
    SET_TOYS,
    SET_FILTER_BY,
    SET_IS_LOADING,
    UPDATE_TOY
} from "../reducers/toy.reducer.js"
import { store } from "../store.js"

export async function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
        return toys
    } catch (error) {
        console.error('toy action -> Cannot load toys', error)
        throw error
    } finally {
        setTimeout(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        }, 300)
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
        return toyId
    } catch (error) {
        console.error('toy action -> Cannot remove toy', error)
        throw error
    }
}

export async function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    try {
        await toyService.remove(toyId)
        showSuccessMsg('Removed Toy!')
        return toyId
    } catch (error) {
        store.dispatch({ type: TOY_UNDO })
        console.error('toy action -> Cannot remove toy', error)
        throw error
    }
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const savedToy = await toyService.save(toy)
        store.dispatch({ type, toy: savedToy })
        return savedToy
    } catch (error) {
        console.error('toy action -> Cannot save toy', error)
        throw error
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
