"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppLayout from "../../../../components/AppLayout";
import Link from "next/link";

function ScheduleStep4Content() {
  const searchParams = useSearchParams();
  const advisorId = searchParams.get("advisor");
  const sessionType = searchParams.get("type") || "financing-options";
  const sessionMode = searchParams.get("mode") || "video-call";
  const selectedDate = searchParams.get("date") || "2";
  const selectedTime = searchParams.get("time") || "10:00";

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  const calendarDates = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, null, null],
  ];

  const sessionTypes = [
    { id: "working-capital", label: "Working Capital Review" },
    { id: "funding-option", label: "Funding Option Discussion" },
    { id: "risk-liquidity", label: "Risk & Liquidity Strategy" },
    { id: "financing-options", label: "Financing Options Discussion" },
    { id: "custom", label: "Custom Topic" },
  ];

  const sessionModes = [
    { id: "video-call", label: "Video Call" },
    { id: "audio-call", label: "Audio Call" },
    { id: "in-person", label: "In Person (If Applicable)" },
  ];

  const timeSlots = [
    { time: "10:00 AM", duration: "60 Min" },
    { time: "11:00 AM", duration: "60 Min" },
    { time: "12:00 AM", duration: "60 Min" },
    { time: "12:00 AM", duration: "60 Min" },
  ];

  return (
    <AppLayout>
      <div className="schedule-page">
        {/* Header */}
        <div className="schedule-header">
          <Link href="/advisory/schedule/step3" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
            Back to Date & Time
          </Link>
          <h1 className="page-title">Schedule New Advisory Session</h1>
          <p className="page-subtitle">Book time with an advisor to discuss your Financial Strategy</p>
        </div>

        {/* Progress Steps */}
        <div className="stepper-container">
          <div className="stepper progress-3">
            <div className="stepper-item completed">
              <div className="stepper-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <span className="stepper-label">Select Advisor</span>
            </div>
            <div className="stepper-item completed">
              <div className="stepper-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <span className="stepper-label">Session Details</span>
            </div>
            <div className="stepper-item completed">
              <div className="stepper-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <span className="stepper-label">Date & Time</span>
            </div>
            <div className="stepper-item active">
              <div className="stepper-circle">04</div>
              <span className="stepper-label">Review & Confirm</span>
            </div>
          </div>
        </div>

        {/* Step 4 Content */}
        <div className="step4-content">
          {/* Selected Advisor Card */}
          <div className="step4-advisor-card">
            <div className="advisor-card-top">
              <div className="advisor-avatar-med">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Lavoski" />
              </div>
              <div className="advisor-info-section">
                <h3 className="advisor-card-name">Sarah Lavoski</h3>
                <p className="advisor-card-role">Senior Financial Advisor</p>
              </div>
            </div>

            <div className="advisor-specialties">
              <span className="specialty-tag">Working Capital</span>
              <span className="specialty-tag">Liquidity Strategy</span>
              <span className="specialty-tag">SME Financing</span>
            </div>

            <div className="advisor-stats-row">
              <div className="stat-item">
                <svg viewBox="0 0 24 24" fill="currentColor" className="star-icon">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
                <span>4.9</span>
              </div>
              <div className="stat-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="video-icon">
                  <polygon points="23,7 16,12 23,17 23,7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
                <span>120+ Sessions Completed</span>
              </div>
            </div>

            <p className="advisor-description">
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velsociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            </p>

            <div className="advisor-card-actions">
              <button className="btn btn-outline-gray btn-card">View Profile</button>
              <button className="btn btn-green btn-card">Change Advisor</button>
            </div>
          </div>

          {/* Session Type and Mode Cards */}
          <div className="step4-session-row">
            {/* Select Session Type Card */}
            <div className="step4-card">
              <h3 className="step4-card-title">Select Session Type</h3>
              <div className="radio-group readonly">
                {sessionTypes.map((type) => (
                  <label key={type.id} className={`radio-option ${sessionType === type.id ? "selected" : ""}`}>
                    <span className={`radio-circle ${sessionType === type.id ? "checked" : ""}`}></span>
                    <span className="radio-label">{type.label}</span>
                  </label>
                ))}
              </div>
              {sessionType === "custom" && (
                <input
                  type="text"
                  placeholder="Enter Your Topic"
                  value=""
                  readOnly
                  className="custom-topic-input"
                />
              )}
            </div>

            {/* Session Mode Card */}
            <div className="step4-card">
              <h3 className="step4-card-title">Session Mode</h3>
              <div className="radio-group readonly">
                {sessionModes.map((mode) => (
                  <label key={mode.id} className={`radio-option ${sessionMode === mode.id ? "selected" : ""}`}>
                    <span className={`radio-circle ${sessionMode === mode.id ? "checked" : ""}`}></span>
                    <span className="radio-label">{mode.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Date & Time Review Section */}
          <div className="step4-datetime-section">
            <h3 className="step4-section-title">Select Date & Time</h3>
            <div className="step4-datetime-content">
              {/* Left Side - Calendar and Time Card */}
              <div className="step4-card step4-calendar-card">
                {/* Month Header */}
                <div className="step4-month-header">
                  <span className="month-label">January</span>
                  <div className="month-selector readonly">
                    <span className="month-value">January</span>
                    <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </div>

                {/* Calendar */}
                <div className="calendar readonly">
                  <div className="calendar-header">
                    {weekDays.map((day, index) => (
                      <div key={index} className="calendar-day-name">{day}</div>
                    ))}
                  </div>
                  <div className="calendar-body">
                    {calendarDates.map((week, weekIndex) => (
                      <div key={weekIndex} className="calendar-week">
                        {week.map((date, dayIndex) => (
                          <div
                            key={dayIndex}
                            className={`calendar-date ${date === null ? "empty" : ""} ${date === parseInt(selectedDate) ? "selected" : ""}`}
                          >
                            {date}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="time-slots readonly">
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`time-slot ${selectedTime === slot.time.split(" ")[0] ? "selected" : ""}`}
                    >
                      <span className={`radio-circle ${selectedTime === slot.time.split(" ")[0] ? "checked" : ""}`}></span>
                      <span className="time-slot-time">{slot.time}</span>
                      <span className="time-slot-duration">{slot.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Discussion & Documents */}
              <div className="step4-datetime-right">
                {/* Discussion Topic Card */}
                <div className="step4-card">
                  <h4 className="step4-card-title">What would you like to discuss?</h4>
                  <div className="discussion-preview">
                    Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.
                  </div>
                </div>

                {/* Document Upload Card */}
                <div className="step4-card">
                  <h4 className="step4-card-title">Attach Supporting Documents</h4>
                  <div className="upload-area readonly">
                    <div className="upload-icon">
                      <img src="/images/folder-icon.png" alt="Upload folder" />
                    </div>
                    <p className="upload-text">Drag & Drop here or <span className="browse-link">Browse</span></p>
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className="ai-suggestion-box">
                  <h4 className="ai-suggestion-title">AI Suggestion</h4>
                  <p className="ai-suggestion-text">Based on your financial analysis we recommend discussing liquidity gap</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="schedule-footer">
          <Link href={`/advisory/schedule/step3?advisor=${advisorId}`} className="btn btn-outline-gray">
            Back
          </Link>
          <button className="btn btn-green">
            Schedule Now
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

export default function ScheduleStep4Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleStep4Content />
    </Suspense>
  );
}
