type Letter = "0" | "1"
type InputString = Letter[]

interface State {
    edges: Map<Letter, State>
    isAcceptState: boolean
}

interface DFA {
    states: State[]
    startState: State | null
}

function runDFA(dfa: DFA, input: InputString): boolean {
    if (!dfa.startState) {
        return false
    }
    return runDFAHelper(dfa.startState, input)
}

function runDFAHelper(state: State, input: InputString): boolean {
    let nextLetter = input.shift()
    if (!nextLetter) {
        return state.isAcceptState
    }
    let nextState = state.edges.get(nextLetter)
    if (!nextState) {
        return false
    }
    return runDFAHelper(nextState, input)
}

let s1: State = { edges: new Map(), isAcceptState: false };
let s2: State = { edges: new Map(), isAcceptState: true };
s1.edges.set("0", s2)

let dfa: DFA = { states: [s1, s2], startState: s1 }

console.log(runDFA(dfa, []))
console.log(runDFA(dfa, ["0"]))
console.log(runDFA(dfa, ["0", "1"]))

function drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
    ctx.restore()
}

window.onload = function () {
    const canvas = document.getElementById("dfaCanvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    drawRect(ctx, 0, 0, canvas.width, canvas.height, "gray")
    drawRect(ctx, 0, 0, 100, 100, "red")
    drawRect(ctx, 200, 100, 50, 100, "blue")
    ctx.fillText("testing", 50, 250)
}