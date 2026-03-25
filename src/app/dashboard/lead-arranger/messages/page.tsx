"use client";

import { useState } from "react";
import AppLayout from "../../../../components/AppLayout";

export default function LeadArrangerMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Summit Credit Partners",
      role: "Falcon Energy Refinancing",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      time: "10:20 AM",
      preview: "Please share the management call windows for next week.",
      unread: 2,
    },
    {
      id: 2,
      name: "BlueHarbor Capital",
      role: "Atlas Logistics Growth Facility",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      time: "09:45 AM",
      preview: "We reviewed the teaser and would like a short lender call.",
      unread: 1,
    },
    {
      id: 3,
      name: "First Meridian Bank",
      role: "Northbridge Consumer Receivables",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      time: "Yesterday",
      preview: "NDA signed. Please confirm next document release.",
      unread: 0,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "other",
      text: "We reviewed the teaser and would like to understand the reserve account mechanics in more detail.",
      time: "09:32",
      read: true,
    },
    {
      id: 2,
      sender: "me",
      text: "Understood. I can share the latest summary pack and line up a call with the execution team this afternoon.",
      time: "09:41",
      read: true,
    },
    {
      id: 3,
      sender: "other",
      text: "That works. Please also confirm whether the current teaser version is final for recipient circulation.",
      time: "09:44",
      read: true,
    },
  ];

  const activeConversation = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText("");
    }
  };

  return (
    <AppLayout>
      <div className="messages-page">
        <div className="messages-header">
          <h1 className="page-title">Lead Arranger Messages</h1>
          <p className="page-subtitle">Manage lender, recipient, and mandate conversations without leaving the arranger workspace.</p>
        </div>

        <div className="messages-container">
          <div className="conversations-panel">
            <div className="conversations-search-row">
              <div className="conversations-search">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search counterparties"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="conversations-search-input"
                />
              </div>
              <button className="compose-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>

            <div className="conversations-list">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`conversation-item ${selectedConversation === conversation.id ? "active" : ""}`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="conversation-avatar">
                    <img src={conversation.avatar} alt={conversation.name} />
                  </div>
                  <div className="conversation-info">
                    <div className="conversation-header">
                      <span className="conversation-name">{conversation.name}</span>
                      <span className="conversation-time">{conversation.time}</span>
                    </div>
                    <span className="conversation-role">{conversation.role}</span>
                    <div className="conversation-preview-row">
                      <p className="conversation-preview">{conversation.preview}</p>
                      {conversation.unread > 0 && <span className="conversation-unread">{conversation.unread}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chat-panel">
            {activeConversation && (
              <div className="chat-header">
                <div className="chat-header-user">
                  <div className="chat-header-avatar">
                    <img src={activeConversation.avatar} alt={activeConversation.name} />
                  </div>
                  <div className="chat-header-info">
                    <span className="chat-header-name">{activeConversation.name}</span>
                    <span className="chat-header-status">{activeConversation.role}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="chat-messages">
              {messages.map((message) => (
                <div key={message.id} className={`chat-message ${message.sender === "me" ? "sent" : "received"}`}>
                  <div className="message-bubble">
                    <p className="message-text">{message.text}</p>
                  </div>
                  <div className="message-meta">
                    <span className="message-time">{message.time}</span>
                    {message.sender === "me" && message.read && (
                      <svg className="message-read-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12" />
                        <polyline points="16,6 5,17" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-area">
              <button className="attachment-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Reply to counterparty..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="chat-input"
              />
              <button className="send-btn" onClick={handleSendMessage}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
