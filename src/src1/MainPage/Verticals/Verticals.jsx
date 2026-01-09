import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Verticals.css';
import data from '../../data/MainPage/Verticals.json';

function Verticals() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: false,
        arrows: false,
        cssEase: "cubic-bezier(0.87, 0, 0.13, 1)", // Premium easing function
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    dots: false, // Hidden on mobile to prevent clutter
                    centerMode: true, // Shows a sliver of next/prev cards
                    centerPadding: '20px'
                }
            }
        ]
    };

    const renderVerticals = () => {
        return data.map((vertical, index) => (
            <div className="slide-wrapper" key={index}>
                <div className="vertical-card flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <div className="card-shine"></div>
                            <div className="vertical-image">
                                <img src={vertical.img} alt={vertical.title} />
                            </div>
                            <div className="content-front">
                                <h3>{vertical.title}</h3>
                                <div className="member-badge">{vertical.members}</div>
                            </div>
                        </div>
                        <div className="flip-card-back">
                            <div className="card-shine"></div>
                            <h4>{vertical.title}</h4>
                            <p>{vertical.description}</p>
                            <div className="stats">
                                <span className="stat-label">Active Network</span>
                                <span className="stat-value">{vertical.activeMembers}</span>
                            </div>
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
                    
                    <div className="verticals-slider-container">
                        <Slider {...settings}>
                            {renderVerticals()}
                        </Slider>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Verticals;