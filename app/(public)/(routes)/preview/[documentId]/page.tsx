import { Id } from "@/convex/_generated/dataModel";
import PreviewClient from "./preview-client";

interface DocumentIdProps {
    params: Promise<{
        documentId: Id<"documents">;
    }>;
}

const DocumentIdPage = async ({ params }: DocumentIdProps) => {
    const { documentId } = await params;

    return <PreviewClient documentId={documentId} />;
};

export default DocumentIdPage;
