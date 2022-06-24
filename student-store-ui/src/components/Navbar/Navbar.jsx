import * as React from "react"
import "./Navbar.css"
import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <ul>
          <li><img src="" alt="Logo" /></li>
          <li>Home</li>
          <li>Buy</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  )
}
