"use client";

import { useState, useRef } from "react";
import AppLayout from "../../components/AppLayout";

interface UploadFile {
  id: number;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [documentType, setDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [isConfidential, setIsConfidential] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const documents = [
    {
      id: 1,
      type: "Bank",
      name: "Jan 2024 Bank Statement",
      date: "01-02-2026",
      source: "AI Generated",
      status: "Verified",
      reviewedBy: "Advisor",
      version: "V2",
      confidential: true,
    },
    {
      id: 2,
      type: "Tax",
      name: "Jan 2024 Bank Statement",
      date: "01-02-2026",
      source: "AI Generated",
      status: "Verified",
      reviewedBy: "Advisor",
      version: "V2",
      confidential: true,
    },
    {
      id: 3,
      type: "Tax",
      name: "Jan 2024 Bank Statement",
      date: "01-02-2026",
      source: "AI Generated",
      status: "Verified",
      reviewedBy: "Advisor",
      version: "V2",
      confidential: true,
    },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      addFiles(files);
    }
  };

  const addFiles = (files: File[]) => {
    const newFiles: UploadFile[] = files.map((file, index) => ({
      id: Date.now() + index,
      file,
      progress: 0,
      status: "pending" as const,
    }));
    setUploadFiles((prev) => [...prev, ...newFiles]);
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

  const handleUpload = () => {
    // Simulate upload progress
    uploadFiles.forEach((uploadFile) => {
      if (uploadFile.status === "pending") {
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, status: "uploading" as const } : f
          )
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
                    status: progress >= 100 ? ("completed" as const) : ("uploading" as const),
                  }
                : f
            )
          );
          if (progress >= 100) {
            clearInterval(interval);
          }
        }, 200);
      }
    });
  };

  const closeModal = () => {
    setShowUploadModal(false);
    setUploadFiles([]);
    setDocumentType("");
    setDocumentName("");
    setIsConfidential(false);
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

  return (
    <AppLayout>
      <div className="documents-page">
        {/* Header */}
        <div className="documents-header">
          <h1 className="page-title">Documents Center</h1>
          <p className="page-subtitle">Your scheduled consultations & financial discussions</p>
        </div>

        {/* Filters Row */}
        <div className="documents-filters">
          <div className="documents-search">
            <input
              type="text"
              placeholder="Search Document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="documents-search-input"
            />
          </div>
          <div className="documents-filter-selects">
            <div className="filter-select-wrapper">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Type</option>
                <option value="bank">Bank</option>
                <option value="tax">Tax</option>
                <option value="legal">Legal</option>
              </select>
              <svg className="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
            <div className="filter-select-wrapper">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Date</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <svg className="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
            <div className="filter-select-wrapper">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <svg className="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>
          <button className="upload-document-btn" onClick={() => setShowUploadModal(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Upload Document
          </button>
        </div>

        {/* Documents Table */}
        <div className="documents-table-container">
          <table className="documents-table">
            <thead>
              <tr>
                <th>TYPE</th>
                <th>DOCUMENT NAME</th>
                <th>DATE</th>
                <th>SOURCE</th>
                <th>STATUS</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <span className="doc-type">{doc.type}</span>
                  </td>
                  <td>
                    <div className="doc-name-cell">
                      <div className="doc-name-row">
                        <div className="doc-folder-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
                          </svg>
                        </div>
                        <span className="doc-name">{doc.name}</span>
                      </div>
                      <div className="doc-meta-row">
                        <span className="doc-meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Reviewed By {doc.reviewedBy}
                        </span>
                        <span className="doc-meta-divider">|</span>
                        <span className="doc-meta-item">Version {doc.version}</span>
                        <span className="doc-meta-divider">|</span>
                        <span className="doc-meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          Confidential
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{doc.date}</td>
                  <td>{doc.source}</td>
                  <td>
                    <span className="doc-status verified">{doc.status}</span>
                  </td>
                  <td>
                    <button className="download-pdf-btn">Download PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Funding Checklist */}
        <div className="funding-checklist">
          <h2 className="funding-checklist-title">Funding Checklist</h2>
          <div className="funding-checklist-content">
            <div className="funding-checklist-info">
              <span className="funding-checklist-label">Missing Documents:</span>
              <span className="funding-checklist-value">2/5</span>
            </div>
            <div className="funding-checklist-right">
              <span className="funding-checklist-percent"><strong>30%</strong> Ready for Funding</span>
            </div>
          </div>
          <div className="funding-checklist-progress">
            <div className="funding-checklist-progress-fill" style={{ width: "30%" }}></div>
          </div>
        </div>

        {/* Upload Document Modal */}
        {showUploadModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="upload-modal-header">
                <h2 className="upload-modal-title">Upload Document</h2>
                <button className="upload-modal-close" onClick={closeModal}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="upload-modal-body">
                {/* Drag and Drop Zone */}
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

                {/* Document Details Form */}
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

                {/* File List */}
                {uploadFiles.length > 0 && (
                  <div className="upload-file-list">
                    <h4 className="upload-file-list-title">Selected Files ({uploadFiles.length})</h4>
                    {uploadFiles.map((uploadFile) => (
                      <div key={uploadFile.id} className="upload-file-item">
                        <div className="upload-file-icon">
                          {getFileIcon(uploadFile.file.name)}
                        </div>
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
                        <button
                          className="upload-file-remove"
                          onClick={() => removeFile(uploadFile.id)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="upload-modal-footer">
                <button className="btn btn-outline-gray" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  className="btn btn-green"
                  onClick={handleUpload}
                  disabled={uploadFiles.length === 0}
                >
                  Upload Document
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
