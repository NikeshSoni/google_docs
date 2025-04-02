"use client"
import { useMutation } from "convex/react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { useState } from "react";


interface removeDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
}


export const RemoveDialog = ({ documentId, children }: removeDialogProps) => {


    const remove = useMutation(api.documents.removeById);

    const [isRemoving, setIsRemoving] = useState(false);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>

                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    This action can not be undone. This all permanetly your document.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isRemoving}
                        onClick={async (e) => {
                            e.stopPropagation();
                            setIsRemoving(true);
                            await remove({ id: documentId })
                                .finally(() => setIsRemoving(false));
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog >
    )
}