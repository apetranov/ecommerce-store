import React from 'react'
import '../App.css'

function Products({ products }) {
  return (
    <div className='productContainer'>
        {products.map((product) =>
            <div className='productDiv' key={product.id}>
                <img src={`${product.thumbnail}`} alt="" />
                <h4>{product.title}</h4>
                <p>${product.price}</p>
            </div>
        )}
    </div>
  )
}

export default Products