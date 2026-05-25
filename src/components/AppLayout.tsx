"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDashboardPathForRole, getLoginPathForRole, getRoleLabel, getStoredAuth, isB2BMemberRole } from "../lib/auth";

type NavItem = {
  href: string;
  label: string;
  icon: string;
  disabled?: boolean;
};

const memberNavItems: NavItem [] =[
  { href: "/dashboard/", label: "Dashboard", icon: "dashboard" },
  { href: "/bank-integration/", label: "Bank Integration", icon: "financing", disabled: true },
  { href: "/funding-requirements/", label: "Funding Requirements", icon: "financing" },
  { href: "/profile/", label: "My Profile", icon: "profile" },
  { href: "/ai-analysis/", label: "AI Analysis & Reports", icon: "ai" },
  { href: "/advisory/", label: "Advisory Sessions", icon: "advisory" },
  { href: "/transactions/", label: "Transactions", icon: "transactions" },
  { href: "/documents/", label: "Documents", icon: "documents" },
  { href: "/messages/", label: "Messages", icon: "messages" },
  { href: "/notifications/", label: "Notifications", icon: "notifications" },
  { href: "/settings/", label: "Settings", icon: "settings" },
];

const leadArrangerNavItems: NavItem [] = [
  { href: "/dashboard/lead-arranger/", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/lead-arranger/profile/", label: "Profile", icon: "profile" },
  { href: "/deals/", label: "Deal Pipeline", icon: "briefcase" },
  { href: "/dashboard/lead-arranger/teasers/", label: "Teaser Library", icon: "document" },
  { href: "/teasers/new/", label: "Create Teaser", icon: "document" },
  { href: "/dashboard/lead-arranger/placements/", label: "Placement Tracker", icon: "transactions" },
  { href: "/dashboard/lead-arranger/recipient-selection/", label: "Recipients", icon: "users" },
  { href: "/dashboard/lead-arranger/deal-detail/", label: "Deal Detail", icon: "shield" },
  { href: "/dashboard/lead-arranger/compliance/", label: "Compliance", icon: "shield" },
  { href: "/dashboard/lead-arranger/documents/", label: "Document Room", icon: "documents" },
  { href: "/dashboard/lead-arranger/messages/", label: "Messages", icon: "messages" },
  { href: "/dashboard/lead-arranger/notifications/", label: "Notifications", icon: "notifications" },
  { href: "/dashboard/lead-arranger/settings/", label: "Settings", icon: "settings" },
];

const b2bMemberNavItems: NavItem [] = [
  { href: "/dashboard/b2b-member/", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/b2b-member/opportunities/", label: "My Opportunities", icon: "briefcase" },
  { href: "/dashboard/b2b-member/teasers/", label: "Teaser Inbox", icon: "document" },
  { href: "/dashboard/b2b-member/nda/", label: "NDA / Pending Actions", icon: "shield" },
  { href: "/dashboard/b2b-member/data-rooms/", label: "Data Rooms", icon: "documents" },
  { href: "/dashboard/b2b-member/deal-messages/", label: "Deal Messages", icon: "messages" },
  { href: "/profile/", label: "Profile", icon: "profile" },
  { href: "/settings/", label: "Settings", icon: "settings" },
];

const icons: Record<string, JSX.Element> = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M3 12.5h18" />
      <path d="M10 12.5v2h4v-2" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-1.5A3.5 3.5 0 0 0 12.5 16H7.5A3.5 3.5 0 0 0 4 19.5V21" />
      <circle cx="10" cy="9" r="3" />
      <path d="M20 21v-1a3 3 0 0 0-2.2-2.9" />
      <path d="M15.5 6.2a3 3 0 0 1 0 5.6" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  advisory: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  financing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  transactions: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="17,1 21,5 17,9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7,23 3,19 7,15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  documents: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
    </svg>
  ),
  messages: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  notifications: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l7 3v5c0 4.5-2.9 8.6-7 10-4.1-1.4-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12.5l1.8 1.8 3.7-4.1" />
    </svg>
  ),
  help: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16,17 21,12 16,7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const headerNotifications = [
    { id: 1, avatar: "https://randomuser.me/api/portraits/men/32.jpg", title: "AI Financial Risk Assessment is ready to view", time: "about an hour ago", unread: true },
    { id: 2, avatar: "https://randomuser.me/api/portraits/women/44.jpg", title: "Advisory Session Scheduled with Sarah Blake", time: "about an hour ago", unread: true },
    { id: 3, avatar: "https://randomuser.me/api/portraits/women/65.jpg", title: "Your Tax Documents 2023.pdf downloaded", time: "2 hours ago", unread: false },
  ];

  useEffect(() => {
    const { payload, role } = getStoredAuth();
    if (payload) {
        setUser({
          name: payload.fullName || payload.email?.split("@")[0] || "User",
          email: payload.email || "",
          role: role || "member"
        });
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    const { role } = getStoredAuth();
    localStorage.removeItem("dl_token");
    window.location.href = getLoginPathForRole(role);
  };

  const isLeadArrangerView =
    pathname.startsWith("/dashboard/lead-arranger") ||
    pathname.startsWith("/deals") ||
    pathname.startsWith("/deal") ||
    pathname.startsWith("/placements") ||
    pathname.startsWith("/teasers/new");

  const isB2BMemberView = pathname.startsWith("/dashboard/b2b-member") || isB2BMemberRole(user?.role);

  const activeNavItems = isLeadArrangerView
    ? leadArrangerNavItems
    : isB2BMemberView
      ? b2bMemberNavItems
      : memberNavItems;

  const navItems = activeNavItems.map((item) =>
    item.icon === "dashboard"
      ? { ...item, href: getDashboardPathForRole(isLeadArrangerView ? "lead_arranger" : user?.role) }
      : item
  );

  const isNavItemActive = (href: string) => {
    const normalizedPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
    const normalizedHref = href.endsWith("/") && href !== "/" ? href.slice(0, -1) : href;

    if (normalizedHref === "/dashboard") return normalizedPath === normalizedHref;
    return normalizedPath === normalizedHref || normalizedPath.startsWith(`${normalizedHref}/`);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <img src="/images/logo.png" alt="Dettelinks" className="sidebar-brand-logo-img" />
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) =>
            item.disabled ? (
              <div key={item.label} className="sidebar-nav-item sidebar-nav-item-disabled" aria-disabled="true">
                <span className="sidebar-nav-icon">{icons[item.icon]}</span>
                <span className="sidebar-nav-label">{item.label}</span>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-nav-item ${isNavItemActive(item.href) ? "active" : ""}`}
              >
                <span className="sidebar-nav-icon">{icons[item.icon]}</span>
                <span className="sidebar-nav-label">{item.label}</span>
              </Link>
            )
          )}
          <button className="sidebar-nav-item sidebar-logout" onClick={handleLogout}>
            <span className="sidebar-nav-icon">{icons.logout}</span>
            <span className="sidebar-nav-label">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-search">
            <span className="header-search-icon">{icons.search}</span>
            <input type="text" placeholder="Type to search..." className="header-search-input" />
          </div>
          <div className="header-right">
            {/* Message Icon */}
            <Link
              href={isLeadArrangerView ? "/dashboard/lead-arranger/messages/" : isB2BMemberView ? "/dashboard/b2b-member/deal-messages/" : "/messages/"}
              className="header-icon-btn"
            >
              {icons.messages}
            </Link>

            {/* Notification Icon with Dropdown */}
            <div className="header-notification-wrapper">
              <button
                className="header-icon-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                {icons.notifications}
                <span className="header-notification-badge"></span>
              </button>

              {showNotifications && (
                <div className="header-notification-dropdown">
                  <div className="notification-dropdown-header">
                    <h4>Notifications</h4>
                    <button className="mark-all-read">Mark all as read</button>
                  </div>
                  <div className="notification-dropdown-list">
                    {headerNotifications.map((notif) => (
                      <div key={notif.id} className={`notification-dropdown-item ${notif.unread ? "unread" : ""}`}>
                        <img src={notif.avatar} alt="" className="notification-dropdown-avatar" />
                        <div className="notification-dropdown-content">
                          <p className="notification-dropdown-title">{notif.title}</p>
                          <span className="notification-dropdown-time">{notif.time}</span>
                        </div>
                        {notif.unread && <span className="notification-dropdown-dot"></span>}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={isLeadArrangerView ? "/dashboard/lead-arranger/notifications/" : "/notifications/"}
                    className="notification-dropdown-footer"
                    onClick={() => setShowNotifications(false)}
                  >
                    View all notifications
                  </Link>
                </div>
              )}
            </div>

            {/* User Profile */}
            {user && (
              <div className="header-user-wrapper">
                <button
                    className="header-user"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt={user.name}
                    className="header-user-avatar-img"
                  />
                  <div className="header-user-info">
                    <span className="header-user-name">{user.name}</span>
                    <span className="header-user-role">{getRoleLabel(user.role)}</span>
                  </div>
                  <svg className="header-user-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="header-user-dropdown-menu">
                    <Link href={isLeadArrangerView ? "/dashboard/lead-arranger/profile/" : "/profile/"} className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                      <span className="user-menu-icon">{icons.profile}</span>
                      My Profile
                    </Link>
                    <Link
                      href={isLeadArrangerView ? "/dashboard/lead-arranger/settings/" : "/settings/"}
                      className="user-menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="user-menu-icon">{icons.settings}</span>
                      Settings
                    </Link>
                    <button className="user-menu-item logout" onClick={handleLogout}>
                      <span className="user-menu-icon">{icons.logout}</span>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}
