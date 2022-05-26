import React, { useRef, useEffect } from 'react';
import { gsap, Sine, Elastic } from "gsap";

export default function Square() {
    const boxRef = useRef();

    useEffect(() => {
        gsap.to(
          boxRef.current, 
          { 
            rotation: "360",
            ease: Sine.easeInOut,
            duration: 2
          });
      });
    return <div style={{
        width: "100px",
        height: "100px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: 'green',
        fontWeight: 600,
        color: 'white',
        }} className="box" ref={boxRef}>Hello</div>
}