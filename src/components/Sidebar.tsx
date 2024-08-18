import React from 'react'
import NewDocumentButton from './subComponents/NewDocumentButton'


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'



function Sidebar() {

    const menuOption = (
        <>
            <NewDocumentButton />

            {/* my documents */}
            {/* List... */}

            {/* shared documents */}
            {/* List... */}

            {/* recently accessed */}
            {/* List... */}

      



        </>
    );
    return (
        <div className=' p-2 md:p-5 bg-gray-200 relative'>


            <div  className='md:hidden '>
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
    )
}

export default Sidebar
