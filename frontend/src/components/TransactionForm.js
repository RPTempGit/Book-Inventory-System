import { useState } from "react"
import { useTransactionContext } from "../hooks/useTransactionContext"
import { useAuthContext } from "../hooks/useAuthContext"

const TransactionForm = () => {
    const { dispatch } = useTransactionContext()
    const { user } = useAuthContext()

    const [type, setType] = useState("inbound")
    const [item_id, setItemId] = useState("")
    const [qty, setQty] = useState("")
    const [from_location, setFrom] = useState("")
    const [to_location, setTo] = useState("")
    const [notes, setNotes] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError("You must be logged in")
            return
        }

        const transaction = { type, item_id, qty, from_location, to_location, notes }
        const response = await fetch(`${ process.env.REACT_APP_API_URL }/api/transactions`, {
            method: "POST",
            body: JSON.stringify(transaction),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        else {
            setError(null)
            setItemId("")
            setQty("")
            setFrom("")
            setTo("")
            setNotes("")
            dispatch({ type: "CREATE_TRANSACTION", payload: json })
        }
    }

    return (
        <form className="bg-white p-4 rounded shadow" onSubmit={handleSubmit}>
            <h3 className="font-semibold mb-3 text-emerald-600">Record Transaction</h3>

            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="inbound">Inbound</option>
                <option value="outbound">Outbound</option>
                <option value="movement">Movement</option>
            </select>

            <label>Item ID:</label>
            <input value={item_id} onChange={(e) => setItemId(e.target.value)} placeholder="Item ID" />

            <label>Quantity:</label>
            <input value={qty} onChange={(e) => setQty(e.target.value)} type="number" />

            {type === "movement" && (
                <>
                    <label>From Location:</label>
                    <input value={from_location} onChange={(e) => setFrom(e.target.value)} placeholder="From Location ID" />
                    <label>To Location:</label>
                    <input value={to_location} onChange={(e) => setTo(e.target.value)} placeholder="To Location ID" />
                </>
            )}

            <label>Notes:</label>
            <input value={notes} onChange={(e) => setNotes(e.target.value)} />

            <button className="bg-emerald-600 text-white px-3 py-1 rounded mt-3">Save</button>
            {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>
    )
}

export default TransactionForm
