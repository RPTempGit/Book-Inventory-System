import { useStockTakeContext } from "../hooks/useStockTakeContext";
import { useAuthContext } from "../hooks/useAuthContext";

const StockTakeDetails = ({ stockTake, setEditingStockTake }) => {
  const { dispatch } = useStockTakeContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) return;

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/stocktake/${stockTake._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "DELETE_STOCKTAKE", payload: json });
    }
  };

  return (
    <div className="bg-white p-3 rounded shadow mb-2 relative">
      <h4 className="font-semibold">{stockTake.item_name}</h4>
      <p>Quantity: {stockTake.qty}</p>
      <p>Location: {stockTake.location}</p>
      <p>Notes: {stockTake.notes}</p>

      <button
        onClick={() => setEditingStockTake(stockTake)}
        className="text-blue-500 mr-3"
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        className="text-red-500"
      >
        Delete
      </button>
    </div>
  );
};

export default StockTakeDetails;
