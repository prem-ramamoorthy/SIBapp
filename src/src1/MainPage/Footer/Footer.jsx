import './FooterStyle.css'
import HeaderLinks from '../../Components/HeaderLinks'
import data from '../../data/MainPage/FooterSocialLinks.json'

function Footer({margin = "auto" , ismember = false}) {

    const socialComponent = data.map((social, index) => {
        return (
            <a href={social.link} className="social-link" target="_blank" key={index}>
                <span className="social-icon">{social.emoji}</span>
                <span>{social.name}</span>
            </a>
        )
    });

    return (
        <div className="fot">
            <div className="member">
                <footer className="footer">
                    <div className="footer-bg"></div>
                    <div className="container">
                        <div className="footer-content">
                            <div className="footer-section">
                                <div className="footer-logo">
                                    <div className="logo-container">
                                        <div className="logo-placeholder">
                                            <img src="/logo.png" alt="Sengunthar in Business Logo" className="logo-image"
                                                style={{
                                                    display: 'block',
                                                    marginLeft:  `${margin}`,
                                                    marginRight: 'auto',
                                                    maxWidth: '65px',
                                                    maxHeight: '65px',
                                                    objectFit: 'contain',
                                                    transform: 'scale(1)'
                                                }} />
                                        </div>
                                    </div>
                                    <h4>Sengunthar in Business (SIB) - Erode</h4>
                                </div>
                                <p>Empowering Business Excellence Through Unity</p>
                                <div className="social-links">
                                    {socialComponent}
                                </div>
                            </div>
                            <div className="footer-section">
                                <h4>Quick Links</h4>
                                <div className="footer-links">
                                    <HeaderLinks classname='footer-link' memfooter = {ismember}/>
                                </div>
                            </div>
                            <div className="footer-section">
                                <h4>Business Info</h4>
                                <div className="footer-info">
                                    <p><strong>138</strong> Active Members</p>
                                    <p><strong>15</strong> Business Verticals</p>
                                    <p><strong>35+</strong> Years of Excellence</p>
                                    <p><strong>Est.</strong> 1990s</p>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <div className="footer-divider"></div>
                            <p>&copy; 2025 Sengunthar in Business (SIB) - Erode. All rights reserved. | Designed with Excellence
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Footer