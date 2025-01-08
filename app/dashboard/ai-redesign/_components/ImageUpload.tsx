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
             <div className={`-mt-8 p-36 bg-neutral-50 rounded-2xl flex justify-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-colors-custom-pink
              ${file&&'p-0 bg-colors-custom-pastel shadow-lg'} `}>
                {!file ? <Image 
                 src='/uploadtheimage.svg' 
                 alt='Upload Image'
                 width={300} 
                 height={300} 
                 className='-mt-20'
                 /> 
                 : <Image src={URL.createObjectURL(file)}
                 alt='uploaded-file'
                 width={300} 
                 height={300}
                 
                 className='w-[300px] h-[300px] object-contain'/> }
                
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
