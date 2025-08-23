// src/store/reducers/toy.reducer.js
import { toyService } from "../../services/toy.service.js"

//* Toys (entities)
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

//* UI / meta
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    lastToys: []        // used for simple undo after REMOVE_TOY
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {

        //* ----- Toys CRUD -----
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY: {
            const lastToys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId),
                lastToys
            }
        }

        case ADD_TOY:
            return { ...state, toys: [...state.toys, action.toy] }

        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(t => (t._id === action.toy._id ? action.toy : t))
            }

        //* ----- Undo -----
        case TOY_UNDO:
            return { ...state, toys: [...state.lastToys] }

        //* ----- UI / meta -----
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }
}
