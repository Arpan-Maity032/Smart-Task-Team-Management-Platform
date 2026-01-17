import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const LogoAnimation = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Initialize the Animation Timeline
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    // 1. Reveal the Clipboard (Scale up)
    tl.add({
      targets: '.logo-clipboard',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800
    })
    // 2. Draw the Checkmarks (Line drawing effect)
    .add({
      targets: '.logo-checkmark',
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 1],
      duration: 500,
      delay: anime.stagger(200) // One after another
    }, '-=400')
    // 3. Pop in the 3SC Bubble
    .add({
      targets: '.logo-bubble',
      scale: [0, 1],
      opacity: [0, 1],
      elasticity: 600, 
      duration: 1000
    }, '-=600')
    // 4. Spin and fade in the Orbiting Swooshes
    .add({
      targets: '.logo-swoosh',
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 1],
      duration: 1500,
      delay: anime.stagger(100),
      easing: 'easeInOutSine'
    }, '-=1000')
    // 5. Reveal Text
    .add({
      targets: '.logo-text',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800
    }, '-=1000');

    // Separate Continuous Animation: Rotate the swooshes slowly forever
    anime({
      targets: '.logo-swoosh-group',
      rotate: 360,
      duration: 20000,
      loop: true,
      easing: 'linear'
    });

  }, []);

  return (
    <div 
      ref={wrapperRef} 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#E5744B' 
      }}
    >
      <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        
        {/* DEFINITIONS FOR GRADIENTS */}
        <defs>
          <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0056b3" />
            <stop offset="100%" stopColor="#00a0e9" />
          </linearGradient>
          <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7941d" />
            <stop offset="100%" stopColor="#f37021" />
          </linearGradient>
          <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8cc63f" />
            <stop offset="100%" stopColor="#009245" />
          </linearGradient>
        </defs>

        {/* 1. CLIPBOARD ICON */}
        <g className="logo-clipboard" style={{ transformOrigin: '150px 120px' }}>
          {/* Board */}
          <rect x="110" y="60" width="80" height="100" rx="5" fill="#0072bc" />
          <rect x="120" y="70" width="60" height="80" fill="#fff" />
          {/* Lines */}
          <rect x="145" y="80" width="30" height="3" fill="#ccc" />
          <rect x="145" y="100" width="30" height="3" fill="#ccc" />
          <rect x="145" y="120" width="30" height="3" fill="#ccc" />
          {/* Clip */}
          <path d="M135 55 h30 v10 h-30 z" fill="#005b96" />
          <circle cx="150" cy="60" r="3" fill="#fff" />
          
          {/* Checkmarks */}
          <path className="logo-checkmark" d="M125 80 l5 5 l10 -10" fill="none" stroke="#0072bc" strokeWidth="3" />
          <path className="logo-checkmark" d="M125 100 l5 5 l10 -10" fill="none" stroke="#0072bc" strokeWidth="3" />
          <path className="logo-checkmark" d="M125 120 l5 5 l10 -10" fill="none" stroke="#0072bc" strokeWidth="3" />
        </g>

        {/* 2. ORBITING SWOOSHES */}
        <g className="logo-swoosh-group" style={{ transformOrigin: '200px 140px' }}>
          {/* Blue Swoosh */}
          <path 
            className="logo-swoosh"
            d="M100 180 Q 150 220 250 180" 
            fill="none" stroke="url(#gradBlue)" strokeWidth="12" strokeLinecap="round"
            transform="rotate(-10 200 150)"
          />
          {/* Orange Swoosh */}
          <path 
            className="logo-swoosh"
            d="M90 140 Q 120 80 220 70" 
            fill="none" stroke="url(#gradOrange)" strokeWidth="8" strokeLinecap="round"
          />
          {/* Green Swoosh */}
          <path 
            className="logo-swoosh"
            d="M260 90 Q 290 150 180 200" 
            fill="none" stroke="url(#gradGreen)" strokeWidth="8" strokeLinecap="round"
          />
        </g>

        {/* 3. 3SC BUBBLE */}
        <g className="logo-bubble" style={{ transformOrigin: '220px 140px' }}>
          <circle cx="220" cy="140" r="35" fill="url(#gradOrange)" />
          <circle cx="220" cy="140" r="35" fill="url(#gradGreen)" clipPath="inset(50% 0 0 0)" />
          <text x="220" y="150" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold" fontFamily="Arial">3SC</text>
        </g>

        {/* 4. TEXT BELOW */}
        <g className="logo-text">
          <text x="80" y="250" fontSize="40" fontFamily="Arial" fontWeight="bold" fill="#003366">
            Manage<tspan fill="#4caf50">Task</tspan>
          </text>
          {/* Underline Swoosh */}
          <path d="M100 265 Q 200 255 300 265" fill="none" stroke="#009245" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
};

export default LogoAnimation;