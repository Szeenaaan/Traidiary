import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import './Courses.css';

/* ── 12 courses: 3 cols × 4 rows ── */
const coursesData = [
  {
    id: 1,
    tag: 'Fundamentals',
    title: 'Introduction to Trading',
    desc: 'Learn the building blocks of financial markets — how stocks, forex and indices work and how trades are executed.',
    thumb: 'thumb-blue',
    icon: '📈',
    lessons: 14,
    hours: '6h 30m',
    level: 'beginner',
  },
  {
    id: 2,
    tag: 'Analysis',
    title: 'Technical Analysis Masterclass',
    desc: 'Master candlestick patterns, support & resistance, moving averages and the most popular chart indicators.',
    thumb: 'thumb-gold',
    icon: '🕯️',
    lessons: 22,
    hours: '11h 00m',
    level: 'intermediate',
  },
  {
    id: 3,
    tag: 'Strategy',
    title: 'Building Your Trading System',
    desc: 'Design a rules-based trading strategy from entry to exit — including back-testing and optimisation techniques.',
    thumb: 'thumb-teal',
    icon: '⚙️',
    lessons: 18,
    hours: '9h 15m',
    level: 'intermediate',
  },
  {
    id: 4,
    tag: 'Risk',
    title: 'Risk & Money Management',
    desc: 'Understand position sizing, risk-to-reward ratios and how to protect your capital through any market condition.',
    thumb: 'thumb-red',
    icon: '🛡️',
    lessons: 12,
    hours: '5h 45m',
    level: 'beginner',
  },
  {
    id: 5,
    tag: 'Psychology',
    title: 'Trading Psychology & Discipline',
    desc: 'Tackle the emotional side of trading — overcoming fear, greed and revenge trading with proven mental frameworks.',
    thumb: 'thumb-purple',
    icon: '🧠',
    lessons: 10,
    hours: '4h 30m',
    level: 'beginner',
  },
  {
    id: 6,
    tag: 'Forex',
    title: 'Forex Trading Essentials',
    desc: 'Explore the world\'s largest financial market — currency pairs, pips, leverage, sessions and major macro drivers.',
    thumb: 'thumb-green',
    icon: '💱',
    lessons: 16,
    hours: '8h 00m',
    level: 'intermediate',
  },
  {
    id: 7,
    tag: 'Options',
    title: 'Options Trading for Beginners',
    desc: 'Demystify calls, puts, strikes and expiry dates. Learn how to hedge positions and generate income with options.',
    thumb: 'thumb-blue',
    icon: '🔁',
    lessons: 20,
    hours: '10h 20m',
    level: 'intermediate',
  },
  {
    id: 8,
    tag: 'Crypto',
    title: 'Crypto Markets & DeFi',
    desc: 'Navigate digital asset markets — Bitcoin cycles, altcoin seasons, on-chain metrics and DeFi opportunities.',
    thumb: 'thumb-gold',
    icon: '₿',
    lessons: 15,
    hours: '7h 30m',
    level: 'intermediate',
  },
  {
    id: 9,
    tag: 'Advanced',
    title: 'Algorithmic & Quant Trading',
    desc: 'Write and deploy systematic strategies using Python — back-testing frameworks, live APIs and performance analytics.',
    thumb: 'thumb-teal',
    icon: '🤖',
    lessons: 28,
    hours: '14h 00m',
    level: 'advanced',
  },
  {
    id: 10,
    tag: 'Futures',
    title: 'Futures & Commodities Trading',
    desc: 'Trade crude oil, gold, wheat and equity index futures — from contract specs to roll strategies and hedging.',
    thumb: 'thumb-red',
    icon: '🛢️',
    lessons: 17,
    hours: '8h 45m',
    level: 'intermediate',
  },
  {
    id: 11,
    tag: 'Journal',
    title: 'Trade Journaling & Performance',
    desc: 'Learn how to log, review and improve your trades with data-driven journaling habits inside Tradiary.',
    thumb: 'thumb-purple',
    icon: '📓',
    lessons: 9,
    hours: '3h 50m',
    level: 'beginner',
  },
  {
    id: 12,
    tag: 'Advanced',
    title: 'Institutional Order Flow',
    desc: 'Decode smart money concepts — order blocks, liquidity sweeps and imbalances used by institutional traders.',
    thumb: 'thumb-green',
    icon: '🏦',
    lessons: 24,
    hours: '13h 00m',
    level: 'advanced',
  },
];

const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const levelClass = {
  beginner:     'level-beginner',
  intermediate: 'level-intermediate',
  advanced:     'level-advanced',
};

function Courses() {
  const [activeFilter, setActiveFilter] = useState('All');

  const visible = activeFilter === 'All'
    ? coursesData
    : coursesData.filter(
        (c) => c.level === activeFilter.toLowerCase()
      );

  return (
    <PageLayout>
      <div className="courses-content">

        {/* Title row */}
        <div className="courses-title-row">
          <h1 className="courses-title">Courses</h1>
          <span className="courses-count">{visible.length} courses</span>
        </div>

        {/* Filter bar */}
        <div className="courses-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* 3 × 4 grid */}
        <div className="courses-grid">
          {visible.map((course) => (
            <div key={course.id} className="course-card">

              {/* Thumbnail */}
              <div className={`course-thumb ${course.thumb}`}>
                <span className="course-thumb-icon">{course.icon}</span>
              </div>

              {/* Body */}
              <div className="course-body">
                <div className="course-tag">{course.tag}</div>
                <div className="course-title">{course.title}</div>
                <div className="course-desc">{course.desc}</div>

                {/* Meta */}
                <div className="course-meta">
                  <div className="course-meta-info">
                    <span className="course-meta-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2"
                           strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                      {course.lessons} lessons
                    </span>
                    <span className="course-meta-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2"
                           strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {course.hours}
                    </span>
                  </div>
                  <span className={`course-level ${levelClass[course.level]}`}>
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Enroll */}
              <button className="course-enroll">
                Enroll Now
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5"
                     strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

            </div>
          ))}
        </div>

      </div>
    </PageLayout>
  );
}

export default Courses;
