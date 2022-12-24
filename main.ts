import { State, DFA, Letter } from "./dfa";
import { canPlaceState, clickedState, drawDFA } from "./drawing";

const LEFT = 0;
const RIGHT = 2;

window.onload = function () {
    const canvas = document.getElementById("dfaCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.style.background = "gray";
    canvas.width = 500;
    canvas.height = 500;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let dfa = new DFA([], null);
    let selectedState: State | null = null;
    let draggingState: State | null = null;

    // disable right click opening context menu on canvas
    canvas.oncontextmenu = () => false;

    canvas.addEventListener("mousedown", function (e: MouseEvent) {
        if (e.button == LEFT) {
            if (canPlaceState(dfa, e.offsetX, e.offsetY)) {
                let s = new State(new Map(), false, [e.offsetX, e.offsetY]);
                dfa.addState(s);
            } else {
                let s = clickedState(dfa, e.offsetX, e.offsetY);
                if (s) {
                    draggingState = s;
                }
            }
        } else if (e.button == RIGHT) {
            let s = clickedState(dfa, e.offsetX, e.offsetY);
            if (s) {
                if (selectedState) {
                    let selectedLetter = document.querySelector("input[name='letterSelect']:checked") as HTMLInputElement
                    if (selectedLetter) {
                        selectedState.edges.set(selectedLetter.value as Letter, s);
                        selectedState.selected = false;
                        selectedState = null;
                    }
                } else {
                    selectedState = s;
                    s.selected = true;
                }
            } else {
                if (selectedState) {
                    selectedState.selected = false;
                    selectedState = null;
                }
            }
        }
        drawDFA(ctx, dfa);
    })

    canvas.addEventListener("mouseup", function (e: MouseEvent) {
        draggingState = null;
    })

    canvas.addEventListener("mousemove", function (e: MouseEvent) {
        if (draggingState) {
            draggingState.position = [e.offsetX, e.offsetY];
            drawDFA(ctx, dfa);
        }
    })

    window.addEventListener("keypress", function (e: KeyboardEvent) {
        if (e.key == "s") {
            if (selectedState) {
                dfa.startState = selectedState;
                selectedState.selected = false;
                selectedState = null;
            }
        }
        drawDFA(ctx, dfa);
    })
}