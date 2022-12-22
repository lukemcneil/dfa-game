import { State, DFA } from "./dfa";
import { canPlaceState, clickedState, drawDFA } from "./drawing";

window.onload = function () {
    const canvas = document.getElementById("dfaCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.style.background = "white";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let dfa = new DFA([], null);
    let selectedState: State | null = null;

    // disable right click opening context menu on canvas
    canvas.oncontextmenu = () => false;

    canvas.addEventListener("mousedown", function (e: MouseEvent) {
        if (canPlaceState(dfa, e.offsetX, e.offsetY)) {
            let s = new State(new Map(), false, [e.offsetX, e.offsetY]);
            dfa.addState(s);
        } else {
            let s = clickedState(dfa, e.offsetX, e.offsetY);
            if (s) {
                if (selectedState) {
                    selectedState.edges.set("0", s);
                    selectedState.selected = false;
                    selectedState = null;
                } else {
                    selectedState = s;
                    s.selected = true;
                }
            }
        }
        drawDFA(ctx, dfa);
    })

    canvas.addEventListener("mouseup", function (e: MouseEvent) {
        if (selectedState) {
            selectedState.selected = false;
        }
        selectedState = null;
        drawDFA(ctx, dfa);
    })

    canvas.addEventListener("mousemove", function (e: MouseEvent) {
        if (selectedState) {
            selectedState.position = [e.offsetX, e.offsetY];
            drawDFA(ctx, dfa);
        }
    })

    window.onresize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawDFA(ctx, dfa);
    }
}