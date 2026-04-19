import { Id } from "@/convex/_generated/dataModel";
import DocumentClient from "./document-client";

interface DocumentIdProps {
    params: Promise<{
        documentId: Id<"documents">;
    }>;
}

const DocumentIdPage = async ({ params }: DocumentIdProps) => {
    const { documentId } = await params;

    return <DocumentClient documentId={documentId} />;
};

export default DocumentIdPage;
