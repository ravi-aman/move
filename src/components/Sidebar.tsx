"use client";

import React, { useEffect, useState } from 'react';
import NewDocumentButton from './subComponents/NewDocumentButton';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from 'lucide-react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { useUser } from '@clerk/nextjs';
import { collectionGroup, collection, query, where } from 'firebase/firestore';
import type { DocumentData, Query } from 'firebase/firestore';
import { db } from '../../firebase';
import SidebarOption from '@/components/SidebarOption';
import { handleFirestoreError } from '@/utils/errorHandler';
// import { CollectionGroup } from 'firebase-admin/firestore';

interface RoomDocument extends DocumentData {
    createAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string;
}

function Sidebar() {
    const { isSignedIn, user } = useUser();
    const [groupedData, setGroupData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: []
    });
    // console.log(user)
    const primaryEmail = user?.primaryEmailAddress?.emailAddress; // Get the primary email address
    // console.log(primaryEmail)
    const [data, loading, error] = useCollection(
        user && (
            query(
                collection(db, `/users/${primaryEmail}/room/`) as Query<RoomDocument>,
                where('userId', '==', primaryEmail) // Use the primary email address
            )
        )
    );
    // console.log("data here ", data);
    // console.log("data docs ", data?.docs)
    useEffect(() => {
        if (error) {
            handleFirestoreError(error);
            return;
        }
        if (!data) {
            console.log("No data returned");
            return;
        }

        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>(
            (acc, curr) => {
                const roomData = curr.data() as RoomDocument;
                if (roomData.role === "owner") {
                    acc.owner.push({
                        id: curr.id,
                        ...roomData,
                    });
                } else {
                    acc.editor.push({
                        id: curr.id,
                        ...roomData,
                    });
                }
                return acc;
            },
            {
                owner: [],
                editor: [],
            }
        );

        // console.log("group  ", grouped)

        setGroupData(grouped);
    }, [data, error, primaryEmail]); // Corrected the dependency array

    // groupedData.owner.map((doc) => (
    //     console.log(doc.roomId)
    // ))
    // console.log(groupedData)
    // console.log(groupedData.owner.length)
    const menuOption = (
        <>
            <NewDocumentButton />
            <div>
                {groupedData.owner.length === 0 ? (
                    <h2 className='text-gray-500 font-semibold text-sm'>
                        No Document Found
                    </h2>
                ) : (
                    <>
                        <h2 className='text-gray-500 font-semibold text-sm'>
                            My Document
                        </h2>
                        {groupedData.owner.map((doc) => (
                            <SidebarOption
                                key={doc.roomId}
                                id={doc.roomId}
                                href={`/doc/${doc.roomId}`}
                            />
                        ))}
                    </>
                )}
            </div>
            {groupedData.editor.length > 0 && (
                <>
                    <h2 className='text-gray-500 font-semibold text-sm'>
                        My Document
                    </h2>
                    {groupedData.owner.map((doc) => (
                        <SidebarOption
                            key={doc.roomId}
                            id={doc.roomId}
                            href={`/doc/${doc.roomId}`}
                        />
                    ))}                </>
            )}
        </>

    );

    return (
        <div className='p-2 md:p-5 bg-gray-200 relative'>
            <div className='md:hidden'>
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon className='h-6 w-6 md:hidden' />
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <div>{menuOption}</div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <div className='hidden md:inline'>{menuOption}</div>
        </div>
    );
}

export default Sidebar;


