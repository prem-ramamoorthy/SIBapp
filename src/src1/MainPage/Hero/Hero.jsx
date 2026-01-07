import React, { useEffect, useRef } from 'react'
import './HeroStyle.css'
import data from '../../data/MainPage/HeroStats.json'

function Hero() {
    const statsRef = useRef(null);
    const typewriterRef = useRef(null);
    const isAnimatedRef = useRef(false);

    useEffect(() => {
        const setupTypewriterEffect = () => {
            const typewriterElements = document.querySelectorAll('.hero .animate-typewriter');

            typewriterElements.forEach((element, index) => {
                const text = element.getAttribute('data-text') || element.textContent;
                const delay = parseInt(element.getAttribute('data-delay')) || index * 1000;

                element.textContent = '';
                element.style.width = '0';
                element.style.borderRight = '2px solid var(--warm-gold)';

                setTimeout(() => {
                    typeWriter(element, text, 30);
                }, delay);
            });
        };

        const typeWriter = (element, text, speed = 30) => {
            let i = 0;
            element.style.width = 'auto';
            element.style.display = 'inline-block';

            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 100);
                }
            }, speed);
        };

        const animateCounters = (selector) => {
            const counters = document.querySelectorAll(selector);
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count')) || parseInt(counter.textContent);
                if (isNaN(target)) return;

                const duration = 2500;
                const startTime = performance.now();

                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(target * easeOutQuart);

                    counter.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        counter.textContent = target;
                    }
                };

                requestAnimationFrame(animate);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isAnimatedRef.current) {
                    isAnimatedRef.current = true;

                    setTimeout(() => {
                        setupTypewriterEffect();
                    }, 500);

                    setTimeout(() => {
                        animateCounters('.hero .stat-number');
                    }, 20);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, []);

    const renderButtons = () => {
        return data.buttons.map((button, index) => (
            <button key={index} className={`btn btn-${button.type}`}>
                <span>{button.name}</span>
                <div className="btn-glow">{button.content}</div>
            </button>
        ));
    };

    const renderStats = () => {
        return data.stats.map((stat, index) => (
            <div key={index} className="stat-item"> 
                <span className="stat-number" data-count={stat.value}>0</span>
                <span className="stat-label">{stat.name}</span>
            </div>
        ));
    };

    return (
        <section id="home" className="hero" style={{ marginTop: '-40px' }}>
            <div className="hero-bg">
                <div className="hero-particles"></div>
                <div className="hero-shapes">
                    <div className="shape shape1"></div>
                    <div className="shape shape2"></div>
                    <div className="shape shape3"></div>
                </div>
            </div>
            <div className="container">
                <div className="hero-content">
                    <h1 className="hero-title" ref={typewriterRef}>
                        <span className="title-line animate-typewriter" data-text="Sengunthar in Business">
                            Sengunthar in Business
                        </span>
                        <span className="title-line animate-typewriter" data-text="SIB - Erode" data-delay="1000">
                            SIB - Erode
                        </span>
                    </h1>
                    <p className="hero-tagline animate-fade-up" data-delay="2000">
                        Empowering Business Excellence Through Unity
                    </p>
                    <p className="hero-description animate-fade-up" data-delay="2500">
                        Building a strong network of successful entrepreneurs and business leaders within the Sengunthar community across diverse industries
                    </p>
                    <div className="hero-actions animate-fade-up" data-delay="3000">
                        {renderButtons()}
                    </div>
                    <div className="hero-stats animate-fade-up" data-delay="3500" ref={statsRef}>
                        {renderStats()}
                    </div>
                </div>
            </div>
            <div className="hero-scroll-indicator">
            </div>
        </section>
    )
}

export default Hero
