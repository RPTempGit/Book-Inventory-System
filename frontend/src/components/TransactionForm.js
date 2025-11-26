import { useState } from "react"
import { useTransactionContext } from "../hooks/useTransactionContext"
import { useAuthContext } from "../hooks/useAuthContext"

const TransactionForm = () => {
  const { dispatch } = useTransactionContext()
  const { user } = useAuthContext()

  const [type, setType] = useState("inbound")
  const [item_name, setItemName] = useState("")
  const [qty, setQty] = useState("")
  const [notes, setNotes] = useState("")
  const [from_location, setFromLocation] = useState("")
  const [to_location, setToLocation] = useState("")
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return setError("You must be logged in")

    const transaction = {
      type,
      item_name,
      qty,
      notes,
      from_location: from_location || null,
      to_location: to_location || null,
      date
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify(transaction)
    })

    const json = await response.json()
    if (!response.ok) setError(json.error)
    if (response.ok) {
      setType("inbound")
      setItemName("")
      setQty("")
      setNotes("")
      setFromLocation("")
      setToLocation("")
      setDate(new Date().toISOString().substring(0, 10))
      setError(null)
      dispatch({ type: "CREATE_TRANSACTION", payload: json })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h3>Add Transaction</h3>

      <label>Type:</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="inbound">Inbound</option>
        <option value="outbound">Outbound</option>
        <option value="movement">Movement</option>
      </select>

      <label>Item Name:</label>
      <input
        type="text"
        value={item_name}
        onChange={(e) => setItemName(e.target.value)}
        required
      />

      <label>Quantity:</label>
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        required
      />

      <label>Notes:</label>
      <input
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      {(type === "outbound" || type === "movement") && (
        <>
          <label>From Location:</label>
          <input
            type="text"
            value={from_location}
            onChange={(e) => setFromLocation(e.target.value)}
            placeholder="Enter From Location"
            required
          />
        </>
      )}

      {(type === "inbound" || type === "movement") && (
        <>
          <label>To Location:</label>
          <input
            type="text"
            value={to_location}
            onChange={(e) => setToLocation(e.target.value)}
            placeholder="Enter To Location"
            required
          />
        </>
      )}

      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button className="bg-green-500 text-white px-4 py-2 mt-2">Save</button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  )
}

export default TransactionForm
