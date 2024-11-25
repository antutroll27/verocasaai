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
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import { Button } from '@/components/ui/button';

// Define the props type
interface OutputImageDialogProps {
    openImageDialog: boolean;
    closeImageDialog: (value: boolean) => void;
    beforeImage: string | undefined;
    afterAiImage: string | undefined;// Change to a function type
}

function OutputImageDialog({ openImageDialog, closeImageDialog,beforeImage,afterAiImage }: OutputImageDialogProps) {
    return (
      
        <div>
            <AlertDialog open={openImageDialog}>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <h2 className='text-colors-custom-purple'>Redesigned Result </h2>
                        <ReactBeforeSliderComponent
                            firstImage={{
                                imageUrl: afterAiImage|| ''
                            }}
                            secondImage={{
                                imageUrl: beforeImage || ''
                            }}
                        />
                        <Button onClick={() => closeImageDialog(false)} className='bg-colors-custom-purple'>CLOSE</Button>
                    </AlertDialogHeader>

                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default OutputImageDialog

