import "./TradeForm.css";

function TradeForm({
  form,
  setForm,
  onAdd,
  onUpdate,
  editTrade,
  setEditTrade
}) {

        const FOREX_PAIRS = [
          "EURUSD",
          "GBPUSD",
          "USDJPY",
          "USDCHF",
          "AUDUSD",
          "USDCAD",
          "NZDUSD",
          "EURGBP"
        ];

 const handleChange = (e) => {
  const { name, value } = e.target;

  let updatedForm = { ...form, [name]: value };

  if (name === "market") {
    if (value === "GOLD") updatedForm.symbol = "XAUUSD";
    else if (value === "SILVER") updatedForm.symbol = "XAGUSD";
    else updatedForm.symbol = "EURUSD";
  }

  setForm(updatedForm);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await onUpdate();
  };

  return (
    
    <div className="trade-form-wrapper">
  <form
    onSubmit={editTrade ? handleUpdate : handleSubmit}
    className="trade-form"
  >

    {/* ROW 1 */}
    <div className="form-row">
      <div className="form-group">
        <label>Market</label>
        <select name="market" value={form.market} onChange={handleChange}>
          <option value="FOREX">FOREX</option>
          <option value="GOLD">GOLD</option>
          <option value="SILVER">SILVER</option>
        </select>
      </div>

      <div className="form-group">
        <label>Symbol</label>
        {form.market === "FOREX" ? (
          <select name="symbol" value={form.symbol} onChange={handleChange}>
            {FOREX_PAIRS.map((pair) => (
              <option key={pair} value={pair}>{pair}</option>
            ))}
          </select>
        ) : (
          <input name="symbol" value={form.symbol} readOnly className="input-readonly" />
        )}
      </div>
    </div>

    {/* ROW 2 */}
    <div className="form-row">
      <div className="form-group">
        <label>Entry</label>
        <input name="entryPrice" value={form.entryPrice} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Exit</label>
        <input name="exitPrice" value={form.exitPrice} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Lot</label>
        <input name="lotSize" value={form.lotSize} onChange={handleChange} />
      </div>
    </div>

    {/* ROW 3 */}
    <div className="form-row">
      <div className="form-group form-group-wide">
        <label>Strategy</label>
        <input name="strategy" value={form.strategy} onChange={handleChange} />
      </div>
    </div>

    {/* ROW 4 */}
    <div className="form-row">
      <div className="form-group">
        <label>Time</label>
        <input type="time" name="time" value={form.time || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Type</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>
      </div>
    </div>

    {/* ACTIONS */}
    <div className="form-actions">
      <button type="submit" className="btn-submit">
        {editTrade ? "Update Trade" : "Add Trade"}
      </button>

      {editTrade && (
        <button
          type="button"
          className="btn-cancel"
          onClick={() => setEditTrade(null)}
        >
          Cancel
        </button>
      )}
    </div>

  </form>
</div>
  );
}

export default TradeForm;