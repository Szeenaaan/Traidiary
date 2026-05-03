import './Header.css';

function Header({ onOpenSidebar }) {
  return (
    <header className="header">
      {/* LEFT — Sign Up + Login */}
      <div className="header-left">
        <button className="btn btn-ghost">Sign Up</button>
        <button className="btn btn-primary">Login</button>
      </div>

      {/* CENTER — Brand */}
      <div className="header-logo">
        <span className="logo-dot" />
        Tradiary
      </div>

      {/* RIGHT — Hamburger */}
      <div className="header-right">
        <button
          className="hamburger"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Header;
