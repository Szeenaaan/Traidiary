import './SectionTwo.css';

const pills = [
  '📓 Trade Journal',
  '📈 Market Analytics',
  '🔔 Live News',
  '🧠 AI Insights',
];

function SectionTwo() {
  return (
    <section className="section-two" id="section-two">

      {/* DESCRIPTION — 3/4 */}
      <div className="description-area">
        <div className="description-card">
          <h2>
            Trade Smarter with <span>Tradiary</span>
          </h2>
          <p>
            Tradiary is your all-in-one personal trading journal and market intelligence
            platform. Whether you are a beginner learning the markets or a seasoned
            professional tracking complex positions, Tradiary helps you log every trade,
            analyse your performance, and stay ahead with curated financial news and
            real-time insights.
          </p>

          <div className="desc-pills">
            {pills.map((pill) => (
              <span key={pill} className="desc-pill">{pill}</span>
            ))}
          </div>

          <button className="desc-cta">
            Get Started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5"
                 strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* FOOTER — 1/4 */}
      <footer className="footer">
        <div className="footer-brand">
          © 2026 <strong>Tradiary</strong>
        </div>

        <nav className="footer-nav">
          <a href="#" className="footer-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Help
          </a>
          <div className="footer-divider" />
          <a href="#" className="footer-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            About
          </a>
        </nav>

        <span className="footer-copy">All rights reserved.</span>
      </footer>

    </section>
  );
}

export default SectionTwo;
