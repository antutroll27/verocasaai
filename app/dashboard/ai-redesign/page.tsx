'use client'
import React, { useState } from 'react'
import ImageUpload from './_components/ImageUpload'
import Room from './_components/Room'
import AIRedesign from './_components/AIRedesign'
import PromptArea from './_components/PromptArea'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import axios from 'axios'
import { storage } from '@/config/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/nextjs'
import Loading from './_components/Loading'


function AiRedesign() {

  const { user } = useUser();
  const [formData, setFormData] = useState<{ image?: File; room?: string; AIRedesign?: string; CustomPrompt?: string }>({});
  const [loading,setLoading]=useState(false);
  const onHandleInputChange = (value: any, fieldName: string) => {
    // Function implementation
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    })
    )
    console.log(formData)
  }

  const SaveUserImageToFirebase = async () => {
    const fileName = Date.now() + '_userUpload.png';
    const imageRef = ref(storage, 'AIRedesignedRooms/' + fileName);

    await uploadBytes(imageRef, formData.image as File).then(resp => { console.log('...File Uploaded') })


    //Url of the user uploaded image
    const fetchUrl = await getDownloadURL(imageRef);
    console.log(fetchUrl);
    return fetchUrl;
  }
  const ManifestAiImage = async () => {
    const userImageUrl = await SaveUserImageToFirebase();
    const result = await axios.post('/api/AIRedesigns', {
      imageUrl: userImageUrl,
      room: formData?.room,
      aiRedesign: formData?.AIRedesign,
      customPrompt: formData?.CustomPrompt,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    }
    )
    console.log(result)
    return userImageUrl;
  }

  return (
    <div>

      {/* heading text*/}
      <div className='pt-10'>
        <h2 className='text-5xl font-bold text-colors-custom-purple text-center '>Never let Creative Block Stop you </h2>
        <h2 className='text-4xl font-bold text-colors-custom-purple text-center mb-5'></h2>
        <p className='text-colors-custom-purple text-center text-xl'>Upload Pic , Select a Style and see your new Redesigns </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2  mt-20 gap-20'>
        {/* Image Upload*/}
        <ImageUpload selectedImage={(value) => onHandleInputChange(value, 'image')} />

        {/* Form*/}
        <div className="max-w-3xl">

          {/* Type of Room*/}
          <Room selectedRoomType={(value) => onHandleInputChange(value, 'room')} />
          {/* AI ReDesign Type */}
          <AIRedesign selectedAIRedesignType={(value) => onHandleInputChange(value, 'AIRedesign')} />
          {/* Custom Additional Requirements*/}
          <PromptArea customPrompt={(value) => onHandleInputChange(value, 'CustomPrompt')} />

          {/* AI Generate Image Button */}

          <div className="flex justify-end relative pt-3 max-w-2xl"> {/* Added max-w-3xl */}
            <Button className='bg-colors-custom-purple mt-6 rounded-none px-7 py-4 mb-52'
              onClick={ManifestAiImage}>
              <Image
                src="/manifest.svg"
                alt="credits"
                width={20}
                height={20}
                className="inline-block mr-1"
              />
              Manifest Revamped Room
            </Button>
            <p className='absolute top-0 right-0 text-colors-custom-purple text-sm pt-2 pr-2'>
              * <strong>1</strong> Credit per Redesign
            </p>
          </div>

        </div>
        

      </div>
      <Loading loading={true} />
    </div>
  )
}

export default AiRedesign
