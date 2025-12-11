export type DocumentType = { documentName?: string; documentId: string };

export type FileValueType = DocumentType | (DocumentType | File)[] | null;

export interface UploadRequest {
    fileName: string;
    contentType: string;
    sizeBytes: number;
    applicationId?: string;
    companyId?: string;
    uploaderEmail?: string;
    sha256Hex?: string;
}

export interface UploadResponse {
    documentId: string;
    uploadUrl: string;
    objectKey: string;
    expiresInSeconds: number;
    requiredHeaders: Record<string, string>;
}

export interface FileReference {
    documentId: string;
    fileName?: string;
    contentType?: string;
    sizeBytes?: number;
    objectKey?: string;
}

export interface ApplicationRequest {
    businessInformation: {
        file: FileReference[];
        yearRegistration: number;
        companyExport: string;
        founderGender: string;
        typeSponsorship?: string;
        aged: string;
        male: number;
        female: number;
        memberAssociation?: string;
        nameAssociation?: string;
        capacityBuilding?: string;
        capacityBuildingYear?: string;
        attendance?: string;
        attendanceYear?: string;
    };
    companyInformation: {
        companyName: string;
        websiteURL: string;
        companyContactName: string;
        countryRegistration: string;
        yearRegistration: number;
        registrationAddress: string;
        sector: string;
        companyContactEmail: string;
        companyContactPhone: string;
    };
    complianceDeclarations: string[];
    profileInformation: {
        contactName: string;
        contactTitle: string;
        email: string;
        contactPhone: string;
    };
}

export interface ApplicationCreated {
    applicationId: string;
    createdAt: string;
}