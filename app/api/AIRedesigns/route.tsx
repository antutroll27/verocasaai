import { NextResponse } from "next/server";
import Replicate from 'replicate';
import axios  from "axios";


const replicate = new Replicate({auth:process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN});
export async function POST(req: Request) {
    
  
    const {imageUrl,room,aiRedesign,customPrompt}= await req.json();

    
   //COnvert Basic Room Design to Revamped AI Design
  try{
   const input = {
    image: imageUrl,
    prompt:'A '+room+' with a '+aiRedesign+' style interior, Make it look Realistic if possible'+customPrompt,
    };

    const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
    //console.log(output)
    //return NextResponse.json({result:output})
     
    //Convert Output img URL to base64 img and save
  

   }
   catch(e){
    console.log('API Error:', e);
      return NextResponse.json({error:e})
   }
 


  
   
   
   //Save Data


}


async function convertToBase64(imageUrl: string, ) {
   const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
   const base64image = Buffer.from(response.data, 'binary').toString('base64');
   return 'data:image/png;base64,' + base64image;
 }
 