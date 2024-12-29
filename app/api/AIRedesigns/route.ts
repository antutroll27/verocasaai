// Define output type
interface ReplicateOutput {
  result: string;
}

// Define types for better type safety
interface RequestBody {
  imageUrl: string;
  room: string;
  aiRedesign: string;
  customPrompt?: string;
  userEmail: string;
}

import { NextResponse } from "next/server";
import Replicate from 'replicate';
import axios from "axios";
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from '@/config/firebaseConfig'
import { RedesignedAIRoomImage } from "@/config/schema";
import { db } from '@/config';



const replicate = new Replicate({ auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN });

export async function POST(req: Request) {
  // Input validation
  const body = await req.json();
  const { imageUrl, room, aiRedesign, customPrompt, userEmail } = body as RequestBody;

  // const { imageUrl, room, aiRedesign, customPrompt, userEmail } = await req.json();
  try {
    const input = {
      image: imageUrl,
      prompt: `A ${room} with a ${aiRedesign} style interior, Make it look Realistic if possible${customPrompt}`,
    };

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    ) as unknown as string;

    // Convert to Base64
    const base64Image = await convertToBase64(output);

    // Save to Firebase
    const RedesignedImageFileName = `${Date.now()}_redesign.png`;
    const storageRef = ref(storage, `AIRedesignedRooms/${RedesignedImageFileName}`);

    await uploadString(storageRef, base64Image, 'data_url');
    const downloadURL = await getDownloadURL(storageRef);

    /*return NextResponse.json({
      result: {
        originalUrl: output,
        firebaseUrl: downloadURL
      }
    }); */


    //Save Data to our PGDatabase
    const savetoDb = await db.insert(RedesignedAIRoomImage).values({
      roomType: room,
      AIRedesignType: aiRedesign,
      OgImage: imageUrl,
      AIGeneratedImage: downloadURL,
      userEmail: userEmail || 'anonymous',
    }).returning({ id: RedesignedAIRoomImage.imageID });
    console.log(savetoDb);
    return NextResponse.json({ 'result': downloadURL });

  } catch (e) {
    console.log('API Error:', e);


    return NextResponse.json({ error: e }, { status: 202 });
  }
}

async function convertToBase64(imageUrl: string) {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const base64image = Buffer.from(response.data, 'binary').toString('base64');
  return 'data:image/png;base64,' + base64image;
}












/*import { NextResponse } from "next/server";
import Replicate from 'replicate';
import axios from "axios";
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from '@/config/firebaseConfig';
 
// Define types for better type safety
interface RequestBody {
  imageUrl: string;
  room: string;
  aiRedesign: string;
  customPrompt?: string;
}
 
// Move to environment variable without NEXT_PUBLIC_
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
});
 
// Utility function for base64 conversion
async function convertToBase64(imageUrl: string): Promise<string> {
  try {
    const response = await axios.get(imageUrl, { 
      responseType: 'arraybuffer',
      timeout: 10000 // 10 second timeout
    });
    const base64image = Buffer.from(response.data, 'binary').toString('base64');
    return 'data:image/png;base64,' + base64image;
  } catch (error) {
    console.error('Base64 conversion error:', error);
    throw new Error('Failed to convert image to base64');
  }
}
 
export async function POST(req: Request) {
  try {
    // Input validation
    const body = await req.json();
    const { imageUrl: inputImageUrl, room, aiRedesign, customPrompt = '' } = body as RequestBody;

 
    if (!inputImageUrl || !room || !aiRedesign) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
 
    // Generate AI redesign
    const input = {
      image: inputImageUrl,
      prompt: `A ${room} with a ${aiRedesign} style interior, Make it look Realistic if possible ${customPrompt}`.trim(),
    };
 
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );
 
    // Validate AI output
    const imageUrl = Array.isArray(output) ? output[0] : output;
    if (!imageUrl) {
      throw new Error('No image generated from AI service');
    }
 
    // Convert and save to Firebase
    const base64Image = await convertToBase64(imageUrl);
    const redesignedImageFileName = `${Date.now()}_redesign.png`;
    const storageRef = ref(storage, `AIRedesignedRooms/${redesignedImageFileName}`);
 
    try {
      await uploadString(storageRef, base64Image, 'data_url');
      const downloadURL = await getDownloadURL(storageRef);
 
      return NextResponse.json({
        success: true,
        result: {
          url: downloadURL,
          originalAiOutput: imageUrl
        }
      });
 
    } catch (firebaseError) {
      console.error('Firebase storage error:', firebaseError);
      throw new Error('Failed to save generated image');
    }
 
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }, {
      status: 500
    });
  }
}

*/
