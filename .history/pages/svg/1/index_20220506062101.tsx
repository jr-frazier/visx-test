import React, { useRef, useEffect } from 'react';
import Square from './Square';
import { gsap, Sine } from "gsap";

export default function Svg1() {
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

    return (
        <div>
            <Square />
        </div>
    );
}
