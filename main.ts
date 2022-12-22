import { State, DFA, runDFA } from "./dfa";
import { drawRect, drawCircle } from "./drawing";

let s1: State = { edges: new Map(), isAcceptState: false };
let s2: State = { edges: new Map(), isAcceptState: true };
s1.edges.set("0", s2)

let dfa: DFA = { states: [s1, s2], startState: s1 }

console.log(runDFA(dfa, []))
console.log(runDFA(dfa, ["0"]))
console.log(runDFA(dfa, ["0", "1"]))

window.onload = function () {
    const canvas = document.getElementById("dfaCanvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    drawRect(ctx, 0, 0, canvas.width, canvas.height, "gray")
    drawRect(ctx, 0, 0, 100, 100, "red")
    drawRect(ctx, 200, 100, 50, 100, "blue")
    drawCircle(ctx, 300, 100, 10, "black")
    ctx.fillText("testing", 50, 250)
}