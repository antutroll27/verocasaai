import React, { useState } from 'react'
import Image from 'next/image'

function AIRedesign({ selectedAIRedesignType }: { selectedAIRedesignType: (designName: string) => void }) {

    const DesignTypes= [
    {
            name:'Minimalistic',
            image:'/minimalistic.jpg',
        },
        {
            name:'Modern',
            image:'/modern.png',
        },
        {
            name:'Old School',
            image:'/oldschool.png',
        },
        {
            name:'Futuristic',
            image:'/futuristic.png',
        },
        {
            name:'Industrial',
            image:'/industrial.jpg',
        },
        {
            name:'Art Deco',
            image:'/artdeco.jpg',
        },
        {
            name:'Rustic',
            image:'/rustic.png',
        },
        {
            name:'Scandinavian',
            image:'/scandinavian.jpg',
        },
        ]

    const [selectedRoomRedesign, setSelectedRoomRedesign] = useState<string | undefined>();
   return (
    <div className='mt-10 max-w-2xl'> {/* Added max-w-3xl to constrain width */}
    <h2 className='pl-4 text-neutral-50 bg-colors-custom-lightpurple font-bold rounded-md'>2. Select AI Redesign Type*</h2>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-5 justify-start'>
        {DesignTypes.map((design,index)=> (
            <div key={index}  onClick={() => {setSelectedRoomRedesign(design.name);selectedAIRedesignType(design.name)} } className='flex flex-col items-center w-full'> {/* Added w-full */}
                <Image src={design.image} alt={design.name} width={100} height={100} 
                    className={`rounded-md mb-3 hover:scale-150 hover:shadow-lg transition-all cursor-pointer ${design.name===selectedRoomRedesign && 'border-4 border-colors-custom-purple rounded-md '} `}/>
                <h3 className={`font-semibold text-colors-custom-purple ${design.name===selectedRoomRedesign && 'font-bold text-xl'}`}>{design.name}</h3>
            </div>
        ))}
    </div>
</div>
  )
}

export default AIRedesign
