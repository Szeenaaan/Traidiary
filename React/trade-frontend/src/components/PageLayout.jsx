import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './PageLayout.css';

function PageLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="page-layout">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <header className="page-header">
        <button
          className="page-header-back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5"
               strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        <div
          className="page-header-logo"
          onClick={() => navigate('/')}
          title="Go to home"
        >
          <span className="page-logo-dot" />
          Tradiary
        </div>

        <button
          className="page-header-hamburger"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Page content injected here */}
      {children}
    </div>
  );
}

export default PageLayout;
