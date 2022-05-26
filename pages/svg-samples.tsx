import {svg} from "d3";

export default function SvgSamples() {

    return (
        <svg version="1.1"
             width="300" height="200"
             xmlns="http://www.w3.org/2000/svg">

            <rect width="100%" height="100%" fill="dodgerblue" />

            <circle cx="150" cy="100" r="80" fill="yellow" />


            <text x="150" y="120" font-size="60" text-anchor="middle" fill="black">SVG</text>

        </svg>
    )
}
// good pen to visit https://codepen.io/anthonydugois/pen/mewdyZ
