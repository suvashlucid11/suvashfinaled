import React from 'react'
import { Link } from 'react-router-dom'
function Landingscreen() {
  return (
    <div className='row landing justify-content-center '>
      <div className='col-md-12 my-auto text-center'>

        <h2 style={{color:"white",fontSize:"100px"}}> SwiftDrive Rental System</h2>
        <h1 style={{color:"white"}}>"Donot Forget Us We Are Easily Accessible"</h1>
        <Link to="/home">
          <button className='btn bttn '> Get Started</button>

        </Link>



      </div>

    </div>
  )
}

export default Landingscreen
