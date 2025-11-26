const StockTakeDetails = ({ stockTake }) => (
  <div className="p-2 border rounded mb-2">
    <h4>{stockTake.item_name}</h4>
    <p>Location: {stockTake.location}</p>
    <p>Counted Qty: {stockTake.counted_qty}</p>
    <p>Date: {new Date(stockTake.date).toLocaleDateString()}</p>
  </div>
)
export default StockTakeDetails
