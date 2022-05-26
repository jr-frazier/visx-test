import React, { useRef, useEffect } from 'react';
import Square from './Square';

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
            <Square ref={boxRef} />
        </div>
    );
}
