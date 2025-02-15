import { db } from '@/config'; // Import the database client from the configuration
import { RedesignedAIRoomImage } from '@/config/schema'; // Import the schema for RedesignedAI Room Images
import { eq } from 'drizzle-orm'; // Import the equality function for query conditions
import { NextResponse } from 'next/server'; // Import Next.js response handling

// Define the GET request handler for fetching user rooms
export async function GET(request: Request) {
    try {
        // Extract search parameters from the request URL
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email'); // Get the email parameter from the URL

        // Check if the email parameter is provided
        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 }); // Return error if email is missing
        }

        console.log('[API] Request received for email:', email);
        console.log('[API] Schema structure:', RedesignedAIRoomImage);
        console.log('[API] Executing database query...'); // Log the email being queried

        // Query the database for rooms associated with the provided email
        const rooms = await db.select({
            id: RedesignedAIRoomImage.imageID,
            createdAt: RedesignedAIRoomImage.createdAt,
            AIGeneratedImage: RedesignedAIRoomImage.AIGeneratedImage,
            OgImage: RedesignedAIRoomImage.OgImage,
            roomType: RedesignedAIRoomImage.roomType,
            AIRedesignType: RedesignedAIRoomImage.AIRedesignType
        }).from(RedesignedAIRoomImage)
                              .where(eq(RedesignedAIRoomImage.userEmail, email)); // Filter by user email

        console.log('[API] Query completed. Found', rooms.length, 'rooms');
        console.log('[API] First room:', rooms[0]); // Log the result of the query

        return NextResponse.json(rooms); // Return the rooms as a JSON response
    } catch (error) {
        console.error('[API] Database Error:', error instanceof Error ? error.message : 'Unknown error');
        console.error('[API] Error stack:', error instanceof Error ? error.stack : 'No stack trace'); // Log any server errors
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 }); // Return a 500 error response
    }
}