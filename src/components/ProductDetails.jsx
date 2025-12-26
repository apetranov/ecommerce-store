import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState({})

    async function getProduct() {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();

      setProduct(data);
      
    } catch (error) {
      console.log("Error:",error);
    }
  }

  useEffect(() => {
        getProduct()
    }, [])

  return (
    <div className='lato-regular'>
        <h1>{product.title}</h1>
    </div>
  )
}

export default ProductDetails