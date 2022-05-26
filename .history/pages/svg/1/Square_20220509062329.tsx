import React, { useRef, useEffect } from 'react';
import { gsap, Sine, Elastic } from 'gsap';

export default function Squares({ squares }: { squares: number }) {
    const boxRef = useRef();
    const q = gsap.utils.selector(boxRef)
    const squaresArray = new Array(squares).fill(0);

    useEffect(() => {
        if (boxRef.current === undefined) return;

        gsap.to(q(".box"), {
            y: 100,

            ease: 'elastic.easeOut',
            stagger: 0.1,
        });

        gsap.to(q(".box"), {
            rotation: 200,
            delay: 1,
            duration: 3,
            scale: 0.5,
            backgroundColor: 'red',
            ease: 'elastic.easeOut',
            stagger: 0.1,
        });
    });
    return (
        <div style={{display: "flex", gap: "10px"}} ref={boxRef}>
            {squaresArray.map((_, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            background: 'green',
                            fontWeight: 600,
                            color: 'white',
                        }}
                        className="box"
                    >
                        Hello
                    </div>
                );
            })}
        </div>
    );
}
