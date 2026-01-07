import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const Reports = () => {
  const { user } = useAuthContext()
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchReports = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
        headers: { "Authorization": `Bearer ${user.token}` }
      })
      const json = await response.json()
      if (response.ok) setTransactions(json)
    }
    if (user) fetchReports()
  }, [user])

  const downloadCSV = () => {
    const csv = [
      ["Type", "Book Name", "Quantity", "Date", "Notes"],
      ...transactions.map(t => [
        t.type,
        t.item_name,
        t.qty,
        new Date(t.date).toLocaleDateString(),
        t.notes || "-"
      ])
    ]
      .map(e => e.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "report.csv"
    link.click()
  }

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
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td>{t.type}</td>
              <td>{t.item_name}</td>
              <td>{t.qty}</td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>{t.notes || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Reports
