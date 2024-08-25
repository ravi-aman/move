'use client';

import Link from 'next/link';
import React from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { doc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';

function SidebarOption({ href, id }: { href: string; id: string; }) {
    const [data, loading, error] = useDocumentData(doc(db, 'documents', id));
    const pathname = usePathname();
    const isActive = href.includes(pathname) && pathname !== '/';

    if (loading) return <p>Loading...</p>; // Show loading state
    if (error) return <p>Error: {error.message}</p>; // Show error message

    if (!data) {
        console.log("No data returned:", data);
        return null;
    }

    // Log the full data object
    // console.log("Full document data:", JSON.stringify(data, null, 2));

    return (
        <Link
            href={href}
            className={`border-4  m-3 flex justify-center p-2 rounded-md 
            ${isActive ? 'active-link-class' : 'link-class'}`}>
            <p>{data.title || 'Untitled Document'}</p>
        </Link>
    );
}

export default SidebarOption;
