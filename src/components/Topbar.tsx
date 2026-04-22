import { useState } from 'react';
import type { User, Notification } from '../types';

interface TopbarProps {
  user: User;
  title: string;
  notifications: Notification[];
  onMenuClick: () => void;
}

const notifIcons: Record<string, string> = {
  danger: '🔴',
  warning: '🟠',
  info: 'ℹ️',
  success: '✅',
};

export default function Topbar({ user, title, notifications, onMenuClick }: TopbarProps) {
  const [showNotif, setShowNotif] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-hamburger" onClick={onMenuClick}>&#9776;</button>
        <h1 className="topbar-title">{title}</h1>
      </div>

      <div className="topbar-right">
        {/* Notification bell */}
        <div style={{ position: 'relative' }}>
          <button
            className="topbar-notif-btn"
            onClick={() => setShowNotif((s) => !s)}
            title="Powiadomienia"
          >
            🔔
            {unread > 0 && <span className="topbar-notif-dot" />}
          </button>

          {showNotif && (
            <div
              className="topbar-notif-dropdown"
              style={{
                position: 'absolute',
                top: '46px',
                right: 0,
                width: '360px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 200,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Powiadomienia
                </span>
                {unread > 0 && <span className="badge badge-danger">{unread} nowe</span>}
              </div>
              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--border)',
                      display: 'flex',
                      gap: '10px',
                      background: n.read ? 'transparent' : 'var(--bg)',
                    }}
                  >
                    <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>
                      {notifIcons[n.type]}
                    </span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {n.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {n.message}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
                        {n.date}
                      </div>
                    </div>
                    {!n.read && (
                      <div
                        style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: 'var(--danger)', flexShrink: 0, marginTop: 4,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px 16px', textAlign: 'center' }}>
                <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>
                  Oznacz wszystkie jako przeczytane
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User chip */}
        <div className="topbar-user">
          <div className="topbar-avatar">{user.avatarInitials}</div>
          <div>
            <div className="topbar-user-name">{user.name}</div>
            <div className="topbar-user-company">{user.company}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
