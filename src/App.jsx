import { Provider } from 'react-redux'
import { store } from './store/store.js'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ToyIndex from './pages/ToyIndex.jsx'
import ToyDetails from './pages/ToyDetails.jsx'
import ToyEdit from './pages/ToyEdit.jsx'

import { UserMsg } from './cmps/UserMsg.jsx'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <main className="main-layout">
            <Routes>
              <Route element={<ToyIndex />} path="/" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
            </Routes>
          </main>
          <UserMsg />
        </section>
      </Router>
    </Provider>
  )
}
