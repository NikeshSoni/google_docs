import Editor from "./editor";
import ToolBar from "./ToolBar";


interface DocumentIdPageProps {
    params: Promise<{ documentId: String }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
    const { documentId } = await params;

    return (
        <div className="him-h-screen bg-[#FAFBFD]">
            {/* DocumentIdPage: {documentId} */}
            <ToolBar/>
            <Editor />
        </div>
    )
}

export default DocumentIdPage
