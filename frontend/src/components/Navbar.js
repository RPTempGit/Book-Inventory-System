import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import "./Navbar.css"

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="modern-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <div className="navbar-logo-img">
            📚
          </div>
          <div>
            <h1 className="navbar-logo-text">L & J Warehouse Co</h1>
            <p className="navbar-logo-subtitle">Book Inventory System</p>
          </div>
        </Link>

        {user && (
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        )}

        {user && (
          <nav className={`navbar-nav ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <NavLink
              to="/"
              end
              className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              <span className="navbar-link-icon">📊</span>
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/transaction"
              className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              <span className="navbar-link-icon">💳</span>
              <span>Transaction</span>
            </NavLink>
            <NavLink
              to="/stocktake"
              className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              <span className="navbar-link-icon">📦</span>
              <span>Stock Take</span>
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              <span className="navbar-link-icon">📈</span>
              <span>Reports</span>
            </NavLink>
          </nav>
        )}

        {user && (
          <div className="navbar-user">
            <div className="user-info">
              <p className="user-email">{user.email}</p>
              <p className="user-role">{user.role}</p>
            </div>
            <button 
              className="logout-button" 
              onClick={handleLogout}
              aria-label="Logout"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        )}

        {!user && (
          <nav className="navbar-nav">
            <NavLink
              to="/login"
              className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
            >
              Signup
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
