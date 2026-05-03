import Header from './Header';
import './SectionOne.css';

const newsData = [
  {
    id: 1,
    tag: 'Markets',
    title: 'Global Indices Surge Amid Easing Inflation Data',
    excerpt:
      'Major stock indices posted notable gains as investors reacted positively to cooler-than-expected inflation figures released this morning.',
    date: 'Apr 26, 2026',
    readTime: '3 min read',
  },
  {
    id: 2,
    tag: 'Trading',
    title: 'Commodities Rally: Gold Breaks Key Resistance Level',
    excerpt:
      'Gold prices climbed past the $2,800 mark as safe-haven demand rises amid geopolitical uncertainty and a weakening dollar index.',
    date: 'Apr 26, 2026',
    readTime: '4 min read',
  },
  {
    id: 3,
    tag: 'Analysis',
    title: 'Tech Sector Outlook: Q2 Earnings Season Preview',
    excerpt:
      'Analysts are watching closely as major technology firms prepare to report earnings, with expectations of strong AI-driven revenue growth.',
    date: 'Apr 25, 2026',
    readTime: '5 min read',
  },
];

function SectionOne({ onOpenSidebar }) {
  const scrollDown = () => {
    document.getElementById('section-two')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-one" id="section-one">

      {/* HEADER — 1/4 of section */}
      <div className="section-one-header">
        <Header onOpenSidebar={onOpenSidebar} />
      </div>

      {/* BODY — 3/4 of section */}
      <div className="section-one-body">
        <span className="news-section-title">Latest Market News</span>

        <div className="news-grid">
          {newsData.map((item, index) => (
            <div key={item.id} className={`news-card card-${index + 1}`}>
              <div className="news-tag">{item.tag}</div>
              <div className="news-title">{item.title}</div>
              <div className="news-excerpt">{item.excerpt}</div>
              <div className="news-meta">
                <span>{item.date}</span>
                <span>{item.readTime}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-cue" onClick={scrollDown} aria-label="Scroll to next section">
          <span>About Us</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

    </section>
  );
}

export default SectionOne;
