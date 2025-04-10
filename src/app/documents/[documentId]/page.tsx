import { Document } from "./documents";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import Editor from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";
import ToolBar from "./ToolBar";
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

    if (!preloadedDocument) {
        throw new Error("Document not found");
    }

    return (

        <>
            <Document preloadedDocument={preloadedDocument} />
        </>
        // <Room>
        //     <div className="him-h-screen bg-[#FAFBFD]">
        //         <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
        //             <Navbar />
        //             <ToolBar />
        //         </div>
        //         <div className="pt-[114px] print:pt-0">
        //             <Editor />
        //         </div>
        //     </div>
        // </Room>
    )
}

export default DocumentIdPage
