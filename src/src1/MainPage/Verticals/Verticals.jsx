import './Verticals.css'
import data from '../../data/MainPage/Verticals.json'

function Verticals() {

    const renderVerticals = () => {
        return data.map((vertical, index) => (
            <div className="vertical-card flip-card" key={index}>
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <div className="vertical-image">
                            <img src={vertical.img} alt={vertical.title} />
                        </div>
                        <h3>{vertical.title}</h3>
                        <div className="member-badge">{vertical.members}</div>
                    </div>
                    <div className="flip-card-back">
                        <h4>{vertical.title}</h4>
                        <p>{vertical.description}</p>
                        <div className="stats">
                            <span className="stat">{vertical.activeMembers}</span>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="ver">
            <section id="verticals" className="verticals">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Our Network</div>
                        <h2 className="section-title">Business Verticals</h2>
                        <p className="section-subtitle">Diverse industries united under one vision of excellence</p>
                    </div>
                    <div className="verticals-grid">
                        {renderVerticals()}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Verticals