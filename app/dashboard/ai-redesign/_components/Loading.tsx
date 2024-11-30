import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface loadingstate{
  loading:boolean
}

function Loading({ loading }: loadingstate) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
      <div className='bg-white flex flex-col items-center my-4'>
        
        <DotLottieReact
          src="https://lottie.host/cb2edcaf-6cfc-4f71-b9ae-8c44128a1b71/Aj3KDstryz.lottie"
          loop
          autoplay
          style={{ width: '200px', height: '100px' }}
        />
        <h2 className='text-sm text-colors-custom-lightpurple'>Your room is being Redesigned ,  <strong> Don't Reload</strong> </h2>
      </div>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default Loading




