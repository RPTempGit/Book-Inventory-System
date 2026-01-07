import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Reports = () => {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [stockTakes, setStockTakes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // Fetch Transactions
      const tRes = await fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const tJson = await tRes.json();
      if (tRes.ok) setTransactions(tJson);

      // Fetch Stock Takes
      const sRes = await fetch(`${process.env.REACT_APP_API_URL}/api/stocktake`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const sJson = await sRes.json();
      if (sRes.ok) setStockTakes(sJson);
    };

    fetchData();
  }, [user]);

  const downloadCSV = () => {
    // Combine Transactions and StockTakes
    const csvRows = [
      ["Type", "Book Name", "Quantity", "Date", "From Location", "To Location", "Notes", "Record Type"]
    ];

    transactions.forEach(t => {
      csvRows.push([
        t.type,
        t.item_name,
        t.qty,
        new Date(t.date).toLocaleDateString(),
        t.from_location || "-",
        t.to_location || "-",
        t.notes || "-",
        "Transaction"
      ]);
    });

    stockTakes.forEach(s => {
      csvRows.push([
        "-",
        s.item_name,
        s.qty,
        new Date(s.createdAt).toLocaleDateString(),
        s.location || "-",
        "-",
        s.notes || "-",
        "Stock Take"
      ]);
    });

    const csvString = csvRows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.csv";
    link.click();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-emerald-600 mb-3">Reports</h3>
      <button
        onClick={downloadCSV}
        className="bg-emerald-500 text-white px-3 py-1 rounded mb-3"
      >
        Download CSV
      </button>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>Type</th>
            <th>Book Name</th>
            <th>Qty</th>
            <th>Date</th>
            <th>From Location</th>
            <th>To Location</th>
            <th>Notes</th>
            <th>Record Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t._id}>
              <td>{t.type}</td>
              <td>{t.item_name}</td>
              <td>{t.qty}</td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>{t.from_location || "-"}</td>
              <td>{t.to_location || "-"}</td>
              <td>{t.notes || "-"}</td>
              <td>Transaction</td>
            </tr>
          ))}
          {stockTakes.map(s => (
            <tr key={s._id}>
              <td>-</td>
              <td>{s.item_name}</td>
              <td>{s.qty}</td>
              <td>{new Date(s.createdAt).toLocaleDateString()}</td>
              <td>{s.location || "-"}</td>
              <td>-</td>
              <td>{s.notes || "-"}</td>
              <td>Stock Take</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
