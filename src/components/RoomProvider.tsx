'use client'

import { LiveList, LiveObject } from "@liveblocks/client"
import {
    ClientSideSuspense,
    RoomProvider as RoomProviderWrapper,
}
    from "@liveblocks/react/suspense"

import LoadingSpinner from "@/components/LoadingSpinner"


function RoomProvider({ roomId, children }: {
    roomId: string,
    children: React.ReactNode
}) {
    return (
        <RoomProviderWrapper
            id={roomId}
            initialPresence={{
                cursor: null
            }}
        // initialStorage={{
        //     people:new LiveList([new LiveObject({name:"aman",age:30})])
        // }}
        >
            <ClientSideSuspense fallback={<LoadingSpinner />}>
                {children}
                <LiveCursorProvider>
                    
                </LiveCursorProvider>
            </ClientSideSuspense>
        </RoomProviderWrapper>
    )
}

export default RoomProvider
