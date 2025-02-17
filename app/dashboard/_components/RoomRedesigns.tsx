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
      <div className="bg-colors-custom-pink p-4 mt-2 text-colors-custom-purple">
        <div className="flex justify-between items-center mb-5">
          <div className="text-xs font-light">#{room?.id}</div>
          <div className="text-xs font-light">{room?.createdAt}</div>
        </div>
        <div>
          <span className="text-base font-light">Room Type : </span>
          <span className="text-base font-bold">{room?.roomType}</span>
        </div>
        <div>
          <span className="text-base font-light">Design Type : </span>
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