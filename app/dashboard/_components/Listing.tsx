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

  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);

  useEffect(() => {
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
    <div className="max-w-7xl mx-auto px-1 bg-colors-custom-pastel"> {/* Added container with max width */}
      <div className="mt-20">  
        <h2 className="text-6xl font-bold text-colors-custom-lightpurple mb-4">Never run out of Ideas </h2>
        
        <h2 className="text-6xl font-bold text-colors-custom-purple mb-10">{user?.fullName}</h2>
      </div>
  
      {userRoomList?.length === 0 ? (
        <div><EmptyState/></div>
      ) : (
        <div className='mt-10'>
          {/* Gallery Header with Button */}
          <div className='flex justify-between items-center mb-10 max-w-full'> {/* Added max-w-full */}
            <h2 className='text-3xl font-bold text-primary mb-9'>Your Gallery</h2>
            <Link href={'/dashboard/ai-redesign'}>
            <Button className='bg-colors-custom-purple hover:bg-colors-custom-purple/70 transition-all duration-200 flex items-center gap-2 py-3 px-6'>
              <span className='tracking-[0.1em]'>RE-DESIGN ROOM WITH AI</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </Button>
            </Link>
          </div>
  
          {/* Gallery Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
            {userRoomList.map((room, index) => (
              <div key={index} className="max-w-[300px] w-full mx-auto">
                <RoomRedesigns room={room} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Listing
