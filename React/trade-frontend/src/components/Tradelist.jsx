import "./Tradelist.css";

const IconEdit = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconDelete = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5"
       strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

function TradeList({ trades, onEdit, onDelete, editTrade }) {

  if (!trades || trades.length === 0) {
    return <p className="no-data">No trades found.</p>;
  }

  return (
    <div className="trade-table-container">
      <div className="trade-table-wrapper">
        <table className="trade-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Entry</th>
              <th>Exit</th>
              <th>Lot</th>
              <th>Strategy</th>
              <th>Type</th>
              <th>PnL</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {trades.map((trade) => {
              const pnl = trade.profitLoss;
              const isActive = editTrade && trade.id === editTrade.id;

              return (
                <tr
                  key={trade.id}
                  className={"trade-row" + (isActive ? " active-row" : "")}
                >
                  <td className="symbol">{trade.symbol}</td>
                  <td>{trade.entryPrice}</td>
                  <td>{trade.exitPrice}</td>
                  <td>{trade.lotSize}</td>
                  <td>{trade.strategy}</td>

                  <td>
                    <span className={trade.type === "BUY" ? "badge buy" : "badge sell"}>
                      {trade.type}
                    </span>
                  </td>

                  <td className={pnl >= 0 ? "pnl-profit" : "pnl-loss"}>
                    {pnl !== undefined && pnl !== null
                      ? Number(pnl).toFixed(2)
                      : "0.00"}
                  </td>

                  <td className="date">
                    {trade.tradeDate
                      ? new Date(trade.tradeDate).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </td>

                  <td className="actions">
                    <button className="btn-edit" onClick={() => onEdit(trade)}>
                      <IconEdit />
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => onDelete(trade.id)}>
                      <IconDelete />
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TradeList;