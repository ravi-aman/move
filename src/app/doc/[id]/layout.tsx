import { auth } from '@clerk/nextjs/server'
import React, { Children } from 'react'

function Doclayout({ children, params: { id } }: {
    children: React.ReactNode,
    params: { id: string },
}) {
    auth().protect();
    return (
        <div>
            {children}
        </div>
    )
}

export default Doclayout
