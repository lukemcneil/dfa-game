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