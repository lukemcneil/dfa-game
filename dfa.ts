import { drawCircle } from "./drawing";

export type Letter = "0" | "1";

export class State {
    edges: Map<Letter, State>;
    isAcceptState: boolean;
    position: [number, number];
    selected: boolean;

    constructor(edges: Map<Letter, State>, isAcceptState: boolean, position: [number, number]) {
        this.edges = edges;
        this.isAcceptState = isAcceptState;
        this.position = position;
        this.selected = false;
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

    addState(s: State) {
        this.states.push(s);
        if (!this.startState) {
            this.startState = s;
        }
    }
}