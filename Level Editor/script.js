"use strict";

const m_width = 9;
const m_height = 9;
let s_width, s_height;
let m_data = new Array(m_width*m_height);

let palette;

let current_select = 0;

function setup() {
    createCanvas(880,600);
    background(0);

    s_width = Math.floor(800/m_width);
    s_height = Math.floor(height/m_height);

    for (let i = 0; i < m_data.length; i++) {
        m_data[i] = 6;
    }

    palette = [
        color(0x1a,0x1c,0x2c), // Void, 0
        color(0xf4,0xf4,0xf4), // Player, 1
        color(0xff,0xcd,0x75), // Boxes, 2
        color(0xa7,0xf0,0x70), // Goal, 3
        color(0xb1,0x3d,0x53), // Wall, 4
        color(0xef,0x7d,0x57),  // TakenGoal, 5 
        color(0), // Barrier, 6
    ];

}

function draw() {
    background(0);
    stroke(255);
    strokeWeight(1);
    for (let y = 0; y < m_height; y++) {
        for (let x = 0; x < m_width; x++) {
            let i = m_data[y * m_width + x];
            fill((i != -1) ? palette[i] : 0);
            rect(x*s_width, y*s_height, s_width, s_height);
        }
    }

    strokeWeight(2);

    for (let i = 0; i < palette.length; i++) {
        fill(palette[i]);
        if (i == current_select) stroke(41, 128, 185);
        else stroke(255);
        rect(800, i*s_height, s_width, s_height);
    } 

    noStroke();
    textSize(25);

    fill(0,0,255);
    rect(width-s_width,height-(s_height*2), s_width, s_height);
    fill(255);
    text("Import", width-s_width, height-s_height*2,width,height-s_height);

    fill(255,0,0);
    rect(width-s_width,height-s_height,s_width,s_height);
    fill(255);
    
    text("Export", width-s_width, height-s_height, width,height);
}

function mousePressed() {
    // Clicked inside the board area
    if (mouseX <= width && mouseY <= height) {
        if (mouseX <= 800) {
            let b_x = Math.floor(mouseX/s_width);
            let b_y = Math.floor(mouseY/s_height);
            if (mouseButton == LEFT) {
                m_data[b_y * m_width + b_x] = current_select;
            } else if (mouseButton == RIGHT) {
                m_data[b_y * m_width + b_x] = 0;
            }
        } else {
            // Clicked inside the palette area
            if (mouseY <= (s_height * palette.length)) {
                current_select = Math.floor(mouseY / s_height);
            } else if (mouseY >= height-s_height) {
                let outp = document.getElementById("outp");
                outp.innerHTML = export_data();
                
                console.log("expor");
            } else if (mouseY >= height-s_height*2) {
                let raw_mdata = prompt("Map");
                if (raw_mdata == null) return;
                m_data = JSON.parse(raw_mdata);
            }  
        }
    }
}

function export_data() {
    let ret = "[<br />";
    ret += m_data.join(",");
    ret += "<br />]";
    return ret;
}
