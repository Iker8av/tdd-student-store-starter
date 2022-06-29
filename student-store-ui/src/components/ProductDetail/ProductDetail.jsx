import React from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import NotFound from "../NotFound/NotFound"
import "./ProductDetail.css"

export default function ProductDetail({cart, updateCart}) {
    const [product, setProduct] = React.useState({})
    const params = useParams()

    React.useEffect(() => {
        axios(`https://codepath-store-api.herokuapp.com/store/${params.productId}`)
          .then(response => {
            setProduct(response.data.product)
          })
          .catch(error => {
            console.error("Error fetching: ", error)
          })
      }, [product])

      if (product == 0){
          return (
              <h1>Loading...</h1>
          )
      }
      else if (product == null){
          return(
            <NotFound/>
          )
      }

    return (
        <div>
            <ProductView product={product} cart={cart} updateCart={updateCart}/>
        </div>
    )
}

export function ProductView({product, cart, updateCart}){
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
        <div className="productCard-Detail" key={product.id}>
            <img src={product.image} alt="Img Product" />
            <div className="productDetails">
                <div className="headerProduct">
                <h3>{product.name}</h3>

                <div className="productButtons">
                    <button className="addProduct" onClick={handleAddCart}>+</button>
                    <button className="deleteProduct" onClick={handleDeleteCart}>-</button>
                </div>
                </div>
                <p>{product.description}</p>
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
