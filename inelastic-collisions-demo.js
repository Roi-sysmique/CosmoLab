const m1_input = document.getElementById('m1');
const m2_input = document.getElementById('m2');
const v1_input = document.getElementById('v1');
const v2_input = document.getElementById('v2');
const e_input = document.getElementById('e');
const pause_btn = document.getElementById('pause');
const start_btn = document.getElementById('start');
const restart_btn = document.getElementById('repeat');

let obj1, obj2;
let m1 = 1, m2 = 1, v1 = 0, v2 = 0, e = 1;
let hasCollided = false;
const gap = 6;

function setup() {
    const c = createCanvas(500, 300);
    c.parent("canvas-container");

    obj1 = new Sprite(width/4, height/2, 55, 55, KIN);
    obj1.friction = 0;
    obj1.drag = 0;
    obj1.image = '🟦';

    obj2 = new Sprite(width*3/4, height/2, 55, 55, KIN);
    obj2.friction = 0;
    obj2.drag = 0;
    obj2.image = '🟥';
    obj2.vel.x = -1;

    world.timeScale = 0; // start paused

    pause_btn.addEventListener('click', () => world.timeScale = 0);

    start_btn.addEventListener('click', () => {
        readInputs();
        obj1.vel.x = v1;
        obj2.vel.x = v2;
        world.timeScale = 1;
    });

    restart_btn.addEventListener('click', () => {
        readInputs();
        obj1.pos = { x: width/4, y: height/2 };
        obj2.pos = { x: width*3/4, y: height/2 };
        obj1.vel.x = v1;
        obj2.vel.x = v2;
        hasCollided = false;
    });
}

function readInputs() {
    if (m1_input.value && m2_input.value && v1_input.value && v2_input.value && e_input.value) {
        m1 = Number(m1_input.value);
        m2 = Number(m2_input.value);
        v1 = Number(v1_input.value);
        v2 = Number(v2_input.value);
        e  = Number(e_input.value);
        if (m1 > 200 || m1 < 1) m1 = 1;
        if (m2 > 200 || m2 < 1) m2 = 1;
        if (Math.abs(v1) > 20) v1 = 1;
        if (Math.abs(v2) > 20) v2 = 1;
        if (e > 1 || e < 0) e = 1;
        if (e === 0) e = 0.1;
    } else {
        m1 = 1;
        m2 = 1;
        v1 = 0;
        v2 = 0;
        e  = 1;
    }
}


function OneDElasticCollisions(v1, m1, v2, m2, e){
    let final_v1 = ((m1*v1) + (m2*v2) - m2*e*(v1-v2))/(m1 + m2);
    let final_v2 = ((m1*v1) + (m2*v2) + m1*e*(v1-v2))/(m1 + m2);
    return [final_v1, final_v2];
}

function ApplyElasticCollisions(object1, object2, mass1, mass2, restitution){
    let velocities = OneDElasticCollisions(object1.vel.x, mass1, object2.vel.x, mass2, restitution);
    object1.vel.x = velocities[0];
    object2.vel.x = velocities[1];
}

function update() {
    background(55);

    let distance = dist(obj1.x, obj1.y, obj2.x, obj2.y);
    print(e)
    print(m1)
    print(m2)
    print(v1)
    print(v2)
    print('--------------')
    if (distance < obj1.width + gap && !hasCollided){
        ApplyElasticCollisions(obj1, obj2, m1, m2, e);
        hasCollided = true;
    }

    if (distance >= obj1.width + gap){
        hasCollided = false;
    }

    obj1.text = round(obj1.vel.x*100)/100 + ' m/s';
    obj2.text = round(obj2.vel.x*100)/100 + ' m/s';

    
    if (obj1.x <= obj1.halfWidth + gap) obj1.vel.x *= -1;
    if (obj2.x >= width - obj2.halfWidth - gap) obj2.vel.x *= -1;
}
