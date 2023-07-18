// import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./navbar.styles.css"
// const axios= require('axios');
function Navbar({handleChange,handleSubmit}) {
const history=useHistory()
const createRoute=()=>{history.push("/create")}

  return (
  
    
    <div className="container">
      <div className="search">
        <form onChange={handleChange}>
          <div className="search-container">
            <input className="neon-input" placeholder="Busqueda" type="text" />
            <button  type="submit" onClick={handleSubmit}>
              Buscar
            </button>
          </div>
        </form>
      </div>
      <div className="center-container">
        <button className="neon-button" onClick={createRoute}>
          Crear VideoGame
        </button>
      </div>
    </div>
  )
}

export default Navbar