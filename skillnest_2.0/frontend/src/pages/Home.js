import React from "react";
import ServiceList from "../components/ServiceList";
import heroImage from "../assets/machine.jpg";

function Home() {
  const scrollToServices = () => {
    const section = document.getElementById("services");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* HERO SECTION */}
      <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-tagline">Community-Powered Platform</span>
          <h1 className="hero-heading">Share Skills.<br />Build Community.</h1>
          <p className="hero-sub">
            SkillNest connects people with trusted local services.
            Offer your skills or book professionals easily in your neighbourhood.
          </p>
          <button className="btn-hero" onClick={scrollToServices}>
            Explore Services →
          </button>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stat-item"><strong>500+</strong><span>Services Listed</span></div>
        <div className="stat-item"><strong>1.2k+</strong><span>Happy Customers</span></div>
        <div className="stat-item"><strong>4.8★</strong><span>Average Rating</span></div>
        <div className="stat-item"><strong>50+</strong><span>Categories</span></div>
      </div>

      {/* SERVICES SECTION */}
      <div id="services" className="container mt-5 mb-5">
        <div className="section-header">
          <h3>Available Services</h3>
          <p>Find skilled professionals in your community</p>
        </div>
        <ServiceList />
      </div>
    </div>
  );
}

export default Home;