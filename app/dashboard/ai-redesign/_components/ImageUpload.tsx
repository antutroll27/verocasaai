'use client'
import React, { useState } from 'react'
import Image from 'next/image'

function ImageUpload({ selectedImage }: { selectedImage: (file: File) => void }) {
  
    const [file, setFile] = useState<File | null>(null);
    const afterFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
            selectedImage(files[0]);
            
        }
        //console.log(event.target.files[0])

    }
  
  
  
    return (
    <div>
      
       <div>
        <label htmlFor='image-upload'>
             <div className={`p-8 sm:p-12 md:p-16 bg-neutral-50 rounded-2xl flex justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-colors-custom-pink
              ${file&&'p-0 bg-colors-custom-pastel shadow-lg'} flex items-center justify-center`}>
                {!file ? <Image 
                 src='/uploadtheimage.svg' 
                 alt='Upload Room Image'
                 width={300} 
                 height={300} 
                 className='min-w-[280px] w-[280px] sm:w-[320px] md:w-[320px] max-w-full h-auto'
                 /> 
                 : <Image src={URL.createObjectURL(file)}
                 alt='uploaded-file'
                 width={280} 
                 height={280}
                 
                 className='min-w-[280px] w-[280px] sm:w-[320px] md:w-[320px] max-w-full h-auto object-contain rounded-xl'/> }
                
             </div>

        </label>
         <input 
         type='file' 
         accept='image/*' 
         id='image-upload'
         style={{display:'none'}}
         onChange={afterFileSelected}

         >

         </input>
      </div>

    </div>
  )
}

export default ImageUpload
