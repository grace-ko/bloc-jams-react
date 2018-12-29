import React from 'react';
import './../Landing.css';

const Landing = () => (
    <section className="selling-points">
      <div className="point landing">
        <h2 className="point-title">Unlimited Ad-Free</h2>
        <h2 className="point-title">Music Streaming</h2>
        <p className="point-description">No limits. No distractions.</p>
        <p className="point-description">Available on all mobile platforms</p>
        <a href="/library"><p className="start-button">GET STARTED</p></a>
      </div>
      <a href="https://unsplash.com/@arstyy?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge" target="_blank"><p className="photo-credit">Photo credit: Austin Neill</p></a>
    </section>

);
export default Landing;
