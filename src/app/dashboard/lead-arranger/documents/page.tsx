import Link from "next/link";
import AppLayout from "../../../../components/AppLayout";

const folders = [
  {
    title: "Falcon Energy Data Room Pack",
    documents: ["Teaser v3.pdf", "Financial model summary.xlsx", "Management presentation.pptx"],
    access: "8 counterparties enabled",
  },
  {
    title: "Atlas Logistics Mandate Pack",
    documents: ["NDA template.docx", "IM draft.pdf", "Legal comments log.docx"],
    access: "Draft access only",
  },
  {
    title: "Northbridge Receivables Pack",
    documents: ["Borrowing base outline.pdf", "Pool metrics.xlsx", "Compliance memo.pdf"],
    access: "11 recipients shortlisted",
  },
];

export default function LeadArrangerDocumentRoomPage() {
  return (
    <AppLayout>
      <div className="page-header">
        <Link href="/dashboard/lead-arranger/" className="teaser-back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Lead Arranger Dashboard
        </Link>
        <h1 className="page-title">Document Room</h1>
        <p className="page-subtitle">Manage teaser packs, mandate documents, and recipient access for each live deal.</p>
      </div>

      <div style={{ display: "grid", gap: "16px" }}>
        {folders.map((folder) => (
          <article key={folder.title} className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "start", flexWrap: "wrap" }}>
              <div>
                <h3 style={{ marginBottom: "10px" }}>{folder.title}</h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>{folder.access}</p>
                <div style={{ display: "grid", gap: "8px" }}>
                  {folder.documents.map((doc) => (
                    <div key={doc} style={{ color: "var(--text-primary)" }}>{doc}</div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link href="/dashboard/lead-arranger/deal-detail/" className="btn btn-secondary">Manage Access</Link>
                <Link href="/dashboard/lead-arranger/deal-detail/" className="btn btn-primary">Open Folder</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
