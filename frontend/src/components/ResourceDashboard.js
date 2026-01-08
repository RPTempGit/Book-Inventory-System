/**
 * ResourceDashboard.js
 * A rotating dashboard component with visual charts and sections
 * 
 * Edited by: RPTempGit
 * Last Updated: 2026-01-08 12:39:00 UTC
 */

import React, { useState, useEffect } from 'react';
import './ResourceDashboard.css';

/**
 * ResourceDashboard Component
 * Displays rotating sections with visual charts and resource metrics
 */
const ResourceDashboard = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [sectionData, setSectionData] = useState([]);

  // Dashboard sections data
  const dashboardSections = [
    {
      id: 1,
      title: 'Book Inventory Overview',
      type: 'chart',
      data: {
        total: 1250,
        available: 890,
        borrowed: 360,
        categories: ['Fiction', 'Non-Fiction', 'Reference', 'Children']
      }
    },
    {
      id: 2,
      title: 'User Activity',
      type: 'chart',
      data: {
        activeUsers: 450,
        newUsers: 32,
        totalBorrowals: 1200,
        returns: 1050
      }
    },
    {
      id: 3,
      title: 'Resource Utilization',
      type: 'chart',
      data: {
        utilization: 71,
        peakHours: '2PM-4PM',
        averageBorrowDuration: '14 days',
        overdueItems: 23
      }
    },
    {
      id: 4,
      title: 'Inventory Health',
      type: 'chart',
      data: {
        goodCondition: 92,
        needsRepair: 5,
        needsReplacement: 3,
        lastAudit: '2026-01-05'
      }
    }
  ];

  // Auto-rotate sections every 8 seconds
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % dashboardSections.length);
    }, 8000);

    return () => clearInterval(rotationInterval);
  }, [dashboardSections.length]);

  const currentSection = dashboardSections[activeSection];

  /**
   * Renders a bar chart visualization
   */
  const renderBarChart = (data) => {
    const maxValue = Math.max(...Object.values(data).filter(v => typeof v === 'number'));
    
    return (
      <div className="chart-container bar-chart">
        {Object.entries(data).map(([key, value]) => {
          if (typeof value !== 'number') return null;
          const percentage = (value / maxValue) * 100;
          
          return (
            <div key={key} className="bar-item">
              <label>{key}: {value}</label>
              <div className="bar">
                <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * Renders a pie chart visualization
   */
  const renderPieChart = (data) => {
    const values = Object.values(data).filter(v => typeof v === 'number');
    const total = values.reduce((sum, val) => sum + val, 0);
    let currentRotation = 0;
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

    return (
      <div className="chart-container pie-chart">
        <div className="pie">
          <svg viewBox="0 0 200 200" width="200" height="200">
            {values.map((value, index) => {
              const sliceAngle = (value / total) * 360;
              const startAngle = currentRotation;
              const endAngle = currentRotation + sliceAngle;
              currentRotation = endAngle;

              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;

              const x1 = 100 + 80 * Math.cos(startRad);
              const y1 = 100 + 80 * Math.sin(startRad);
              const x2 = 100 + 80 * Math.cos(endRad);
              const y2 = 100 + 80 * Math.sin(endRad);

              const largeArc = sliceAngle > 180 ? 1 : 0;

              const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={colors[index % colors.length]}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
        <div className="pie-legend">
          {Object.entries(data).map(([key, value], index) => {
            if (typeof value !== 'number') return null;
            const percentage = ((value / total) * 100).toFixed(1);
            return (
              <div key={key} className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></span>
                <span>{key}: {value} ({percentage}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /**
   * Renders metric cards
   */
  const renderMetrics = (data) => {
    return (
      <div className="metrics-grid">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="metric-card">
            <div className="metric-label">{key}</div>
            <div className="metric-value">{value}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="resource-dashboard">
      <header className="dashboard-header">
        <h1>📊 Resource Dashboard</h1>
        <p className="subtitle">Real-time inventory and resource metrics</p>
      </header>

      <div className="dashboard-content">
        <div className="section-display">
          <div className="section-header">
            <h2>{currentSection.title}</h2>
            <span className="section-indicator">
              {activeSection + 1} / {dashboardSections.length}
            </span>
          </div>

          <div className="section-body">
            {currentSection.type === 'chart' && renderMetrics(currentSection.data)}
          </div>
        </div>

        {/* Section Navigation */}
        <div className="section-navigation">
          <div className="nav-dots">
            {dashboardSections.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${activeSection === index ? 'active' : ''}`}
                onClick={() => setActiveSection(index)}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>Last Updated: {new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        })} UTC</p>
      </footer>
    </div>
  );
};

export default ResourceDashboard;
