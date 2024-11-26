import React from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

interface Room {
  AIGeneratedImage: string;
  OgImage: string;
}

function RoomRedesigns({room}: {room: Room}) {
  return (
    <div>
      <ReactBeforeSliderComponent
    firstImage={{
        imageUrl:room?.AIGeneratedImage
    }}
    secondImage={{
        imageUrl: room?.OgImage
    }} />
    </div>
  )
}

export default RoomRedesigns