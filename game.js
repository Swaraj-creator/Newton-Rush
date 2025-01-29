
const newton = document.querySelector("div.newton");

let pressedKeys = {
    ArrowLeft: false,
    ArrowRight: false
}
let player = {
    started: true,
    pos: 150
}
window.addEventListener("keydown", (e) => {
    pressed(e);
})
window.addEventListener("keyup", (e) => {
    released(e);
})

function pressed(e) {
    pressedKeys[e.key] = true;
    console.log(e.key);
}
function released(e) {
    pressedKeys[e.key] = false;
    console.log(e.key);
}

function playGame() {
    if(player.started) {
        if(pressedKeys.ArrowLeft) {
            if(player.pos-10 > 50) {
                player.pos -= 10;
            }
        } if(pressedKeys.ArrowRight) {
            if(player.pos+newton.clientWidth+10 < window.innerWidth - 50) {
                player.pos += 10;
            }
        }
        
        newton.style.left = `${player.pos}px`;
        
        window.requestAnimationFrame(playGame);
    }
}

window.requestAnimationFrame(playGame);
