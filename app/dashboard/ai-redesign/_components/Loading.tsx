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
        <AlertDialogTitle className="text-2xl font-bold text-center text-colors-custom-lightpurple">
          Generating Your Dream Design
        </AlertDialogTitle>
        <div className="flex flex-col items-center gap-4">
          <DotLottieReact
            src="https://lottie.host/3eb7e43b-f0c6-4bc9-8a34-6c3ce5d42e5e/F07wilByKb.lottie"
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
