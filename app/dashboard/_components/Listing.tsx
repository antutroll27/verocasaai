'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import EmptyState from './EmptyState';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, RedesignedAIRoomImage } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/config';
import RoomRedesigns from './RoomRedesigns';

function Listing() {

    const {user}=useUser();
    const [userRoomList,setUserRoomList]=useState([]);
    
    useEffect(()=>{
    user && fetchUserRoomsList();
  }, 
   [user]
)
const fetchUserRoomsList = async () => {
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  if (userEmail) {
    try {
      const response = await fetch(`/api/userRooms?email=${(userEmail)}`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setUserRoomList(data);
      console.log(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
};
    return (
    <div>
      <div className="mt-20">  
      <h2 className="text-6xl font-bold text-colors-custom-lightpurple mb-4">Never run out </h2>
      <h2 className="text-6xl font-bold text-colors-custom-lightpurple mb-4">of Ideas </h2>
      <h2 className="text-6xl font-bold text-colors-custom-purple mb-10">{user?.fullName}</h2>
      <Link href={'/dashboard/ai-redesign'}>
      <Button className='py-6 px-10 flex space-x-2 bg-colors-custom-purple'>
      <span>Redesign Room with AI</span>
        </Button>
        </Link>
      </div>

      {userRoomList?.length === 0 ? (
        <div><EmptyState/></div>
      ) : (
        <div className='mt-10'>
          {/* Content for non-empty list */}
          <h2 className='font-semibold text-primary'>Your Gallery</h2>
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10'> 
          {userRoomList.map((room, index) => (
              <RoomRedesigns key={index} room={room} />
          ))}
          </div>
        </div>
      )}
      
    </div>
  )
}

export default Listing
