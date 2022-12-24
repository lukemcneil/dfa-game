import { State, DFA, Letter } from "./dfa";
import { canPlaceState, clickedState, drawDFA } from "./drawing";

const LEFT = 0;
const RIGHT = 2;

window.onload = function () {
    const canvas = document.getElementById("dfaCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let inputString = this.document.getElementById("inputString") as HTMLInputElement
    let resultText = document.getElementById("results") as HTMLElement;
    canvas.style.background = "gray";
    canvas.width = 500;
    canvas.height = 500;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let dfa = new DFA([], null);
    let selectedState: State | null = null;
    let draggingState: State | null = null;

    function update() {
        drawDFA(ctx, dfa);
        let result = dfa.run(inputString.value.replace(/ /g, ' ').toLowerCase().split("") as Letter[]);
        resultText!.textContent = result ? "✅" : "❌";
    }

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
        update();
    })

    canvas.addEventListener("mouseup", function (e: MouseEvent) {
        draggingState = null;
    })

    canvas.addEventListener("mousemove", function (e: MouseEvent) {
        if (draggingState) {
            draggingState.position = [e.offsetX, e.offsetY];
            update();
        }
    })

    document.getElementById("startStateButton")!.onclick = function (_) {
        if (selectedState) {
            dfa.startState = selectedState;
            selectedState.selected = false;
            selectedState = null;
            update();
        }
    }

    document.getElementById("acceptStateButton")!.onclick = function (_) {
        if (selectedState) {
            selectedState.isAcceptState = !selectedState.isAcceptState;
            selectedState.selected = false;
            selectedState = null;
            update();
        }
    }

    inputString.oninput = function (_) {
        update();
    }
}