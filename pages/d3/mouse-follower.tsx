/**
 * A program that follows your mouse with a circle
 */
import React from 'react'



export default function MouseFollower() {
    const width = '100%'
    const height = '100vh'
    const [circleRadius, setCircleRadius] = React.useState<number>(30)
    const [mousePosition, setMousePosition] = React.useState<{x: number, y: number}>({x: 0, y: 0})

   const handleMouseMove = React.useCallback((event: {clientX: number, clientY: number}): void => {
        const {clientX, clientY} = event
        setMousePosition({x: clientX, y: clientY})
   }, [mousePosition])

    return (
        <svg width={width} height={height} onMouseMove={handleMouseMove}>
            <circle
                cx={mousePosition.x}
                cy={mousePosition.y}
                r={circleRadius}
            />
        </svg>
    )
}
