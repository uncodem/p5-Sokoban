"use strict";

let game;
let t = 0;
let i_window = 0;
let p_keys = {};
let lvl = 0;

const l_width = 9;
const l_height = 9;

const map =[ 
    [
        4,4,4,4,4,6,6,6,6,4,1,0,0,4,6,6,6,6,4,0,2,0,4,6,4,4,4,4,0,2,0,4,6,4,3,4,4,4,4,2,4,4,4,3,4,6,4,4,0,0,0,0,3,4,6,4,0,0,0,4,0,0,4,6,4,0,0,0,4,4,4,4,6,4,4,4,4,4,6,6,6
    ],
    [
        6,6,4,4,4,4,6,6,6,4,4,4,0,0,4,4,4,4,4,0,0,0,0,0,2,0,4,4,0,4,0,0,4,2,0,4,4,0,3,0,3,4,1,0,4,4,4,4,4,4,4,4,4,4,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6
    ],
    [
        6,6,4,4,4,6,6,6,6,6,6,4,3,4,6,6,6,6,6,6,4,0,4,4,4,4,6,4,4,4,2,0,2,3,4,6,4,3,0,2,1,4,4,4,6,4,4,4,4,2,4,6,6,6,6,6,6,4,3,4,6,6,6,6,6,6,4,4,4,6,6,6,6,6,6,6,6,6,6,6,6
    ],
    [
        6,6,6,6,6,6,6,6,6,6,4,4,4,4,4,4,6,6,4,0,0,0,0,0,4,4,4,4,2,4,4,4,0,0,0,0,0,1,0,2,0,0,2,0,0,0,0,0,4,0,0,0,4,4,0,3,3,4,0,2,0,4,6,4,3,3,4,0,0,0,4,6,4,4,4,4,4,4,4,4,6
    ],
    [
        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,4,4,4,4,6,4,4,4,4,0,0,3,4,6,4,0,0,0,2,0,5,4,6,4,0,2,2,0,2,3,4,6,4,4,1,4,4,3,3,4,6,6,4,4,4,6,4,4,4,6,6,6,6,6,6,6,6,6,6
    ],
    [
        6,4,1,0,4,4,6,6,6,6,4,0,2,0,0,4,6,6,4,4,4,0,4,0,4,6,6,4,3,4,0,4,0,0,4,6,4,3,2,0,0,4,0,4,6,4,3,0,0,0,2,0,4,6,4,4,4,4,4,4,4,4,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6
    ],
    [
        6,6,6,6,6,6,6,6,6,6,4,4,4,4,4,4,4,6,4,4,0,0,0,0,0,4,6,4,3,0,2,4,4,0,4,6,3,3,2,0,2,0,0,1,4,3,3,0,2,0,2,0,4,6,4,4,4,4,4,0,0,4,6,6,6,6,6,6,4,4,6,6,6,6,6,6,6,6,6,6,6
    ],
    [
        6,6,6,6,6,6,6,6,6,6,6,6,4,4,4,4,4,4,6,6,6,4,0,0,0,0,4,6,4,4,4,2,2,2,0,4,6,4,0,0,2,3,3,0,4,6,4,1,0,3,3,3,0,4,6,4,4,4,4,0,0,4,4,6,6,6,6,4,4,4,4,6,6,6,6,6,6,6,6,6,6
    ],
    [
        6,6,6,6,4,4,6,6,6,6,6,6,4,3,3,4,6,6,6,6,6,4,0,3,4,6,6,6,6,4,0,0,2,3,4,6,6,6,4,0,2,0,0,4,6,6,4,0,0,4,2,2,0,4,6,4,0,0,1,0,0,0,4,6,6,4,4,4,4,4,4,4,6,6,6,6,6,6,6,6,6
    ]
];

function setup() {
    createCanvas(800,600);
    game = new SokobanGame();

    game.loadLvl(map[lvl], Math.floor((game.m_width-l_width)/2),Math.floor((game.m_height-l_height)/2),l_width,l_height);

}

function draw() {
    ++t;
    background(0);
    keyUpdate();
    game.drawMap();
}

function keyReleased() {
    p_keys[keyCode] = false;
}

function keyPressed() {
    p_keys[keyCode] = true;
}

function keyUpdate() {
    if (p_keys[82]) { // Reset
        p_keys[82] = false;
        game.map = game.map.fill(0);
        game.loadLvl(map[lvl], Math.floor((game.m_width-l_width)/2),Math.floor((game.m_height-l_height)/2),l_width,l_height, true);
    }
    if (i_window == 0) {
        i_window = 6;
        let moved = false;
        if (p_keys[LEFT_ARROW]) {
            moved = game.move(-1,0);
        } else if (p_keys[RIGHT_ARROW] && !moved) {
            moved = game.move(1,0);
        }

        if (p_keys[UP_ARROW] && !moved) {
            moved = game.move(0,-1);
        } else if (p_keys[DOWN_ARROW] && !moved) {
            moved = game.move(0,1);
        }

        if (!moved) {
            i_window = 0;
        }
        if (game.processCheese()) {
            nextLvl();
        }
        
    } else {
        if (t % 2 == 0) --i_window;
    }
}

function nextLvl() {
    ++lvl;
    lvl %= map.length;
    game.clearMap(6);
    game.loadLvl(map[lvl], Math.floor((game.m_width-l_width)/2),Math.floor((game.m_height-l_height)/2),l_width, l_height, true);
    p_keys = {};
}
