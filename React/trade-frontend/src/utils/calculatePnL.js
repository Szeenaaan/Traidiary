/*const SYMBOL_CONFIG = {
  EURUSD: { tickSize: 0.0001, tickValue: 10 },
  GBPUSD: { tickSize: 0.0001, tickValue: 10 },
  USDJPY: { tickSize: 0.01, tickValue: 10 },
  USDCHF: { tickSize: 0.0001, tickValue: 10 },
  AUDUSD: { tickSize: 0.0001, tickValue: 10 },
  USDCAD: { tickSize: 0.0001, tickValue: 10 },
  NZDUSD: { tickSize: 0.0001, tickValue: 10 },

  XAUUSD: { tickSize: 0.01, tickValue: 1 },  // GOLD
  XAGUSD: { tickSize: 0.01, tickValue: 5 }   // SILVER
};

export const calculatePnL = (trade) => {
  const entry = Number(trade.entryPrice);
  const exit = Number(trade.exitPrice);
  const lot = Number(trade.lotSize);

  const config = SYMBOL_CONFIG[trade.symbol] || SYMBOL_CONFIG["EURUSD"];

  let priceDiff =
    trade.type === "BUY"
      ? exit - entry
      : entry - exit;

  const ticks = priceDiff / config.tickSize;

  return ticks * config.tickValue * lot;
};*/