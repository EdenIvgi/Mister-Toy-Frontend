import { Link, NavLink } from "react-router-dom"
import logo from "../assets/react.svg" 

export function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/" className="logo">
        <img src={logo} alt="MisterToy Logo" />
      </Link>
        <h1>Mister Toy</h1>

        <nav className="main-nav">
        <NavLink to="/" className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}>Store</NavLink>
        <NavLink to="/Dashboard" className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}>Dashboard</NavLink>
        <NavLink to="/About" className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}>About</NavLink>
      </nav>

    </header>
  )
}
