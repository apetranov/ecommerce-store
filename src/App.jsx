import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Products from './components/Products'

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
        <Products products={products} />
    </div>
  )
}

export default App
