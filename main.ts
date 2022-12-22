import { State, DFA } from "./dfa";
import { drawDFA } from "./drawing";

window.onload = function () {
    const canvas = document.getElementById("dfaCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.style.background = "gray";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let dfa = new DFA([], null);

    // disable right click opening context menu on canvas
    canvas.oncontextmenu = () => false;

    canvas.addEventListener("mousedown", function (e: MouseEvent) {
        let s = new State(new Map(), false, [e.offsetX, e.offsetY]);
        dfa.addState(s);
        drawDFA(ctx, dfa);
    })

    window.onresize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawDFA(ctx, dfa);
    }
}