import { Provider } from 'react-redux'
import { store } from './store/store.js'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

import ToyIndex from './pages/ToyIndex.jsx'
import ToyDetails from './pages/ToyDetails.jsx'
import ToyEdit from './pages/ToyEdit.jsx'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />

          <main className="main-layout">
            <Routes>
              <Route path="/" element={<ToyIndex />} />
              <Route path="/toy" element={<ToyIndex />} />
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              <Route path="/toy/edit" element={<ToyEdit />} />
              <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
            </Routes>
          </main>

          <UserMsg />
        </section>
      </Router>
    </Provider>
  )
}
