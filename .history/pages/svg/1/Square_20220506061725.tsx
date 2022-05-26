
import React from 'react'

export default function Square({ ref }: { ref: React.MutableRefObject<SVGAElement> }) {
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
        }} className="box" ref={ref}>Hello</div>
}