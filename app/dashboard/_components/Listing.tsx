'use client'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs';
import EmptyState from './EmptyState';

function Listing() {

    const {user}=useUser();
    const [userRoomList,setUserRoomList]=useState([]);

  return (
    <div>
      <div className="mt-20">  
      <h2 className="text-5xl font-bold text-colors-custom-lightpurple mb-4">Never run out </h2>
      <h2 className="text-5xl font-bold text-colors-custom-lightpurple mb-4">of Ideas </h2>
      <h2 className="text-5xl font-bold text-colors-custom-purple">{user?.fullName}</h2>
      </div>

      {userRoomList?.length === 0 ? (
        <div><EmptyState/></div>
      ) : (
        <div>
          {/* Content for non-empty list */}
        </div>
      )}
      
    </div>
  )
}

export default Listing
