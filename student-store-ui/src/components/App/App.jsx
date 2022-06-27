import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import About from "../About/About"
import ContactUs from "../ContactUs/ContactUs"
import NotFound from "../NotFound/NotFound"
import ProductDetail from "../ProductDetail/ProductDetail"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"

export default function App() {
  const [products, updateProducts] = React.useState([])
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    axios('https://codepath-store-api.herokuapp.com/store')
      .then(response => {
        setData(response.data.products)
        console.log(response.data.products)
      })
      .catch(error => {
        console.error("Error fetching: ", error)
      })
  }, [products])

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Sidebar cart={products}/>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home products={data} cart={products} updateCart={updateProducts}/>} />
              <Route path="/products/:productId" element={<ProductDetail cart={products} updateCart={updateProducts}/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>

          </div>
        </main>
      </BrowserRouter>
    </div>
  )
}
