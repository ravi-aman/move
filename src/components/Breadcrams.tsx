'use client';

import { usePathname } from 'next/navigation';
import React, { Fragment } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,

} from "@/components/ui/breadcrumb";

export default function Breadcrams() {
    const path = usePathname();
    const segments = path.split("/").filter(Boolean); // Filter out empty segments

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    {segments.map((segment, index) => {

                        const href = `/${segments.slice(0, index + 1).join("/")}`;
                        const isLast = index === segments.length - 1;



                        return (
                            <Fragment key={segment}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem >
                                    {
                                        isLast ? (
                                            <BreadcrumbPage>{segment}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>

                                        )
                                    }
                                </BreadcrumbItem>
                            </Fragment>
                        );
                    })}

                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
