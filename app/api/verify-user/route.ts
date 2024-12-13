import { NextRequest, NextResponse } from 'next/server';
import { Users } from '@/config/schema';
import { db } from '@/config';
import { eq } from 'drizzle-orm';

interface UserData {
    fullName: string;
    primaryEmailAddress: {
        emailAddress: string;
    };
    imageUrl: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const user = body.user as UserData;
        
        console.log('Received user data:', user);

        if (!user?.primaryEmailAddress?.emailAddress) {
            console.log('Missing email address');
            return NextResponse.json(
                { error: 'Invalid user data: missing email' },
                { status: 400 }
            );
        }

        if (!user.fullName) {
            console.log('Missing full name');
            return NextResponse.json(
                { error: 'Invalid user data: missing name' },
                { status: 400 }
            );
        }

        // Find existing user
        const userInfo = await db
            .select()
            .from(Users)
            .where(eq(Users.email, user.primaryEmailAddress.emailAddress));

        console.log('Database query result:', userInfo);

        // Create new user if doesn't exist
        if (!userInfo || userInfo.length === 0) {
            console.log('Creating new user');
            const savedUser = await db
                .insert(Users)
                .values({
                    name: user.fullName,
                    email: user.primaryEmailAddress.emailAddress,
                    imageUrl: user.imageUrl || 'default-image-url',
                    credits: 10, // Give new users some initial credits
                    createdAt: new Date() // Set creation timestamp
                })
                .returning();

            if (!savedUser.length) {
                throw new Error('Failed to create new user');
            }

            console.log('New user created:', savedUser[0]);
            return NextResponse.json(
                { result: savedUser[0] },
                { status: 201 }
            );
        }

        // Additional validation for existing user
        const existingUser = userInfo[0];
        if (!existingUser.id) {
            throw new Error('Invalid user data in database');
        }

        // Update existing user's details if needed
        const updatedUser = await db
            .update(Users)
            .set({
                name: user.fullName, // Update name if changed
                imageUrl: user.imageUrl || existingUser.imageUrl // Update image if provided
            })
            .where(eq(Users.id, existingUser.id))
            .returning();

        console.log('Returning updated user:', updatedUser[0]);
        return NextResponse.json(
            { result: updatedUser[0] },
            { status: 200 }
        );

    } catch (error) {
        console.error('Verify user error:', error);
        return NextResponse.json(
            { 
                error: 'Internal server error',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}