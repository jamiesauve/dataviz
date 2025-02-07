import React from 'react';
import './Logo.css';

const Logo: React.FC = () => {
  return (
    <div className="logo-container">
      <div className="logo-symbol">
        <div className="logo-helix">
          <div className="helix-line"></div>
          <div className="helix-line"></div>
          <div className="helix-dot"></div>
        </div>
      </div>
      <div className="logo-text">
        <div className="company-name">NEXUS FLOW</div>
        <div className="company-tagline">CELL ANALYTICS</div>
      </div>
    </div>
  );
};

export default Logo; 