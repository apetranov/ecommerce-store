import React from 'react'

function SearchField({ setProduct }) {
  return (
    <input type="text" placeholder='Search product...' onChange={(e) => setProduct(e.target.value)} />
  )
}

export default SearchField