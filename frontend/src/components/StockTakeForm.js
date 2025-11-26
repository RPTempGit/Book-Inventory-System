import { useState } from "react"
import { useStockTakeContext } from "../hooks/useStockTakeContext"
import { useAuthContext } from "../hooks/useAuthContext"

const StockTakeForm = () => {
  const { dispatch } = useStockTakeContext()
  const { user } = useAuthContext()

  const [item_name, setItemName] = useState("")
  const [location, setLocation] = useState("")
  const [counted_qty, setCountedQty] = useState("")
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return setError("You must be logged in")

    const stockTake = {
      item_name,
      location,
      counted_qty,
      date
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/stocktake`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify(stockTake)
    })

    const json = await response.json()
    if (!response.ok) setError(json.error)
    if (response.ok) {
      setItemName("")
      setLocation("")
      setCountedQty("")
      setDate(new Date().toISOString().substring(0, 10))
      setError(null)
      dispatch({ type: "CREATE_STOCKTAKE", payload: json })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h3>Stock Take</h3>

      <label>Item Name:</label>
      <input
        type="text"
        value={item_name}
        onChange={(e) => setItemName(e.target.value)}
        required
      />

      <label>Location:</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <label>Counted Quantity:</label>
      <input
        type="number"
        value={counted_qty}
        onChange={(e) => setCountedQty(e.target.value)}
        required
      />

      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button className="bg-blue-500 text-white px-4 py-2 mt-2">Save</button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  )
}

export default StockTakeForm
