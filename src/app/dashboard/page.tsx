"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "../../components/AppLayout";
import { getStoredAuth, isB2BMemberRole, isLeadArrangerRole } from "../../lib/auth";
import UploadDocumentModal, { SubmittedDocument } from "../../components/UploadDocumentModal";

function normalizeSubmittedDocument(document: SubmittedDocument): SubmittedDocument {
  return {
    ...document,
    selectedBanks: Array.isArray(document.selectedBanks) ? document.selectedBanks : [],
    sendToAllBanks: Boolean(document.sendToAllBanks),
  };
}

function formatFundingType(value: string) {
  switch (value) {
    case "equity":
      return "Equity";
    case "debt":
      return "Debt";
    case "convertible":
      return "Convertible Note";
    case "grant":
      return "Grant";
    default:
      return "Funding";
  }
}

function formatTimeline(value: string) {
  switch (value) {
    case "immediate":
      return "Immediate";
    case "1-3-months":
      return "1-3 months";
    case "3-6-months":
      return "3-6 months";
    case "6-12-months":
      return "6-12 months";
    default:
      return "Timeline pending";
  }
}

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Alex");
  const [greeting, setGreeting] = useState("Good Morning");
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isFundingComplete, setIsFundingComplete] = useState(false);
  const [isSetupReady, setIsSetupReady] = useState(false);
  const [submittedDocuments, setSubmittedDocuments] = useState<SubmittedDocument[]>([]);
  const [processedDocumentIds, setProcessedDocumentIds] = useState<number[]>([]);
  const [fundingAmount, setFundingAmount] = useState("Pending");
  const [fundingType, setFundingType] = useState("Funding Requirement");
  const [fundingTimeline, setFundingTimeline] = useState("Timeline pending");
  const [submittedSuccessDocument, setSubmittedSuccessDocument] = useState<SubmittedDocument | null>(null);
  const [showUploadGuidance, setShowUploadGuidance] = useState(false);
  const profileCompletion = 40; // Static for now, can be calculated from API

  useEffect(() => {
    const { payload, role } = getStoredAuth();
    if (isLeadArrangerRole(role)) {
      router.replace("/dashboard/lead-arranger/");
      return;
    }
    if (isB2BMemberRole(role)) {
      router.replace("/dashboard/b2b-member/");
      return;
    }

    if (payload) {
        setUserName(payload.fullName?.split(" ")[0] || payload.email?.split("@")[0] || "Alex");
    }

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Check if profile is incomplete and show popup
    const profileComplete = localStorage.getItem("dl_profile_complete");
    const fundingComplete = localStorage.getItem("dl_funding_requirements_complete");
    const storedFundingRequirements = localStorage.getItem("dl_funding_requirements");
    const storedSubmittedDocuments = localStorage.getItem("dl_dashboard_submitted_documents");
    const storedProcessedDocuments = localStorage.getItem("dl_documents_submitted");
    const shouldShowUploadGuidance = localStorage.getItem("dl_show_upload_guidance");
    setIsProfileComplete(Boolean(profileComplete));
    setIsFundingComplete(Boolean(fundingComplete));
    setIsSetupReady(Boolean(profileComplete) && Boolean(fundingComplete));
    setSubmittedDocuments(
      storedSubmittedDocuments
        ? (JSON.parse(storedSubmittedDocuments) as SubmittedDocument[]).map(normalizeSubmittedDocument)
        : []
    );
    setProcessedDocumentIds(
      storedProcessedDocuments
        ? (JSON.parse(storedProcessedDocuments) as SubmittedDocument[]).map((document) => document.id)
        : []
    );
    if (storedFundingRequirements) {
      const fundingRequirements = JSON.parse(storedFundingRequirements) as {
        targetFundingAmount?: string;
        preferredFundingType?: string;
        fundingTimeline?: string;
      };
      setFundingAmount(fundingRequirements.targetFundingAmount?.trim() || "Pending");
      setFundingType(formatFundingType(fundingRequirements.preferredFundingType || ""));
      setFundingTimeline(formatTimeline(fundingRequirements.fundingTimeline || ""));
    }
    setShowUploadGuidance(Boolean(shouldShowUploadGuidance) && Boolean(profileComplete) && Boolean(fundingComplete));
    setShowProfilePopup(false);
  }, [router]);

  const handleClosePopup = () => {
    setShowProfilePopup(false);
    sessionStorage.setItem("dl_profile_popup_dismissed", "true");
  };

  const handleCompleteProfile = () => {
    setShowProfilePopup(false);
    router.push("/profile/");
  };

  const handleDocumentsSubmitted = (documents: SubmittedDocument[]) => {
    setSubmittedDocuments((prev) => {
      const next = [...documents.map(normalizeSubmittedDocument), ...prev];
      localStorage.setItem("dl_dashboard_submitted_documents", JSON.stringify(next));
      return next;
    });
  };

  const handleDeleteSubmittedDocument = (id: number) => {
    setSubmittedDocuments((prev) => {
      const next = prev.filter((document) => document.id !== id);
      localStorage.setItem("dl_dashboard_submitted_documents", JSON.stringify(next));
      return next;
    });
  };

  const handleSubmitDocument = (document: SubmittedDocument) => {
    const storedDocuments = localStorage.getItem("dl_documents_submitted");
    const existingDocuments = storedDocuments ? (JSON.parse(storedDocuments) as SubmittedDocument[]) : [];
    const dedupedDocuments = existingDocuments.filter((entry) => entry.id !== document.id);
    const nextDocuments = [document, ...dedupedDocuments];
    localStorage.setItem("dl_documents_submitted", JSON.stringify(nextDocuments));
    setProcessedDocumentIds(nextDocuments.map((entry) => entry.id));
    setSubmittedSuccessDocument(document);
    window.setTimeout(() => {
      router.push("/documents/");
    }, 1200);
  };

  const handleOpenUploadModal = () => {
    setShowUploadModal(true);
    setShowUploadGuidance(false);
    localStorage.removeItem("dl_show_upload_guidance");
  };

  const handleDismissUploadGuidance = () => {
    setShowUploadGuidance(false);
    localStorage.removeItem("dl_show_upload_guidance");
  };

  const submittedDocumentCount = processedDocumentIds.length;
  const aiAnalysisStatus = submittedDocumentCount > 0 ? "Ready" : submittedDocuments.length > 0 ? "In Review" : "Not Started";
  const aiAnalysisStatusClass =
    aiAnalysisStatus === "Ready" ? "text-green" : aiAnalysisStatus === "In Review" ? "text-amber" : "text-gray";

  return (
    <AppLayout>
      <div className="dashboard-page">
        {/* Profile Incomplete Popup */}
        {showProfilePopup && isSetupReady && (
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

        {!isSetupReady ? (
          <div className="dashboard-empty-state empty-state">
            <div className="dashboard-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 9h10" />
                <path d="M7 13h6" />
              </svg>
            </div>
            <h2>No data to show</h2>
            <p>Complete your profile and add funding requirements to unlock your dashboard insights.</p>
            <div className="dashboard-empty-actions">
              <Link href="/profile/" className={`btn dashboard-empty-action ${isProfileComplete ? "btn-outline-green" : "btn-green"}`}>
                {isProfileComplete ? (
                  <>
                    <svg className="dashboard-empty-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="5,13 10,18 19,7" />
                    </svg>
                    Profile Completed
                  </>
                ) : (
                  "Complete Profile"
                )}
              </Link>
              <Link href="/funding-requirements/" className={`btn dashboard-empty-action ${isFundingComplete ? "btn-outline-green" : "btn-green"}`}>
                {isFundingComplete ? (
                  <>
                    <svg className="dashboard-empty-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="5,13 10,18 19,7" />
                    </svg>
                    Funding Requirement Added
                  </>
                ) : (
                  "Add Funding Requirement"
                )}
              </Link>
            </div>
            {submittedDocuments.length > 0 && (
              <div className="dashboard-submitted-documents">
                <h3>Uploaded Documents</h3>
                <div className="dashboard-submitted-list">
                  {submittedDocuments.map((document) => (
                    <div key={document.id} className="dashboard-submitted-item">
                      <button
                        className="dashboard-submitted-delete-icon"
                        onClick={() => handleDeleteSubmittedDocument(document.id)}
                        aria-label={`Delete ${document.name}`}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3,6 5,6 21,6" />
                          <path d="M19,6l-1,14a2,2 0 0 1-2,2H8a2,2 0 0 1-2-2L5,6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                      <div className="dashboard-submitted-copy">
                        <strong>{document.name}</strong>
                        <span>{document.typeLabel} submitted</span>
                        <span>{document.sizeLabel}{document.confidential ? " • Confidential" : ""}</span>
                        <div className="dashboard-bank-chips">
                          {document.sendToAllBanks ? (
                            <span className="dashboard-bank-chip">Sending to all banks</span>
                          ) : (
                            (document.selectedBanks ?? []).map((bank) => (
                              <span key={bank} className="dashboard-bank-chip">{bank}</span>
                            ))
                          )}
                        </div>
                      </div>
                      <div className="dashboard-submitted-actions">
                        <button className="btn btn-green dashboard-submitted-submit" onClick={() => handleSubmitDocument(document)}>
                          {`Submit ${document.typeLabel}`}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
        <>
        {/* Top Stats Row */}
        <div className="dashboard-stats-row">
          {/* Profile Status */}
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
            <span className="stat-box-label">Profile Status</span>
            <span className={`stat-box-value ${isProfileComplete ? "text-green" : "text-gray"}`}>
              {isProfileComplete ? "Complete" : "Pending"}
            </span>
            <span className="stat-box-sub">Onboarding completion</span>
          </div>

          {/* Funding Requirement */}
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
            <span className="stat-box-label">Funding Requirement</span>
            <div className="stat-box-value-row">
              <span className="stat-box-value">{fundingAmount}</span>
            </div>
            <span className="stat-box-sub">{`${fundingType} • ${fundingTimeline}`}</span>
          </div>

          {/* Documents Submitted */}
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
            <span className="stat-box-label">Documents Submitted</span>
            <div className="stat-box-value-row">
              <span className="stat-box-value">{submittedDocumentCount}</span>
              <span className="stat-box-sub">Submitted</span>
            </div>
          </div>

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
            <span className={`stat-box-value ${aiAnalysisStatusClass}`}>{aiAnalysisStatus}</span>
            <span className="stat-box-sub">
              {aiAnalysisStatus === "Ready" ? "Report available" : aiAnalysisStatus === "In Review" ? "Awaiting submission" : "Upload documents to begin"}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-main-grid">
          {/* Right Column - Advisory, Notifications, Messages */}
          <div className="dashboard-right-col">
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
            <button
              className={`next-step-box ${showUploadGuidance ? "next-step-box-guided" : ""}`}
              type="button"
              onClick={handleOpenUploadModal}
            >
              {showUploadGuidance && (
                <div className="dashboard-guidance-tooltip">
                  <button
                    type="button"
                    className="dashboard-guidance-close"
                    aria-label="Dismiss guidance"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDismissUploadGuidance();
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                  <strong>Next step</strong>
                  <span>Add documents here to start building your dashboard data.</span>
                </div>
              )}
              <div className="next-step-icon icon-green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17,8 12,3 7,8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <h4>Upload Document</h4>
              <p>Share Financial Data</p>
            </button>
          </div>
        </div>
        {submittedDocuments.length > 0 && (
          <div className="dashboard-submitted-documents">
            <h2 className="section-heading">Uploaded Documents</h2>
            <div className="dashboard-submitted-list">
              {submittedDocuments.map((document) => (
                <div key={document.id} className="dashboard-submitted-item">
                  <button
                    className="dashboard-submitted-delete-icon"
                    onClick={() => handleDeleteSubmittedDocument(document.id)}
                    aria-label={`Delete ${document.name}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6" />
                      <path d="M19,6l-1,14a2,2 0 0 1-2,2H8a2,2 0 0 1-2-2L5,6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                  <div className="dashboard-submitted-copy">
                    <strong>{document.name}</strong>
                    <span>{document.typeLabel} submitted</span>
                    <span>{document.sizeLabel}{document.confidential ? " • Confidential" : ""}</span>
                    <div className="dashboard-bank-chips">
                      {document.sendToAllBanks ? (
                        <span className="dashboard-bank-chip">Sending to all banks</span>
                      ) : (
                        (document.selectedBanks ?? []).map((bank) => (
                          <span key={bank} className="dashboard-bank-chip">{bank}</span>
                        ))
                      )}
                    </div>
                  </div>
                  {!processedDocumentIds.includes(document.id) && (
                    <div className="dashboard-submitted-actions">
                      <button className="btn btn-green dashboard-submitted-submit" onClick={() => handleSubmitDocument(document)}>
                        {`Submit ${document.typeLabel}`}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        </>
        )}
        {submittedSuccessDocument && (
          <div className="modal-overlay">
            <div className="dashboard-success-modal">
              <div className="dashboard-success-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#22c55e" />
                  <polyline points="8,12 11,15 16,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2>Submitted successfully</h2>
              <p>{submittedSuccessDocument.name} has been added to your Documents screen.</p>
            </div>
          </div>
        )}
        <UploadDocumentModal
          open={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSubmitComplete={handleDocumentsSubmitted}
        />
      </div>
    </AppLayout>
  );
}
