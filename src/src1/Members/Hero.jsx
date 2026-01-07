import React from 'react'

function Hero() {
    return (
        <div className="container" id = "hero">
            <div className="member">
                    <div className="header-content">
                        <h1 className="page-title">Our Members Directory</h1>
                        <div className="member-stats">
                            <div className="stat-item">
                                <span className="stat-number" >139</span>
                                <span className="stat-label">Active Members</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">15+</span>
                                <span className="stat-label">Business Vertical</span>
                            </div>
                        </div>
                        <p className="tagline">Connecting Sengunthar Business Community in Erode</p>
                    </div>
            </div>
        </div>
    )
}

export default Hero