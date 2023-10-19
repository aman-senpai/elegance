"use client"

import Spinner from '@/components/spinner'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { remove } from '@/convex/documents'
import { useQuery, useMutation } from 'convex/react'
import { Search } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);

    const [search, setSearch] = useState("");
    
    const fileterDocuments = documents?.filter((document) => {
        return document.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    })

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    const onRestor = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<"documents">) => {
        event.stopPropagation();

        const promise = restore({id: documentId})

        toast.promise(promise, {
            loading: "Restoring...",
            success: "Note restored",
            error: "Failed to restore Note",
        })
    }

    const onRemove = (
        documentId: Id<"documents">,
    ) => {
        //@ts-ignore
        const promise = remove({id: documentId})

        toast.promise(promise, {
            loading: "Removing...",
            success: "Note removed",
            error: "Failed to remove Note",
        })

        if (params.documentId === documentId) {
            router.push('/documents')
        }
    }

    if (documents === undefined) {
        return (
            <div className='h-full flex items-center justify-center p-4'>
                <Spinner size="lg" />
            </div>
        )
    }

  return (
    <div className='text-sm'>
        <div className='flex items-center gap-x-1 p-2'>
            <Search className='h-4 w-4' />
            <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Filter by page title'
            className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
            />
            <div className='mt-2 px-1 pb-1'>
                <p className='hidden last:block text-xs text-center bg-muted-foreground pb-2'>
                    No document found.
                </p>
            </div>
        </div>
    </div>
  )
}

export default TrashBox