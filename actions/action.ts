'use server';

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebase-admin";

export async function createNewDocument() {
    const { sessionClaims } = await auth().protect();

    const docCollectionRef = adminDb.collection("documents");
    const docRef = await docCollectionRef.add({
        title: "New Document"
    });

    await adminDb.collection('users').doc(sessionClaims?.email!).collection('room').doc(docRef.id).set({
        userId: sessionClaims?.email!,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id
    }, { merge: true });


    return {
        docId: docRef.id,
        
        roomId: docRef.id
    }
}
