import { State, DFA } from "./dfa";
import { drawRect, drawCircle } from "./drawing";

let s1 = new State(new Map(), false);
let s2 = new State(new Map(), true);
s1.edges.set("0", s2);

let dfa: DFA = new DFA([s1, s2], s1);

console.log(dfa.run([]));
console.log(dfa.run(["0"]));
console.log(dfa.run(["0", "1"]));

window.onload = function () {
    const canvas = document.getElementById("dfaCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    drawRect(ctx, 0, 0, canvas.width, canvas.height, "gray");
    drawRect(ctx, 0, 0, 100, 100, "red");
    drawRect(ctx, 200, 100, 50, 100, "blue");
    drawCircle(ctx, 300, 100, 10, "black");
    ctx.fillText("testing", 50, 250);
}