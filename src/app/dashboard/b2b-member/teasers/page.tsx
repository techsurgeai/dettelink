"use client";

import Link from "next/link";
import AppLayout from "../../../../components/AppLayout";

const metaIcons: Record<string, JSX.Element> = {
  type: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M14 3v5h5" />
    </svg>
  ),
  geography: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  ),
  amount: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  arranger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M16 21v-1.5A3.5 3.5 0 0 0 12.5 16h-5A3.5 3.5 0 0 0 4 19.5V21" />
      <circle cx="10" cy="9" r="3" />
      <path d="M20 21v-1a3 3 0 0 0-2.2-2.9" />
      <path d="M15.5 6.2a3 3 0 0 1 0 5.6" />
    </svg>
  ),
};

const teaserCards = [
  {
    title: "Falcon Energy Refinancing",
    type: "Senior secured debt",
    geography: "UAE",
    amount: "$125,000,000",
    arranger: "BlankDesigns Capital",
    status: "New",
    statusClass: "badge-green",
    summary:
      "Refinancing mandate for a regional energy platform seeking senior debt partners for a structured recapitalization.",
    nextAction: "Review teaser",
    timeline: "Received 25 minutes ago",
  },
  {
    title: "Atlas Logistics Growth Facility",
    type: "Growth facility",
    geography: "Saudi Arabia",
    amount: "$80,000,000",
    arranger: "North Gate Advisory",
    status: "Management call open",
    statusClass: "badge-yellow",
    summary:
      "Cross-border logistics operator inviting lender interest for expansion capex and warehouse automation rollout.",
    nextAction: "Book management call",
    timeline: "Updated today, 9:10 AM",
  },
  {
    title: "Northbridge Consumer Receivables",
    type: "Hybrid capital",
    geography: "United Kingdom",
    amount: "$46,000,000",
    arranger: "Meridian Structured Finance",
    status: "NDA required",
    statusClass: "badge-gray",
    summary:
      "Receivables-backed funding round with phased access to borrower materials after confidentiality completion.",
    nextAction: "Sign NDA",
    timeline: "Received yesterday",
  },
  {
    title: "BlueHarbor Port Expansion",
    type: "Project finance",
    geography: "Oman",
    amount: "$210,000,000",
    arranger: "Harborline Partners",
    status: "Shortlisted",
    statusClass: "badge-green",
    summary:
      "Port infrastructure expansion with phased drawdown and sponsor-backed construction protections.",
    nextAction: "Submit interest",
    timeline: "Shortlist confirmed yesterday",
  },
];

const inboxStats = [
  { label: "New Teasers", value: "08", note: "Need first review" },
  { label: "Awaiting Response", value: "05", note: "Lead arranger follow-up" },
  { label: "NDA Required", value: "03", note: "Before document access" },
];

export default function B2BMemberTeasersPage() {
  return (
    <AppLayout>
      <div className="dashboard-page teaser-inbox-page">
        <div className="dashboard-greeting">
          <h1>Teaser Inbox</h1>
          <p className="teaser-inbox-subtitle">Review the latest opportunities shared by lead arrangers and decide your next step.</p>
        </div>

        <div className="dashboard-stats-row teaser-inbox-stats-row">
          {inboxStats.map((item) => (
            <div key={item.label} className="stat-box">
              <span className="stat-box-label">{item.label}</span>
              <div className="stat-box-value-row">
                <span className="stat-box-value">{item.value}</span>
                <span className="stat-box-sub">{item.note}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="teaser-inbox-grid">
          {teaserCards.map((teaser) => (
            <article key={teaser.title} className="teaser-inbox-card">
              <div className="teaser-inbox-card-top">
                <div>
                  <h3>{teaser.title}</h3>
                  <p>{teaser.summary}</p>
                </div>
                <span className={`badge ${teaser.statusClass}`}>{teaser.status}</span>
              </div>

              <div className="teaser-inbox-meta">
                <div className="teaser-inbox-meta-item">
                  <span className="teaser-inbox-meta-label">
                    <span className="teaser-inbox-meta-icon">{metaIcons.type}</span>
                    Type
                  </span>
                  <strong>{teaser.type}</strong>
                </div>
                <div className="teaser-inbox-meta-item">
                  <span className="teaser-inbox-meta-label">
                    <span className="teaser-inbox-meta-icon">{metaIcons.geography}</span>
                    Geography
                  </span>
                  <strong>{teaser.geography}</strong>
                </div>
                <div className="teaser-inbox-meta-item">
                  <span className="teaser-inbox-meta-label">
                    <span className="teaser-inbox-meta-icon">{metaIcons.amount}</span>
                    Target Size
                  </span>
                  <strong>{teaser.amount}</strong>
                </div>
                <div className="teaser-inbox-meta-item">
                  <span className="teaser-inbox-meta-label">
                    <span className="teaser-inbox-meta-icon">{metaIcons.arranger}</span>
                    Lead Arranger
                  </span>
                  <strong>{teaser.arranger}</strong>
                </div>
              </div>

              <div className="teaser-inbox-footer">
                <div>
                  <span className="teaser-inbox-meta-label">Next Action</span>
                  <strong>{teaser.nextAction}</strong>
                </div>
                <div className="teaser-inbox-footer-actions">
                  <span className="teaser-inbox-timeline">{teaser.timeline}</span>
                  <Link href="/dashboard/b2b-member/teasers/received/" className="btn btn-primary arranger-green-btn">
                    Open teaser
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
