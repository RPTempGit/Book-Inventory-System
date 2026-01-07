
import StockTakeForm from "../components/StockTakeForm"
import { useAuthContext } from "../hooks/useAuthContext"
import StockTakeDetails from "../components/StockTakeDetails"
import { useStockTakeContext } from "../hooks/useStockTakeContext"

const StockTakePage = () => {
    const { user } = useAuthContext();
    const { stockTakes } = useStockTakeContext();
    return (
        <div className="form-container">
            {user && user.role === 'admin' && <StockTakeForm />}
            <h3 style={{marginTop: 24}}>Stock Take Records</h3>
            {stockTakes && stockTakes.length > 0 ? (
                stockTakes.map(st => <StockTakeDetails key={st._id} stockTake={st} />)
            ) : (
                <p>No stock take records found.</p>
            )}
            {user && user.role !== 'admin' && <div style={{color: '#888', fontSize: 14, marginTop: 12}}>(View Only)</div>}
        </div>
    );
}

export default StockTakePage;
