import React from 'react'

function Products({ products, likedProducts, cartProducts, addLiked, removeLiked,
  addToCart, removeFromCart
 }) {
  return (
    <div className='productContainer'>
          {products.map((product) =>
              <div className='productDiv' key={product.id}>
                  <img src={`${product.thumbnail}`} alt="" />
                  <h4>{product.title}</h4>
                  <p>${product.price}</p>
                  <div>
                    <button onClick={() => {
                      if (!likedProducts.find(prod => prod.id === product.id)) {
                        addLiked(product.id)
                      } else {
                        removeLiked(product.id);
                      }
                    }} id="likeBtn"> {likedProducts.find(prod => prod.id === product.id) ? 'Unlike' : 'Like' } </button>
                    <button id="addToCartBtn"  onClick={() => {
                      if (!cartProducts.find(prod => prod.id === product.id)) {
                        addToCart(product.id)
                      } else {
                        removeFromCart(product.id);
                      }
                    }}>{cartProducts.find(prod => prod.id === product.id) ? 'Remove from cart' : 'Add to cart' }</button>
                  </div>
                </div>
            )}
        </div>
  )
}

export default Products