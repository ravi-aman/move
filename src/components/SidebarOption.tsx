'use client'

import { Link } from 'lucide-react'
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { doc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';

function SidebarOption({ href, id }: {
    href: string;
    id: string;
}) {
    const [data, loading, error] = useDocumentData(doc(db, 'documents', id))
    const pathname = usePathname()
    const isActive = href.includes(pathname) && (pathname !== "/");

    if (!data) return null;
    return (
        <Link href={href} className={''}>
            <p>{ }</p>
        </Link>
    )
}

export default SidebarOption
