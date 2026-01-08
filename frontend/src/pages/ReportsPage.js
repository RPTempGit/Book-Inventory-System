import { Link } from "react-router-dom"
import Reports from "../components/Reports"

const ReportsPage = () => (
  <div>
    <div className="page-header">
      <Link to="/" className="back-button">
        ← Back to Dashboard
      </Link>
      <h1 className="page-title">Reports & Analytics</h1>
    </div>
    <div className="mt-5">
      <Reports />
    </div>
  </div>
)

export default ReportsPage
