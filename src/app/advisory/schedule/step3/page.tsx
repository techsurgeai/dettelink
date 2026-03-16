"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppLayout from "../../../../components/AppLayout";
import Link from "next/link";

function ScheduleStep3Content() {
  const searchParams = useSearchParams();
  const advisorId = searchParams.get("advisor");
  const sessionType = searchParams.get("type");
  const sessionMode = searchParams.get("mode");

  const [selectedDate, setSelectedDate] = useState(2);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [discussionTopic, setDiscussionTopic] = useState("");

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  // Calendar dates for January (starting from Monday)
  const calendarDates = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, null, null],
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
          <Link href="/advisory/schedule/step2" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
            Back to Session Details
          </Link>
          <h1 className="page-title">Schedule New Advisory Session</h1>
          <p className="page-subtitle">Book time with an advisor to discuss your Financial Strategy</p>
        </div>

        {/* Progress Steps */}
        <div className="stepper-container">
          <div className="stepper progress-2">
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
            <div className="stepper-item active">
              <div className="stepper-circle">03</div>
              <span className="stepper-label">Date & Time</span>
            </div>
            <div className="stepper-item">
              <div className="stepper-circle">04</div>
              <span className="stepper-label">Review & Confirm</span>
            </div>
          </div>
        </div>

        {/* Step 3 Content */}
        <div className="step3-content">
          {/* Left Side - Date & Time Selection */}
          <div className="step3-card step3-card-left">
            {/* Header with Title and Month Selector */}
            <div className="step3-card-header">
              <h3 className="step3-card-title">Select Date & Time</h3>
              <div className="month-selector">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="month-select"
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </div>
            </div>

            {/* Calendar */}
            <div className="calendar">
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
                        className={`calendar-date ${date === null ? "empty" : ""} ${date === selectedDate ? "selected" : ""}`}
                        onClick={() => date && setSelectedDate(date)}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="time-slots">
              {timeSlots.map((slot, index) => (
                <label
                  key={index}
                  className={`time-slot ${selectedTime === slot.time.split(" ")[0] ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="timeSlot"
                    value={slot.time}
                    checked={selectedTime === slot.time.split(" ")[0]}
                    onChange={() => setSelectedTime(slot.time.split(" ")[0])}
                  />
                  <span className="radio-circle"></span>
                  <span className="time-slot-time">{slot.time}</span>
                  <span className="time-slot-duration">{slot.duration}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Right Side - Discussion & Documents */}
          <div className="step3-right">
            {/* Discussion Topic */}
            <div className="step3-card">
              <h3 className="step3-card-title">What would you like to discuss?</h3>
              <textarea
                placeholder="Enter in detail"
                value={discussionTopic}
                onChange={(e) => setDiscussionTopic(e.target.value)}
                className="discussion-textarea"
              />
            </div>

            {/* Document Upload */}
            <div className="step3-card">
              <h3 className="step3-card-title">Attach Supporting Documents</h3>
              <div className="upload-area">
                <div className="upload-icon">
                  <img src="/images/folder-icon.png" alt="Upload folder" />
                </div>
                <p className="upload-text">Drag & Drop here or <span className="browse-link">Browse</span></p>
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="ai-suggestion-box">
              <div className="ai-suggestion-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <div className="ai-suggestion-content">
                <h4 className="ai-suggestion-title">AI Suggestion</h4>
                <p className="ai-suggestion-text">Based on your financial analysis we recommend discussing liquidity gap</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="schedule-footer">
          <Link href={`/advisory/schedule/step2?advisor=${advisorId}`} className="btn btn-outline-gray">
            Back
          </Link>
          <Link
            href={`/advisory/schedule/step4?advisor=${advisorId}&type=${sessionType}&mode=${sessionMode}&date=${selectedDate}&time=${selectedTime}`}
            className="btn btn-green"
          >
            Next
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

export default function ScheduleStep3Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleStep3Content />
    </Suspense>
  );
}
