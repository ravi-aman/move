import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import liveblocks from "@/lib/liveblocks";
import { adminApp, adminDb } from "../../../firebase-admin";

export async function POST(req: NextRequest) {
    await auth().protect();

    const { sessionClaims } = await auth();
    const { room } = await req.json();


    if (!sessionClaims?.email) {
        return new NextResponse("User email is missing", { status: 400 });
    }
    const session = liveblocks.prepareSession(sessionClaims?.email, {
        userInfo: {
            name: sessionClaims?.fullName,
            email: sessionClaims?.email,
            avatar: sessionClaims?.image,
        },
    });

    const usersInRoomSnapshot = await adminDb
        .collectionGroup("room")
        .where("userId", "==", sessionClaims?.email)
        .get();

    const userInRoom = usersInRoomSnapshot.docs.find((doc) => doc.id === room);

    if (!userInRoom) {
        return new NextResponse("Room not found or unauthorized access", { status: 404 });
    }

    if (userInRoom?.exists) {
        session.allow(room, session.FULL_ACCESS)
        const { body, status } = await session.authorize();
        console.log("you are authorized here.........")

        return new Response(body, { status })

    } else {
        return new NextResponse("You are not in this room",
            { status: 404 });
    }


}
