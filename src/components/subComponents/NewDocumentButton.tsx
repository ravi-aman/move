'use client';

import { useTransition } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation'; // Updated import
import { createNewDocument } from '../../../actions/action';

function NewDocumentButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleCreateNewDocument = () => {
        startTransition(async () => {
            // Create a new document
            const { docId } = await createNewDocument();
            router.push(`/doc/${docId}`);
        });
    };

    return (
        <div>
            <Button className='p-2 md:p-5 relative' onClick={handleCreateNewDocument} disabled={isPending}>
                {isPending ? "Creating..." : "New Document"}
            </Button>
        </div>
    );
}

export default NewDocumentButton;
