<<<<<<< HEAD
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
=======
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import Spinner from "@/components/spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";
>>>>>>> working

const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
<<<<<<< HEAD
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
=======
    const restore = useMutation(api.documents.restor);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("");

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">
    ) => {
        event.stopPropagation();
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restor note.",
        });
    };

    const onRemove = (documentId: Id<"documents">) => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note.",
        });

        if (params.documentId === documentId) {
            router.push("/documents");
        }
    };

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-2">
                <Search className="h-4 w-4 ml-2" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 mr-2 mt-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Filter by page title..."
                />
            </div>
            <div className="mt-2 px-1 bg-1">
                <p className="hidden last:block text-xs text-center text-muted-foregroud pb-2">
                    No Documents found
                </p>
                {filteredDocuments?.map((document) => (
                    <div
                        key={document._id}
                        role="button"
                        onClick={() => onClick(document._id)}
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primar justify-between"
                    >
                        <span className="truncate pl-2">{document.title}</span>
                        <div className="flex items-center">
                            <div
                                onClick={(e) => onRestore(e, document._id)}
                                role="button"
                                className="rounded-sm p-2 hover:bg-neutral-200"
                            >
                                <Undo className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <ConfirmModal
                                onConfirm={() => onRemove(document._id)}
                            >
                                <div
                                    role="button"
                                    className="rounded-sm p-2 hover:bg-neutral-200"
                                >
                                    <Trash className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrashBox;
>>>>>>> working
