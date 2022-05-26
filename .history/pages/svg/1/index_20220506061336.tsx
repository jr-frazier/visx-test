import Square from './Square';

export default function Svg1() {
    const boxRef = useRef();


    return (
        <div>
            <Square ref={boxRef} />
        </div>
    );
}
