// src/services/toy.service.js
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'toyDB'

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered'
]

// seed initial data once (localStorage)
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyToy,
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY).then((toys) => {
        let res = toys

        if (filterBy.name) {
            const regex = new RegExp(filterBy.name, 'i')
            res = res.filter((toy) => regex.test(toy.name))
        }

        if (filterBy.inStock !== undefined && filterBy.inStock !== null) {
            res = res.filter((toy) => toy.inStock === filterBy.inStock)
        }

        if (Array.isArray(filterBy.labels) && filterBy.labels.length) {
            res = res.filter((toy) => filterBy.labels.every((l) => toy.labels.includes(l)))
        }

        if (filterBy.sortBy) {
            switch (filterBy.sortBy) {
                case 'name':
                    res.sort((a, b) => a.name.localeCompare(b.name))
                    break
                case 'price':
                    res.sort((a, b) => a.price - b.price)
                    break
                case 'created':
                    res.sort((a, b) => b.createdAt - a.createdAt)
                    break
                default:
                    break
            }
        }

        return res
    })
}

function get(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) return storageService.put(STORAGE_KEY, toy)

    const toSave = {
        ...getEmptyToy(),
        ...toy,
        createdAt: Date.now(),
    }
    return storageService.post(STORAGE_KEY, toSave)
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        inStock: true,
        imgUrl: '',
        createdAt: Date.now(),
    }
}

function getDefaultFilter() {
    return { name: '', inStock: null, labels: [], sortBy: '' }
}

function _createToys() {
    let toys = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!toys || !toys.length) {
        toys = [
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
                inStock: true,
                imgUrl: 'https://picsum.photos/seed/talking-doll/200/200',
            },
            {
                _id: 't102',
                name: 'Lego Puzzle',
                price: 90,
                labels: ['Puzzle', 'Box game'],
                createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
                inStock: false,
                imgUrl: 'https://picsum.photos/seed/lego-puzzle/200/200',
            },
            {
                _id: 't103',
                name: 'Baby Rattle',
                price: 35,
                labels: ['Baby'],
                createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
                inStock: true,
                imgUrl: 'https://picsum.photos/seed/baby-rattle/200/200',
            },
            {
                _id: 't104',
                name: 'Art Kit',
                price: 70,
                labels: ['Art'],
                createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
                inStock: true,
                imgUrl: 'https://picsum.photos/seed/art-kit/200/200',
            },
            {
                _id: 't105',
                name: 'RC Car',
                price: 220,
                labels: ['On wheels', 'Battery Powered', 'Outdoor'],
                createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
                inStock: true,
                imgUrl: 'https://picsum.photos/seed/rc-car/200/200',
            },
            {
                _id: 't106',
                name: 'Garden Playground',
                price: 450,
                labels: ['Outdoor'],
                createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
                inStock: false,
                imgUrl: 'https://picsum.photos/seed/garden-play/200/200',
            },
        ]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
    }
}
