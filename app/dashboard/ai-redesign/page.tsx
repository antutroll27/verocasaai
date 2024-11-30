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
import OutputImageDialog from './_components/OutputImageDialog'


function AiRedesign() {
  const { user } = useUser(); // Get user information from Clerk
  const [formData, setFormData] = useState<{ image?: File; room?: string; AIRedesign?: string; CustomPrompt?: string }>({});
  const [loading, setLoading] = useState(false); // Loading state for async operations
  const [AIOutputImage, setAIOutputImage] = useState(); // State to hold AI generated image
  const [output, setOutput] = useState(); // State for output (not used in the provided code)
  const [outputImageDialog, setOutputImageDialog] = useState(false); // Control dialog visibility
  const [beforeImage, setBeforeImage] = useState<string | undefined>(); // State for the uploaded image URL

  // Handle input changes and update formData state
  const onHandleInputChange = (value: any, fieldName: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    console.log(formData); // Log current form data for debugging
  }

  // Save user-uploaded image to Firebase and return its URL
  const SaveUserImageToFirebase = async () => {
    const fileName = Date.now() + '_userUpload.png'; // Unique filename based on timestamp
    const imageRef = ref(storage, 'AIRedesignedRooms/' + fileName); // Reference to Firebase storage

    await uploadBytes(imageRef, formData.image as File).then(resp => { console.log('...File Uploaded') });

    // Get the URL of the uploaded image
    const fetchUrl = await getDownloadURL(imageRef);
    console.log(fetchUrl); // Log the URL for debugging
    setBeforeImage(fetchUrl); // Set the before image state
    return fetchUrl; // Return the URL
  }

  // Generate the AI image based on user input
  const ManifestAiImage = async () => {
    setLoading(true); // Set loading state to true
    const userImageUrl = await SaveUserImageToFirebase(); // Save user image and get URL
    const result = await axios.post('/api/AIRedesigns', {
      imageUrl: userImageUrl,
      room: formData?.room,
      aiRedesign: formData?.AIRedesign,
      customPrompt: formData?.CustomPrompt,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(result.data); // Log the result from the API
    setAIOutputImage(result.data.result); // Set the AI output image
    setOutputImageDialog(true); // Open the output image dialog
    setLoading(false); // Set loading state to false
    return userImageUrl; // Return the user image URL
  }

  return (
    <div>
      {/* Heading text */}
      <div className='pt-10'>
        <h2 className='text-5xl font-bold text-colors-custom-purple text-center '>Never let Creative Block Stop you </h2>
        <h2 className='text-4xl font-bold text-colors-custom-purple text-center mb-5'></h2>
        <p className='text-colors-custom-purple text-center text-xl'>Upload Pic, Select a Style and see your new Redesigns </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-20 gap-20'>
        {/* Image Upload Component */}
        <ImageUpload selectedImage={(value) => onHandleInputChange(value, 'image')} />

        {/* Form for user input */}
        <div className="max-w-3xl">
          {/* Type of Room Selection */}
          <Room selectedRoomType={(value) => onHandleInputChange(value, 'room')} />
          {/* AI Redesign Type Selection */}
          <AIRedesign selectedAIRedesignType={(value) => onHandleInputChange(value, 'AIRedesign')} />
          {/* Custom Additional Requirements Input */}
          <PromptArea customPrompt={(value) => onHandleInputChange(value, 'CustomPrompt')} />

          {/* Button to Generate AI Image */}
          <div className="flex justify-end relative pt-3 max-w-2xl">
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

      <Loading loading={loading} /> {/* Loading component */}
      <OutputImageDialog 
        openImageDialog={outputImageDialog} 
        closeImageDialog={() => setOutputImageDialog(false)}
        beforeImage={beforeImage}
        afterAiImage={AIOutputImage}
      />
    </div>
  )
}

export default AiRedesign
