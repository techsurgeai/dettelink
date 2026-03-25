"use client";

import Link from "next/link";
import AppLayout from "../../../../../../components/AppLayout";

const roomDocuments = [
  { name: "Information Memorandum.pdf", detail: "Confidential overview and investment case", status: "Available" },
  { name: "Financial Highlights.xlsx", detail: "Historic and forecast summary pack", status: "Available" },
  { name: "Management Presentation.pdf", detail: "Prepared for shortlisted lenders", status: "Available" },
  { name: "Process Letter.pdf", detail: "Indicative milestones and response dates", status: "Updated today" },
];

const roomUpdates = [
  "Management call windows published for next Tuesday and Wednesday.",
  "A revised leverage bridge was uploaded by the arranger this morning.",
  "Q&A responses will be shared in the room on a rolling basis.",
];

export default function B2BMemberDataRoomPage() {
  return (
    <AppLayout>
      <div className="deal-detail-page b2b-teaser-view-page">
        <header className="deal-detail-header">
          <div>
            <Link href="/dashboard/b2b-member/teasers/received/nda/" className="teaser-back-link">
              Back to NDA
            </Link>
            <h1>Deal Access / Data Room</h1>
            <p className="page-subtitle">
              Confidential materials for Falcon Energy Refinancing are now available for your review.
            </p>
          </div>
          <div className="deal-detail-stage-card b2b-teaser-stage-card">
            <span className="badge badge-green">Live</span>
            <p>Confidential access enabled</p>
          </div>
        </header>

        <section className="deal-detail-grid">
          <div className="deal-detail-main">
            <article className="card deal-detail-card">
              <h2>Room Overview</h2>
              <div className="teaser-inbox-meta b2b-teaser-view-meta">
                <div>
                  <span className="teaser-inbox-meta-label">Deal</span>
                  <strong>Falcon Energy Refinancing</strong>
                </div>
                <div>
                  <span className="teaser-inbox-meta-label">Access level</span>
                  <strong>Shortlisted lender</strong>
                </div>
                <div>
                  <span className="teaser-inbox-meta-label">Room status</span>
                  <strong>Open</strong>
                </div>
                <div>
                  <span className="teaser-inbox-meta-label">Next milestone</span>
                  <strong>Management Q&amp;A</strong>
                </div>
              </div>
            </article>

            <article className="card deal-detail-card">
              <h2>Confidential Documents</h2>
              <div className="deal-detail-doc-list">
                {roomDocuments.map((doc) => (
                  <div key={doc.name} className="deal-detail-doc-item">
                    <div>
                      <strong>{doc.name}</strong>
                      <span>{doc.detail}</span>
                    </div>
                    <span>{doc.status}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="card deal-detail-card">
              <h2>Latest Room Updates</h2>
              <div className="deal-detail-list">
                {roomUpdates.map((item) => (
                  <div key={item} className="deal-detail-list-item">
                    <span className="deal-detail-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="deal-detail-side">
            <article className="card deal-detail-card">
              <h2>Next step</h2>
              <p className="b2b-teaser-summary">
                Review the confidential pack, prepare diligence questions, and coordinate with the arranger for the next process step.
              </p>
              <div className="recipient-selection-actions b2b-teaser-actions">
                <Link href="/messages/" className="btn btn-primary">
                  Open Deal Messages
                </Link>
                <Link href="/dashboard/b2b-member/teasers/" className="btn btn-secondary">
                  Back to Inbox
                </Link>
              </div>
            </article>

            <article className="card deal-detail-card">
              <h2>Room permissions</h2>
              <div className="deal-detail-list">
                <div className="deal-detail-list-item">
                  <span className="deal-detail-dot" />
                  <span>View and download current room documents.</span>
                </div>
                <div className="deal-detail-list-item">
                  <span className="deal-detail-dot" />
                  <span>Send diligence questions through the arranger message flow.</span>
                </div>
                <div className="deal-detail-list-item">
                  <span className="deal-detail-dot" />
                  <span>Await additional uploads and management call coordination.</span>
                </div>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </AppLayout>
  );
}
