"use client";

import React, { useEffect, useState } from 'react';
import NewDocumentButton from './subComponents/NewDocumentButton';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from 'lucide-react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { useUser } from '@clerk/nextjs';
import { collectionGroup, query, where } from 'firebase/firestore'; // Import the necessary Firestore functions
import type { DocumentData, Query } from 'firebase/firestore'; // Import types only
import { db } from '../../firebase';
import SidebarOption from '@/components/SidebarOption';
interface RoomDocument extends DocumentData {
    createAt: string;
    role: "Owner" | "editor";
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

    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const [data, loading, error] = useCollection(
        isSignedIn && user ? (
            query(
                collectionGroup(db, 'rooms') as Query<DocumentData, DocumentData>, // Cast to the imported Query type
                where('userId', '==', userEmail)
            )
        ) : null
    );

    useEffect(() => {
        if (!data) return;

        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>(
            (acc, curr) => {
                const roomData = curr.data() as RoomDocument;
                if (roomData.role === "Owner") {
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
        setGroupData(grouped);
    }, [data]);

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
                                key={doc.id}
                                id={doc.id}
                                href={`/doc/${doc.id}`}
                            />
                        ))}
                    </>
                )}
            </div>
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
