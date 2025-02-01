
const newton = document.querySelector("div.newton");
const apples = document.querySelectorAll("div.apple");
const appleSpawns = [
    {
        x: "50%",
        y: "20%"
    }, {
        x: "70%",
        y: "20%"
    }, {
        x: "30%",
        y: "20%"
    }, {
        x: "15%",
        y: "35%"
    }, {
        x: "35%",
        y: "35%"
    }, {
        x: "60%",
        y: "35%"
    }, {
        x: "75%",
        y: "35%"
    }, {
        x: "20%",
        y: "50%"
    }, {
        x: "50%",
        y: "50%"
    }, {
        x: "80%",
        y: "50%"
    }
]
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

window.addEventListener("load", () => {
    for(let i=0; i<appleSpawns.length; i++) {
        apples[i].style.top = `${appleSpawns[i].y}`;
        apples[i].style.left = `${appleSpawns[i].x}`;
    }
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

window.requestAnimationFrame(playGame);
