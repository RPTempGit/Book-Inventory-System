import { useEffect } from "react"
import { useTransactionContext } from "../hooks/useTransactionContext"
import { useAuthContext } from "../hooks/useAuthContext"
import TransactionDetails from "../components/TransactionDetails"
import TransactionForm from "../components/TransactionForm"

const Dashboard = () => {
    const { transactions, dispatch } = useTransactionContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await fetch(`${ process.env.REACT_APP_API_URL }/api/transactions`, {
                headers: { "Authorization": `Bearer ${user.token}` }
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: "SET_TRANSACTIONS", payload: json })
            }
        }
        if (user) fetchTransactions()
    }, [dispatch, user])

    return (
        <div className="md:col-span-2">
            {transactions && transactions.map(t => <TransactionDetails key={t._id} transaction={t} />)}
        </div>
    )
}

export default Dashboard
