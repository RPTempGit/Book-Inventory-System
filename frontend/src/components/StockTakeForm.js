import { useState, useEffect } from "react";
import { useStockTakeContext } from "../hooks/useStockTakeContext";
import { useAuthContext } from "../hooks/useAuthContext";

const StockTakeForm = ({ editingStockTake, setEditingStockTake }) => {
  const { dispatch } = useStockTakeContext();
  const { user } = useAuthContext();

  const [item_name, setItemName] = useState("");
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingStockTake) {
      setItemName(editingStockTake.item_name);
      setQty(editingStockTake.qty);
      setLocation(editingStockTake.location);
      setNotes(editingStockTake.notes);
    }
  }, [editingStockTake]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setError("You must be logged in");

    const stockTakeData = { item_name, qty, location, notes };

    const url = editingStockTake
      ? `${process.env.REACT_APP_API_URL}/api/stocktake/${editingStockTake._id}`
      : `${process.env.REACT_APP_API_URL}/api/stocktake`;
    const method = editingStockTake ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(stockTakeData),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");

      if (editingStockTake) {
        dispatch({ type: "UPDATE_STOCKTAKE", payload: json });
        setEditingStockTake(null);
      } else {
        dispatch({ type: "CREATE_STOCKTAKE", payload: json });
      }

      setItemName("");
      setQty("");
      setLocation("");
      setNotes("");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mt-4">
      <h3 className="font-semibold mb-2">
        {editingStockTake ? "Edit Stock Take" : "Add Stock Take"}
      </h3>

      <label>Book Name:</label>
      <input value={item_name} onChange={(e) => setItemName(e.target.value)} required />

      <label>Quantity:</label>
      <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} required />

      <label>Location:</label>
      <input value={location} onChange={(e) => setLocation(e.target.value)} />

      <label>Notes:</label>
      <input value={notes} onChange={(e) => setNotes(e.target.value)} />

      <button className="bg-green-500 text-white px-4 py-2 mt-2">
        {editingStockTake ? "Update" : "Save"}
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default StockTakeForm;