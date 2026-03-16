"use client";

import { useRouter } from "next/navigation";
import AppLayout from "../../../../../components/AppLayout";
import Link from "next/link";

interface AdvisorProfileClientProps {
  advisorId: string;
}

export default function AdvisorProfileClient({ advisorId }: AdvisorProfileClientProps) {
  const router = useRouter();

  // Mock advisor data - in real app, fetch based on ID
  const advisors: Record<string, any> = {
    "1": {
      id: 1,
      name: "Sarah Lavoski",
      role: "Senior Financial Advisor",
      specialties: ["Working Capital", "Liquidity Strategy", "SME Financing", "Cash Flow Management"],
      rating: 4.9,
      reviews: 89,
      sessions: "120+",
      experience: "8+ Years",
      languages: ["English", "Spanish"],
      availability: "Mon - Fri",
      responseTime: "< 2 hours",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Sarah is a seasoned financial advisor with over 8 years of experience helping businesses optimize their working capital and liquidity strategies. She has successfully guided over 120 clients through complex financial decisions, specializing in SME financing and cash flow management.",
      education: [
        { degree: "MBA in Finance", school: "Harvard Business School", year: "2016" },
        { degree: "BS in Economics", school: "Stanford University", year: "2012" },
      ],
      certifications: ["CFA Charterholder", "Certified Financial Planner (CFP)", "Series 7 & 66 Licensed"],
      recentReviews: [
        { name: "John M.", rating: 5, date: "2 weeks ago", comment: "Sarah helped us secure a $2M line of credit. Her expertise in SME financing was invaluable." },
        { name: "Emily R.", rating: 5, date: "1 month ago", comment: "Excellent advisor! She provided clear guidance on our liquidity strategy and helped improve our cash flow by 30%." },
        { name: "David K.", rating: 4, date: "1 month ago", comment: "Very knowledgeable and professional. Highly recommend for any working capital needs." },
      ],
    },
    "2": {
      id: 2,
      name: "Sarah Lavoski",
      role: "Senior Financial Advisor",
      specialties: ["Working Capital", "Liquidity Strategy", "SME Financing", "Cash Flow Management"],
      rating: 4.9,
      reviews: 89,
      sessions: "120+",
      experience: "8+ Years",
      languages: ["English", "Spanish"],
      availability: "Mon - Fri",
      responseTime: "< 2 hours",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Sarah is a seasoned financial advisor with over 8 years of experience helping businesses optimize their working capital and liquidity strategies.",
      education: [
        { degree: "MBA in Finance", school: "Harvard Business School", year: "2016" },
      ],
      certifications: ["CFA Charterholder", "Certified Financial Planner (CFP)"],
      recentReviews: [
        { name: "John M.", rating: 5, date: "2 weeks ago", comment: "Sarah helped us secure a $2M line of credit." },
      ],
    },
    "3": {
      id: 3,
      name: "Michael Chen",
      role: "Senior Financial Advisor",
      specialties: ["M&A Advisory", "Due Diligence", "Valuation", "Strategic Planning"],
      rating: 4.8,
      reviews: 67,
      sessions: "89+",
      experience: "10+ Years",
      languages: ["English", "Mandarin"],
      availability: "Mon - Sat",
      responseTime: "< 1 hour",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Michael is an expert in mergers and acquisitions with a decade of experience advising companies on strategic transactions, valuations, and due diligence processes.",
      education: [
        { degree: "MBA", school: "Wharton School of Business", year: "2014" },
        { degree: "BS in Finance", school: "UC Berkeley", year: "2010" },
      ],
      certifications: ["CFA Charterholder", "Certified Valuation Analyst (CVA)"],
      recentReviews: [
        { name: "Alex P.", rating: 5, date: "1 week ago", comment: "Michael's M&A expertise was crucial for our acquisition." },
        { name: "Lisa T.", rating: 5, date: "3 weeks ago", comment: "Thorough due diligence work. Highly professional." },
      ],
    },
    "4": {
      id: 4,
      name: "Emily Rodriguez",
      role: "Investment Specialist",
      specialties: ["Private Equity", "Venture Capital", "Growth Strategy", "Fundraising"],
      rating: 4.7,
      reviews: 112,
      sessions: "156+",
      experience: "12+ Years",
      languages: ["English", "Portuguese"],
      availability: "Mon - Fri",
      responseTime: "< 3 hours",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Emily specializes in helping startups and growth-stage companies navigate fundraising, from seed rounds to Series B and beyond. Her network includes top VCs and PE firms.",
      education: [
        { degree: "MBA", school: "Columbia Business School", year: "2012" },
      ],
      certifications: ["Certified Private Equity Professional", "Series 79 Licensed"],
      recentReviews: [
        { name: "Mark S.", rating: 5, date: "2 weeks ago", comment: "Emily helped us close our Series A. Amazing network and negotiation skills." },
        { name: "Rachel W.", rating: 4, date: "1 month ago", comment: "Great guidance on our fundraising strategy." },
      ],
    },
  };

  const advisor = advisors[advisorId] || advisors["1"];

  const handleSelectAdvisor = () => {
    router.push(`/advisory/schedule/step2?advisor=${advisor.id}`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="star-filled">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <svg key="half" viewBox="0 0 24 24" fill="currentColor" className="star-half">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <AppLayout>
      <div className="advisor-profile-page">
        {/* Header */}
        <div className="advisor-profile-header">
          <Link href="/advisory/schedule" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
            Back to Select Advisor
          </Link>
        </div>

        <div className="advisor-profile-content">
          {/* Left Column - Main Info */}
          <div className="advisor-profile-main">
            {/* Profile Card */}
            <div className="advisor-profile-card">
              <div className="advisor-profile-top">
                <div className="advisor-profile-avatar">
                  <img src={advisor.image} alt={advisor.name} />
                  <span className="advisor-online-badge"></span>
                </div>
                <div className="advisor-profile-info">
                  <h1 className="advisor-profile-name">{advisor.name}</h1>
                  <p className="advisor-profile-role">{advisor.role}</p>
                  <div className="advisor-profile-rating">
                    <div className="stars-container">
                      {renderStars(advisor.rating)}
                    </div>
                    <span className="rating-value">{advisor.rating}</span>
                    <span className="rating-count">({advisor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="advisor-profile-bio">
                <h3>About</h3>
                <p>{advisor.bio}</p>
              </div>

              <div className="advisor-profile-specialties">
                <h3>Areas of Expertise</h3>
                <div className="specialty-tags-large">
                  {advisor.specialties.map((specialty: string, index: number) => (
                    <span key={index} className="specialty-tag-large">{specialty}</span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="advisor-profile-section">
                <h3>Education</h3>
                <div className="education-list">
                  {advisor.education.map((edu: any, index: number) => (
                    <div key={index} className="education-item">
                      <div className="education-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                        </svg>
                      </div>
                      <div className="education-details">
                        <span className="education-degree">{edu.degree}</span>
                        <span className="education-school">{edu.school}, {edu.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="advisor-profile-section">
                <h3>Certifications</h3>
                <div className="certifications-list">
                  {advisor.certifications.map((cert: string, index: number) => (
                    <div key={index} className="certification-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="6" />
                        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="advisor-reviews-card">
              <div className="reviews-header">
                <h3>Recent Reviews</h3>
                <span className="reviews-count">{advisor.reviews} total reviews</span>
              </div>
              <div className="reviews-list">
                {advisor.recentReviews.map((review: any, index: number) => (
                  <div key={index} className="review-item">
                    <div className="review-top">
                      <div className="review-author">
                        <div className="review-avatar">{review.name.charAt(0)}</div>
                        <div className="review-author-info">
                          <span className="review-name">{review.name}</span>
                          <span className="review-date">{review.date}</span>
                        </div>
                      </div>
                      <div className="review-rating">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="star-small">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Info & Actions */}
          <div className="advisor-profile-sidebar">
            {/* Quick Stats */}
            <div className="advisor-quick-stats">
              <h3>Quick Info</h3>
              <div className="quick-stat-item">
                <div className="quick-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className="quick-stat-content">
                  <span className="quick-stat-label">Experience</span>
                  <span className="quick-stat-value">{advisor.experience}</span>
                </div>
              </div>
              <div className="quick-stat-item">
                <div className="quick-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23,7 16,12 23,17 23,7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" />
                  </svg>
                </div>
                <div className="quick-stat-content">
                  <span className="quick-stat-label">Sessions Completed</span>
                  <span className="quick-stat-value">{advisor.sessions}</span>
                </div>
              </div>
              <div className="quick-stat-item">
                <div className="quick-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </div>
                <div className="quick-stat-content">
                  <span className="quick-stat-label">Availability</span>
                  <span className="quick-stat-value">{advisor.availability}</span>
                </div>
              </div>
              <div className="quick-stat-item">
                <div className="quick-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="quick-stat-content">
                  <span className="quick-stat-label">Response Time</span>
                  <span className="quick-stat-value">{advisor.responseTime}</span>
                </div>
              </div>
              <div className="quick-stat-item">
                <div className="quick-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className="quick-stat-content">
                  <span className="quick-stat-label">Languages</span>
                  <span className="quick-stat-value">{advisor.languages.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="advisor-profile-actions">
              <button className="btn btn-green btn-full" onClick={handleSelectAdvisor}>
                Select This Advisor
              </button>
              <button className="btn btn-outline-gray btn-full">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
