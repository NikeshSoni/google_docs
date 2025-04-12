import { Document } from "./documents";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface DocumentIdPageProps {
    params: Promise<{ documentId: Id<"documents"> }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
    const documentsId = (await params).documentId;

    const { getToken } = await auth()

    const token = await getToken({ template: "convex" }) ?? undefined;

    if (!token) {
        throw new Error("Unauthorized");
    }

    const preloadedDocument = await preloadQuery(
        api.documents.getById,
        { id: documentsId },
        { token }
    )

    return (
        <>
            <Document preloadedDocument={preloadedDocument} />
        </>
    )
}

export default DocumentIdPage
