import React from 'react'

export default function GamePlayCard({index, card}) {
  return (
    <>
    <div className="gameplay-card-slot" key={index}>
        <p>{card}</p>
    </div>
    </>
  )
}
