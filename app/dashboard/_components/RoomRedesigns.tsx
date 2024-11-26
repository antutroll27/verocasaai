import React, { useState } from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import OutputImageDialog from '../ai-redesign/_components/OutputImageDialog';

interface Room {
  AIGeneratedImage: string;
  OgImage: string;
  roomType: string;
  AIRedesignType: string;
}

function RoomRedesigns({ room }: { room: Room }) {


  const [openDialog, setOpenDialog] = useState(false);
  const onClickHandler = () => {
    setOpenDialog(true);
  }
  return (
    <div className='cursor-pointer' onClick={() => onClickHandler()}>
      <ReactBeforeSliderComponent
        firstImage={{
          imageUrl: room?.AIGeneratedImage
        }}
        secondImage={{
          imageUrl: room?.OgImage
        }} />
      <div>
        <h2>Room Type {room?.roomType}</h2>
        <h2>Design Type{room?.AIRedesignType}</h2>
      </div>
      <OutputImageDialog
        openImageDialog={openDialog}
        closeImageDialog={() => setOpenDialog(false)}
        beforeImage={room.OgImage}
        afterAiImage={room.AIGeneratedImage} />
    </div>
  )
}

export default RoomRedesigns