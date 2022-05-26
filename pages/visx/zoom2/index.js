import { Zoom } from '@visx/zoom'


const width = 300;
const height = 200;

export default function ZoomEl() {

    return (
        <Zoom
            width={width}
            height={height}
            scaleXMin={1}
            scaleXMax={10}
            scaleYMin={0}
            scaleYMax={10}
            initialTransformMatrix={{
                    scaleX: 1,
                    scaleY: 1,
                    translateX: 1,
                    translateY: 1,
                    skewX: 0,
                    skewY: 0,
                }}
        >
            {(zoom) =>

                    <svg version="1.1"
                         width={width * 2} height={height * 2}
                         xmlns="http://www.w3.org/2000/svg"
                         transform={`translate(0, 0)`}
                         style={{border: "3px solid red"}}
                         ref={zoom.containerRef}
                    >
                        {console.log(zoom.transformMatrix)}
                        <g >
                            <rect
                                width={width}
                                height={height}
                                fill="dodgerblue"
                                // onTouchStart={zoom.dragStart}
                                // onTouchMove={zoom.dragMove}
                                // onTouchEnd={zoom.dragEnd}
                                // onMouseDown={zoom.dragStart}
                                // onMouseMove={zoom.dragMove}
                                // onMouseUp={zoom.dragEnd}
                                // onMouseLeave={() => {
                                //     if (zoom.isDragging) zoom.dragEnd();
                                // }}
                            />

                            <circle transform={zoom.toString()} cx="150" cy="100" r="80" fill="yellow" />
                        </g>


                    </svg>

            }
        </Zoom>

    )
}
