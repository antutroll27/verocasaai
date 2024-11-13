import React from 'react'
import ImageUpload from './_components/ImageUpload'

function AiRedesign() {
  return (
    <div>
      
      {/* heading text*/}
      <div className='pt-20'>
      <h2 className='text-5xl font-bold text-colors-custom-purple text-center '>Never let Creative Block Stop you </h2>
      <h2 className='text-5xl font-bold text-colors-custom-purple text-center mb-5'></h2>
      <p className='text-colors-custom-purple text-center text-xl'>Upload Pic , Select a Style and see your new Redesigns </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center mt-20'>
      {/* Image Upload*/}
       <ImageUpload/>


      {/* Form*/}

      </div>

    </div>
  )
}

export default AiRedesign
