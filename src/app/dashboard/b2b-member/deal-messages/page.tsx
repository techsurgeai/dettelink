"use client";

import Link from "next/link";
import AppLayout from "../../../../components/AppLayout";

const threads = [
  {
    title: "Falcon Energy Refinancing",
    counterpart: "BlankDesigns Capital",
    preview: "Please review the NDA and confirm if your signing authority details are correct.",
    time: "12 minutes ago",
  },
  {
    title: "BlueHarbor Port Expansion",
    counterpart: "Harborline Partners",
    preview: "A revised process letter is now in the data room. Let us know if you need a Q&A slot.",
    time: "Today, 9:10 AM",
  },
];

export default function B2BMemberDealMessagesPage() {
  return (
    <AppLayout>
      <div className="dashboard-page teaser-inbox-page">
        <div className="dashboard-greeting">
          <h1>Deal Messages</h1>
          <p className="teaser-inbox-subtitle">
            Keep arranger conversations tied to the live mandates you are currently reviewing.
          </p>
        </div>

        <div className="teaser-inbox-grid" style={{ gridTemplateColumns: "1fr" }}>
          {threads.map((thread) => (
            <article key={thread.title} className="teaser-inbox-card">
              <div className="teaser-inbox-card-top">
                <div>
                  <h3>{thread.title}</h3>
                  <p>{thread.preview}</p>
                </div>
                <span className="badge badge-yellow">{thread.time}</span>
              </div>

              <div className="teaser-inbox-footer">
                <div>
                  <span className="teaser-inbox-meta-label">Counterparty</span>
                  <strong>{thread.counterpart}</strong>
                </div>
                <div className="teaser-inbox-footer-actions">
                  <Link href="/messages/" className="btn btn-primary arranger-green-btn">
                    Open thread
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
