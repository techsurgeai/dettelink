import Link from "next/link";
import AppLayout from "../../../../components/AppLayout";

const mandates = {
  atlas: {
    title: "Atlas Logistics Growth Facility",
    sector: "Logistics Infrastructure",
    geography: "UAE, KSA",
    stage: "Recipient outreach",
    size: "$65m target raise",
    structure: "Senior secured growth facility",
    teaserStatus: "Published to shortlisted counterparties",
    summary:
      "Atlas Logistics is seeking a growth facility to expand fleet capacity, automate fulfillment lanes, and refinance short-dated working capital lines into a more scalable structure.",
    highlights: [
      "24 shortlisted institutions identified for round-one teaser sharing",
      "8 counterparties moved into active diligence and management-call coordination",
      "Security package includes receivables support and logistics asset backing",
    ],
    documents: [
      "Teaser v3 approved",
      "Financial model summary",
      "Management presentation deck",
      "NDA template",
    ],
    activity: [
      "BlueHarbor Capital requested a management call slot",
      "Summit Credit Partners signed the NDA",
      "Legal cleared the teaser wording for external circulation",
    ],
  },
  northbridge: {
    title: "Northbridge Consumer Receivables",
    sector: "Consumer Finance",
    geography: "UK",
    stage: "Teaser review",
    size: "$42m target raise",
    structure: "Receivables-backed warehouse line",
    teaserStatus: "Ready for final distribution",
    summary:
      "Northbridge is arranging a structured receivables-backed facility to support origination growth and release pressure on current warehouse capacity.",
    highlights: [
      "11 institutions expressed preliminary interest",
      "Legal requested one final confidentiality wording update",
      "Shortlist includes bank and private credit counterparties",
    ],
    documents: [
      "Draft teaser",
      "Receivables pool snapshot",
      "Borrowing base outline",
      "Counsel comments log",
    ],
    activity: [
      "Compliance marked teaser for wording revision",
      "Recipient shortlist expanded with two specialist lenders",
      "Finance team uploaded updated borrowing-base metrics",
    ],
  },
} as const;

export default function LeadArrangerDealDetailPage({
  searchParams,
}: {
  searchParams?: { id?: string };
}) {
  const dealId = searchParams?.id;
  const mandate =
    (dealId && (mandates as Record<string, (typeof mandates)[keyof typeof mandates]>)[dealId]) ||
    mandates.atlas;

  return (
    <AppLayout>
      <div className="deal-detail-page">
        <header className="deal-detail-header">
          <div>
            <Link href="/deals/" className="teaser-back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back to Deal Pipeline
            </Link>
            <h1>{mandate.title}</h1>
            <p>
              {mandate.sector} · {mandate.geography}
            </p>
          </div>

          <div className="deal-detail-stage-card">
            <span className="recipient-section-eyebrow">Current stage</span>
            <strong>{mandate.stage}</strong>
            <p>{mandate.teaserStatus}</p>
          </div>
        </header>

        <section className="deal-detail-grid">
          <div className="deal-detail-main">
            <article className="card deal-detail-card">
              <span className="recipient-section-eyebrow">Deal Summary</span>
              <h2>Mandate overview</h2>
              <p>{mandate.summary}</p>

              <div className="deal-detail-stat-grid">
                <div>
                  <span>Raise size</span>
                  <strong>{mandate.size}</strong>
                </div>
                <div>
                  <span>Structure</span>
                  <strong>{mandate.structure}</strong>
                </div>
              </div>
            </article>

            <article className="card deal-detail-card">
              <span className="recipient-section-eyebrow">Key Points</span>
              <h2>Execution highlights</h2>
              <div className="deal-detail-list">
                {mandate.highlights.map((highlight) => (
                  <div key={highlight} className="deal-detail-list-item">
                    <span className="deal-detail-dot" />
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="card deal-detail-card">
              <span className="recipient-section-eyebrow">Recent Activity</span>
              <h2>Latest mandate updates</h2>
              <div className="deal-detail-list">
                {mandate.activity.map((item) => (
                  <div key={item} className="deal-detail-list-item">
                    <span className="deal-detail-dot" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="deal-detail-side">
            <article className="card deal-detail-card">
              <span className="recipient-section-eyebrow">Documents</span>
              <h2>Deal room pack</h2>
              <div className="deal-detail-doc-list">
                {mandate.documents.map((doc) => (
                  <div key={doc} className="deal-detail-doc-item">
                    <strong>{doc}</strong>
                    <span>Ready</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="card deal-detail-card">
              <span className="recipient-section-eyebrow">Next Step</span>
              <h2>Continue the flow</h2>
              <div className="recipient-selection-actions">
                <Link href="/dashboard/lead-arranger/recipient-selection/" className="btn btn-primary">
                  Open Recipient Selection
                </Link>
                <Link href="/dashboard/lead-arranger/messages/" className="btn btn-secondary">
                  Message counterparties
                </Link>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </AppLayout>
  );
}
