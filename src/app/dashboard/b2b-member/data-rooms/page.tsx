"use client";

import Link from "next/link";
import AppLayout from "../../../../components/AppLayout";

const rooms = [
  {
    title: "Falcon Energy Refinancing",
    status: "Open",
    detail: "Information memorandum, management deck, and process letter are available.",
    href: "/dashboard/b2b-member/teasers/received/data-room/",
  },
  {
    title: "BlueHarbor Port Expansion",
    status: "Open",
    detail: "Construction materials and revised diligence notes were uploaded this week.",
    href: "/dashboard/b2b-member/teasers/received/data-room/",
  },
];

export default function B2BMemberDataRoomsPage() {
  return (
    <AppLayout>
      <div className="dashboard-page teaser-inbox-page">
        <div className="dashboard-greeting">
          <h1>Data Rooms</h1>
          <p className="teaser-inbox-subtitle">
            Review the confidential deal packs that are already unlocked for your institution.
          </p>
        </div>

        <div className="teaser-inbox-grid" style={{ gridTemplateColumns: "1fr" }}>
          {rooms.map((room) => (
            <article key={room.title} className="teaser-inbox-card">
              <div className="teaser-inbox-card-top">
                <div>
                  <h3>{room.title}</h3>
                  <p>{room.detail}</p>
                </div>
                <span className="badge badge-green">{room.status}</span>
              </div>

              <div className="teaser-inbox-footer">
                <div>
                  <span className="teaser-inbox-meta-label">Next step</span>
                  <strong>Continue diligence</strong>
                </div>
                <div className="teaser-inbox-footer-actions">
                  <Link href={room.href} className="btn btn-primary arranger-green-btn">
                    Open room
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
