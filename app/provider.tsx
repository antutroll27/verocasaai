'use client'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import { UserDataContext } from './_context/UserDataContext';
import { UserDetailType } from '@/types';

function Provider({ children }: PropsWithChildren) {


  const [userDetail, setUserDetail] = useState<UserDetailType[] | null>(null);

  const {user}=useUser();
  useEffect(()=> {
      user&&VerifyUser();
    },[user])
  
    /* Verify User */
  const VerifyUser= async()=>{
     const dataResult= await axios.post('/api/verify-user',{
      user:user
     });
     setUserDetail(dataResult.data.result);
     
     //console.log(dataResult.data)
  }
  return (
    <UserDataContext.Provider value={{ userDetail: userDetail as UserDetailType[], setUserDetail }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default Provider
