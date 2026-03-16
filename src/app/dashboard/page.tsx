"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "../../components/AppLayout";

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Alex");
  const [greeting, setGreeting] = useState("Good Morning");
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileCompletion = 40; // Static for now, can be calculated from API

  useEffect(() => {
    const token = localStorage.getItem("dl_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserName(payload.fullName?.split(" ")[0] || payload.email?.split("@")[0] || "Alex");
      } catch {
        // ignore
      }
    }

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Check if profile is incomplete and show popup
    const profileComplete = localStorage.getItem("dl_profile_complete");
    const popupDismissed = sessionStorage.getItem("dl_profile_popup_dismissed");
    if (!profileComplete && !popupDismissed) {
      setShowProfilePopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowProfilePopup(false);
    sessionStorage.setItem("dl_profile_popup_dismissed", "true");
  };

  const handleCompleteProfile = () => {
    setShowProfilePopup(false);
    router.push("/profile/");
  };

  return (
    <AppLayout>
      <div className="dashboard-page">
        {/* Profile Incomplete Popup */}
        {showProfilePopup && (
          <div className="profile-popup-overlay">
            <div className="profile-popup">
              <button className="profile-popup-close" onClick={handleClosePopup}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <h2 className="profile-popup-title">Complete Your Profile</h2>
              <p className="profile-popup-desc">
                For accurate AI Analysis and Report complete profile,<br />
                the AI will Generate report accordingly
              </p>

              <div className="profile-popup-content">
                <div className="profile-popup-circle">
                  <svg viewBox="0 0 100 100" className="profile-progress-svg">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="progress-track"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="progress-fill"
                      strokeDasharray={`${profileCompletion * 2.51} 251`}
                    />
                  </svg>
                  <span className="profile-popup-percent">{profileCompletion}%</span>
                </div>

                <div className="profile-popup-right">
                  <p className="profile-popup-progress-text">
                    Complete atleast 70% for accurate<br />AI Report
                  </p>

                  <div className="profile-popup-items">
                    <div className="profile-popup-item">
                      <span className="profile-popup-item-check">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" fill="#549780"/>
                          <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="profile-popup-item-label">Account Info</span>
                    </div>
                    <div className="profile-popup-item">
                      <span className="profile-popup-item-check profile-popup-item-pending-icon"></span>
                      <span className="profile-popup-item-label profile-popup-item-pending">Funding Intent</span>
                    </div>
                    <div className="profile-popup-item">
                      <span className="profile-popup-item-check profile-popup-item-pending-icon"></span>
                      <span className="profile-popup-item-label profile-popup-item-pending">Financial Overview</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-popup-actions">
                <button className="profile-popup-btn-outline" onClick={handleClosePopup}>
                  Continue Anyway
                </button>
                <button className="profile-popup-btn-primary" onClick={handleCompleteProfile}>
                  Complete Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Greeting Header */}
        <div className="dashboard-greeting">
          <h1>{greeting}, {userName}</h1>
        </div>

        {/* Top Stats Row */}
        <div className="dashboard-stats-row">
          {/* AI Analysis Status */}
          <div className="stat-box">
            <div className="stat-box-top">
              <div className="stat-box-icon">
                <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.79816 26.8794C9.4918 26.8794 11.773 25.9646 12.8794 24.6025C13.9862 25.9646 16.267 26.8794 18.9607 26.8794C22.7729 26.8794 25.7588 25.0472 25.7588 22.7084C25.7588 20.96 24.09 19.495 21.6554 18.8665C22.3254 18.1204 22.7392 17.0985 22.7392 15.9726C22.7392 13.6937 21.044 11.8395 18.9607 11.8395C16.8774 11.8395 15.1822 13.6937 15.1822 15.9726C15.1822 17.0985 15.596 18.1204 16.266 18.8665C14.7867 19.2482 13.5904 19.9389 12.8794 20.8142C12.1681 19.9389 10.9718 19.2482 9.49284 18.8665C10.1629 18.1204 10.5767 17.0985 10.5767 15.9726C10.5767 13.6937 8.88183 11.8395 6.79816 11.8395C4.71448 11.8395 3.01963 13.6937 3.01963 15.9726C3.01963 17.0985 3.43345 18.1204 4.10347 18.8665C1.66847 19.495 0 20.96 0 22.7084C0 25.0472 2.9863 26.8794 6.79816 26.8794ZM16.6159 15.9722C16.6159 14.558 17.6678 13.407 18.9607 13.407C20.2535 13.407 21.3058 14.5576 21.3058 15.9722C21.3058 17.3867 20.2539 18.5369 18.9607 18.5369C17.6675 18.5369 16.6159 17.3863 16.6159 15.9722ZM18.9607 20.1052C22.1223 20.1052 24.3254 21.4772 24.3254 22.7084C24.3254 23.9395 22.1223 25.3115 18.9607 25.3115C15.7991 25.3115 13.596 23.9395 13.596 22.7084C13.596 21.4772 15.7991 20.1052 18.9607 20.1052ZM4.45307 15.9722C4.45307 14.558 5.50497 13.407 6.79816 13.407C8.09134 13.407 9.1429 14.5576 9.1429 15.9722C9.1429 17.3867 8.09099 18.5369 6.79816 18.5369C5.50532 18.5369 4.45307 17.3863 4.45307 15.9722ZM6.79816 20.1052C9.95943 20.1052 12.1629 21.4772 12.1629 22.7084C12.1629 23.9395 9.95977 25.3115 6.79816 25.3115C3.63654 25.3115 1.43344 23.9395 1.43344 22.7084C1.43344 21.4772 3.63654 20.1052 6.79816 20.1052Z" fill="#549780"/>
<path d="M20.2047 6.36783V0H14.3831V1.56832H17.7572L12.4737 7.34756L8.7823 3.30942L3.03778 9.59257L4.05185 10.7014L8.7823 5.52709L12.4737 9.56523L18.7712 2.67716V6.36783H20.2047Z" fill="#549780"/>
</svg>

              </div>
              <button className="stat-box-menu">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
            </div>
            <span className="stat-box-label">AI Analysis Status</span>
            <span className="stat-box-value text-green">Complete</span>
          </div>

          {/* Advisory Sessions */}
          <div className="stat-box">
            <div className="stat-box-top">
              <div className="stat-box-icon">
                <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.79816 26.8794C9.4918 26.8794 11.773 25.9646 12.8794 24.6025C13.9862 25.9646 16.267 26.8794 18.9607 26.8794C22.7729 26.8794 25.7588 25.0472 25.7588 22.7084C25.7588 20.96 24.09 19.495 21.6554 18.8665C22.3254 18.1204 22.7392 17.0985 22.7392 15.9726C22.7392 13.6937 21.044 11.8395 18.9607 11.8395C16.8774 11.8395 15.1822 13.6937 15.1822 15.9726C15.1822 17.0985 15.596 18.1204 16.266 18.8665C14.7867 19.2482 13.5904 19.9389 12.8794 20.8142C12.1681 19.9389 10.9718 19.2482 9.49284 18.8665C10.1629 18.1204 10.5767 17.0985 10.5767 15.9726C10.5767 13.6937 8.88183 11.8395 6.79816 11.8395C4.71448 11.8395 3.01963 13.6937 3.01963 15.9726C3.01963 17.0985 3.43345 18.1204 4.10347 18.8665C1.66847 19.495 0 20.96 0 22.7084C0 25.0472 2.9863 26.8794 6.79816 26.8794ZM16.6159 15.9722C16.6159 14.558 17.6678 13.407 18.9607 13.407C20.2535 13.407 21.3058 14.5576 21.3058 15.9722C21.3058 17.3867 20.2539 18.5369 18.9607 18.5369C17.6675 18.5369 16.6159 17.3863 16.6159 15.9722ZM18.9607 20.1052C22.1223 20.1052 24.3254 21.4772 24.3254 22.7084C24.3254 23.9395 22.1223 25.3115 18.9607 25.3115C15.7991 25.3115 13.596 23.9395 13.596 22.7084C13.596 21.4772 15.7991 20.1052 18.9607 20.1052ZM4.45307 15.9722C4.45307 14.558 5.50497 13.407 6.79816 13.407C8.09134 13.407 9.1429 14.5576 9.1429 15.9722C9.1429 17.3867 8.09099 18.5369 6.79816 18.5369C5.50532 18.5369 4.45307 17.3863 4.45307 15.9722ZM6.79816 20.1052C9.95943 20.1052 12.1629 21.4772 12.1629 22.7084C12.1629 23.9395 9.95977 25.3115 6.79816 25.3115C3.63654 25.3115 1.43344 23.9395 1.43344 22.7084C1.43344 21.4772 3.63654 20.1052 6.79816 20.1052Z" fill="#549780"/>
<path d="M20.2047 6.36783V0H14.3831V1.56832H17.7572L12.4737 7.34756L8.7823 3.30942L3.03778 9.59257L4.05185 10.7014L8.7823 5.52709L12.4737 9.56523L18.7712 2.67716V6.36783H20.2047Z" fill="#549780"/>
</svg>

              </div>
              <button className="stat-box-menu">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
            </div>
            <span className="stat-box-label">Advisory Sessions</span>
            <div className="stat-box-value-row">
              <span className="stat-box-value">2</span>
              <span className="stat-box-sub">Upcoming</span>
            </div>
          </div>

          {/* Financing Options */}
          <div className="stat-box">
            <div className="stat-box-top">
              <div className="stat-box-icon">
               <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.79816 26.8794C9.4918 26.8794 11.773 25.9646 12.8794 24.6025C13.9862 25.9646 16.267 26.8794 18.9607 26.8794C22.7729 26.8794 25.7588 25.0472 25.7588 22.7084C25.7588 20.96 24.09 19.495 21.6554 18.8665C22.3254 18.1204 22.7392 17.0985 22.7392 15.9726C22.7392 13.6937 21.044 11.8395 18.9607 11.8395C16.8774 11.8395 15.1822 13.6937 15.1822 15.9726C15.1822 17.0985 15.596 18.1204 16.266 18.8665C14.7867 19.2482 13.5904 19.9389 12.8794 20.8142C12.1681 19.9389 10.9718 19.2482 9.49284 18.8665C10.1629 18.1204 10.5767 17.0985 10.5767 15.9726C10.5767 13.6937 8.88183 11.8395 6.79816 11.8395C4.71448 11.8395 3.01963 13.6937 3.01963 15.9726C3.01963 17.0985 3.43345 18.1204 4.10347 18.8665C1.66847 19.495 0 20.96 0 22.7084C0 25.0472 2.9863 26.8794 6.79816 26.8794ZM16.6159 15.9722C16.6159 14.558 17.6678 13.407 18.9607 13.407C20.2535 13.407 21.3058 14.5576 21.3058 15.9722C21.3058 17.3867 20.2539 18.5369 18.9607 18.5369C17.6675 18.5369 16.6159 17.3863 16.6159 15.9722ZM18.9607 20.1052C22.1223 20.1052 24.3254 21.4772 24.3254 22.7084C24.3254 23.9395 22.1223 25.3115 18.9607 25.3115C15.7991 25.3115 13.596 23.9395 13.596 22.7084C13.596 21.4772 15.7991 20.1052 18.9607 20.1052ZM4.45307 15.9722C4.45307 14.558 5.50497 13.407 6.79816 13.407C8.09134 13.407 9.1429 14.5576 9.1429 15.9722C9.1429 17.3867 8.09099 18.5369 6.79816 18.5369C5.50532 18.5369 4.45307 17.3863 4.45307 15.9722ZM6.79816 20.1052C9.95943 20.1052 12.1629 21.4772 12.1629 22.7084C12.1629 23.9395 9.95977 25.3115 6.79816 25.3115C3.63654 25.3115 1.43344 23.9395 1.43344 22.7084C1.43344 21.4772 3.63654 20.1052 6.79816 20.1052Z" fill="#549780"/>
<path d="M20.2047 6.36783V0H14.3831V1.56832H17.7572L12.4737 7.34756L8.7823 3.30942L3.03778 9.59257L4.05185 10.7014L8.7823 5.52709L12.4737 9.56523L18.7712 2.67716V6.36783H20.2047Z" fill="#549780"/>
</svg>

              </div>
              <button className="stat-box-menu">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
            </div>
            <span className="stat-box-label">Financing Options</span>
            <div className="stat-box-value-row">
              <span className="stat-box-value">10</span>
              <span className="stat-box-sub">Available</span>
            </div>
          </div>

          {/* Ongoing Advisory & Transactions */}
          <div className="stat-box ongoing-box">
            <div className="ongoing-header">
              <span className="ongoing-title">Ongoing Advisory &amp; Transactions</span>
            </div>
            <div className="ongoing-content">
              <div className="ongoing-item-row">
                <span className="ongoing-item-label">Morning Capital Analysis</span>
                <span className="badge badge-yellow">In Progress</span>
              </div>
              <div className="ongoing-divider"></div>
              <div className="ongoing-item-row">
                <span className="ongoing-item-label">Q4 2025 Strategic Planning</span>
                <span className="badge badge-green">Complete</span>
              </div>
              <div className="ongoing-divider"></div>
              <div className="ongoing-item-row">
                <span className="ongoing-item-label">Debt Restructuring Review</span>
                <span className="badge badge-gray">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-main-grid">
          {/* Left Column - Charts */}
          <div className="dashboard-left-col">
            {/* Charts Row */}
            <div className="charts-row">
              {/* Working Capital */}
              <div className="chart-box">
                <div className="chart-box-header">
                  <h3>Working Capital</h3>
                  <span className="chart-period">Last 6 Months</span>
                </div>
                <div className="bar-chart-container">
                  <div className="bar-chart-y-axis">
                    <span>$4M</span>
                    <span>$3M</span>
                    <span>$2M</span>
                    <span>$1M</span>
                    <span>$0</span>
                  </div>
                  <div className="bar-chart-bars">
                    <div className="bar-item"><div className="bar" style={{ height: '30%' }}></div></div>
                    <div className="bar-item"><div className="bar" style={{ height: '45%' }}></div></div>
                    <div className="bar-item"><div className="bar" style={{ height: '35%' }}></div></div>
                    <div className="bar-item"><div className="bar" style={{ height: '65%' }}></div></div>
                    <div className="bar-item"><div className="bar" style={{ height: '55%' }}></div></div>
                    <div className="bar-item"><div className="bar" style={{ height: '90%' }}></div></div>
                  </div>
                </div>
              </div>

              {/* Liquidity Ratio - Line Chart */}
              <div className="chart-box">
                <div className="chart-box-header">
                  <h3>Liquidity Ratio</h3>
                  <span className="chart-period">Last 6 Months</span>
                </div>
                <div className="line-chart-wrapper">
                  <div className="line-chart-y-axis">
                    <span>3</span>
                    <span>2.25</span>
                    <span>1.5</span>
                    <span>0.75</span>
                    <span>0</span>
                  </div>
                  <div className="line-chart-area">
                    <svg viewBox="0 0 300 160" preserveAspectRatio="none" className="line-chart-svg">
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#549780" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#549780" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="0" y1="10" x2="300" y2="10" stroke="#f0f0f0" strokeWidth="0.5" />
                      <line x1="0" y1="45" x2="300" y2="45" stroke="#f0f0f0" strokeWidth="0.5" />
                      <line x1="0" y1="80" x2="300" y2="80" stroke="#f0f0f0" strokeWidth="0.5" />
                      <line x1="0" y1="115" x2="300" y2="115" stroke="#f0f0f0" strokeWidth="0.5" />
                      <line x1="0" y1="150" x2="300" y2="150" stroke="#f0f0f0" strokeWidth="0.5" />
                      {/* Area fill */}
                      <path
                        d="M10,57 C30,63 48,66 68,66 C88,66 106,65 126,64 C146,55 164,42 184,38 C204,28 222,16 242,15 C262,18 275,40 290,47 L290,150 L10,150 Z"
                        fill="url(#lineGradient)"
                      />
                      {/* Line */}
                      <path
                        d="M10,57 C30,63 48,66 68,66 C88,66 106,65 126,64 C146,55 164,42 184,38 C204,28 222,16 242,15 C262,18 275,40 290,47"
                        fill="none"
                        stroke="#549780"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Dots */}
                      <circle cx="10" cy="57" r="4" fill="#549780" />
                      <circle cx="68" cy="66" r="4" fill="#549780" />
                      <circle cx="126" cy="64" r="4" fill="#549780" />
                      <circle cx="184" cy="38" r="4" fill="#549780" />
                      <circle cx="242" cy="15" r="4" fill="#549780" />
                      <circle cx="290" cy="47" r="4" fill="#549780" />
                    </svg>
                    <div className="line-chart-x-axis">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>Mai</span>
                      <span>Jun</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Funding Needs & Risk Rating */}
            <div className="charts-row">
              {/* Funding Needs */}
              <div className="chart-box">
                <h3 className="chart-box-title">Funding Needs</h3>
                <div className="funding-list">
                  <div className="funding-item">
                    <div className="funding-item-header">
                      <span className="funding-label">Short Term</span>
                      <span className="funding-amount">$195k</span>
                    </div>
                    <div className="funding-bar-track">
                      <div className="funding-bar-fill funding-bar-red" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div className="funding-item">
                    <div className="funding-item-header">
                      <span className="funding-label">Medium Term</span>
                      <span className="funding-amount">$135k</span>
                    </div>
                    <div className="funding-bar-track">
                      <div className="funding-bar-fill funding-bar-yellow" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div className="funding-item">
                    <div className="funding-item-header">
                      <span className="funding-label">Long Term</span>
                      <span className="funding-amount">$90k</span>
                    </div>
                    <div className="funding-bar-track">
                      <div className="funding-bar-fill funding-bar-teal" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Rating */}
              <div className="chart-box risk-box">
                <h3 className="chart-box-title">Risk Rating</h3>
                <p className="risk-subtitle">Overall Assessment</p>
                <div className="risk-gauge-center">
                  <svg viewBox="0 0 200 120" className="risk-semicircle-svg">
                    {/* Background arc */}
                    <path
                      d="M 20,100 A 80,80 0 0,1 180,100"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    {/* Filled arc (35%) */}
                    <path
                      d="M 20,100 A 80,80 0 0,1 180,100"
                      fill="none"
                      stroke="#549780"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeDasharray="88 252"
                    />
                  </svg>
                  <div className="risk-semicircle-value">35%</div>
                </div>
                <div className="risk-center-label">
                  <span className="risk-label-text">Low</span>
                  <span className="risk-label-desc">Strong Financial Position</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Advisory, Notifications, Messages */}
          <div className="dashboard-right-col">
            {/* Ongoing Advisory & Transactions */}
            <div className="info-box advisory-box">
              <div className="advisory-header">
                <h3 className="info-box-title">Ongoing Advisory & Transactions</h3>
                <a href="#" className="view-all-link">View All</a>
              </div>

              <div className="advisory-list">
                {/* Advisory Item 1 */}
                <div className="advisory-item">
                <div className="advisory-item-header">
                  <div className="advisory-item-info">
                    <h4 className="advisory-item-title">Working Capital Analysis</h4>
                    <p className="advisory-item-subtitle">Financial Assessment</p>
                  </div>
                  <span className="badge badge-yellow-outline">In Review</span>
                </div>
                <div className="advisory-item-footer">
                  <div className="advisor-info">
                    <span className="advisor-label">Advisor</span>
                    <div className="advisor-profile">
                      <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Michael Zhang" className="advisor-avatar" />
                      <span className="advisor-name">Michael Zhang</span>
                    </div>
                  </div>
                  <div className="advisory-actions">
                    <button className="advisory-action-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                      </svg>
                    </button>
                    <button className="advisory-action-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </button>
                    <button className="advisory-action-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              </div>
            </div>

            {/* Notifications */}
            <div className="info-box notification-box">
              <div className="notification-header">
                <h3 className="info-box-title">Notifications</h3>
                <a href="#" className="view-all-link">View All</a>
              </div>
              <div className="notification-list">
                <div className="notification-item">
                  <div className="notification-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="14" width="4" height="6" rx="1" />
                      <rect x="10" y="10" width="4" height="10" rx="1" />
                      <rect x="16" y="6" width="4" height="14" rx="1" />
                    </svg>
                  </div>
                  <div className="notification-content">
                    <p className="notification-title">AI Analysis Completed for Q4 2025</p>
                    <p className="notification-desc">Your latest financial assessment is ready for review</p>
                    <a href="#" className="notification-action">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                      </svg>
                      View Analysis
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="info-box">
              <h3 className="info-box-title">Messages</h3>
              <div className="message-row">
                <div className="message-avatar-box">S</div>
                <div className="message-text-box">
                  <p className="message-name">Sarah</p>
                  <p className="message-preview">Your financial assessment is ready to review. Please schedule a time to discuss.</p>
                  <p className="message-time">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps Section */}
        <div className="next-steps-section">
          <h2 className="section-heading">Next Steps</h2>
          <div className="next-steps-row">
            <div className="next-step-box">
              <div className="next-step-icon icon-blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h4>Schedule Consultation</h4>
              <p>Book time with an advisor</p>
            </div>
            <div className="next-step-box">
              <div className="next-step-icon icon-green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17,8 12,3 7,8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <h4>Upload Document</h4>
              <p>Share Financial Data</p>
            </div>
            <div className="next-step-box">
              <div className="next-step-icon icon-green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23,4 23,10 17,10" />
                  <polyline points="1,20 1,14 7,14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </div>
              <h4>Request AI Reassessment</h4>
              <p>Run updated analysis</p>
            </div>
            <div className="next-step-box">
              <div className="next-step-icon icon-purple">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h4>View Recommendation</h4>
              <p>See AI insights</p>
            </div>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="quick-access-section">
          <h2 className="section-heading">Quick Access</h2>
          <div className="quick-access-row">
            <Link href="/documents/" className="quick-access-box">
              <div className="quick-access-icon">
                <img src="/images/folder-icon.png" alt="Folder" className="quick-access-icon-img" />
              </div>
              <span>Upload Financial Docs</span>
            </Link>
            <Link href="/advisory/" className="quick-access-box">
              <div className="quick-access-icon">
                <img src="/images/calendar-icon.png" alt="Calendar" className="quick-access-icon-img" />
              </div>
              <span>Schedule Consultation</span>
            </Link>
            <Link href="/financing/" className="quick-access-box">
              <div className="quick-access-icon">
                <img src="/images/glyph-icon.png" alt="Finance" className="quick-access-icon-img" />
              </div>
              <span>Explore Finance Deals</span>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
