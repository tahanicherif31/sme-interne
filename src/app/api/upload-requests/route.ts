import {NextApiRequest, NextApiResponse} from 'next';
import {UploadRequest, UploadResponse} from "@/types/common";
import {NextRequest, NextResponse} from "next/server";

const ALLOWED_CONTENT_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
    try {
        const body: UploadRequest = await request.json();
        const { fileName, contentType, sizeBytes, applicationId, companyId, uploaderEmail, sha256Hex } = body;

        // Validation
        if (!fileName || !contentType || !sizeBytes) {
            return NextResponse.json({
                message: 'Validation failed',
                details: 'fileName, contentType, and sizeBytes are required'
            }, { status: 400 });
        }

        if (!ALLOWED_CONTENT_TYPES.includes(contentType)) {
            return NextResponse.json({
                message: 'Validation failed',
                details: 'Unsupported content type'
            }, { status: 400 });
        }

        if (sizeBytes > MAX_FILE_SIZE) {
            return NextResponse.json({
                message: 'Validation failed',
                details: 'File size exceeds maximum allowed size'
            }, { status: 400 });
        }

        // Call external API
        const apiUrl = process.env.SME_API_URL || 'https://your-api-id.execute-api.eu-west-1.amazonaws.com';
        const response = await fetch(`${apiUrl}/upload-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName,
                contentType,
                sizeBytes,
                applicationId,
                companyId,
                uploaderEmail,
                sha256Hex
            })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Unknown error' }));
            return NextResponse.json(error, { status: response.status });
        }

        const uploadResponse: UploadResponse = await response.json();
        return NextResponse.json(uploadResponse, { status: 201 });

    } catch (error) {
        console.error('Upload request error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}