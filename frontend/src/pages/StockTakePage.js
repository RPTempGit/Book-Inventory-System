import { Link } from "react-router-dom"
import StockTakeForm from "../components/StockTakeForm"

const StockTakePage = () => (
  <div>
    <div className="page-header">
      <Link to="/" className="back-button">
        ← Back to Dashboard
      </Link>
      <h1 className="page-title">Stock Take Management</h1>
    </div>
    <div className="mt-5">
      <StockTakeForm />
    </div>
  </div>
)

export default StockTakePage
