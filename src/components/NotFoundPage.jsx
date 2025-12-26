import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div 
        style={
            {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                gap: "1rem",
                height: "100vh"
            }
        }
        className='lato-regular'
    >
        <h1>This page does not exist 😞</h1>
        <Link to={"/"}>
            <button id='backHome'>Go back Home</button>
        </Link>
    </div>
  )
}

export default NotFoundPage