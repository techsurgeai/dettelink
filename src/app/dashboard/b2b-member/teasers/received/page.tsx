"use client";

import Link from "next/link";
import AppLayout from "../../../../../components/AppLayout";

const teaserOverview = {
  title: "Falcon Energy Refinancing",
  arranger: "BlankDesigns Capital",
  type: "Senior secured debt",
  geography: "UAE",
  amount: "$125,000,000",
  timeline: "Received 25 minutes ago",
  status: "New",
  summary:
    "Falcon Energy is seeking refinancing support for an existing regional platform with resilient contracted cash flows and a near-term maturity wall. The teaser is shared on a confidential no-names basis for first-stage lender review.",
  highlights: [
    "Established energy platform with diversified offtake exposure and recurring contracted revenue.",
    "Refinancing designed to simplify capital structure and extend weighted average debt maturity.",
    "Sponsor remains supportive and is aligned on a disciplined lender engagement process.",
  ],
  terms: [
    { label: "Indicative tenor", value: "4.5 to 5.0 years" },
    { label: "Security package", value: "Senior secured with share pledge and reserve account protections" },
    { label: "Use of proceeds", value: "Refinance existing facilities and fund transaction costs" },
    { label: "Process note", value: "NDA required before access to management materials and data room" },
  ],
};

const arrangerCard = {
  firm: "BlankDesigns Capital",
  lead: "Andrew Sabastian",
  title: "Lead Arranger",
  response: "Usually replies within 2 hours",
  note: "For questions on process, mandate scope, and NDA timing, message the arranger directly from this teaser.",
};

export default function B2BMemberTeaserReceivedPage() {
  return (
    <AppLayout>
      <div className="deal-detail-page b2b-teaser-view-page">
        <header className="deal-detail-header">
          <div>
            <Link href="/dashboard/b2b-member/teasers/" className="teaser-back-link">
              Back to Teaser Inbox
            </Link>
            <h1>{teaserOverview.title}</h1>
            <p className="page-subtitle">
              Review the teaser summary, high-level terms, and confidentiality path before deciding whether to engage.
            </p>
          </div>
          <div className="deal-detail-stage-card b2b-teaser-stage-card">
            <span className="badge badge-green">{teaserOverview.status}</span>
            <p>{teaserOverview.timeline}</p>
          </div>
        </header>

        <section className="deal-detail-grid">
          <div className="deal-detail-main">
            <article className="card deal-detail-card">
              <div className="teaser-inbox-meta b2b-teaser-view-meta">
                <div>
                  <span className="teaser-inbox-meta-label">Lead Arranger</span>
                  <strong>{teaserOverview.arranger}</strong>
                </div>
                <div>
                  <span className="teaser-inbox-meta-label">Type</span>
                  <strong>{teaserOverview.type}</strong>
                </div>
                <div>
                  <span className="teaser-inbox-meta-label">Geography</span>
                  <strong>{teaserOverview.geography}</strong>
                </div>
                <div>
                  <span className="teaser-inbox-meta-label">Target Size</span>
                  <strong>{teaserOverview.amount}</strong>
                </div>
              </div>
            </article>

            <article className="card deal-detail-card">
              <h2>Teaser Summary</h2>
              <p className="b2b-teaser-summary">{teaserOverview.summary}</p>
            </article>

            <article className="card deal-detail-card">
              <h2>Why this opportunity may fit</h2>
              <div className="deal-detail-list">
                {teaserOverview.highlights.map((highlight) => (
                  <div key={highlight} className="deal-detail-list-item">
                    <span className="deal-detail-dot" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="card deal-detail-card">
              <h2>Indicative Terms</h2>
              <div className="teaser-inbox-meta b2b-teaser-view-meta">
                {teaserOverview.terms.map((term) => (
                  <div key={term.label}>
                    <span className="teaser-inbox-meta-label">{term.label}</span>
                    <strong>{term.value}</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="deal-detail-side">
            <article className="card deal-detail-card">
              <h2>Next Step</h2>
              <p className="b2b-teaser-summary">
                Express interest if the mandate fits your criteria, or message the arranger first if you need clarification.
              </p>
              <div className="recipient-selection-actions b2b-teaser-actions">
                <Link href="/dashboard/b2b-member/teasers/received/submit-interest/" className="btn btn-primary">
                  Express Interest
                </Link>
                <Link href="/messages/" className="btn btn-secondary">
                  Message Arranger
                </Link>
              </div>
            </article>

            <article className="card deal-detail-card">
              <h2>Confidentiality Path</h2>
              <div className="deal-detail-list">
                <div className="deal-detail-list-item">
                  <span className="deal-detail-dot" />
                  <span>Stage 1: Review no-names teaser shared by the arranger.</span>
                </div>
                <div className="deal-detail-list-item">
                  <span className="deal-detail-dot" />
                  <span>Stage 2: Submit interest and receive NDA for confidential materials.</span>
                </div>
                <div className="deal-detail-list-item">
                  <span className="deal-detail-dot" />
                  <span>Stage 3: Access the data room after NDA and arranger approval.</span>
                </div>
              </div>
            </article>

            <article className="card deal-detail-card">
              <h2>Arranger Contact</h2>
              <div className="b2b-arranger-contact">
                <strong>{arrangerCard.lead}</strong>
                <span>{arrangerCard.title}</span>
                <span>{arrangerCard.firm}</span>
                <span>{arrangerCard.response}</span>
              </div>
              <p className="b2b-teaser-summary">{arrangerCard.note}</p>
            </article>
          </aside>
        </section>
      </div>
    </AppLayout>
  );
}
