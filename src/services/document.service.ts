import { axiosInstance, GraphqlEndpoints } from "./config";
import { Pagination, HasPagination } from "./types";

export type Document = {
  documentId: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  objectKey?: string;
  applicationId?: string;
  companyId?: string;
  uploaderEmail?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetAllDocumentsVariables = {
  filter?: {
    searchTerm?: string;
    applicationId?: string;
    companyId?: string;
    uploaderEmail?: string;
    startDate?: Date;
    endDate?: Date;
  };
  pagination: Pagination;
};

export type InitiateDocumentUploadRequest = {
  fileName: string;
  contentType: string;
  sizeBytes: number;
  applicationId?: string;
  companyId?: string;
  uploaderEmail?: string;
  sha256Hex?: string;
};

export type InitiateDocumentUploadResponse = {
  documentId: string;
  uploadUrl: string;
  objectKey: string;
  expiresInSeconds: number;
  requiredHeaders: Record<string, string>;
};

export type ConfirmDocumentUploadRequest = {
  documentId: string;
};

export type DocumentDownloadResponse = {
  downloadUrl: string;
  expiresInSeconds: number;
};

/* -------------------------------------------------------------------------- */
/*                                 getAllDocuments                             */
/* -------------------------------------------------------------------------- */

const getAll = () => ({
  key: (props?: any) => ["getAllDocuments", ...(props ? [props] : [])],
  fn: (variables: GetAllDocumentsVariables) => () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.DOCUMENTS}`,
      params: { ...variables.filter, ...variables.pagination },
    }).then((res) => res.data as HasPagination<Document>),
});

/* -------------------------------------------------------------------------- */
/*                                    find                                    */
/* -------------------------------------------------------------------------- */

const find = (documentId: string) => ({
  key: (props?: any) => [
    "find document",
    documentId,
    ...(props ? [props] : []),
  ],
  fn: () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.DOCUMENTS}/${documentId}`,
    }).then((res) => res.data as Document),
});

/* -------------------------------------------------------------------------- */
/*                                   delete                                   */
/* -------------------------------------------------------------------------- */

const remove = (documentId: string) => ({
  key: (props?: any) => [
    "delete document",
    documentId,
    ...(props ? [props] : []),
  ],
  fn: () =>
    axiosInstance({
      method: "delete",
      url: `${GraphqlEndpoints.DOCUMENTS}/${documentId}`,
    }).then((res) => res.data),
});

/* -------------------------------------------------------------------------- */
/*                                  download                                  */
/* -------------------------------------------------------------------------- */

const download = (documentId: string) => ({
  key: (props?: any) => [
    "download document",
    documentId,
    ...(props ? [props] : []),
  ],
  fn: () =>
    axiosInstance({
      method: "get",
      url: `${GraphqlEndpoints.DOCUMENTS}/${documentId}/download`,
    }).then((res) => res.data as DocumentDownloadResponse),
});

/* -------------------------------------------------------------------------- */
/*                                 initiate                                   */
/* -------------------------------------------------------------------------- */

const initiate = () => ({
  key: (props?: any) => ["initiate document upload", ...(props ? [props] : [])],
  fn: (data: InitiateDocumentUploadRequest) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.DOCUMENTS}/initiate`,
      data,
    }).then((res) => res.data as InitiateDocumentUploadResponse),
});

/* -------------------------------------------------------------------------- */
/*                                  confirm                                   */
/* -------------------------------------------------------------------------- */

const confirm = () => ({
  key: (props?: any) => ["confirm document upload", ...(props ? [props] : [])],
  fn: (data: ConfirmDocumentUploadRequest) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.DOCUMENTS}/confirm`,
      data,
    }).then((res) => res.data),
});

/* -------------------------------------------------------------------------- */
/*                          initiate-profile-image                            */
/* -------------------------------------------------------------------------- */

const initiateProfileImage = () => ({
  key: (props?: any) => [
    "initiate profile image upload",
    ...(props ? [props] : []),
  ],
  fn: (data: InitiateDocumentUploadRequest) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.DOCUMENTS}/profile-image/initiate`,
      data,
    }).then((res) => res.data as InitiateDocumentUploadResponse),
});

/* -------------------------------------------------------------------------- */
/*                           confirm-profile-image                            */
/* -------------------------------------------------------------------------- */

const confirmProfileImage = () => ({
  key: (props?: any) => [
    "confirm profile image upload",
    ...(props ? [props] : []),
  ],
  fn: (data: ConfirmDocumentUploadRequest) =>
    axiosInstance({
      method: "post",
      url: `${GraphqlEndpoints.DOCUMENTS}/profile-image/confirm`,
      data,
    }).then((res) => res.data),
});

const document = {
  getAll,
  find,
  remove,
  download,
  initiate,
  confirm,
  initiateProfileImage,
  confirmProfileImage,
};

export default document;
