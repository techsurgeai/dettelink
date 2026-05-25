"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppLayout from "../../components/AppLayout";
import UploadDocumentModal, { SubmittedDocument } from "../../components/UploadDocumentModal";

type DocumentRow = {
  id: number;
  type: string;
  name: string;
  date: string;
  source: string;
  status: "Verified" | "Pending" | "Rejected";
  reviewedBy: string;
  version: string;
  confidential: boolean;
};

const baseDocuments: DocumentRow[] = [
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

function mapSubmittedDocumentToRow(document: SubmittedDocument): DocumentRow {
  const typeMap: Record<string, string> = {
    bank: "Bank",
    tax: "Tax",
    legal: "Legal",
    financial: "Financial",
    identity: "Identity",
    other: "Other",
  };

  const today = new Date();
  const day = `${today.getDate()}`.padStart(2, "0");
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const year = today.getFullYear();

  return {
    id: document.id,
    type: typeMap[document.type] ?? "Other",
    name: document.name,
    date: `${day}-${month}-${year}`,
    source: "Dashboard Upload",
    status: "Pending",
    reviewedBy: "Pending Review",
    version: "V1",
    confidential: document.confidential,
  };
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documents, setDocuments] = useState<DocumentRow[]>(baseDocuments);

  useEffect(() => {
    const storedDocuments = localStorage.getItem("dl_documents_submitted");
    if (!storedDocuments) return;

    const parsedDocuments = JSON.parse(storedDocuments) as SubmittedDocument[];
    setDocuments([...parsedDocuments.map(mapSubmittedDocumentToRow), ...baseDocuments]);
  }, []);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = !searchQuery || doc.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !typeFilter || doc.type.toLowerCase() === typeFilter.toLowerCase();
      const matchesStatus = !statusFilter || doc.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [documents, searchQuery, statusFilter, typeFilter]);

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
              {filteredDocuments.map((doc) => (
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
                          {doc.confidential ? "Confidential" : "Standard"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{doc.date}</td>
                  <td>{doc.source}</td>
                  <td>
                    <span className={`doc-status ${doc.status.toLowerCase()}`}>{doc.status}</span>
                  </td>
                  <td>
                    <div className="documents-action-cell">
                      <Link href="/ai-analysis/" className="view-analysis-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        View AI Analysis
                      </Link>
                      <button className="download-pdf-btn">Download PDF</button>
                    </div>
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

        <UploadDocumentModal open={showUploadModal} onClose={() => setShowUploadModal(false)} />
      </div>
    </AppLayout>
  );
}
