import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Products from './components/Products'

function App() {
  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();

      setProducts(data.products);
    } catch (error) {
      console.log("Erro:",error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <div className='main-div lato-regular'>
        <SearchBar />
        <Products products={products} />
    </div>
  )
}

export default App
