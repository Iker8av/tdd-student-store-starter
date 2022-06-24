import * as React from "react"
import "./Sidebar.css"

export default function Sidebar({cart}) {
  const [openSlidebar, openSlidebarFunc] = React.useState(false)
  const [checkout, updateCheckout] = React.useState(false)

  const [username, updateUsername] = React.useState("")
  const [email, updateEmail] = React.useState("")

  const [checkoutCart, updateCheckoutCart] = React.useState({
    products: [],
    subtotal: 0,
    total: 0
  })

  function handleSlidebar(){
    openSlidebarFunc(!openSlidebar)
  }

  function handleUsername(event){
    updateUsername(event.target.value)
  }

  function handleEmail(event){
    updateEmail(event.target.value)
  }

  function handleCheckout(){
    var cartSubtotal = 0;
    cart.map(item => cartSubtotal =+ parseFloat(item.cost))

    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    let newCheckout = {
      username: username,
      email: email,
      products: cart,
      subtotal: formatter.format(cartSubtotal),
      total: formatter.format(cartSubtotal + (cartSubtotal + 0.16))
    }

    console.log('newCheckout: ', newCheckout);

    updateCheckoutCart(newCheckout)
    updateCheckout(true)
  }

  return (
    <section className={`sidebar ${openSlidebar ? "active" : ""}`}>
      <div>
        <img src="../../../img/menuIcon.png" alt="=" onClick={handleSlidebar}/>
        <ul>
          <li><img src="../../../img/profileIcon.png" alt="A" />
            <div>
              <span>Account Information</span>
              <AccountInfo username={username} email={email} handleUsername={handleUsername} handleEmail={handleEmail} handleCheckout={handleCheckout}/>
            </div>
          </li>
          <li><img src="../../../img/shoppingCart.png" alt="C" />
            <div className="shopping-cart">
              <span>My Shopping Cart</span>
              {cart.length > 0 ? <TableCart cart={cart}/> : <p>No items added to cart yet</p>}
            </div>
          </li>
          <li>
            <div className="checkout-success">
              <span>Checkout</span>
              {checkout ? <Receipt checkoutCart={checkoutCart}/> : <p>Add items to you cart, Fill the information above and press Checkout button to continue</p>}
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

export function TableCart({cart}){
  return(
    <div className="header">
      <div className="header-row">
        <span class="flex-2">Name</span>
        <span class="center">Quantity</span>
        <span class="center">Unit Price</span>
        <span class="center">Cost</span>
      </div>
      {cart.map(product => {return <ProductRow product={product}/>}) }
    </div>
  )
}

export function ProductRow({product}){
  return(
    <div className="product-row">
      <span class="flex-2 cart-product-name">{product.name}</span>
      <span class="center cart-product-quantity">{product.quantity}</span>
      <span class="center cart-product-price">${product.unitPrice}</span>
      <span class="center cart-product-subtotal">${product.cost}</span>
    </div>
  )
}

export function AccountInfo({username, email, handleUsername, handleEmail, handleCheckout}){
  return (
    <div className="checkout-form">
      <p>Name:</p>
      <input type="text" value={username} onChange={handleUsername} id="inputName" placeholder="Student Name"/>
      <p>Email:</p>
      <input type="text" value={email} onChange={handleEmail} id="inputEmail" placeholder="student@school.com"/>
      <label class="checkbox"><input name="termsAndConditions" type="checkbox"/><span class="label">I agree to the <a href="#terms-and-conditions">terms and conditions</a></span></label>
      <button onClick={handleCheckout} className="checkout-button">Checkout</button>
    </div>
  )
}

export function Receipt({checkoutCart}){
  return(
    <div className="receipt">
      <p>Showing Receipt for {checkoutCart.username}</p>
      <p>Email:  {checkoutCart.email}</p>

      <ul>
        {checkoutCart.products.map(item => {
          <li>{item.quantity} - {item.name} = ${item.unitPrice} = ${item.cost}</li>
        })}
        <li>Subtotal = {checkoutCart.subtotal}</li>
        <li>Total (+Taxes) = {checkoutCart.total}</li>
      </ul>

      <div>
        <button>Shop More</button>
        <button type="submit"> Exit</button>
      </div>
    </div>
  )
}
