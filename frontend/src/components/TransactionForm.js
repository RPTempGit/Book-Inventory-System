import { useState, useEffect } from "react"
import { useTransactionContext } from "../hooks/useTransactionContext"
import { useAuthContext } from "../hooks/useAuthContext"

const TransactionForm = () => {
  const { dispatch } = useTransactionContext()
  const { user } = useAuthContext()

  const [type, setType] = useState("inbound")
  const [itemName, setItemName] = useState("") // user types the item name
  const [qty, setQty] = useState("")
  const [from_location, setFromLocation] = useState("")
  const [to_location, setToLocation] = useState("")
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
  const [locations, setLocations] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/locations`, {
        headers: { "Authorization": `Bearer ${user.token}` }
      })
      const data = await res.json()
      if (res.ok) setLocations(data)
    }

    if (user) fetchLocations()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return setError("You must be logged in")
    if (!itemName) return setError("Item name is required")

    const transaction = {
      type,
      item_name: itemName, 
      qty,
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
    if (!response.ok) return setError(json.error)

    setType("inbound")
    setItemName("")
    setQty("")
    setFromLocation("")
    setToLocation("")
    setDate(new Date().toISOString().substring(0, 10))
    setError(null)
    dispatch({ type: "CREATE_TRANSACTION", payload: json })
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
        value={itemName}
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

      {(type === "outbound" || type === "movement") && (
        <>
          <label>From Location:</label>
          <select
            value={from_location}
            onChange={(e) => setFromLocation(e.target.value)}
            required
          >
            <option value="">Select From Location</option>
            {locations.map(l => (
              <option key={l._id} value={l._id}>{l.name}</option>
            ))}
          </select>
        </>
      )}

      {(type === "inbound" || type === "movement") && (
        <>
          <label>To Location:</label>
          <select
            value={to_location}
            onChange={(e) => setToLocation(e.target.value)}
            required
          >
            <option value="">Select To Location</option>
            {locations.map(l => (
              <option key={l._id} value={l._id}>{l.name}</option>
            ))}
          </select>
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
