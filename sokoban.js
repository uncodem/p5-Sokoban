"use strict";

class Vect {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    add(v2) {
        this.x += v2.x;
        this.y += v2.y;
    }

    negative() {
        return (this.x < 0 || this.y < 0);
    }

}

class SokobanCore {
    constructor() {
        this.m_width = 20;
        this.m_height = 15;
        this.m_size = this.m_width * this.m_height;
        this.map = new Array(this.m_size);
        
        this.map = this.map.fill(0);
        
        this.player = new Vect(0,0);

        this.solids = [4, 6];
        this.pushable = [2,5];

    }

    getIndx(x, y) {
        return y*this.m_width+x;
    }

    getCell(x, y) {
        return this.map[this.getIndx(x,y)];
    }

    move(dx, dy) {
        let o_pos = new Vect(this.player.x, this.player.y);
        this.player.add(new Vect(dx, dy));
        let ontop = this.getCell(this.player.x, this.player.y);
        if (this.solids.includes(ontop) || this.player.negative() || this.player.x > this.m_width || this.player.y > this.m_height) {
            this.player = o_pos;
            return false;
        } else if (this.pushable.includes(ontop)) {
            let b_pos = new Vect(this.player.x, this.player.y);
            b_pos.add(new Vect(dx, dy));
            let b_ontop = this.getCell(b_pos.x, b_pos.y);
            if (b_ontop == 0) {
                this.map[this.getIndx(b_pos.x-dx, b_pos.y-dy)] = (ontop == 5) ? 3 : 0;
                this.map[this.getIndx(b_pos.x,b_pos.y)] = 2;
            } else if (b_ontop == 3) {
                this.map[this.getIndx(b_pos.x-dx, b_pos.y-dy)] = (ontop == 5) ? 3 : 0;
                this.map[this.getIndx(b_pos.x,b_pos.y)] = 5;
            } else {
                this.player = o_pos;
                return false;
            }
        }
        return true;
    }
    
    processCheese() {
        let score = 0;
        for (let s of this.map) {
            if (s == 5) --score;
            else if (s == 3) score += 100;
        }
        return (score < 0);
    }

    loadLvl(level, mx, my, w, h, e = false) {
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                let i = y * w + x;
                let mi = this.getIndx(mx+x, my+y);
                if (e) this.map[mi] = 0;
                if (level[i] == 1) { this.player = new Vect(mx+x,my+y); continue; }
                if (level[i] == -1) continue;
                this.map[mi] = level[i];
            }
        }
    }

    clearMap(n) {
        for (let i = 0; i < this.map.length; i++) {
            this.map[i] = n;
        }
    }

};