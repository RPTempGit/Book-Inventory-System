import { useState, useEffect } from "react"
import { useTransactionContext } from "../hooks/useTransactionContext"
import { useStockTakeContext } from "../hooks/useStockTakeContext"

const ResourceDashboard = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const { transactions } = useTransactionContext()
  const { stockTakes } = useStockTakeContext()

  // Auto-rotate every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4)
      setLastUpdated(new Date())
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Calculate metrics
  const totalTransactions = transactions?.length || 0
  const totalStockTakes = stockTakes?.length || 0
  const recentTransactions = transactions?.slice(0, 5).length || 0
  const recentStockTakes = stockTakes?.slice(0, 5).length || 0

  // Calculate inventory metrics
  const booksAdded = transactions?.filter(t => t.type === "in").length || 0
  const booksRemoved = transactions?.filter(t => t.type === "out").length || 0
  const netInventory = booksAdded - booksRemoved

  const sections = [
    {
      title: "📊 Inventory Overview",
      metrics: [
        { label: "Total Transactions", value: totalTransactions, icon: "📝" },
        { label: "Books Added", value: booksAdded, icon: "📚", color: "#10b981" },
        { label: "Books Removed", value: booksRemoved, icon: "📤", color: "#ef4444" },
        { label: "Net Inventory", value: netInventory, icon: "📊", color: netInventory >= 0 ? "#10b981" : "#ef4444" }
      ]
    },
    {
      title: "👥 User Activity",
      metrics: [
        { label: "Recent Transactions", value: recentTransactions, icon: "🔄" },
        { label: "Recent Stock Takes", value: recentStockTakes, icon: "📦" },
        { label: "Active Sessions", value: 1, icon: "👤" },
        { label: "Total Activities", value: totalTransactions + totalStockTakes, icon: "📈" }
      ]
    },
    {
      title: "📦 Resource Utilization",
      metrics: [
        { label: "Total Stock Takes", value: totalStockTakes, icon: "📋" },
        { label: "Pending Reviews", value: 0, icon: "⏳" },
        { label: "Completed", value: totalStockTakes, icon: "✅" },
        { label: "Utilization Rate", value: "100%", icon: "📊" }
      ]
    },
    {
      title: "💚 Inventory Health",
      metrics: [
        { label: "System Status", value: "Healthy", icon: "✅", color: "#10b981" },
        { label: "Data Sync", value: "Active", icon: "🔄", color: "#3b82f6" },
        { label: "Warnings", value: 0, icon: "⚠️", color: "#f59e0b" },
        { label: "Health Score", value: "98%", icon: "💯", color: "#10b981" }
      ]
    }
  ]

  return (
    <div className="resource-dashboard">
      <div className="resource-dashboard-container">
        <div className="resource-dashboard-header">
          <h2 className="resource-dashboard-title">{sections[activeSection].title}</h2>
          <p className="resource-dashboard-updated">
            Last Updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>

        <div className="resource-dashboard-content">
          <div className="metrics-grid">
            {sections[activeSection].metrics.map((metric, idx) => (
              <div key={idx} className="metric-card">
                <div className="metric-icon">{metric.icon}</div>
                <div className="metric-info">
                  <p className="metric-label">{metric.label}</p>
                  <p className="metric-value" style={{ color: metric.color }}>
                    {metric.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="resource-dashboard-navigation">
          {sections.map((_, idx) => (
            <button
              key={idx}
              className={`nav-dot ${activeSection === idx ? "active" : ""}`}
              onClick={() => setActiveSection(idx)}
              aria-label={`Go to section ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResourceDashboard
