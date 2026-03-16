"use client";

import { useState } from "react";
import AppLayout from "../../components/AppLayout";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const transactions = [
    {
      id: "TXN-2026-001",
      date: "Feb 12, 2026",
      description: "Advisory Session Payment",
      recipient: "Sarah Blake - Financial Advisor",
      type: "debit",
      amount: 250.00,
      status: "completed",
      category: "Advisory",
    },
    {
      id: "TXN-2026-002",
      date: "Feb 10, 2026",
      description: "Funding Received",
      recipient: "Business Line of Credit",
      type: "credit",
      amount: 15000.00,
      status: "completed",
      category: "Funding",
    },
    {
      id: "TXN-2026-003",
      date: "Feb 08, 2026",
      description: "Document Processing Fee",
      recipient: "Dettelinks Services",
      type: "debit",
      amount: 49.99,
      status: "completed",
      category: "Services",
    },
    {
      id: "TXN-2026-004",
      date: "Feb 05, 2026",
      description: "AI Analysis Report",
      recipient: "Premium AI Package",
      type: "debit",
      amount: 199.00,
      status: "pending",
      category: "AI Services",
    },
    {
      id: "TXN-2026-005",
      date: "Feb 03, 2026",
      description: "Refund - Cancelled Session",
      recipient: "Advisory Session Refund",
      type: "credit",
      amount: 150.00,
      status: "completed",
      category: "Refund",
    },
    {
      id: "TXN-2026-006",
      date: "Feb 01, 2026",
      description: "Monthly Subscription",
      recipient: "Dettelinks Pro Plan",
      type: "debit",
      amount: 99.00,
      status: "completed",
      category: "Subscription",
    },
    {
      id: "TXN-2026-007",
      date: "Jan 28, 2026",
      description: "Wire Transfer",
      recipient: "External Bank Account",
      type: "debit",
      amount: 5000.00,
      status: "failed",
      category: "Transfer",
    },
    {
      id: "TXN-2026-008",
      date: "Jan 25, 2026",
      description: "Investment Return",
      recipient: "Portfolio Dividend",
      type: "credit",
      amount: 875.50,
      status: "completed",
      category: "Investment",
    },
  ];

  const stats = {
    totalIncome: transactions.filter(t => t.type === "credit" && t.status === "completed").reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions.filter(t => t.type === "debit" && t.status === "completed").reduce((sum, t) => sum + t.amount, 0),
    pendingAmount: transactions.filter(t => t.status === "pending").reduce((sum, t) => sum + t.amount, 0),
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "pending":
        return "status-pending";
      case "failed":
        return "status-failed";
      default:
        return "";
    }
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.recipient.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || txn.type === typeFilter;
    const matchesStatus = !statusFilter || txn.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="transactions-page">
        {/* Header */}
        <div className="transactions-header">
          <div className="transactions-header-left">
            <h1 className="page-title">Transactions</h1>
            <p className="page-subtitle">View and manage your financial transactions</p>
          </div>
          <button className="export-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>

        {/* Stats Cards */}
        <div className="transactions-stats">
          <div className="transaction-stat-card">
            <div className="stat-card-icon income">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                <polyline points="17,6 23,6 23,12" />
              </svg>
            </div>
            <div className="stat-card-content">
              <span className="stat-card-label">Total Income</span>
              <span className="stat-card-value income">{formatCurrency(stats.totalIncome)}</span>
            </div>
          </div>
          <div className="transaction-stat-card">
            <div className="stat-card-icon expense">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" />
                <polyline points="17,18 23,18 23,12" />
              </svg>
            </div>
            <div className="stat-card-content">
              <span className="stat-card-label">Total Expenses</span>
              <span className="stat-card-value expense">{formatCurrency(stats.totalExpenses)}</span>
            </div>
          </div>
          <div className="transaction-stat-card">
            <div className="stat-card-icon pending">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
            </div>
            <div className="stat-card-content">
              <span className="stat-card-label">Pending</span>
              <span className="stat-card-value pending">{formatCurrency(stats.pendingAmount)}</span>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="transactions-filters">
          <div className="transactions-search">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="transactions-search-input"
            />
          </div>
          <div className="transactions-filter-selects">
            <div className="filter-select-wrapper">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">All Types</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
              <svg className="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
            <div className="filter-select-wrapper">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <svg className="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
            <div className="filter-select-wrapper">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <svg className="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>TRANSACTION ID</th>
                <th>DATE</th>
                <th>DESCRIPTION</th>
                <th>CATEGORY</th>
                <th>TYPE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td>
                    <span className="txn-id">{txn.id}</span>
                  </td>
                  <td>
                    <span className="txn-date">{txn.date}</span>
                  </td>
                  <td>
                    <div className="txn-description">
                      <span className="txn-desc-title">{txn.description}</span>
                      <span className="txn-desc-recipient">{txn.recipient}</span>
                    </div>
                  </td>
                  <td>
                    <span className="txn-category">{txn.category}</span>
                  </td>
                  <td>
                    <span className={`txn-type ${txn.type}`}>
                      {txn.type === "credit" ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="19" x2="12" y2="5" />
                          <polyline points="5,12 12,5 19,12" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <polyline points="19,12 12,19 5,12" />
                        </svg>
                      )}
                      {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={`txn-amount ${txn.type}`}>
                      {txn.type === "credit" ? "+" : "-"}{formatCurrency(txn.amount)}
                    </span>
                  </td>
                  <td>
                    <span className={`txn-status ${getStatusClass(txn.status)}`}>
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="txn-actions">
                      <button className="txn-action-btn" title="View Details">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button className="txn-action-btn" title="Download Receipt">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7,10 12,15 17,10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                      <button className="txn-action-btn" title="More Options">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="transactions-pagination">
          <div className="pagination-info">
            Showing <strong>1-{filteredTransactions.length}</strong> of <strong>{transactions.length}</strong> transactions
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled={currentPage === 1}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6" />
              </svg>
              Previous
            </button>
            <div className="pagination-pages">
              <button className="pagination-page active">1</button>
              <button className="pagination-page">2</button>
              <button className="pagination-page">3</button>
            </div>
            <button className="pagination-btn">
              Next
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
