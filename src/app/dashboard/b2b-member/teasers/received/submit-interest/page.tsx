"use client";

import Link from "next/link";
import { useState } from "react";
import AppLayout from "../../../../../../components/AppLayout";

export default function B2BMemberSubmitInterestPage() {
  const [investmentBand, setInvestmentBand] = useState("$10m - $25m");
  const [timeline, setTimeline] = useState("Within 2 weeks");
  const [notes, setNotes] = useState(
    "The opportunity fits our regional credit appetite. We would like to review the NDA and confidential information pack."
  );
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <AppLayout>
        <div className="deal-detail-page b2b-teaser-view-page">
          <header className="deal-detail-header">
            <div>
              <Link href="/dashboard/b2b-member/teasers/received/" className="teaser-back-link">
                Back to teaser
              </Link>
              <h1>Interest Submitted</h1>
              <p className="page-subtitle">
                Your expression of interest has been shared with the lead arranger.
              </p>
            </div>
          </header>

          <section className="deal-detail-grid">
            <div className="deal-detail-main">
              <article className="card deal-detail-card">
                <h2>What happens next</h2>
                <div className="deal-detail-list">
                  <div className="deal-detail-list-item">
                    <span className="deal-detail-dot" />
                    <span>The arranger reviews your submission and checks fit against the mandate.</span>
                  </div>
                  <div className="deal-detail-list-item">
                    <span className="deal-detail-dot" />
                    <span>Your next workflow step is NDA review and signature for confidential access.</span>
                  </div>
                  <div className="deal-detail-list-item">
                    <span className="deal-detail-dot" />
                    <span>You can continue tracking the deal from your B2B member workflow.</span>
                  </div>
                </div>
              </article>
            </div>

            <aside className="deal-detail-side">
              <article className="card deal-detail-card">
                <h2>Next actions</h2>
                <div className="recipient-selection-actions b2b-teaser-actions">
                  <Link href="/dashboard/b2b-member/teasers/" className="btn btn-secondary">
                    Back to inbox
                  </Link>
                  <Link href="/dashboard/b2b-member/teasers/received/nda/" className="btn btn-primary">
                    Review NDA
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
            <Link href="/dashboard/b2b-member/teasers/received/" className="teaser-back-link">
              Back to teaser
            </Link>
            <h1>Submit Interest</h1>
            <p className="page-subtitle">
              Confirm your appetite for Falcon Energy Refinancing before the arranger opens the NDA step.
            </p>
          </div>
          <div className="deal-detail-stage-card b2b-teaser-stage-card">
            <span className="badge badge-yellow">Stage 2</span>
            <p>Expression of interest</p>
          </div>
        </header>

        <section className="deal-detail-grid">
          <div className="deal-detail-main">
            <article className="card deal-detail-card">
              <h2>Deal Snapshot</h2>
              <div className="teaser-inbox-meta b2b-teaser-view-meta">
                <div>
                  <span className="teaser-inbox-meta-label">Deal</span>
                  <strong>Falcon Energy Refinancing</strong>
                </div>
                <div>
                  <span className="teaser-inbox-meta-label">Lead Arranger</span>
                  <strong>BlankDesigns Capital</strong>
                </div>
                <div>
                  <span className="teaser-inbox-meta-label">Type</span>
                  <strong>Senior secured debt</strong>
                </div>
                <div>
                  <span className="teaser-inbox-meta-label">Target Size</span>
                  <strong>$125,000,000</strong>
                </div>
              </div>
            </article>

            <article className="card deal-detail-card">
              <h2>Interest Details</h2>
              <div className="settings-form-grid">
                <div className="form-group">
                  <label className="form-label">Indicative Ticket Size</label>
                  <div className="select-wrapper">
                    <select
                      value={investmentBand}
                      onChange={(e) => setInvestmentBand(e.target.value)}
                      className="form-select"
                    >
                      <option value="$5m - $10m">$5m - $10m</option>
                      <option value="$10m - $25m">$10m - $25m</option>
                      <option value="$25m - $50m">$25m - $50m</option>
                      <option value="$50m+">$50m+</option>
                    </select>
                    <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Review Timeline</label>
                  <div className="select-wrapper">
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="form-select"
                    >
                      <option value="Within 48 hours">Within 48 hours</option>
                      <option value="Within 1 week">Within 1 week</option>
                      <option value="Within 2 weeks">Within 2 weeks</option>
                      <option value="Needs internal approval first">Needs internal approval first</option>
                    </select>
                    <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: "20px" }}>
                <label className="form-label">Message to Arranger</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-input"
                  rows={6}
                  placeholder="Add any context on mandate fit, appetite, or review conditions."
                  style={{ resize: "vertical", minHeight: "150px", paddingTop: "14px" }}
                />
              </div>
            </article>
          </div>

          <aside className="deal-detail-side">
            <article className="card deal-detail-card">
              <h2>Before you submit</h2>
              <div className="deal-detail-list">
                <div className="deal-detail-list-item">
                  <span className="deal-detail-dot" />
                  <span>The arranger will see your ticket size and timeline preferences.</span>
                </div>
                <div className="deal-detail-list-item">
                  <span className="deal-detail-dot" />
                  <span>If accepted, the next step will be NDA review and signature.</span>
                </div>
                <div className="deal-detail-list-item">
                  <span className="deal-detail-dot" />
                  <span>You can still message the arranger separately if you need clarification.</span>
                </div>
              </div>
            </article>

            <article className="card deal-detail-card">
              <h2>Actions</h2>
              <div className="recipient-selection-actions b2b-teaser-actions">
                <Link href="/messages/" className="btn btn-secondary">
                  Message Arranger
                </Link>
                <button type="button" className="btn btn-primary" onClick={() => setSubmitted(true)}>
                  Submit Interest
                </button>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </AppLayout>
  );
}
