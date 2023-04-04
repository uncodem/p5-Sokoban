"use strict";

class SokobanGame extends SokobanCore {
    constructor() {
        super();
        this.m_size = this.m_width*this.m_height;
        this.s_width = Math.floor(width/this.m_width);
        this.s_height = Math.floor(height/this.m_height);
        
        this.palette = [
            color(0x1a,0x1c,0x2c), // Void, 0
            color(0xf4,0xf4,0xf4), // Player, 1
            color(0xff,0xcd,0x75), // Boxes, 2
            color(0xa7,0xf0,0x70), // Goal, 3
            color(0xb1,0x3d,0x53), // Wall, 4
            color(0xef,0x7d,0x57), // TakenGoal, 5 
            color(0x1a,0x1c,0x2c)  // Barrier, 6
        ];

    }

    drawMap() {
        noStroke();
        for (let y = 0; y < this.m_height; y++) {
            for (let x = 0; x < this.m_width; x++) {
                let m = this.map[this.getIndx(x,y)];
                fill(this.palette[m]);
                rect(x*this.s_width,y*this.s_height,this.s_width,this.s_height)
            }
        }
        
        fill(this.palette[1]);
        rect(this.player.x*this.s_width, this.player.y*this.s_height,this.s_width,this.s_height);
    }

}