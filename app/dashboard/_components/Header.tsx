'use client'
import React ,{useContext} from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { UserDataContext } from '@/app/_context/UserDataContext';
import { Users } from '@/config/schema';
import { Button } from '@/components/ui/button';


function Header() {

  const {userDetail} = useContext(UserDataContext);
  
  // Get the first element of the array if userDetail is an array
  const userData = Array.isArray(userDetail) ? userDetail[0] : userDetail;
  
  console.log("UserDetail in Header:", userData);
  console.log("Credits value:", userData?.credits)
  return (
    <div className="p-6 flex justify-around items-center ">
      
      {/* Logo Section */}
      <Image 
        src="/logo.svg"
        alt="logo"
        width={150}  // Larger width
        height={150} // Larger height
        className="object-contain" // Keeps image within bounds
      />
      
      <div className="flex items-center gap-10 pr-5">
        
        {/* Credits Display */}
        <Button variant='ghost' className='text-colors-custom-purple text-base'>Buy Credits</Button>
        <div className="flex gap-3 items-center bg-colors-custom-purple px-4 py-1 rounded-md">
          <div className='bg-colors-custom-pink rounded-full px-1 py-1'>
          <Image 
            src="/star.svg"
            alt="credits"
            width={12}
            height={12}
              />
            </div>
            
             
          <h2 className="text-white font-bold text-xl">{typeof userData?.credits === 'number' ? userData.credits : 0}</h2>
          <h2 className="text-colors-custom-pastel text-xs pt-1">Credits</h2>
        </div>
        
        {/* User Button */}
        <div className="transform scale-125 pt-1">
          <UserButton />
        </div>
      </div>
      
    </div>
  )
}

export default Header;
