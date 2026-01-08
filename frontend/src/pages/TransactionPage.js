import { Link } from "react-router-dom"
import TransactionForm from "../components/TransactionForm"

const TransactionPage = () => {
  return (
    <div>
      <div className="page-header">
        <Link to="/" className="back-button">
          ← Back to Dashboard
        </Link>
        <h1 className="page-title">Transaction Management</h1>
      </div>
      <TransactionForm />
    </div>
  )
}

export default TransactionPage