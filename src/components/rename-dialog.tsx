"use client"
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";


interface renameDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
    initialTitle: string;
}


export const RenameDialog = ({ documentId, initialTitle, children }: renameDialogProps) => {

    const update = useMutation(api.documents.updateById);
    const [isUpdating, setIsUpdating] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false)


    const onSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);

        update({ id: documentId, title: title.trim() || "Untitled" })
            .catch(() =>
                toast.error("Something went wrong", {
                    style: {
                        backgroundColor: '#f87171',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        padding: '16px',
                    },
                    icon: "⚠️",
                })).then(() =>
                    toast.success("Successfully Renamed!", {
                        style: {
                            backgroundColor: '#4ade80', // Tailwind green-400
                            color: '#fff',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            padding: '16px',
                        },
                        icon: "✅",
                    }))
            .finally(() => {
                setIsUpdating(false);
            })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle> Rename document </DialogTitle>
                        <DialogDescription> Enter the new name for this document. </DialogDescription>
                    </DialogHeader>
                    <div className="my-4">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Document Name"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false)
                            }}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}