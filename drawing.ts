import { DFA, State } from "./dfa";

const RADIUS = 15;

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

function scale(max: number, d: number): number {
    if (d > max) {
        return 0;
    }
    return 1 - (d / max);
}

export function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) {
    ctx.save();
    let d = distance(x1, y1, x2, y2);
    ctx.globalAlpha = scale(200, d);
    ctx.beginPath();
    ctx.lineWidth = scale(200, d) * RADIUS;
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
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

    // draw edges
    dfa.states.forEach(s1 => {
        dfa.states.forEach(s2 => {
            if (distance(s1.position[0], s1.position[1], s2.position[0], s2.position[1]) < 200) {
                drawLine(ctx, s1.position[0], s1.position[1], s2.position[0], s2.position[1], "black");
            }
        })
    })

    // draw states
    dfa.states.forEach(s => {
        drawCircle(ctx, s.position[0], s.position[1], RADIUS, "black");
    });
}