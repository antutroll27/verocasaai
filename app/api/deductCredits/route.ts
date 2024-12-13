import { NextResponse } from "next/server";
import { db } from '@/config';
import { Users } from '@/config/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
    try {
      const { userId } = await req.json();
      console.log("Deducting credits for user:", userId);
  
      if (!userId) {
        console.log("No userId provided");
        return NextResponse.json({ error: 'User ID required' }, { status: 400 });
      }
  
      // Get current user
      const currentUser = await db
        .select()
        .from(Users)
        .where(eq(Users.id, userId));
  
      if (!currentUser.length) {
        console.log("No user found with ID:", userId);
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      // Ensure user has credits before deducting
      if ((currentUser[0].credits || 0) < 1) {
        return NextResponse.json({ error: 'Insufficient credits' }, { status: 400 });
      }
  
      // Update credits
      const result = await db
        .update(Users)
        .set({
          credits: (currentUser[0].credits || 0) - 1
        })
        .where(eq(Users.id, userId))
        .returning();
  
      console.log("Credit deduction result:", result[0]);
  
      const userResponse = {
          id: result[0].id,
          credits: result[0].credits,
      };

      return NextResponse.json({
          success: true,
          user: userResponse
      });
  
    } catch (error) {
      console.error("Credit deduction error:", error);
      return NextResponse.json({ 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
}