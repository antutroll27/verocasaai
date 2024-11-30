'use client'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import { UserDataContext } from './_context/UserDataContext';
import { UserDetailType } from '@/types';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


function Provider({ children }: PropsWithChildren) {


  const [userDetail, setUserDetail] = useState<UserDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state

  


  const {user}=useUser();
  useEffect(() => {
    if (user) {
        VerifyUser();
    } else {
        setIsLoading(false); // Set loading to false if no user
    }
}, [user]);
  
    /* Verify User */
  const VerifyUser= async()=>{
     const dataResult= await axios.post('/api/verify-user',{
      user:user
     });
     setUserDetail(dataResult.data.result);
     
     //console.log(dataResult.data)
  }
  return (
    <UserDataContext.Provider value={{ userDetail, setUserDetail,isLoading }}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENTID || '' }}>
      {children}
      </PayPalScriptProvider>
    </UserDataContext.Provider>
  )
}

export default Provider
