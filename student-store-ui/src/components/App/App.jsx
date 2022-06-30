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
  const [username, updateUsername] = React.useState("")
  const [email, updateEmail] = React.useState("")
  const [subtotal, updateSubtotal] = React.useState(0)

  const [checkoutCart, updateCheckoutCart] = React.useState({
    products: [],
    subtotal: 0,
    total: 0
  })

  function handleSubtotal(){
    var cartSubtotal = 0

    console.log(".")
    console.log(products)

    products.map(item => {
      console.log(item.cost)
      cartSubtotal += parseFloat(item.cost)
      console.log(cartSubtotal)
    })
    updateSubtotal(cartSubtotal)
  }

  function handleOnSubmitCheckoutForm() {
    const postRequest = {
      user: {
        name: username,
        email: email
      },
      shoppingCart: checkoutCart.products.map(item =>
        (
          {
            itemId: item.id,
            quantity: item.quantity
          }
        )
      ),
      subtotal: subtotal
    }
    console.log('postRequest: ', postRequest);

    axios.post(`http://localhost:3001/store/purchases`, {postRequest})
    .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  React.useEffect(() => {
    axios.get("http://localhost:3001/store")
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
          <Sidebar cart={products} checkoutCart={checkoutCart} updateCheckoutCart={updateCheckoutCart} username={username} updateUsername={updateUsername} email={email} updateEmail={updateEmail} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} subtotal={subtotal} handleSubtotal={handleSubtotal}/>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home products={data} cart={products} updateCart={updateProducts} handleSubtotal={handleSubtotal}/>} />
              <Route path="/products/:productId" element={<ProductDetail cart={products} updateCart={updateProducts}/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>

          </div>
        </main>
      </BrowserRouter>
    </div>
  )
}
