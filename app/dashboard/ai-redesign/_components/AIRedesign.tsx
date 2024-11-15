import React from 'react'
import Image from 'next/image'

function AIRedesign() {

    const DesignTypes= [
    {
            name:'Minimalistic',
            image:'/minimalistic.jpg',
        },
        {
            name:'Modern',
            image:'/minimalistic.jpg',
        },
        {
            name:'Rustic',
            image:'/minimalistic.jpg',
        },
        {
            name:'Old School',
            image:'/minimalistic.jpg',
        },
        {
            name:'Futuristic',
            image:'/minimalistic.jpg',
        }
        ]
   return (
    <div className='mt-6'>
    <h2 className='pl-4 text-colors-custom-pastel bg-colors-custom-lightpurple font-bold rounded-md'>2. Select AI Redesign Type</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4'>
        {DesignTypes.map((design,index)=> (
            <div key={index}>
               <Image src={design.image} alt={design.name} width={400} height={400} />
            </div>
        )
        )}
      </div>
    </div>
  )
}

export default AIRedesign
