export function random(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getMousePosition(canvas, evt) {

    let rect = canvas.getBoundingClientRect(),
        scaleX = 600 / 60,  // Relationship  Canvas vs Tile size
        scaleY = 600 / 60;  // Relationship  Canvas vs Tile size

    return {
        column: Math.floor((evt.clientX - rect.left) / 60),
        row: Math.floor((evt.clientY - rect.top) / 60)
    };
}