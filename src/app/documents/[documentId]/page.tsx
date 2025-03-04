
interface DocumentIdPageProps {
    params: Promise<{ documentId: String }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
    const { documentId } = await params;

    return (
        <div>
            DocumentIdPage: {documentId}
        </div>
    )
}

export default DocumentIdPage
