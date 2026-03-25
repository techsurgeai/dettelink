"use client";

import Link from "next/link";
import { useState } from "react";
import AppLayout from "../../../../../../components/AppLayout";

const ndaChecklist = [
  "You confirm all teaser and deal materials remain confidential.",
  "Access is limited to authorized internal reviewers on your side.",
  "No borrower identity or materials may be shared externally without consent.",
  "The confidentiality obligation continues after deal review ends.",
];

const signerDetails = [
  { label: "Legal entity", value: "Falcon Credit Partners Ltd." },
  { label: "Authorized signatory", value: "Amina Rahman" },
  { label: "Title", value: "Investment Director" },
  { label: "Jurisdiction", value: "United Kingdom" },
];

export default function B2BMemberNdaPage() {
  const [agreed, setAgreed] = useState(false);
  const [signed, setSigned] = useState(false);

  if (signed) {
    return (
      <AppLayout>
        <div className="deal-detail-page b2b-teaser-view-page">
          <header className="deal-detail-header">
            <div>
              <Link href="/dashboard/b2b-member/teasers/received/submit-interest/" className="teaser-back-link">
                Back to interest submission
              </Link>
              <h1>NDA Signed</h1>
              <p className="page-subtitle">
                Confidential access has been approved for Falcon Energy Refinancing.
              </p>
            </div>
            <div className="deal-detail-stage-card b2b-teaser-stage-card">
              <span className="badge badge-green">Approved</span>
              <p>Ready for deal room</p>
            </div>
          </header>

          <section className="deal-detail-grid">
            <div className="deal-detail-main">
              <article className="card deal-detail-card">
                <h2>What unlocked now</h2>
                <div className="deal-detail-list">
                  <div className="deal-detail-list-item">
                    <span className="deal-detail-dot" />
                    <span>You can open the confidential data room for deal documents and updates.</span>
                  </div>
                  <div className="deal-detail-list-item">
                    <span className="deal-detail-dot" />
                    <span>The arranger can now share the information memorandum and process notes.</span>
                  </div>
                  <div className="deal-detail-list-item">
                    <span className="deal-detail-dot" />
                    <span>Use deal messages if you need clarification while reviewing materials.</span>
                  </div>
                </div>
              </article>
            </div>

            <aside className="deal-detail-side">
              <article className="card deal-detail-card">
                <h2>Next actions</h2>
                <div className="recipient-selection-actions b2b-teaser-actions">
                  <Link href="/dashboard/b2b-member/teasers/received/data-room/" className="btn btn-primary">
                    Open Data Room
                  </Link>
                  <Link href="/messages/" className="btn btn-secondary">
                    Message Arranger
                  </Link>
                </div>
              </article>
            </aside>
          </section>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="deal-detail-page b2b-teaser-view-page">
        <header className="deal-detail-header">
          <div>
            <Link href="/dashboard/b2b-member/teasers/received/submit-interest/" className="teaser-back-link">
              Back to interest submission
            </Link>
            <h1>NDA Review & Sign</h1>
            <p className="page-subtitle">
              Review the confidentiality terms before confidential borrower materials are released.
            </p>
          </div>
          <div className="deal-detail-stage-card b2b-teaser-stage-card">
            <span className="badge badge-gray">Stage 3</span>
            <p>Confidentiality review</p>
          </div>
        </header>

        <section className="deal-detail-grid">
          <div className="deal-detail-main">
            <article className="card deal-detail-card">
              <h2>Agreement Summary</h2>
              <div className="deal-detail-list">
                {ndaChecklist.map((item) => (
                  <div key={item} className="deal-detail-list-item">
                    <span className="deal-detail-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="card deal-detail-card">
              <h2>Signer Details</h2>
              <div className="teaser-inbox-meta b2b-teaser-view-meta">
                {signerDetails.map((item) => (
                  <div key={item.label}>
                    <span className="teaser-inbox-meta-label">{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="card deal-detail-card">
              <h2>Confirm Signature</h2>
              <label className="upload-checkbox-label">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="upload-checkbox"
                />
                <span className="upload-checkbox-custom"></span>
                I confirm I am authorized to sign and accept the NDA terms on behalf of my institution.
              </label>
            </article>
          </div>

          <aside className="deal-detail-side">
            <article className="card deal-detail-card">
              <h2>Available documents</h2>
              <div className="deal-detail-doc-list">
                <div className="deal-detail-doc-item">
                  <strong>NDA Agreement.pdf</strong>
                  <span>Ready</span>
                </div>
                <div className="deal-detail-doc-item">
                  <strong>Process Letter.pdf</strong>
                  <span>Ready</span>
                </div>
              </div>
            </article>

            <article className="card deal-detail-card">
              <h2>Actions</h2>
              <div className="recipient-selection-actions b2b-teaser-actions">
                <Link href="/messages/" className="btn btn-secondary">
                  Ask a Question
                </Link>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!agreed}
                  onClick={() => setSigned(true)}
                >
                  Sign NDA
                </button>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </AppLayout>
  );
}
