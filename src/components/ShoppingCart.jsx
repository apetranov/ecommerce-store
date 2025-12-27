import React from 'react'

function ShoppingCart({ 
    cartProducts, 
    likedProducts,
    addLiked,
    removeLiked,
    removeFromCart
}) {
  return (
    <div className='productContainer'>
        {cartProducts.map((product) =>
            <div className='productDiv' key={product.id}>
                <img src={`${product.thumbnail}`} alt="" />
                <h4>{product.title}</h4>
                <p>${product.price}</p>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                <button onClick={() => {
                    if (!likedProducts.find(prod => prod.id === product.id)) {
                    addLiked(product.id)
                    } else {
                    removeLiked(product.id);
                    }
                }} id="likeBtn">{likedProducts.find(prod => prod.id === product.id) ? 'Unlike' : 'Like' }</button>
                <button onClick={() => removeFromCart(product.id)} id="addToCartBtn">{cartProducts.find(prod => prod.id === product.id) ? 'Remove from cart' : 'Add to cart' }</button>
                </div>
            </div>
        )}
        </div>
  )
}

export default ShoppingCart