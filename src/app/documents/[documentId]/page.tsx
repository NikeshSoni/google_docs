import Editor from "./editor";
import ToolBar from "./ToolBar";

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
     await params;
    return (
        <div className="him-h-screen bg-[#FAFBFD]">
            <ToolBar/>
            <Editor />
        </div>
    )
}

export default DocumentIdPage
