export type Letter = "0" | "1"
export type InputString = Letter[]

export interface State {
    edges: Map<Letter, State>
    isAcceptState: boolean
}

export interface DFA {
    states: State[]
    startState: State | null
}

export function runDFA(dfa: DFA, input: InputString): boolean {
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