import React, { useRef, useEffect } from 'react';
import { gsap, Sine, Elastic } from "gsap";

export default function Square() {
    const boxRef = useRef();

    useEffect(() => {
        gsap.to(
          boxRef.current, 
          { 
            rotation: "360",
            ease: Elastic.easeInOut,
            duration: 2
          }, 0.05);

          gsap.to(boxRef.current, {
              rotation: 200,
              delay: 1,
            scale: 0.5,
            backgroundColor: "red",
            ease: Elastic.easeInOut,
          })
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