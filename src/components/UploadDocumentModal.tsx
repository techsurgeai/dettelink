"use client";

import { useRef, useState } from "react";

interface UploadFile {
  id: number;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
}

export type SubmittedDocument = {
  id: number;
  name: string;
  type: string;
  typeLabel: string;
  confidential: boolean;
  sizeLabel: string;
  selectedBanks: string[];
  sendToAllBanks: boolean;
};

type UploadDocumentModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmitComplete?: (documents: SubmittedDocument[]) => void;
};

export default function UploadDocumentModal({ open, onClose, onSubmitComplete }: UploadDocumentModalProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [documentType, setDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [isConfidential, setIsConfidential] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ukBanks = [
    "HSBC UK",
    "Barclays",
    "Lloyds Bank",
    "NatWest",
    "Santander UK",
    "Standard Chartered UK",
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const addFiles = (files: File[]) => {
    const newFiles: UploadFile[] = files.map((file, index) => ({
      id: Date.now() + index,
      file,
      progress: 0,
      status: "pending",
    }));
    setUploadFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (id: number) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getDocumentTypeLabel = (value: string) => {
    const labels: Record<string, string> = {
      bank: "Bank Statement",
      tax: "Tax Document",
      legal: "Legal Document",
      financial: "Financial Report",
      identity: "Identity Document",
      other: "Other Document",
    };
    return labels[value] ?? "Document";
  };

  const handleUpload = () => {
    const submittedDocuments: SubmittedDocument[] = uploadFiles.map((uploadFile) => ({
      id: uploadFile.id,
      name: documentName.trim() || uploadFile.file.name,
      type: documentType || "other",
      typeLabel: getDocumentTypeLabel(documentType),
      confidential: isConfidential,
      sizeLabel: formatFileSize(uploadFile.file.size),
      selectedBanks,
      sendToAllBanks: selectedBanks.length === ukBanks.length,
    }));

    uploadFiles.forEach((uploadFile) => {
      if (uploadFile.status === "pending") {
        setUploadFiles((prev) =>
          prev.map((f) => (f.id === uploadFile.id ? { ...f, status: "uploading" } : f))
        );

        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? {
                    ...f,
                    progress,
                    status: progress >= 100 ? "completed" : "uploading",
                  }
                : f
            )
          );
          if (progress >= 100) {
            clearInterval(interval);
            if (uploadFile.id === uploadFiles[uploadFiles.length - 1]?.id) {
              onSubmitComplete?.(submittedDocuments);
              setTimeout(() => closeModal(), 250);
            }
          }
        }, 200);
      }
    });
  };

  const closeModal = () => {
    setUploadFiles([]);
    setDocumentType("");
    setDocumentName("");
    setIsConfidential(false);
    setIsDragging(false);
    setSelectedBanks([]);
    setStep(1);
    onClose();
  };

  const toggleBank = (bank: string) => {
    setSelectedBanks((prev) =>
      prev.includes(bank) ? prev.filter((entry) => entry !== bank) : [...prev, bank]
    );
  };

  const handleSelectAllBanks = () => {
    setSelectedBanks((prev) => (prev.length === ukBanks.length ? [] : [...ukBanks]));
  };

  const handlePrimaryAction = () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    handleUpload();
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext === "pdf") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
      </svg>
    );
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="upload-modal-header">
          <h2 className="upload-modal-title">{step === 1 ? "Upload Document" : "Share Information"}</h2>
          <button className="upload-modal-close" onClick={closeModal}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="upload-modal-body">
          {step === 1 ? (
            <>
              <div
                className={`upload-dropzone ${isDragging ? "dragging" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                  style={{ display: "none" }}
                />
                <div className="upload-dropzone-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17,8 12,3 7,8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <p className="upload-dropzone-text">
                  Drag & Drop your files here or <span className="upload-browse-link">Browse</span>
                </p>
                <p className="upload-dropzone-hint">
                  Supported formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG (Max 10MB)
                </p>
              </div>

              <div className="upload-form">
                <div className="upload-form-row">
                  <div className="upload-form-group">
                    <label className="upload-form-label">Document Type</label>
                    <div className="filter-select-wrapper">
                      <select
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="filter-select upload-select"
                      >
                        <option value="">Select Type</option>
                        <option value="bank">Bank Statement</option>
                        <option value="tax">Tax Document</option>
                        <option value="legal">Legal Document</option>
                        <option value="financial">Financial Report</option>
                        <option value="identity">Identity Document</option>
                        <option value="other">Other</option>
                      </select>
                      <svg className="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </div>
                  </div>
                  <div className="upload-form-group">
                    <label className="upload-form-label">Document Name</label>
                    <input
                      type="text"
                      placeholder="Enter document name"
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      className="upload-form-input"
                    />
                  </div>
                </div>

                <div className="upload-form-row">
                  <div className="upload-form-group confidential-group">
                    <label className="upload-checkbox-label">
                      <input
                        type="checkbox"
                        checked={isConfidential}
                        onChange={(e) => setIsConfidential(e.target.checked)}
                        className="upload-checkbox"
                      />
                      <span className="upload-checkbox-custom"></span>
                      Mark as Confidential
                    </label>
                  </div>
                </div>
              </div>

              {uploadFiles.length > 0 && (
                <div className="upload-file-list">
                  <h4 className="upload-file-list-title">Selected Files ({uploadFiles.length})</h4>
                  {uploadFiles.map((uploadFile) => (
                    <div key={uploadFile.id} className="upload-file-item">
                      <div className="upload-file-icon">{getFileIcon(uploadFile.file.name)}</div>
                      <div className="upload-file-info">
                        <div className="upload-file-details">
                          <span className="upload-file-name">{uploadFile.file.name}</span>
                          <span className="upload-file-size">{formatFileSize(uploadFile.file.size)}</span>
                        </div>
                        {uploadFile.status === "uploading" && (
                          <div className="upload-file-progress">
                            <div
                              className="upload-file-progress-bar"
                              style={{ width: `${uploadFile.progress}%` }}
                            ></div>
                          </div>
                        )}
                        {uploadFile.status === "completed" && (
                          <span className="upload-file-status completed">Uploaded</span>
                        )}
                      </div>
                      <button className="upload-file-remove" onClick={() => removeFile(uploadFile.id)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="share-banks-step">
              <div className="share-banks-intro">
                <h3>Share Info With Banks</h3>
                <p>Select one or more UK banks to share this document with, or choose all and proceed.</p>
              </div>

              <button
                type="button"
                className={`share-banks-select-all ${selectedBanks.length === ukBanks.length ? "selected" : ""}`}
                onClick={handleSelectAllBanks}
              >
                <span className={`share-bank-checkbox ${selectedBanks.length === ukBanks.length ? "selected" : ""}`}>
                  {selectedBanks.length === ukBanks.length ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="5,13 10,18 19,7" />
                    </svg>
                  ) : null}
                </span>
                <span>Select All UK Banks</span>
              </button>

              <div className="share-bank-list">
                {ukBanks.map((bank) => {
                  const isSelected = selectedBanks.includes(bank);
                  return (
                    <button
                      key={bank}
                      type="button"
                      className={`share-bank-item ${isSelected ? "selected" : ""}`}
                      onClick={() => toggleBank(bank)}
                    >
                      <span className={`share-bank-checkbox ${isSelected ? "selected" : ""}`}>
                        {isSelected ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="5,13 10,18 19,7" />
                          </svg>
                        ) : null}
                      </span>
                      <span>{bank}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="upload-modal-footer">
          <button className="btn btn-outline-gray" onClick={step === 1 ? closeModal : () => setStep(1)}>
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button
            className="btn btn-green"
            onClick={handlePrimaryAction}
            disabled={
              step === 1
                ? uploadFiles.length === 0 || !documentType
                : selectedBanks.length === 0
            }
          >
            {step === 1 ? `Submit ${getDocumentTypeLabel(documentType)}` : "Confirm & Proceed"}
          </button>
        </div>
      </div>
    </div>
  );
}
