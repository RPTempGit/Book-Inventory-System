import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const StockTakeForm = () => {
    const { user } = useAuthContext()
    const [item_id, setItemId] = useState("")
    const [location_id, setLocationId] = useState("")
    const [counted_qty, setCountedQty] = useState("")
    const [msg, setMsg] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/stocktake`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ item_id, location_id, counted_qty })
        })
        const json = await response.json()
        if (response.ok) setMsg("Stock-take recorded successfully!")
        else setMsg(json.error)
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <h3 className="text-emerald-600 font-semibold mb-3">Stock Take</h3>
            <label>Item ID:</label>
            <input value={item_id} onChange={(e) => setItemId(e.target.value)} />
            <label>Location ID:</label>
            <input value={location_id} onChange={(e) => setLocationId(e.target.value)} />
            <label>Counted Quantity:</label>
            <input type="number" value={counted_qty} onChange={(e) => setCountedQty(e.target.value)} />
            <button className="bg-emerald-600 text-white px-3 py-1 rounded mt-3">Submit</button>
            {msg && <div className="mt-2 text-emerald-700">{msg}</div>}
        </form>
    )
}

export default StockTakeForm