/*
  Trades.jsx
  ----------
  This file wraps YOUR existing Trades page content inside PageLayout
  so it shares the same sticky header + sidebar as every other page.

  USAGE:
  ──────
  Replace the <div className="trades-placeholder"> block below with your
  existing trades page JSX.  The PageLayout handles the header and sidebar
  automatically — you only need to provide the inner content.

  If your current Trades component is in a separate file you can also do:

      import MyTradesContent from './TradesContent';
      ...
      <PageLayout>
        <MyTradesContent />
      </PageLayout>
*/

import PageLayout from '../components/PageLayout';
import './Trades.css';

function Trades() {
  return (
    <PageLayout>
      {/* ── Replace everything inside here with your existing trades UI ── */}
      <div className="trades-content">
        <div className="trades-title-row">
          <h1 className="trades-title">My Trades</h1>
        </div>

        <div className="trades-placeholder">
          <span className="trades-placeholder-icon">📊</span>
          <p>Your trades page content goes here.</p>
          <small>Replace this block in <code>src/pages/Trades.jsx</code> with your existing UI.</small>
        </div>
      </div>
    </PageLayout>
  );
}

export default Trades;
