"use client";

import { useState } from "react";
import AppLayout from "../../components/AppLayout";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Patrick John",
      role: "Financial Advisor",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      time: "2:40 PM",
      preview: "I have arranged a meeting for you at...",
      unread: 4,
    },
    {
      id: 2,
      name: "Anna John",
      role: "Credit Expert",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      time: "2:40 PM",
      preview: "I have arranged a meeting for you at...",
      unread: 4,
    },
    {
      id: 3,
      name: "Patrick John",
      role: "Funding Specialist",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      time: "2:40 PM",
      preview: "I have arranged a meeting for you at...",
      unread: 4,
    },
    {
      id: 4,
      name: "Patrick John",
      role: "Financial Advisor",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      time: "2:40 PM",
      preview: "I have arranged a meeting for you at...",
      unread: 0,
    },
    {
      id: 5,
      name: "Patrick John",
      role: "Financial Advisor",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      time: "2:40 PM",
      preview: "I have arranged a meeting for you at...",
      unread: 0,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "me",
      text: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis",
      time: "15:36",
      read: true,
    },
    {
      id: 2,
      sender: "other",
      text: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis",
      time: "15:36",
      read: true,
    },
    {
      id: 3,
      sender: "me",
      text: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis",
      time: "15:36",
      read: true,
    },
    {
      id: 4,
      sender: "other",
      text: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis",
      time: "15:36",
      read: true,
    },
    {
      id: 5,
      sender: "me",
      text: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis",
      time: "15:36",
      read: true,
    },
  ];

  const activeConversation = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle sending message
      setMessageText("");
    }
  };

  return (
    <AppLayout>
      <div className="messages-page">
        {/* Header */}
        <div className="messages-header">
          <h1 className="page-title">Messages</h1>
          <p className="page-subtitle">Your scheduled consultations & financial discussions</p>
        </div>

        {/* Messages Container */}
        <div className="messages-container">
          {/* Left Side - Conversation List */}
          <div className="conversations-panel">
            {/* Search and Compose */}
            <div className="conversations-search-row">
              <div className="conversations-search">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
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

            {/* Conversation List */}
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
                      {conversation.unread > 0 && (
                        <span className="conversation-unread">{conversation.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Chat View */}
          <div className="chat-panel">
            {/* Chat Header */}
            {activeConversation && (
              <div className="chat-header">
                <div className="chat-header-user">
                  <div className="chat-header-avatar">
                    <img src={activeConversation.avatar} alt={activeConversation.name} />
                  </div>
                  <div className="chat-header-info">
                    <span className="chat-header-name">{activeConversation.name}</span>
                    <span className="chat-header-status">active 10m ago</span>
                  </div>
                </div>
                <div className="chat-header-actions">
                  <button className="chat-action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </button>
                  <button className="chat-action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="23,7 16,12 23,17 23,7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" />
                    </svg>
                  </button>
                  <button className="chat-action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${message.sender === "me" ? "sent" : "received"}`}
                >
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

            {/* Message Input */}
            <div className="chat-input-area">
              <button className="attachment-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Type message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
