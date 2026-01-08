import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/logo.png" alt="Book Inventory Logo" className="logo-image" />
          <span className="logo-text">BookHub</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {/* Home Link */}
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
          </li>

          {/* Books Dropdown */}
          <li className={`nav-item dropdown ${activeDropdown === 'books' ? 'active' : ''}`}>
            <button 
              className="nav-link dropdown-toggle"
              onClick={() => toggleDropdown('books')}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'books'}
            >
              Books
              <span className="dropdown-arrow">▼</span>
            </button>
            <ul className="dropdown-menu">
              <li><Link to="/books" className="dropdown-link" onClick={closeMenu}>All Books</Link></li>
              <li><Link to="/books/add" className="dropdown-link" onClick={closeMenu}>Add Book</Link></li>
              <li><Link to="/books/categories" className="dropdown-link" onClick={closeMenu}>Categories</Link></li>
              <li><Link to="/books/authors" className="dropdown-link" onClick={closeMenu}>Authors</Link></li>
            </ul>
          </li>

          {/* Inventory Dropdown */}
          <li className={`nav-item dropdown ${activeDropdown === 'inventory' ? 'active' : ''}`}>
            <button 
              className="nav-link dropdown-toggle"
              onClick={() => toggleDropdown('inventory')}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'inventory'}
            >
              Inventory
              <span className="dropdown-arrow">▼</span>
            </button>
            <ul className="dropdown-menu">
              <li><Link to="/inventory" className="dropdown-link" onClick={closeMenu}>Dashboard</Link></li>
              <li><Link to="/inventory/stock" className="dropdown-link" onClick={closeMenu}>Stock Levels</Link></li>
              <li><Link to="/inventory/transactions" className="dropdown-link" onClick={closeMenu}>Transactions</Link></li>
              <li><Link to="/inventory/reports" className="dropdown-link" onClick={closeMenu}>Reports</Link></li>
            </ul>
          </li>

          {/* Management Dropdown */}
          <li className={`nav-item dropdown ${activeDropdown === 'management' ? 'active' : ''}`}>
            <button 
              className="nav-link dropdown-toggle"
              onClick={() => toggleDropdown('management')}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'management'}
            >
              Management
              <span className="dropdown-arrow">▼</span>
            </button>
            <ul className="dropdown-menu">
              <li><Link to="/management/users" className="dropdown-link" onClick={closeMenu}>Users</Link></li>
              <li><Link to="/management/settings" className="dropdown-link" onClick={closeMenu}>Settings</Link></li>
              <li><Link to="/management/roles" className="dropdown-link" onClick={closeMenu}>Roles & Permissions</Link></li>
            </ul>
          </li>

          {/* About Link */}
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={closeMenu}>
              About
            </Link>
          </li>

          {/* Contact Link */}
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={closeMenu}>
              Contact
            </Link>
          </li>

          {/* User Profile Dropdown */}
          <li className={`nav-item dropdown ${activeDropdown === 'profile' ? 'active' : ''}`}>
            <button 
              className="nav-link dropdown-toggle profile-toggle"
              onClick={() => toggleDropdown('profile')}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'profile'}
            >
              <span className="profile-icon">👤</span>
              <span className="profile-text">Profile</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            <ul className="dropdown-menu profile-menu">
              <li><Link to="/profile" className="dropdown-link" onClick={closeMenu}>My Profile</Link></li>
              <li><Link to="/settings/account" className="dropdown-link" onClick={closeMenu}>Account Settings</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link to="/logout" className="dropdown-link logout" onClick={closeMenu}>Logout</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
