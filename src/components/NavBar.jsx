import React from 'react'

function NavBar({ 
    setShowLiked, 
    setShowCart, 
    setShowAll, 
    setProduct, 
    showAll, 
    showLiked,
    showCart
}) {
  return (
      <div className='navbar'>
        <span onClick={() => {
          setShowLiked(false);
          setShowCart(false);
          setShowAll(true);
          setProduct("");
        }} style={showAll ? {
          textDecoration: "underline"
        } : {textDecoration: "none"}}>All products</span>
        <span onClick={() => {
          setShowLiked(true);
          setShowCart(false);
          setShowAll(false);
        }} style={showLiked ? {
          textDecoration: "underline"
        } : {textDecoration: "none"}}>Liked</span>
        <span onClick={() => {
          setShowLiked(false);
          setShowCart(true);
          setShowAll(false);
        }} style={showCart ? {
          textDecoration: "underline"
        } : {textDecoration: "none"}}>Shopping cart</span>
      </div>
  )
}

export default NavBar