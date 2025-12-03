import { useState, useEffect } from "react";
import { useTransactionContext } from "../hooks/useTransactionContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TransactionForm = ({ editingTransaction, setEditingTransaction }) => {
  const { dispatch } = useTransactionContext();
  const { user } = useAuthContext();

  const [type, setType] = useState("inbound");
  const [itemId, setItemId] = useState(""); // store selected item id
  const [qty, setQty] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState([]); // fetched items
  const [error, setError] = useState(null);

  // Fetch items for dropdown
  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/items`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (res.ok) setItems(data);
    };
    if (user) fetchItems();
  }, [user]);

  // Populate form when editing
  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setItemId(editingTransaction.item_id?._id || "");
      setQty(editingTransaction.qty);
      setNotes(editingTransaction.notes);
    }
  }, [editingTransaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setError("You must be logged in");
    if (!itemId || !type || !qty) return setError("Type, item, and quantity are required");

    const transactionData = { type, item_id: itemId, qty, notes };

    const url = editingTransaction
      ? `${process.env.REACT_APP_API_URL}/api/transactions/${editingTransaction._id}`
      : `${process.env.REACT_APP_API_URL}/api/transactions`;

    const method = editingTransaction ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(transactionData),
    });

    const json = await res.json();

    if (!res.ok) setError(json.error);
    if (res.ok) {
      dispatch({
        type: editingTransaction ? "UPDATE_TRANSACTION" : "CREATE_TRANSACTION",
        payload: json,
      });

      setType("inbound");
      setItemId("");
      setQty("");
      setNotes("");
      setError(null);
      if (editingTransaction) setEditingTransaction(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h3>{editingTransaction ? "Edit Transaction" : "Add Transaction"}</h3>

      <label>Type:</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="inbound">Inbound</option>
        <option value="outbound">Outbound</option>
        <option value="movement">Movement</option>
      </select>

      <label>Book Name:</label>
      <select value={itemId} onChange={(e) => setItemId(e.target.value)} required>
        <option value="">Select an item</option>
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.item_name}
          </option>
        ))}
      </select>

      <label>Quantity:</label>
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        required
      />

      <label>Notes:</label>
      <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <button className="bg-green-500 text-white px-4 py-2 mt-2">
        {editingTransaction ? "Update" : "Save"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default TransactionForm;
