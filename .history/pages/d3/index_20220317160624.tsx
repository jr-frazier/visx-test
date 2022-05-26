import * as d3 from "d3";


export default function index() {

    function foo() {
        const div = d3.create("div");
        div.html("Hello, world!");
        return div.node();
    }
    return (
        <div>
            {foo()}
        </div>
    )
}