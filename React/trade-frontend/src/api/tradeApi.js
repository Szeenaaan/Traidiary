          export const getTrades = async (
                  page = 1,
                  pageSize = 5,
                  session = ""
                ) => {
                  try {
                    let url = `http://localhost:5230/api/trade?page=${page}&pageSize=${pageSize}`;

                    if (session) {
                      url += `&session=${session}`;
                    }

                    console.log("API URL:", url);

                    const response = await fetch(url);

                    if (!response.ok) {
                      throw new Error("Failed to fetch trades");
                    }

                    const data = await response.json();

                    return {
                      trades: data?.data?.data ?? [],
                      totalCount: data?.data?.totalCount ?? 0
                    };

                  } catch (err) {
                    console.error("getTrades error:", err);

                    return {
                      trades: [],
                      totalCount: 0
                    };
                  }
                };

                export const deleteTrade = async (id) => {
  try {
    const response = await fetch(`http://localhost:5230/api/trade/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Delete failed");

    return await response.json();

  } catch (err) {
    console.error("deleteTrade error:", err);
    return null;
  }
};
    export const addTrade = async (trade) => {
  try {
    const response = await fetch("http://localhost:5230/api/trade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(trade)
    });

    if (!response.ok) throw new Error("Add failed");

    return await response.json();

  } catch (err) {
    console.error("addTrade error:", err);
    return null;
  }
};
    export const updateTrade = async (id, trade) => {
  try {
    const response = await fetch(`http://localhost:5230/api/trade/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(trade)
    });

    if (!response.ok) throw new Error("Update failed");

    return await response.json();

  } catch (err) {
    console.error("updateTrade error:", err);
    return null;
  }
};

