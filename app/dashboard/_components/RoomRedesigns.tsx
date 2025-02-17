import React, { useState } from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import OutputImageDialog from '../ai-redesign/_components/OutputImageDialog';

interface Room {
  AIGeneratedImage: string;
  OgImage: string;
  roomType: string;
  AIRedesignType: string;
  id: number;
  createdAt: string;
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
      <div className="bg-pink-200 p-4 mt-2">
        <div className="text-sm font-light mb-2">#{room?.id}</div>
        <div className="text-right text-sm font-light">{room?.createdAt}</div>
        <div>
          <span className="text-base font-bold">Room Type: </span>
          <span className="text-base font-bold">{room?.roomType}</span>
        </div>
        <div>
          <span className="text-base font-bold">Design Type: </span>
          <span className="text-base font-bold">{room?.AIRedesignType}</span>
        </div>
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