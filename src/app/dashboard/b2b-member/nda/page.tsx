"use client";

import Link from "next/link";
import AppLayout from "../../../../components/AppLayout";

const ndaItems = [
  {
    title: "Falcon Energy Refinancing",
    status: "Pending signature",
    detail: "NDA is ready for authorized sign-off before the arranger releases confidential materials.",
    href: "/dashboard/b2b-member/teasers/received/nda/",
  },
  {
    title: "Northbridge Consumer Receivables",
    status: "Awaiting internal approval",
    detail: "Your institution has reviewed the terms and can proceed once approver confirmation is complete.",
    href: "/dashboard/b2b-member/teasers/received/nda/",
  },
];

export default function B2BMemberNdaIndexPage() {
  return (
    <AppLayout>
      <div className="dashboard-page teaser-inbox-page">
        <div className="dashboard-greeting">
          <h1>NDA / Pending Actions</h1>
          <p className="teaser-inbox-subtitle">
            Complete confidentiality steps that are blocking access to deeper deal materials.
          </p>
        </div>

        <div className="teaser-inbox-grid" style={{ gridTemplateColumns: "1fr" }}>
          {ndaItems.map((item) => (
            <article key={item.title} className="teaser-inbox-card">
              <div className="teaser-inbox-card-top">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
                <span className="badge badge-gray">{item.status}</span>
              </div>

              <div className="teaser-inbox-footer">
                <div>
                  <span className="teaser-inbox-meta-label">Action</span>
                  <strong>Open NDA workflow</strong>
                </div>
                <div className="teaser-inbox-footer-actions">
                  <Link href={item.href} className="btn btn-primary arranger-green-btn">
                    Review NDA
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
