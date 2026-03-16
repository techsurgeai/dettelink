"use client";

import { useState } from "react";
import AppLayout from "../../components/AppLayout";

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "ai-bot", label: "AI Bot" },
    { id: "advisory", label: "Advisory" },
    { id: "documents", label: "Documents" },
  ];

  const todayNotifications = [
    {
      id: 1,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      title: "AI Financial Risk Assessment is ready to view",
      time: "about an hour ago",
      unread: true,
      type: "ai-bot",
    },
    {
      id: 2,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      title: "Advisory Session Scheduled with Sarah Blake",
      time: "about an hour ago",
      unread: true,
      type: "advisory",
    },
    {
      id: 3,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      title: "Your Tax Documents 2023.pdf downloaded by David Lee",
      time: "about an hour ago",
      unread: true,
      type: "documents",
    },
  ];

  const earlierNotifications = [
    {
      id: 4,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      title: "Your Tax Documents 2023.pdf downloaded by David Lee",
      time: "about an hour ago",
      unread: false,
      type: "documents",
    },
  ];

  const filterNotifications = (notifications: typeof todayNotifications) => {
    if (activeFilter === "all") return notifications;
    return notifications.filter((n) => n.type === activeFilter);
  };

  const filteredToday = filterNotifications(todayNotifications);
  const filteredEarlier = filterNotifications(earlierNotifications);

  return (
    <AppLayout>
      <div className="notifications-page">
        {/* Header */}
        <div className="notifications-header">
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Your scheduled consultations & financial discussions</p>
        </div>

        {/* Content Card */}
        <div className="notifications-card">
          {/* Filter Tabs */}
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

          {/* Notifications List */}
          <div className="notifications-list">
            {/* Today Section */}
            {filteredToday.length > 0 && (
              <>
                <h3 className="notifications-section-title">Today</h3>
                {filteredToday.map((notification) => (
                  <div key={notification.id} className="notification-item">
                    <div className="notification-avatar">
                      <img src={notification.avatar} alt="" />
                    </div>
                    <div className="notification-content">
                      <p className="notification-title">{notification.title}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    {notification.unread && <span className="notification-dot"></span>}
                  </div>
                ))}
              </>
            )}

            {/* Earlier Section */}
            {filteredEarlier.length > 0 && (
              <>
                <h3 className="notifications-section-title">Earlier</h3>
                {filteredEarlier.map((notification) => (
                  <div key={notification.id} className="notification-item">
                    <div className="notification-avatar">
                      <img src={notification.avatar} alt="" />
                    </div>
                    <div className="notification-content">
                      <p className="notification-title">{notification.title}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    {notification.unread && <span className="notification-dot"></span>}
                  </div>
                ))}
              </>
            )}

            {filteredToday.length === 0 && filteredEarlier.length === 0 && (
              <div className="notifications-empty">
                <p>No notifications found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
