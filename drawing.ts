import { DFA, State } from "./dfa";

const RADIUS = 20;
const ARROW_HEIGHT = 5;
const ARROW_WIDTH = 8;
const NORMAL_COLOR = "black";
const SELECTED_COLOR = "red";
const POINTING_BACK_SHIFT = 10;

export function drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.restore();
}

export function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}

export function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, isEdgePointingBack: boolean, letter: string) {
    ctx.save();
    let angle = Math.atan2(-(y2 - y1), x2 - x1);
    function shiftForPointingBack(point: [number, number]): [number, number] {
        return translatePoint(point, angle + Math.PI / 2, isEdgePointingBack ? POINTING_BACK_SHIFT : 0);
    }

    ctx.beginPath();
    ctx.strokeStyle = color;
    let point1 = shiftForPointingBack([x1, y1]);
    let point2 = shiftForPointingBack([x2, y2]);
    ctx.moveTo(point1[0], point1[1]);
    ctx.lineTo(point2[0], point2[1]);
    ctx.stroke();

    ctx.beginPath();
    let arrowTip = shiftForPointingBack(translatePoint([x2, y2], angle, RADIUS));
    ctx.moveTo(arrowTip[0], arrowTip[1]);
    let arrowEdge1 = translatePoint(translatePoint(arrowTip, angle, ARROW_HEIGHT), angle - Math.PI / 2, ARROW_WIDTH);
    ctx.lineTo(arrowEdge1[0], arrowEdge1[1]);
    let arrowEdge2 = translatePoint(translatePoint(arrowTip, angle, ARROW_HEIGHT), angle + Math.PI / 2, ARROW_WIDTH);
    ctx.lineTo(arrowEdge2[0], arrowEdge2[1]);
    ctx.fill();

    ctx.fillText(letter, (point1[0] + point2[0]) / 2, (point1[1] + point2[1]) / 2);

    ctx.restore();
}

export function drawSelfLine(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, letter: string) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y - RADIUS, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText(letter, x - RADIUS * .125, y - RADIUS * 1.25);
    ctx.restore();
}

function translatePoint(point: [number, number], angle: number, distance: number): [number, number] {
    return [point[0] - (distance * Math.cos(angle)), point[1] + (distance * Math.sin(angle))]
}

function distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

export function canPlaceState(dfa: DFA, x: number, y: number): boolean {
    for (let i = 0; i < dfa.states.length; i++) {
        const s = dfa.states[i];
        if (distance(x, y, s.position[0], s.position[1]) < RADIUS * 2) {
            return false;
        }
    }
    return true;
}

export function clickedState(dfa: DFA, x: number, y: number): State | null {
    for (let i = 0; i < dfa.states.length; i++) {
        const s = dfa.states[i];
        if (distance(x, y, s.position[0], s.position[1]) <= RADIUS) {
            return s;
        }
    }
    return null;
}

export function drawDFA(ctx: CanvasRenderingContext2D, dfa: DFA) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    dfa.states.forEach(s => {
        let toDraw: Map<State, string> = new Map();
        s.edges.forEach((toState, letter) => {
            if (toDraw.has(toState)) {
                toDraw.set(toState, toDraw.get(toState) + "," + letter);
            } else {
                toDraw.set(toState, letter);
            }
        });

        toDraw.forEach((letter, toState) => {
            if (s == toState) {
                drawSelfLine(ctx, s.position[0], s.position[1], RADIUS, NORMAL_COLOR, letter);
                return;
            }
            let isEdgePointingBack = false;
            toState.edges.forEach(checkState => {
                if (checkState == s) {
                    isEdgePointingBack = true;
                }
            });
            drawLine(ctx, s.position[0], s.position[1], toState.position[0], toState.position[1], NORMAL_COLOR, isEdgePointingBack, letter);
        });

    });

    if (dfa.startState) {
        drawLine(ctx, dfa.startState.position[0] - 2 * RADIUS, dfa.startState.position[1], dfa.startState.position[0], dfa.startState.position[1], NORMAL_COLOR, false, "");
    }

    dfa.states.forEach(s => {
        drawCircle(ctx, s.position[0], s.position[1], RADIUS, s.selected ? SELECTED_COLOR : NORMAL_COLOR);
    });
}