import { useState, useEffect, use } from 'react'
import './App.css'
import NavBar from './components/NavBar';
import SearchField from './components/SearchField';
import Products from './components/Products';
import LikedProducts from './components/LikedProducts';
import ShoppingCart from './components/ShoppingCart';
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
    }, 0).toFixed(2);

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

  function checkoutCart() {
    setCartProducts([]);
  }

  useEffect(() => {
    getAllProducts();
  }, [product])

  return (
    <div className='main-div lato-regular'>
        <NavBar setShowLiked={setShowLiked}
          setShowCart={setShowCart}
          setShowAll={setShowAll}
          setProduct={setProduct}
          showAll={showAll}
          showLiked={showLiked}
          showCart={showCart} />
        {showAll && <div className='showAllDiv'>
          <SearchField setProduct={setProduct} />
          <Products 
            products={products} 
            likedProducts={likedProducts}
            cartProducts={cartProducts}
            addLiked={addLiked}
            removeLiked={removeLiked}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </div>}
        {showLiked && <div className='likedDiv'>
          <h1>Liked products</h1>
          {likedProducts.length > 0 ? 
          <LikedProducts 
            likedProducts={likedProducts} 
            addLiked={addLiked}
            removeLiked={removeLiked}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cartProducts={cartProducts}
          /> 
          : <h2>No liked products...</h2>}
        </div>
          
        }
        {showCart && <div className='likedDiv'>
          <h1>Shopping cart</h1>
          {cartTotal > 0 && <h2>Total: ${cartTotal}</h2>}
          {cartProducts.length > 0 && <button id="checkoutCartBtn" onClick={checkoutCart}>Checkout</button>}
          {cartProducts.length > 0 ? 
          
          <ShoppingCart 
          cartProducts={cartProducts}
          likedProducts={likedProducts} 
          addLiked={addLiked}
          removeLiked={removeLiked}
          removeFromCart={removeFromCart}
          /> 
          
          : <h2>Cart is empty...</h2>}
            
        </div>
          
        }
    </div>
  )
}

export default App
