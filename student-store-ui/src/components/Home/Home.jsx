import * as React from "react"
import "./Home.css"

export default function Home({products, cart, updateCart}) {
  const [searchInput, updateInput] = React.useState("")
  const [category, updateCategory] = React.useState("All Categories")

  function handleUpdateInput(event){
    updateInput(event.target.value)
  }

  return (
    <div className="home">
      <div>
        <WelcomeSquare/>

        <div className="searchingTools">
          <CategorySelector category={category} updateCategory={updateCategory}/>
          <SearchInput value={searchInput} handleUpdateInput={handleUpdateInput}/>
        </div>
        <div className="gridContainer">
          {products.map(product => {
            if (product.name.toLowerCase().includes(searchInput.toLowerCase()) && (product.category.toLowerCase() === category.toLowerCase() || category.toLowerCase() === "All Categories".toLowerCase())) {
              return <Product product={product} updateCart={updateCart} cart={cart}/>
            }})}
        </div>
      </div>
    </div>
  )
}

export function WelcomeSquare(){
  return (
      <div className="welcomeSquare">
        <div>
          <h1>Welcome!</h1>
          <p>Find any merch that any student could need</p>
          <p>With a special price!</p>
        </div>
        <img src="" alt="mainImg" />
      </div>
  )
}

export function CategorySelector({category, updateCategory}){
  const [openMenu, openMenuFunc] = React.useState(false)

  function handleDrowdown(){
    openMenuFunc(!openMenu)
  }

  function handleCategory(category){
    openMenuFunc(!openMenu)
    updateCategory(category)
  }

  return(
    <div className="categorySelector">
      <div className="dropdown-button" role="button" onClick={handleDrowdown}>
        <img src="../../../img/arrow_black.png" alt="V" className={`arrowMenu ${openMenu ? "active" : ""}`}/>
        <span>{category}</span>
      </div>
      <DropdownMenu openMenu={openMenu} updateCategory={handleCategory}/>
    </div>
  )
}

export function DropdownMenu({openMenu, updateCategory}){
  const listClass = openMenu ? "active" : ""

  return(
    <ul className={`dropdown-menu ${listClass}`}>
      <li onClick={() => updateCategory("All Categories")}>All Categories</li>
      <li onClick={() => updateCategory("Clothing")}>Clothing</li>
      <li onClick={() => updateCategory("Food")}>Food</li>
      <li onClick={() => updateCategory("Accesories")}>Accesories</li>
      <li onClick={() => updateCategory("Tech")}>Tech</li>
    </ul>
  )
}

export function SearchInput({value, handleUpdateInput}){
  return(
    <div className="searchInput">
      <input value={value} onChange={handleUpdateInput} type="text"/>
      <button><img src="../../../img/searchIcon_white.png" alt="O" /></button>
    </div>
  )
}

export function Product({product, updateCart, cart}){
  function handleAddCart(){
    let handleCart = [...cart];


    let index = cart.findIndex(item => item.name === product.name)

    if (index > -1){
      let repeatedProduct = handleCart[index].quantity + 1

      const newProuct = {
        id: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: repeatedProduct,
        cost: (product.price * repeatedProduct)
      }
      handleCart[index] = newProuct
      updateCart(handleCart)
    }
    else if (index === -1){
      const newProuct = {
        id: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: 1,
        cost: (product.price)
      }
      updateCart([...cart, newProuct])
    }
  }

  function handleDeleteCart(){
    let handleCart = [...cart];
    let index = cart.findIndex(item => item.name === product.name)

    if (index > -1){
      if (handleCart[index].quantity > 1){
        handleCart[index].quantity--
        handleCart[index].cost -= product.price
      }
      else{
        handleCart.splice(index, 1)
      }

      updateCart(handleCart)
    }
  }

  return(
    <div className="productCard" key={product.id}>
      <img src={product.image} alt="Img Product" />
      <div className="productDetails">
        <div className="headerProduct">
          <h3>{product.name}</h3>
          <div className="productButtons">
            <button className="addProduct" onClick={handleAddCart}>+</button>
            <button className="deleteProduct" onClick={handleDeleteCart}>-</button>
          </div>
        </div>
        <div className="stars">
          <img src="../../../img/star_filled.png" alt="X" />
          <img src="../../../img/star_filled.png" alt="X" />
          <img src="../../../img/star_filled.png" alt="X" />
          <img src="../../../img/star_empty.png" alt="X" />
          <img src="../../../img/star_empty.png" alt="X" />
        </div>
        <p>${product.price}</p>
      </div>
    </div>
  )
}
