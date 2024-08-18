import React from 'react'
import { Button } from '../ui/button'


import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
function NewDocumentButton() {
    return (
        <div>
            <Button className='p-2 md:p-5 relative'>New Document</Button>
        </div>
    )
}

export default NewDocumentButton
