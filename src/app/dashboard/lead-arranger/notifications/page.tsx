"use client";

import { useState } from "react";
import AppLayout from "../../../../components/AppLayout";

export default function LeadArrangerNotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "teasers", label: "Teasers" },
    { id: "ndas", label: "NDAs" },
    { id: "recipients", label: "Recipients" },
    { id: "compliance", label: "Compliance" },
  ];

  const notifications = [
    { id: 1, title: "Falcon Energy teaser viewed by Summit Credit Partners", time: "12 minutes ago", type: "teasers", unread: true },
    { id: 2, title: "NDA signed for Atlas Logistics Growth Facility", time: "38 minutes ago", type: "ndas", unread: true },
    { id: 3, title: "Compliance flagged Northbridge teaser wording", time: "1 hour ago", type: "compliance", unread: true },
    { id: 4, title: "2 new recipients shortlisted for Falcon Energy", time: "Earlier today", type: "recipients", unread: false },
  ];

  const filtered = activeFilter === "all" ? notifications : notifications.filter((item) => item.type === activeFilter);

  return (
    <AppLayout>
      <div className="notifications-page">
        <div className="notifications-header">
          <h1 className="page-title">Lead Arranger Notifications</h1>
          <p className="page-subtitle">Track teaser views, NDA activity, recipient movement, and compliance alerts.</p>
        </div>

        <div className="notifications-card">
          <div className="notifications-filters">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`notifications-filter ${activeFilter === filter.id ? "active" : ""}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="notifications-list">
            {filtered.map((notification) => (
              <div key={notification.id} className="notification-item">
                <div className="notification-content">
                  <p className="notification-title">{notification.title}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                {notification.unread ? <span className="notification-dot"></span> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
