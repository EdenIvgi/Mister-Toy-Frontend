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
    'Battery Powered',
]

_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyToy,
    getToyLabels,
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY).then((toys) => {
        let res = toys

        if (filterBy.name) {
            const regex = new RegExp(filterBy.name, 'i')
            res = res.filter((toy) => regex.test(toy.name))
        }

        if (filterBy.inStock !== undefined && filterBy.inStock !== null && filterBy.inStock !== '') {
            res = res.filter((toy) => toy.inStock === filterBy.inStock)
        }

        if (Array.isArray(filterBy.labels) && filterBy.labels.length) {
            res = res.filter((toy) => toy.labels?.some((l) => filterBy.labels.includes(l)))
        }

        if (filterBy.sortBy?.type) {
            const { type, sortDir } = filterBy.sortBy
            const dir = Number(sortDir) === -1 ? -1 : 1
            res.sort((a, b) => {
                switch (type) {
                    case 'name':
                        return a.name.localeCompare(b.name) * dir
                    case 'price':
                        return (a.price - b.price) * dir
                    case 'createdAt':
                        return (a.createdAt - b.createdAt) * dir
                    default:
                        return 0
                }
            })
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
    return { name: '', inStock: null, labels: [], sortBy: { type: '', sortDir: 1 } }
}

function getToyLabels() {
    return [...labels]
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
