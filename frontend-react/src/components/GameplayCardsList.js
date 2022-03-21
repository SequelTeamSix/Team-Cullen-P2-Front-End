import React from 'react';
import GameplayCard from './GameplayCard';

export default function GameplayCardsList({card}) {

var gameplaySlots = [];

for(let i = 0; i < 20; i++){
    gameplaySlots.push(<GameplayCard key={i} card={card} index={i}/>)
}
  return (
    <>
    <div className="gameplay-cards">
        {gameplaySlots}
    </div>
    </>
  )
}
