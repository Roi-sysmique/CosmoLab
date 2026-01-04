const m1_input = document.getElementById('m1');
const m2_input = document.getElementById('m2');
const v1_input = document.getElementById('v1');
const v2_input = document.getElementById('v2');
const pause_btn = document.getElementById('pause');
const start_btn = document.getElementById('start');
const restart_btn = document.getElementById('repeat');
let obj1, obj2, distance;
const gap = 6;


function setup(){
    const c = createCanvas(500, 300);
    c.parent("canvas-container");
    obj1 = new Sprite(halfWidth/2, halfHeight, 55, 55, KIN);
    obj1.friction = 0;
    obj1.drag = 0;
    obj1.image = '🟦';

    obj2 = new Sprite(width* 3/4, halfHeight, 55, 55, KIN);
    obj2.friction = 0;
    obj2.drag = 0;
    obj2.image = '🟥';
    obj2.vel.x = -1;
    pause_btn.addEventListener('click', () => {
        world.timeScale = 0;
    });

    start_btn.addEventListener('click', () => {
        world.timeScale = 1;
        if (m1_input.value && m2_input.value && v1_input.value && v2_input.value){
            m1 = Number(m1_input.value);m2 = Number(m2_input.value);v1 = Number(v1_input.value);v2 = Number(v2_input.value);
            if (m1 > 200 || m1 < 1){
                m1 = 1;
            }
            if (m2 > 200 || m2 < 1){
                m2 = 1;
            }
            if (v1 < 0 || v1 > 50){
                v1 = 1;
            }
            if (v2 < 0 || v2 > 50){
                v2 = 1;
            }
            obj1.vel.x = v1;
            obj2.vel.x = v2;
        } else{
            m1 = 1;
            m2 = 1;
        }
    });

    restart_btn.addEventListener('click', () => {
        obj1.pos = { x: halfWidth/2, y: halfHeight };
        obj2.pos = { x: width * 3/4, y: halfHeight };
        obj2.vel.x = -1;
        obj1.vel.x = 0;
        if (m1_input.value && m2_input.value && v1_input.value && v2_input.value){
            m1 = Number(m1_input.value);m2 = Number(m2_input.value);v1 = Number(v1_input.value);v2 = Number(v2_input.value);
            if (m1 > 200 || m1 < 1){
                m1 = 1;
            }
            if (m2 > 200 || m2 < 1){
                m2 = 1;
            }
            if (abs(1) > 20){
                v1 = 1;
            }
            if (abs(v2) > 20){
                v2 = 1;
            }
            obj1.vel.x = v1;
            obj2.vel.x = v2;
        } else{
            m1 = 1;
            m2 = 1;
        }
    });
    world.timeScale = 0;

}

function OneDElasticCollisions(v1, m1, v2, m2){
    final_v1 = (((m1 - m2)/(m1 + m2))*v1) + ((2*m2)/(m1 + m2))*v2;
    final_v2 = (((2*m1)/(m1+m2))*v1) - ((m1-m2)/(m1+m2))*v2;
    return [final_v1, final_v2];
}

function ApplyElasticCollisions(object1, object2, mass1, mass2){
    velocities = OneDElasticCollisions(object1.vel.x, mass1, object2.vel.x, mass2);
    obj1.vel.x = velocities[0];
    obj2.vel.x = velocities[1];
}

function update(){
    background(55);
    distance = dist(obj1.x, obj1.y, obj2.x, obj2.y);
    if (distance < obj1.width + gap){
        ApplyElasticCollisions(obj1, obj2, m1, m2);
    }

    obj1.text = String(round(obj1.vel.x * 100)/100) + ' m/s';
    obj2.text = String(round(obj2.vel.x * 100)/100) + ' m/s';

    if (obj1.x <= obj1.halfWidth + gap){
        obj1.vel.x = OneDElasticCollisions(obj1.vel.x, 1, 0, 1000)[0];
    }

    if (obj2.x >= width - obj2.halfWidth - gap){
        obj2.vel.x = OneDElasticCollisions(obj2.vel.x, 1, 0, 1000)[0];
    }
}
