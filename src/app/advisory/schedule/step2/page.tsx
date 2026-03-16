"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppLayout from "../../../../components/AppLayout";
import Link from "next/link";

function ScheduleStep2Content() {
  const searchParams = useSearchParams();
  const advisorId = searchParams.get("advisor");

  const [sessionType, setSessionType] = useState("financing-options");
  const [sessionMode, setSessionMode] = useState("video-call");
  const [customTopic, setCustomTopic] = useState("");

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

  return (
    <AppLayout>
      <div className="schedule-page">
        {/* Header */}
        <div className="schedule-header">
          <Link href="/advisory/schedule" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
            Back to Select Advisor
          </Link>
          <h1 className="page-title">Schedule New Advisory Session</h1>
          <p className="page-subtitle">Book time with an advisor to discuss your Financial Strategy</p>
        </div>

        {/* Progress Steps */}
        <div className="stepper-container">
          <div className="stepper progress-1">
            <div className="stepper-item completed">
              <div className="stepper-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <span className="stepper-label">Select Advisor</span>
            </div>
            <div className="stepper-item active">
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

        {/* Step 2 Content */}
        <div className="step2-content">
          {/* Select Session Type Card */}
          <div className="step2-card">
            <h3 className="step2-card-title">Select Session Type</h3>
            <div className="radio-group">
              {sessionTypes.map((type) => (
                <label key={type.id} className="radio-option">
                  <input
                    type="radio"
                    name="sessionType"
                    value={type.id}
                    checked={sessionType === type.id}
                    onChange={(e) => setSessionType(e.target.value)}
                  />
                  <span className="radio-circle"></span>
                  <span className="radio-label">{type.label}</span>
                </label>
              ))}
            </div>
            {sessionType === "custom" && (
              <input
                type="text"
                placeholder="Enter Your Topic"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="custom-topic-input"
              />
            )}
          </div>

          {/* Session Mode Card */}
          <div className="step2-card">
            <h3 className="step2-card-title">Session Mode</h3>
            <div className="radio-group">
              {sessionModes.map((mode) => (
                <label key={mode.id} className="radio-option">
                  <input
                    type="radio"
                    name="sessionMode"
                    value={mode.id}
                    checked={sessionMode === mode.id}
                    onChange={(e) => setSessionMode(e.target.value)}
                  />
                  <span className="radio-circle"></span>
                  <span className="radio-label">{mode.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="schedule-footer">
          <Link href={`/advisory/schedule?advisor=${advisorId}`} className="btn btn-outline-gray">
            Back
          </Link>
          <Link
            href={`/advisory/schedule/step3?advisor=${advisorId}&type=${sessionType}&mode=${sessionMode}`}
            className="btn btn-green"
          >
            Next
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

export default function ScheduleStep2Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleStep2Content />
    </Suspense>
  );
}
