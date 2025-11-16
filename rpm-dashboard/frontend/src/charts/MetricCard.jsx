import React from "react";

const MetricCard = ({ title, value, unit, subtitle, variant = "default" }) => {
  return (
    <div className={`metric-card metric-${variant}`}>
      <p className="metric-title">{title}</p>
      <p className="metric-value">
        {value}
        {unit && <span className="metric-unit"> {unit}</span>}
      </p>
      {subtitle && <p className="metric-subtitle">{subtitle}</p>}
    </div>
  );
};

export default MetricCard;
