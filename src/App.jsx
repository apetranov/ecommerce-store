import { useState, useEffect, use } from 'react'
import './App.css'
function App() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [likedProducts, setLikedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [showAll, setShowAll] = useState(true);

  function addLiked(productId) {
    if (likedProducts.find(product => product.id === productId)) {
      return;
    }

    const toAdd = products.find(product => product.id === productId);

    const likedCopy = [...likedProducts];

    likedCopy.push(toAdd);

    setLikedProducts(likedCopy);
  }

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
      <div className='navbar'>
        <span onClick={() => {
          setShowLiked(false);
          setShowAll(true);
        }}>All products</span>
        <span onClick={() => {
          setShowLiked(true);
          setShowAll(false);
        }}>Liked</span>
        <span>Shopping cart</span>
      </div>
        {showAll && <div className='showAllDiv'>
          <input type="text" placeholder='Search product...' onChange={(e) => setProduct(e.target.value)} />
          <div className='productContainer'>
          {products.map((product) =>
              <div className='productDiv' key={product.id}>
                  <img src={`${product.thumbnail}`} alt="" />
                  <h4>{product.title}</h4>
                  <p>${product.price}</p>
                  <div>
                    <button onClick={() => addLiked(product.id)} id="likeBtn"> {likedProducts.find(prod => prod.id === product.id) ? 'Unlike' : 'Like' } </button>
                    <button id="addToCartBtn">Add to cart</button>
                  </div>
                </div>
            )}
        </div>
        </div>}
        {showLiked && 
          <div className='productContainer'>
            {likedProducts.map((product) =>
              <div className='productDiv' key={product.id}>
                  <img src={`${product.thumbnail}`} alt="" />
                  <h4>{product.title}</h4>
                  <p>${product.price}</p>
                  <div>
                    <button onClick={() => addLiked(product.id)} id="likeBtn">Like</button>
                    <button id="addToCartBtn">Add to cart</button>
                  </div>
                </div>
            )}
          </div>
        }
    </div>
  )
}

export default App
