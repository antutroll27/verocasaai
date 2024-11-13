'use client'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs';
import EmptyState from './EmptyState';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Listing() {

    const {user}=useUser();
    const [userRoomList,setUserRoomList]=useState([]);

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
        <div>
          {/* Content for non-empty list */}
        </div>
      )}
      
    </div>
  )
}

export default Listing
