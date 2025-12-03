import { useTransactionContext } from "../hooks/useTransactionContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TransactionDetails = ({ transaction }) => {
  const { dispatch } = useTransactionContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) return;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/transactions/${transaction._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const json = await response.json();
    if (response.ok) dispatch({ type: "DELETE_TRANSACTION", payload: json });
  };

  return (
    <div className="bg-white rounded p-3 shadow-sm mb-2 relative">
      <h4 className="text-emerald-600">{transaction.type.toUpperCase()}</h4>
      <p>
        Item: {transaction.item_id?.item_name || "Unknown Item"}
      </p>
      <p>Quantity: {transaction.qty}</p>
      <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
      <p>Notes: {transaction.notes}</p>
      <span
        onClick={handleClick}
        className="absolute top-2 right-3 cursor-pointer text-red-500"
      >
        ✖
      </span>
    </div>
  );
};

export default TransactionDetails;
