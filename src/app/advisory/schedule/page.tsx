"use client";

import { useState } from "react";
import AppLayout from "../../../components/AppLayout";
import Link from "next/link";

export default function ScheduleAdvisoryPage() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [fundingType, setFundingType] = useState("");
  const [availabilityType, setAvailabilityType] = useState("");

  const advisors = [
    {
      id: 1,
      name: "Sarah Lavoski",
      role: "Senior Financial Advisor",
      specialties: ["Working Capital", "Liquidity Strategy", "SME Financing"],
      rating: 4.9,
      sessions: "120+",
      description: "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Sarah Lavoski",
      role: "Senior Financial Advisor",
      specialties: ["Working Capital", "Liquidity Strategy", "SME Financing"],
      rating: 4.9,
      sessions: "120+",
      description: "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Senior Financial Advisor",
      specialties: ["M&A Advisory", "Due Diligence", "Valuation"],
      rating: 4.8,
      sessions: "89+",
      description: "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Investment Specialist",
      specialties: ["Private Equity", "Venture Capital", "Growth Strategy"],
      rating: 4.7,
      sessions: "156+",
      description: "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  const handleSelectAdvisor = (advisorId: number) => {
    setSelectedAdvisor(advisorId);
  };

  return (
    <AppLayout>
      <div className="schedule-page">
        {/* Header */}
        <div className="schedule-header">
          <Link href="/advisory" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
            Back to Advisory Sessions
          </Link>
          <h1 className="page-title">Schedule New Session</h1>
          <p className="page-subtitle">Book a consultation with our financial experts</p>
        </div>

        {/* New Progress Steps */}
        <div className="stepper-container">
          <div className="stepper">
            <div className="stepper-item active">
              <div className="stepper-circle">01</div>
              <span className="stepper-label">Select Advisor</span>
            </div>
            <div className="stepper-item">
              <div className="stepper-circle">02</div>
              <span className="stepper-label">Session Details</span>
            </div>
            <div className="stepper-item">
              <div className="stepper-circle">03</div>
              <span className="stepper-label">Date & Time</span>
            </div>
            <div className="stepper-item">
              <div className="stepper-circle">04</div>
              <span className="stepper-label">Review & Confirm</span>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">Find Advisors</label>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-label">Select Industry</label>
            <div className="select-wrapper">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="filter-select"
              >
                <option value="">Select Role</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="manufacturing">Manufacturing</option>
              </select>
              <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-label">Select Funding Type</label>
            <div className="select-wrapper">
              <select
                value={fundingType}
                onChange={(e) => setFundingType(e.target.value)}
                className="filter-select"
              >
                <option value="">Select Role</option>
                <option value="seed">Seed</option>
                <option value="series-a">Series A</option>
                <option value="series-b">Series B</option>
                <option value="growth">Growth</option>
              </select>
              <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-label">Availability Type</label>
            <div className="select-wrapper">
              <select
                value={availabilityType}
                onChange={(e) => setAvailabilityType(e.target.value)}
                className="filter-select"
              >
                <option value="">Select Role</option>
                <option value="immediate">Immediate</option>
                <option value="this-week">This Week</option>
                <option value="next-week">Next Week</option>
                <option value="flexible">Flexible</option>
              </select>
              <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Step 1: Select Advisor */}
        <div className="schedule-content">
          <div className="advisors-grid-new">
            {advisors.map((advisor) => (
              <div
                key={advisor.id}
                className={`advisor-card-new ${selectedAdvisor === advisor.id ? "selected" : ""}`}
              >
                {/* Card Header with Avatar and Info */}
                <div className="advisor-card-top">
                  <div className="advisor-avatar-med">
                    <img src={advisor.image} alt={advisor.name} />
                  </div>
                  <div className="advisor-info-section">
                    <h3 className="advisor-card-name">{advisor.name}</h3>
                    <p className="advisor-card-role">{advisor.role}</p>
                  </div>
                </div>

                {/* Specialty Tags */}
                <div className="advisor-specialties">
                  {advisor.specialties.map((specialty, index) => (
                    <span key={index} className="specialty-tag">{specialty}</span>
                  ))}
                </div>

                {/* Stats Row */}
                <div className="advisor-stats-row">
                  <div className="stat-item">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="star-icon">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                    <span>{advisor.rating}</span>
                  </div>
                  <div className="stat-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="video-icon">
                      <polygon points="23,7 16,12 23,17 23,7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" />
                    </svg>
                    <span>{advisor.sessions} Sessions Completed</span>
                  </div>
                </div>

                {/* Description */}
                <p className="advisor-description">{advisor.description}</p>

                {/* Action Buttons */}
                <div className="advisor-card-actions">
                  <Link href={`/advisory/schedule/advisor/${advisor.id}`} className="btn btn-outline-gray btn-card">
                    View Profile
                  </Link>
                  <button
                    className={`btn btn-green btn-card ${selectedAdvisor === advisor.id ? "selected" : ""}`}
                    onClick={() => handleSelectAdvisor(advisor.id)}
                  >
                    {selectedAdvisor === advisor.id ? "Selected" : "Select Advisor"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="schedule-footer">
          <Link href="/advisory" className="btn btn-outline-gray">
            Cancel
          </Link>
          <Link
            href={selectedAdvisor ? `/advisory/schedule/step2?advisor=${selectedAdvisor}` : "#"}
            className={`btn btn-green ${!selectedAdvisor ? "disabled" : ""}`}
            onClick={(e) => !selectedAdvisor && e.preventDefault()}
          >
            Continue
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
