
const newton = document.querySelector("div.newton");

let pressedKeys = {
    ArrowLeft: false,
    ArrowRight: false
}

window.addEventListener("keydown", (e) => {
    pressed(e);
});
window.addEventListener("keyup", (e) => {
    released(e);
})

function pressed(e) {
    pressedKeys[e.key] = true;
}
function released(e) {
    pressedKeys[e.key] = false;
}