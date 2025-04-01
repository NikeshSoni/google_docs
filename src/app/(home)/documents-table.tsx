import { Doc } from "../../../convex/_generated/dataModel";
import { PaginationStatus } from "convex/react"

import {
    Table, TableBody,
    TableCell, TableHead,
    TableHeader, TableRow
} from "@/components/ui/table";
import { LoaderIcon } from "lucide-react";
import { DocumentRow } from "./document-row";

interface DocumentsTableProps {
    documents: Doc<"documents">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus;
}

export const DocumentsTable = ({ documents, loadMore, status }: DocumentsTableProps) => {
    return (
        <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
            {documents === undefined ? (
                <div className="flex justify-center items-center h-24">
                    <LoaderIcon className="animate-spin text-muted-foreground size-5" />
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>&nbsp;</TableHead>
                            <TableHead className="hidden md:table-cell">Shared</TableHead>
                            <TableHead className="hidden md:table-cell">Created At</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {documents.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell className="h-24 text-center text-muted-foreground ">
                                    No Document Found
                                </TableCell>
                            </TableRow>
                        ) : (
                            documents.map((document) => (
                                <DocumentRow key={document._id} document={document} />
                            ))
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};


