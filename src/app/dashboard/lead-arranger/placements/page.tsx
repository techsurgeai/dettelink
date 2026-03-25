import Link from "next/link";
import AppLayout from "../../../../components/AppLayout";

const placementRows = [
  { name: "Summit Credit Partners", deal: "Falcon Energy Refinancing", status: "NDA signed", activity: "Requested management call", owner: "A. Khan" },
  { name: "BlueHarbor Capital", deal: "Atlas Logistics Growth Facility", status: "Viewed teaser", activity: "Opened teaser 2 hours ago", owner: "R. Shah" },
  { name: "First Meridian Bank", deal: "Northbridge Consumer Receivables", status: "Interested", activity: "Requested data room access", owner: "M. Tariq" },
  { name: "Stonebridge Lending", deal: "Falcon Energy Refinancing", status: "Sent", activity: "Awaiting first open", owner: "A. Khan" },
];

export default function LeadArrangerPlacementTrackerPage() {
  return (
    <AppLayout>
      <div className="page-header">
        <Link href="/dashboard/lead-arranger/" className="teaser-back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Lead Arranger Dashboard
        </Link>
        <h1 className="page-title">Placement Tracker</h1>
        <p className="page-subtitle">Track recipient movement from teaser sent through NDA and data room access.</p>
      </div>

      <div className="card" style={{ padding: "24px" }}>
        <div style={{ display: "grid", gap: "14px" }}>
          {placementRows.map((row) => (
            <div
              key={`${row.name}-${row.deal}`}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr) minmax(140px, 0.7fr) minmax(0, 1fr) 120px",
                gap: "14px",
                alignItems: "center",
                padding: "16px 0",
                borderBottom: "1px solid rgba(226,232,240,0.9)",
              }}
            >
              <div>
                <strong>{row.name}</strong>
                <p style={{ color: "var(--text-secondary)", marginTop: "4px" }}>{row.deal}</p>
              </div>
              <span>{row.activity}</span>
              <span className="badge">{row.status}</span>
              <span style={{ color: "var(--text-secondary)" }}>Owner: {row.owner}</span>
              <Link href="/dashboard/lead-arranger/recipient-selection/" className="btn btn-secondary">Review</Link>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
