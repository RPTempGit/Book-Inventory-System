import React, { useState, useEffect } from 'react';
import './ResourceDashboard.css';

/**
 * ResourceDashboard Component
 * 
 * A rotating dashboard component that displays resource availability 
 * and total inventory with real-time updates.
 * 
 * Features:
 * - Rotating carousel of resource metrics
 * - Real-time resource availability tracking
 * - Total inventory display
 * - Automatic refresh interval
 * - Responsive design
 * 
 * Edited by: RPTempGit
 * Date: 2026-01-07 15:19:01 UTC
 */

const ResourceDashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [resources, setResources] = useState([]);
  const [totalInventory, setTotalInventory] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTime, setRefreshTime] = useState(new Date());

  // Sample resource data - replace with actual API call
  const mockResources = [
    {
      id: 1,
      name: 'Fiction Books',
      available: 248,
      total: 350,
      category: 'Fiction',
      icon: '📚'
    },
    {
      id: 2,
      name: 'Non-Fiction Books',
      available: 162,
      total: 200,
      category: 'Non-Fiction',
      icon: '📖'
    },
    {
      id: 3,
      name: 'Reference Materials',
      available: 89,
      total: 120,
      category: 'Reference',
      icon: '📕'
    },
    {
      id: 4,
      name: 'Children\'s Books',
      available: 156,
      total: 180,
      category: 'Children',
      icon: '🧒'
    },
    {
      id: 5,
      name: 'Academic Journals',
      available: 73,
      total: 100,
      category: 'Academic',
      icon: '🎓'
    },
    {
      id: 6,
      name: 'Digital Resources',
      available: 450,
      total: 500,
      category: 'Digital',
      icon: '💾'
    }
  ];

  // Initialize dashboard data
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        setLoading(true);
        // Simulate API call - replace with actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setResources(mockResources);
        const total = mockResources.reduce((sum, resource) => sum + resource.total, 0);
        setTotalInventory(total);
        setLoading(false);
      } catch (err) {
        setError('Failed to load resource data');
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (resources.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % resources.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [resources]);

  // Update refresh time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + resources.length) % resources.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % resources.length);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const formatDateTime = (date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const getAvailabilityPercentage = (available, total) => {
    return total > 0 ? Math.round((available / total) * 100) : 0;
  };

  const getAvailabilityColor = (percentage) => {
    if (percentage >= 80) return '#4CAF50'; // Green
    if (percentage >= 50) return '#FFC107'; // Yellow
    if (percentage >= 20) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  if (loading) {
    return <div className="resource-dashboard loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="resource-dashboard error">{error}</div>;
  }

  if (resources.length === 0) {
    return <div className="resource-dashboard empty">No resources available</div>;
  }

  const currentResource = resources[currentSlide];
  const availabilityPercentage = getAvailabilityPercentage(currentResource.available, currentResource.total);
  const availabilityColor = getAvailabilityColor(availabilityPercentage);

  return (
    <div className="resource-dashboard">
      <div className="dashboard-header">
        <h1>📊 Resource Dashboard</h1>
        <div className="header-info">
          <p className="refresh-time">Last Updated: {formatDateTime(refreshTime)} UTC</p>
          <p className="edited-by">Edited by: RPTempGit</p>
        </div>
      </div>

      <div className="dashboard-container">
        {/* Main Carousel */}
        <div className="carousel-section">
          <div className="carousel-controls">
            <button className="carousel-btn prev-btn" onClick={handlePrevSlide} aria-label="Previous resource">
              ❮
            </button>
            
            <div className="carousel-content">
              <div className="resource-card">
                <div className="card-icon">{currentResource.icon}</div>
                
                <div className="card-header">
                  <h2>{currentResource.name}</h2>
                  <span className="category-badge">{currentResource.category}</span>
                </div>

                <div className="availability-meter">
                  <div className="meter-label">
                    <span>Availability</span>
                    <span className="percentage">{availabilityPercentage}%</span>
                  </div>
                  <div className="meter-bar">
                    <div 
                      className="meter-fill" 
                      style={{
                        width: `${availabilityPercentage}%`,
                        backgroundColor: availabilityColor
                      }}
                    />
                  </div>
                </div>

                <div className="inventory-stats">
                  <div className="stat">
                    <span className="stat-label">Available</span>
                    <span className="stat-value available">{currentResource.available}</span>
                  </div>
                  <div className="stat-divider">/</div>
                  <div className="stat">
                    <span className="stat-label">Total</span>
                    <span className="stat-value total">{currentResource.total}</span>
                  </div>
                </div>

                <div className="resource-info">
                  <p>Resource ID: {currentResource.id}</p>
                  <p>Status: {availabilityPercentage >= 80 ? '✅ Well Stocked' : availabilityPercentage >= 50 ? '⚠️ Adequate' : '❌ Low Stock'}</p>
                </div>
              </div>
            </div>

            <button className="carousel-btn next-btn" onClick={handleNextSlide} aria-label="Next resource">
              ❯
            </button>
          </div>

          {/* Carousel Dots */}
          <div className="carousel-dots">
            {resources.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to resource ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Total Inventory Summary */}
        <div className="inventory-summary">
          <h3>📦 Inventory Summary</h3>
          <div className="summary-card">
            <div className="total-inventory">
              <p className="summary-label">Total Inventory</p>
              <p className="summary-value">{totalInventory}</p>
              <p className="summary-items">items across all categories</p>
            </div>

            <div className="resource-grid">
              {resources.map((resource, index) => (
                <div 
                  key={resource.id} 
                  className={`mini-card ${index === currentSlide ? 'highlighted' : ''}`}
                  onClick={() => handleDotClick(index)}
                >
                  <div className="mini-icon">{resource.icon}</div>
                  <div className="mini-name">{resource.category}</div>
                  <div className="mini-count">{resource.available}/{resource.total}</div>
                  <div className="mini-percentage">
                    {getAvailabilityPercentage(resource.available, resource.total)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <p>Resource Availability System • Last Updated: {formatDateTime(refreshTime)} UTC</p>
        <p className="footer-credit">Component created by: RPTempGit</p>
      </div>
    </div>
  );
};

export default ResourceDashboard;
