import { DFA } from "./dfa";

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

export function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke()
    ctx.restore();
}

export function drawDFA(ctx: CanvasRenderingContext2D, dfa: DFA) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // draw edges
    dfa.states.forEach(s1 => {
        dfa.states.forEach(s2 => {
            drawLine(ctx, s1.position[0], s1.position[1], s2.position[0], s2.position[1], "black");
        })
    })

    // draw states
    dfa.states.forEach(s => {
        drawCircle(ctx, s.position[0], s.position[1], RADIUS, "black");
    });
}