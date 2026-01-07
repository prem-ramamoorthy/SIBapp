import React, { useState } from 'react';

function MemberCard({ member, onContact }) {
    const [isCulturalExpanded, setCulturalExpanded] = useState(false);

    const toggleCulturalDetails = () => {
        setCulturalExpanded(!isCulturalExpanded);
    };

    return (
        <div className="member-card" data-member-id={member.id}>
            <div className="member-photo-section">
                <div className="blood-group-badge">{member.bloodGroup}</div>
                <div className="photo-placeholder">
                    <img
                        src={member.photoUrl}
                        alt="Image"
                        height="100%"
                        width="100%"
                        style={{ objectPosition: member.position || "10% 20%", objectFit: "center" }}
                    />
                </div>
            </div>

            <div className="card-content">
                <div className="member-header">
                    <h3 className="member-name">{member.name}</h3>
                    <div className="company-name">{member.company}</div>
                    <div className="business-vertical">{member.vertical}</div>
                </div>

                <div className="card-body">
                    <div className="vertical-badge-container">
                        <span className="vertical-badge">{member.mainVertical}</span>
                    </div>
                    <div className={`cultural-section ${isCulturalExpanded ? 'expanded' : ''}`}>
                        <div className="cultural-header" onClick={toggleCulturalDetails} style={{ cursor: 'pointer' }}>
                            <span>Cultural Details</span>
                            <i className={`fas fa-chevron-${isCulturalExpanded ? 'up' : 'down'}`}></i>
                        </div>
                        <div
                            className="cultural-content"
                            style={{
                                maxHeight: isCulturalExpanded ? '1000px' : '0',
                                overflow: 'hidden',
                                transition: 'max-height 0.3s ease',
                            }}
                        >
                            <div className="cultural-details">
                                <div className="cultural-row">
                                    <span className="cultural-label">குலதெய்வம்</span>
                                    <span className="cultural-value tamil">{member.kuladeivam}</span>
                                </div>

                                <div className="cultural-row">
                                    <span className="cultural-label">கூட்டம்</span>
                                    <span className="cultural-value tamil">{member.kootam}</span>
                                </div>

                                <div className="cultural-row">
                                    <span className="cultural-label">வகையறா</span>
                                    <span className="cultural-value tamil">{member.vagaiyara}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <button className="contact-btn" onClick={() => onContact(member.phone, member.name)}>
                        <i className="fas fa-phone"></i>
                        Contact Member
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MemberCard;
