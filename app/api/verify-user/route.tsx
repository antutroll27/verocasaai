import { NextRequest, NextResponse } from 'next/server';
import { Users } from '@/config/schema';
import { db } from '@/config';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    const {user} = await req.json();

    
    try{
        //Does the User exist ?
      const userInfo= await db.select()
      .from(Users).where(eq(Users.email,user?.primaryEmailAddress.emailAddress))
 

        //If the User does not exist , it shall be added to the DB
     if(userInfo?.length==0)
     {

       const SaveUserInfo= await db.insert(Users)
       .values({
         name: user?.fullName,
         email: user?.primaryEmailAddress.emailAddress,
         imageUrl:user?.imageUrl,

       }).returning()
        return NextResponse.json({'result':SaveUserInfo[0]})

    }
    // If User exists  
    return NextResponse.json({result:userInfo})
    
    }


     catch(e){
        return NextResponse.json({error:e})
     }


    


    return NextResponse.json({result:user})
}