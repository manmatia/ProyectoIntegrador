import { useEffect } from 'react'
import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { getGames } from '../../redux/actions'
import Cards from '../../Components/cards/cards.components'
import Navbar from "../../Components/navbar/navbar.components"
import "./home.styles.css"



export default function Home() {
  const dispatch=useDispatch()
 const allGames = useSelector((state)=>state.allGames) //que cambie cada vez que se haga un cambio allGames se subscribe al estado global

 useEffect(()=>{
  dispatch(getGames())
  // return(()=>{ clearDetail()}) esto es para que se borra cuando desmonte didmount
 },[dispatch])
  
  return (
    <div className='home'>
      <h1>Home</h1>
      <Navbar/>
       <Cards allGames={allGames}/>
       </div>
  )
}

