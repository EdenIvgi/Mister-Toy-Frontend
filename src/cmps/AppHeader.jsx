import { Link } from "react-router-dom"
import logo from "../assets/react.svg" 

export function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/" className="logo">
        <img src={logo} alt="MisterToy Logo" />
      </Link>
        <h1>Mister Toy</h1>
    </header>
  )
}
