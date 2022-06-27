import * as React from "react"
import "./Navbar.css"
import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <ul>
          <li><Link to="/" style={{color: 'inherit', textDecoration: 'none'}}><img src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png" alt="Logo" /></Link></li>
          <li><Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>Home</Link></li>
          <li>Buy</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  )
}
