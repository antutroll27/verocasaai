'use client'
import React, { useState } from 'react'
import Image from 'next/image'

function ImageUpload() {
  
    const [file, setFile] = useState<File | null>(null);
    const afterFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
            
        }
        //console.log(event.target.files[0])

    }
  
  
  
    return (
    <div>
      
       <div>
        <label htmlFor='image-upload'>
             <div className={`-mt-8 p-36 bg-colors-custom-pink rounded-2xl flex justify-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-colors-custom-lightpurple
              ${file&&'p-0 bg-colors-custom-pastel shadow-lg'} `}>
                {!file ? <Image 
                 src='/uploadimage.svg' 
                 alt='Upload Image'
                 width={80} 
                 height={80} 
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
