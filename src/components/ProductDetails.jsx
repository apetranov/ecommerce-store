import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState({})

    async function getProduct() {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();

      setProduct(data);
      console.log(data);
      
    } catch (error) {
      console.log("Error:",error);
    }
  }

  useEffect(() => {
        getProduct();
    }, [])

  return (
    <div className='lato-regular product'>
        <Link to={"/"}>
            <button id='backHome'>Go back Home</button>
        </Link>
        <h1>{product.title}</h1>
        <img src={product.thumbnail} alt="" />
        <p>{product.description}</p>
        <h2>${product.price}</h2>
        <h3>Rating: {product.rating}/5</h3>
    </div>
  )
}

export default ProductDetails