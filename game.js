
const newton = document.querySelector("div.newton");
const apples = document.querySelectorAll("div.apple");
const bomb = document.querySelector("div.bomb");
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
        setTimeout(() => {
            gsap.to(apples[i], {scale: 1, duration: 0.5, ease: "elastic.out(1, 1)"});
            setTimeout(() => {
                apples[i].classList.add("fall");
            }, 1000);
        }, Math.floor(Math.random() * 5000))
    }
    bomb.style.left = randomItem(appleSpawns).x;
    setTimeout(() => {
        bomb.classList.add("fall");
    }, 5000);
})

function pressed(e) {
    pressedKeys[e.key] = true;
    // console.log(e.key);
}
function released(e) {
    pressedKeys[e.key] = false;
    // console.log(e.key);
}

function randomItem(lst) {
    let ran = Math.floor(Math.random() * lst.length);
    return lst[ran];
}

function playGame() {

    if(player.started) {

        //to control player's movement
        if(pressedKeys.ArrowLeft) {
            if(player.pos-10 > 100) {
                player.pos -= 10;
            }
        } if(pressedKeys.ArrowRight) {
            if(player.pos+newton.clientWidth+10 < window.innerWidth - 100) {
                player.pos += 10;
            }
        }
        
        //to make apples fall
        for(let i=0; i<apples.length; i++) {
            if(apples[i].classList.contains("fall")) {
                apples[i].style.top = `${apples[i].offsetTop + 5}px`;

                if(apples[i].offsetTop > window.innerHeight - 20) {
                    // apples[i].style.transform = "scale(0)";
                    gsap.to(apples[i], {scale: 0, duration: 0})
                    apples[i].classList.remove("fall");  //stopping fall

                    //setting a new positions to apple
                    let randCords = randomItem(appleSpawns);
                    apples[i].style.top = `${randCords.y}`;
                    apples[i].style.left = `${randCords.x}`;

                    //animating spawn
                    setTimeout(() => {
                        gsap.to(apples[i], {scale: 1, duration: 0.5, ease: "elastic.out(1, 1)"});
                        setTimeout(() => {
                            apples[i].classList.add("fall");
                        }, 1000);
                    }, 1000);
                }
            }
        }

        //to make bomb fall 
        if(bomb.classList.contains("fall")) {
            bomb.style.top = `${bomb.offsetTop + 8}px`;
            if(bomb.offsetTop > window.innerHeight) {
                bomb.style.top = "-200px";
                bomb.style.left = `${player.pos}px`;
                bomb.classList.remove("fall");
                setTimeout(() => {
                    bomb.classList.add("fall");
                }, 5000);
            }
        }

        //to make newton move
        newton.style.left = `${player.pos}px`;
        
        window.requestAnimationFrame(playGame);
    }
}

window.requestAnimationFrame(playGame);
