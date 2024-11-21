import { NextRequest, NextResponse } from 'next/server';
import { Users } from '@/config/schema';
import { db } from '@/config';
import { eq } from 'drizzle-orm';

// Define proper types for better type safety
interface UserData {
    fullName: string;
    primaryEmailAddress: {
        emailAddress: string;
    };
    imageUrl: string;
}

export async function POST(req: NextRequest) {
    try {
        // Input validation
        const body = await req.json();
        const user = body.user as UserData;

        if (!user?.primaryEmailAddress?.emailAddress) {
            return NextResponse.json(
                { error: 'Invalid user data' },
                { status: 400 }
            );
        }

        // Single database query using upsert pattern
        const userInfo = await db
            .select()
            .from(Users)
            .where(eq(Users.email, user.primaryEmailAddress.emailAddress));

        if (userInfo?.length === 0) {
            const savedUser = await db
                .insert(Users)
                .values({
                    name: user.fullName,
                    email: user.primaryEmailAddress.emailAddress,
                    imageUrl: user.imageUrl,
                })
                .returning();

            return NextResponse.json(
                { result: savedUser[0] },
                { status: 201 }
            );
        }

        return NextResponse.json(
            { result: userInfo },
            { status: 200 }
        );
    } catch (error) {
        console.error('Verify user error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}