import { db } from '@/config';
import { RedesignedAIRoomImage } from '@/config/schema';
import { eq } from 'drizzle-orm';
// app/api/userRooms/route.ts
import { NextResponse } from 'next/server';

// app/api/userRooms/route.ts
export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const email = searchParams.get('email');
      
      if (!email) {
        return NextResponse.json({ error: 'Email required' }, { status: 400 });
      }
  
      console.log('Querying for email:', email);
      const rooms = await db.select().from(RedesignedAIRoomImage)
        .where(eq(RedesignedAIRoomImage.userEmail, email));
      console.log('Query result:', rooms);
  
      return NextResponse.json(rooms);
    } catch (error) {
      console.error('Server error:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }