import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  {
    label: 'Trades',
    path: '/dashboard',
    badge: null,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    label: 'Courses',
    path: '/courses',
    badge: null,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    label: 'Notifications',
    //path: '/notifications',
    badge: '3',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

function Sidebar({ isOpen, onClose }) {
  const navigate  = useNavigate();
  const location  = useLocation();

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`sidebar-overlay${isOpen ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className={`sidebar-drawer${isOpen ? ' open' : ''}`} aria-label="Sidebar navigation">

        <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
          ✕
        </button>

        {/* User block */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">T</div>
          <div className="sidebar-username">Trader User</div>
          <div className="sidebar-role">Member</div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <span className="sidebar-nav-label">Menu</span>

          {navItems.map((item) => (
            <button
              key={item.label}
              className={`sidebar-link${location.pathname === item.path ? ' active' : ''}`}
              onClick={() => handleNav(item.path)}
            >
              {item.icon}
              {item.label}
              {item.badge && (
                <span className="sidebar-badge">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-footer-text">© 2026 Tradiary</span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;