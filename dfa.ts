export type Letter = "0" | "1";

export class State {
    edges: Map<Letter, State>;
    isAcceptState: boolean;

    constructor(edges: Map<Letter, State>, isAcceptState: boolean = false) {
        this.edges = edges;
        this.isAcceptState = isAcceptState;
    }

    run(input: Letter[]) {
        let nextLetter = input.shift();
        if (!nextLetter) {
            return this.isAcceptState;
        }
        let nextState = this.edges.get(nextLetter);
        if (!nextState) {
            return false;
        }
        return nextState.run(input);
    }
}

export class DFA {
    states: State[]
    startState: State | null

    constructor(states: State[], startState: State | null) {
        this.states = states;
        this.startState = startState;
    }

    run(input: Letter[]) {
        if (!this.startState) {
            return false;
        }
        return this.startState.run(input);
    }
}