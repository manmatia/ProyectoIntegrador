import React from 'react'
import Card from '../card/card.components'
import "./cards.styles.css"
function Cards({allGames}) {
  const gameList=allGames
  return (
    <div className='card-list'>
{gameList?.map((games) =>
<Card games={games}/>)}
    </div>
  )
}


export default Cards
