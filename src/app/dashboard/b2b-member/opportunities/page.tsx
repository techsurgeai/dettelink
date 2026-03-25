"use client";

import Link from "next/link";
import AppLayout from "../../../../components/AppLayout";

function OpportunityLogo() {
  return (
    <div className="b2b-opportunity-logo" aria-hidden="true">
      <svg viewBox="0 0 152 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.072 3 3 14.542h8.502L3 31h17.516L16.2 18.37h8.232L15.072 3Z"
          fill="#0057FF"
        />
        <path
          d="M30.225 25.856V22.56L42.503 8.865H30.67V4.504H48.8V8.114L36.717 21.527h12.305v4.329H30.225ZM52.176 25.856V4.504h5.247v21.352h-5.247ZM61.816 25.856V4.504h7.7c2.598 0 4.626.624 6.085 1.873 1.478 1.229 2.217 3.009 2.217 5.34 0 1.639-.364 3.032-1.093 4.178-.71 1.126-1.73 1.987-3.06 2.581l5.234 7.38h-6.071l-4.572-6.515h-1.193v6.515h-5.247ZM67.063 15.295h2.01c1.186 0 2.104-.295 2.755-.886.67-.591 1.005-1.423 1.005-2.497 0-1.094-.335-1.926-1.005-2.497-.651-.591-1.569-.886-2.755-.886h-2.01v6.766ZM81.238 25.856V4.504h5.247V21.34h10.437v4.516H81.238ZM99.558 25.856V4.504h5.247v21.352h-5.247ZM109.198 25.856V4.504h6.39l8.984 14.932V4.504h5.03v21.352h-5.873l-9.501-15.683v15.683h-5.03ZM133.986 25.856V4.504h15.494v4.329h-10.247v3.985h9.613v4.173h-9.613v4.548H150v4.329h-16.014Z"
          fill="#111827"
        />
      </svg>
    </div>
  );
}

const opportunities = [
  {
    title: "Falcon Energy Refinancing",
    company: "Falcon Energy",
    stage: "Interested",
    nextStep: "Review NDA",
    href: "/dashboard/b2b-member/teasers/received/nda/",
    note: "Expression of interest submitted and awaiting confidentiality completion.",
  },
  {
    title: "Northbridge Consumer Receivables",
    company: "Northbridge",
    stage: "NDA Pending",
    nextStep: "Sign NDA",
    href: "/dashboard/b2b-member/teasers/received/nda/",
    note: "Confidentiality review is required before data room access can be granted.",
  },
  {
    title: "BlueHarbor Port Expansion",
    company: "BlueHarbor",
    stage: "Data Room Open",
    nextStep: "Open data room",
    href: "/dashboard/b2b-member/teasers/received/data-room/",
    note: "Confidential materials are live and arranger updates are available.",
  },
];

export default function B2BMemberOpportunitiesPage() {
  return (
    <AppLayout>
      <div className="dashboard-page teaser-inbox-page">
        <div className="dashboard-greeting">
          <h1>My Opportunities</h1>
          <p className="teaser-inbox-subtitle">
            Track every live mandate by stage and jump back into the next action quickly.
          </p>
        </div>

        <div className="teaser-inbox-grid" style={{ gridTemplateColumns: "1fr" }}>
          {opportunities.map((item) => (
            <article key={item.title} className="teaser-inbox-card">
              <div className="teaser-inbox-card-top">
                <div className="b2b-opportunity-heading">
                  <OpportunityLogo />
                  <div>
                    <span className="b2b-opportunity-company">{item.company}</span>
                    <h3>{item.title}</h3>
                    <p>{item.note}</p>
                  </div>
                </div>
                <span className={`badge ${item.stage === "Data Room Open" ? "badge-green" : item.stage === "NDA Pending" ? "badge-gray" : "badge-yellow"}`}>
                  {item.stage}
                </span>
              </div>

              <div className="teaser-inbox-footer">
                <div>
                  <span className="teaser-inbox-meta-label">Next step</span>
                  <strong>{item.nextStep}</strong>
                </div>
                <div className="teaser-inbox-footer-actions">
                  <Link href={item.href} className="btn btn-primary arranger-green-btn">
                    Open
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
