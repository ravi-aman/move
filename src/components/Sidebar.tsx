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
import { collectionGroup, query, where, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase';

interface RoomDocument extends DocumentData {
    createAt: string;
    role: "Owner" | "editor";
    roomId: string;
    userId: string;
}

function Sidebar() {
    const { isSignedIn, user } = useUser();

    // State to hold grouped data for documents where the user is an owner or editor
    const [groupedData, setGroupData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: []
    });

    const userEmail = user?.emailAddresses[0]?.emailAddress;

    // Query Firestore to get documents where the current user is an owner or editor
    const [data, loading, error] = useCollection(
        isSignedIn && user ? (
            query(
                collectionGroup(db, 'rooms'),
                where('userId', '==', userEmail)
            )
        ) : null
    );

    // Use effect to process the Firestore data once it's retrieved
    useEffect(() => {
        if (!data) return;

        // Group documents by role (Owner or Editor)
        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>(
            (acc, curr) => {
                const roomData = curr.data() as RoomDocument;

                // Check if the user is the owner of the document
                if (roomData.role === "Owner") {
                    acc.owner.push({
                        id: curr.id,
                        ...roomData,
                    });
                } else {
                    // Otherwise, the user is an editor
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

        // Update the state with the grouped data
        setGroupData(grouped);
    }, [data]);

    // Render menu options with the list of documents
    const menuOption = (
        <>
            <NewDocumentButton />
            <div>
                {/* My Documents section */}
                {groupedData.owner.length === 0 ? (
                    <h2 className='text-gray-500 font-semibold text-sm'>
                        No Documents Found
                    </h2>
                ) : (
                    <>
                        <h2 className='text-gray-500 font-semibold text-sm'>
                            My Documents
                        </h2>
                        {groupedData.owner.map((doc) => (
                            <p key={doc.roomId}>{doc.roomId}</p>
                        ))}
                    </>
                )}
            </div>
            {/* Additional sections for shared and recently accessed documents can be added here */}
        </>
    );

    return (
        <div className='p-2 md:p-5 bg-gray-200 relative'>
            {/* Mobile view sidebar menu */}
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

            {/* Desktop view sidebar menu */}
            <div className='hidden md:inline'>{menuOption}</div>
        </div>
    );
}

export default Sidebar;
