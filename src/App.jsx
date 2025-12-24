import { useState, useEffect, use } from 'react'
import './App.css'
function App() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [likedProducts, setLikedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const total = cartProducts.reduce((sum, item) => {
      return sum + item.price;
    }, 0);

    setCartTotal(total);
  }, [cartProducts]);

  function addLiked(productId) {
    if (likedProducts.find(product => product.id === productId)) {
      return;
    }

    const toAdd = products.find(product => product.id === productId);

    const likedCopy = [...likedProducts];

    likedCopy.push(toAdd);

    setLikedProducts(likedCopy);
  }

  function removeLiked(idToRemove) {
    const likedCopy = [...likedProducts];

    const result = likedCopy.filter(item => item.id !== idToRemove);

    setLikedProducts(result);
  }

  function addToCart(productId) {
    if (cartProducts.find(product => product.id === productId)) {
      return;
    }

    const toAdd = products.find(product => product.id === productId);

    const cartCopy = [...cartProducts];

    cartCopy.push(toAdd);

    setCartProducts(cartCopy);
  }

  function removeFromCart(idToRemove) {
    const cartCopy = [...cartProducts];

    const result = cartCopy.filter(item => item.id !== idToRemove);

    setCartProducts(result);
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
          setShowCart(false);
          setShowAll(true);
          setProduct("");
        }}>All products</span>
        <span onClick={() => {
          setShowLiked(true);
          setShowCart(false);
          setShowAll(false);
        }}>Liked</span>
        <span onClick={() => {
          setShowLiked(false);
          setShowCart(true);
          setShowAll(false);
        }}>Shopping cart</span>
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
        </div>}
        {showLiked && <div className='likedDiv'>
          <h1>Liked products</h1>
          {likedProducts.length > 0 ? <div className='productContainer'>
            {likedProducts.map((product) =>
              <div className='productDiv' key={product.id}>
                  <img src={`${product.thumbnail}`} alt="" />
                  <h4>{product.title}</h4>
                  <p>${product.price}</p>
                  <div>
                    <button onClick={() => removeLiked(product.id)} id="likeBtn">{likedProducts.find(prod => prod.id === product.id) ? 'Unlike' : 'Like' }</button>
                    <button id="addToCartBtn" onClick={() => {
                      if (!cartProducts.find(prod => prod.id === product.id)) {
                        addToCart(product.id)
                      } else {
                        removeFromCart(product.id);
                      }
                    }}>{cartProducts.find(prod => prod.id === product.id) ? 'Remove from cart' : 'Add to cart' }</button>
                  </div>
                </div>
            )}
          </div> : <h2>No liked products...</h2>}
            
        </div>
          
        }
        {showCart && <div className='likedDiv'>
          <h1>Shopping cart</h1>
          <h2>Total: ${cartTotal}</h2>
          {cartProducts.length > 0 ? <div className='productContainer'>
            {cartProducts.map((product) =>
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
                    }} id="likeBtn">{likedProducts.find(prod => prod.id === product.id) ? 'Unlike' : 'Like' }</button>
                    <button onClick={() => removeFromCart(product.id)} id="addToCartBtn">{cartProducts.find(prod => prod.id === product.id) ? 'Remove from cart' : 'Add to cart' }</button>
                  </div>
                </div>
            )}
          </div> : <h2>Cart is empty...</h2>}
            
        </div>
          
        }
    </div>
  )
}

export default App
