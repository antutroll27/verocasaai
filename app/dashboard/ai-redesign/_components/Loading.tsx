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


function Loading() {
  return (
    <AlertDialog>
      <AlertDialogContent>
      <div className='bg-white flex flex-col items-center my-10'>
        <Image src ='/loading.gif'
        alt="credits"
        width={100}
        height={100} />
      </div>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default Loading
