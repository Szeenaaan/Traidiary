import { useEffect, useState } from "react";
import { getTrades, addTrade, deleteTrade, updateTrade } from "../api/tradeApi";
import TradeList from "../components/TradeList";
import TradeForm from "../components/TradeForm";
import Loader from "../components/Loader";
import "./dashboard.css";

function Dashboard() {
  const [trades, setTrades] = useState([]);
  const [editTrade, setEditTrade] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [strategyFilter, setStrategyFilter] = useState("ALL");
  const [message, setMessage] = useState("");
  const [session, setSession] = useState("");
  const [sortOption, setSortOption] = useState("LATEST");
  const [stats, setStats] = useState({ totalPnL: 0, winRate: 0 });
  const [loading, setLoading] = useState(false); // ✅ FIXED

  const pageSize = 10;
  const totalPages = Math.ceil(totalCount / pageSize);

  const [form, setForm] = useState({
    entryPrice: "",
    exitPrice: "",
    lotSize: "",
    strategy: "",
    type: "BUY",
    market: "FOREX",
    symbol: "EURUSD",
    time: ""
  });

  // 🔥 FETCH TRADES
  const fetchTrades = async () => {
    try {
      setLoading(true);

      const result = await getTrades(page, pageSize, session);

      console.log("API RESULT:", result);

      // ✅ FIXED MAPPING
      setTrades(result.trades);
      setTotalCount(result.totalCount);

    } catch (err) {
      console.error("Fetch error:", err);
      setTrades([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FETCH STATS
  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5230/api/trade/stats");
      if (!res.ok) throw new Error("Stats API failed");

      const data = await res.json();

      setStats({
        totalPnL: data?.totalPnL ?? 0,
        winRate: data?.winRate ?? 0
      });

    } catch (err) {
      console.error("Stats error:", err);
      setStats({ totalPnL: 0, winRate: 0 });
    }
  };

  useEffect(() => {
    fetchTrades();
  }, [page, session]);

  useEffect(() => {
    fetchStats();
  }, []);

  // 🔥 EDIT
  const handleEdit = (trade) => {
    setEditTrade(trade);

    setForm({
      entryPrice: trade.entryPrice,
      exitPrice: trade.exitPrice,
      lotSize: trade.lotSize,
      strategy: trade.strategy,
      type: trade.type,
      symbol: trade.symbol,
      time: trade.tradeDate
        ? new Date(trade.tradeDate).toISOString().substring(11, 16) // ✅ FIXED
        : ""
    });
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trade?")) return;

    await deleteTrade(id);
    await fetchTrades();
    await fetchStats();
  };

  // 🔥 RESET FILTERS
  const handleResetFilters = () => {
    setSession("");
    setTypeFilter("ALL");
    setStrategyFilter("ALL");
    setPage(1);
  };

  // 🔥 SORT
  const sortedTrades = [...trades].sort((a, b) => {
    if (sortOption === "LATEST") return b.id - a.id;
    if (sortOption === "OLDEST") return a.id - b.id;
    return 0;
  });

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">Trade Journal</h1>

      {/* FORM */}
      <TradeForm
        form={form}
        setForm={setForm}
        editTrade={editTrade}
        setEditTrade={setEditTrade}

        onAdd={async () => {
          await addTrade({
            entryPrice: parseFloat(form.entryPrice),
            exitPrice: parseFloat(form.exitPrice),
            lotSize: parseFloat(form.lotSize),
            strategy: form.strategy,
            type: form.type,
            time: form.time,
            symbol: form.symbol
          });

          setMessage("Trade added successfully!");
          setTimeout(() => setMessage(""), 2000); // ✅ UX FIX

          setForm({
            entryPrice: "",
            exitPrice: "",
            lotSize: "",
            strategy: "",
            type: "BUY",
            market: "FOREX",
            symbol: "EURUSD",
            time: ""
          });

          await fetchTrades();
          await fetchStats();
        }}

        onUpdate={async () => {
          await updateTrade(editTrade.id, {
            entryPrice: parseFloat(form.entryPrice),
            exitPrice: parseFloat(form.exitPrice),
            lotSize: parseFloat(form.lotSize),
            strategy: form.strategy,
            type: form.type,
            symbol: form.symbol
          });

          setMessage("Trade updated successfully!");
          setTimeout(() => setMessage(""), 2000); // ✅ UX FIX

          setEditTrade(null);

          setForm({
            entryPrice: "",
            exitPrice: "",
            lotSize: "",
            strategy: "",
            type: "BUY",
            symbol: "EURUSD",
            time: ""
          });

          await fetchTrades();
          await fetchStats();
        }}
      />

      {/* MESSAGE */}
      {message && <p className="success-message">{message}</p>}

      {/* STATS */}
      <div className="stats-container">
        <div className="stat-card">
          <p>Total PnL</p>
          <h2 className={stats.totalPnL >= 0 ? "profit" : "loss"}>
            {Number(stats.totalPnL || 0).toFixed(2)}
          </h2>
        </div>

        <div className="stat-card">
          <p>Win Rate</p>
          <h2>{Number(stats.winRate || 0).toFixed(2)}%</h2>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filters-container">

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="ALL">All Types</option>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>

        <select value={strategyFilter} onChange={(e) => setStrategyFilter(e.target.value)}>
          <option value="ALL">All Strategies</option>
          {[...new Set((trades || []).map((t) => t.strategy))].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select value={session} onChange={(e) => setSession(e.target.value)}>
          <option value="">All Sessions</option>
          <option value="asian">Asian</option>
          <option value="london">London</option>
          <option value="newyork">New York</option>
          <option value="london_ny">London–NY</option>
          <option value="asian_london">Asian–London</option>
        </select>

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="LATEST">Latest</option>
          <option value="OLDEST">Oldest</option>
        </select>

        <button className="btn-reset" onClick={handleResetFilters}>
          Reset
        </button>
      </div>

      {/* TABLE + LOADER */}
      {loading ? (
        <Loader label="Loading your trades..." />
      ) : (
        <TradeList
          trades={sortedTrades}
          onEdit={handleEdit}
          onDelete={handleDelete}
          editTrade={editTrade}
        />
      )}

      {/* PAGINATION */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
          Next
        </button>
      </div>

    </div>
  );
}

export default Dashboard;