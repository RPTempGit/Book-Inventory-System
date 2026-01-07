
import Reports from "../components/Reports"
import { useAuthContext } from "../hooks/useAuthContext"

const ReportsPage = () => {
    const { user } = useAuthContext();
    return (
        <div className="form-container">
            <Reports viewOnly={user && user.role !== 'admin'} />
            {user && user.role !== 'admin' && <div style={{color: '#888', fontSize: 14, marginTop: 12}}>(View Only)</div>}
        </div>
    );
}

export default ReportsPage;
