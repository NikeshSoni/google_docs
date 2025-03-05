import Editor from "./editor";


interface DocumentIdPageProps {
    params: Promise<{ documentId: String }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
    const { documentId } = await params;

    return (
        <div className="him-h-screen bg-[#FAFBFD]">
            {/* DocumentIdPage: {documentId} */}

            <Editor />
        </div>
    )
}

export default DocumentIdPage
