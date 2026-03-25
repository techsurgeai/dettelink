"use client";

import Link from "next/link";
import { useState } from "react";
import AppLayout from "../../../../components/AppLayout";

const teasers = [
  {
    id: "falcon",
    title: "Falcon Energy Refinancing",
    status: "Published",
    audience: "Invite only",
    updated: "18 Mar 2026, 10:20 AM",
    sector: "Energy Infrastructure",
    geo: "UAE",
    type: "Debt",
    amount: "$125,000,000",
    tenor: "4.5 years",
    security: "Senior secured over receivables and reserve accounts",
    summary: "Published to 24 shortlisted institutions. 8 counterparties requested follow-up.",
    overview: "Sponsor-backed refinancing to extend maturity runway and improve blended cost of capital.",
    terms: "Target ticket sizes from USD 15m to USD 35m, floating-rate pricing and sculpted amortization.",
  },
  {
    id: "atlas",
    title: "Atlas Logistics Growth Facility",
    status: "Draft",
    audience: "Invite only",
    updated: "18 Mar 2026, 09:05 AM",
    sector: "Logistics",
    geo: "Saudi Arabia",
    type: "Debt",
    amount: "$90,000,000",
    tenor: "3.5 years",
    security: "Senior secured against contracted receivables",
    summary: "Legal review pending on confidentiality language before round-one circulation.",
    overview: "Expansion financing for a logistics operator building additional warehousing capacity across GCC routes.",
    terms: "Tickets from USD 10m to USD 25m with maintenance covenants and quarterly reporting package.",
  },
  {
    id: "northbridge",
    title: "Northbridge Consumer Receivables",
    status: "Archived",
    audience: "All members",
    updated: "17 Mar 2026, 04:45 PM",
    sector: "Consumer Finance",
    geo: "UK",
    type: "Debt + Equity",
    amount: "$60,000,000",
    tenor: "24 months",
    security: "Receivables pledge with cash sweep mechanics",
    summary: "Archived after mandate update and teaser replacement with revised structure.",
    overview: "Structured capital raise supporting receivables growth and balance-sheet optimization.",
    terms: "Layered senior and preferred capital structure with downside protections and reserve triggers.",
  },
];

export default function LeadArrangerTeaserLibraryPage() {
  const [expandedId, setExpandedId] = useState("falcon");

  return (
    <AppLayout>
      <div className="page-header">
        <Link href="/dashboard/lead-arranger/" className="teaser-back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Lead Arranger Dashboard
        </Link>
        <h1 className="page-title">Teaser Library</h1>
        <p className="page-subtitle">Review all created teasers across draft, published, and archived stages.</p>
      </div>

      <div className="teaser-preview-list">
        {teasers.map((teaser) => {
          const isExpanded = expandedId === teaser.id;

          return (
            <div key={teaser.id} className={`teaser-preview-item ${isExpanded ? "expanded" : ""}`}>
              <button
                type="button"
                className="teaser-preview-toggle"
                onClick={() => setExpandedId(isExpanded ? "" : teaser.id)}
              >
                <div>
                  <strong>{teaser.title}</strong>
                  <span>
                    {teaser.sector} - {teaser.geo} - {teaser.type}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="teaser-preview-toggle-meta">{teaser.audience}</span>
                  <span className={`teaser-preview-arrow ${isExpanded ? "expanded" : ""}`} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </button>

              {isExpanded ? (
                <div className="teaser-preview-content">
                  <div className="teaser-preview-meta">
                    <span>{teaser.status}</span>
                    <span>{teaser.updated}</span>
                    <span>{teaser.amount}</span>
                  </div>
                  <div className="teaser-preview-section">
                    <strong>Summary</strong>
                    <p>{teaser.summary}</p>
                  </div>
                  <div className="teaser-preview-section">
                    <strong>Overview</strong>
                    <p>{teaser.overview}</p>
                  </div>
                  <div className="teaser-preview-grid">
                    <div className="teaser-preview-feature">
                      <strong>Tenor</strong>
                      <p>{teaser.tenor}</p>
                    </div>
                    <div className="teaser-preview-feature">
                      <strong>Security</strong>
                      <p>{teaser.security}</p>
                    </div>
                  </div>
                  <div className="teaser-preview-section">
                    <strong>Indicative terms</strong>
                    <p>{teaser.terms}</p>
                  </div>
                  <div style={{ display: "flex", gap: "10px", marginTop: "18px", flexWrap: "wrap" }}>
                    <Link href="/teasers/new/" className="btn btn-secondary">Open</Link>
                    <Link href="/teasers/new/" className="btn btn-primary arranger-green-btn">Duplicate</Link>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
