import Link from "next/link";
import AppLayout from "../../../../components/AppLayout";

const approvalItems = [
  { title: "Atlas Logistics teaser wording review", type: "Teaser approval", status: "Pending legal", note: "Confidentiality clause needs final sign-off." },
  { title: "Falcon Energy publication request", type: "Publish approval", status: "Approved", note: "Approved for recipient distribution this morning." },
  { title: "Northbridge NDA authority check", type: "Authority verification", status: "Pending compliance", note: "Confirm approver rights before counterparty release." },
];

export default function LeadArrangerCompliancePage() {
  return (
    <AppLayout>
      <div className="page-header">
        <Link href="/dashboard/lead-arranger/" className="teaser-back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Lead Arranger Dashboard
        </Link>
        <h1 className="page-title">Compliance & Approvals</h1>
        <p className="page-subtitle">Review teaser approvals, publication rights, and mandate release blockers.</p>
      </div>

      <div style={{ display: "grid", gap: "16px" }}>
        {approvalItems.map((item) => (
          <article key={item.title} className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "start", flexWrap: "wrap" }}>
              <div>
                <span className="badge" style={{ marginBottom: "10px", display: "inline-flex" }}>{item.type}</span>
                <h3 style={{ marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "var(--text-secondary)" }}>{item.note}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="badge">{item.status}</span>
                <div style={{ marginTop: "12px" }}>
                  <Link href="/dashboard/lead-arranger/deal-detail/" className="btn btn-primary arranger-green-btn">Open Item</Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
