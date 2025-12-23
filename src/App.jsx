import { useState, useEffect } from 'react'
import './App.css'
function App() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");


  async function getAllProducts() {
    try {
      const response = await fetch(product ? `https://dummyjson.com/products/search?q=${product}` : 'https://dummyjson.com/products');
      const data = await response.json();

      setProducts(data.products);
    } catch (error) {
      console.log("Error:",error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [product])

  return (
    <div className='main-div lato-regular'>
        <input type="text" placeholder='Search product...' onChange={(e) => setProduct(e.target.value)} />
          <div className='productContainer'>
          {products.map((product) =>
              <div className='productDiv' key={product.id}>
                  <img src={`${product.thumbnail}`} alt="" />
                  <h4>{product.title}</h4>
                  <p>${product.price}</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default App
