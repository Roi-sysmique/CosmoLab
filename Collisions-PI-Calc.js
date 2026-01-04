
const input_m2 = document.getElementById('m2');
let obj1, obj2, distance;
let collisions = 0;
let hasCollided = false;
const start_btn = document.getElementById('button-8');
const replay_btn = document.getElementById('replay');
const pause_btn = document.getElementById('pause');
const pi = document.getElementById('pi-value');
let canvas;

function setup(){
    const container = document.getElementById('canvas-container');
    const w = Math.min(container.clientWidth, 1000);
    const h = container.clientHeight || 370;

    world.timeScale = 0
    canvas = createCanvas(w, h);
    canvas.parent('canvas-container');

    obj1 = new Sprite(w / 4, h / 2, 55, 55, KIN);
    obj2 = new Sprite(w * 3 / 4, h / 2, 55, 55, KIN);

    obj1.friction = 0;
    obj1.drag = 0;
    obj1.image = '🟦';
    m1 = 1;
    start_btn.addEventListener('click', () => {
        if (world.timeScale === 0){
            world.timeScale = 1;
            if (input_m2.value){
                m2 = Number(input_m2.value)
            }else{
                m2 = 100;
                input_m2.value = String(m2);
            }
        }
    });
    replay_btn.addEventListener('click', () => {
		window.location.reload();
    })
    pause_btn.addEventListener('click', () => {
        world.timeScale = 0;
    });
    obj2.friction = 0;
    obj2.drag = 0;
    obj2.image = '🟥';
    obj2.vel.x = -1;
    pi.textContent = 0;
    obj1.layer = 2
	let stars = new Group();
	stars.opacity = 0.3;
	stars.physics = NONE;

	for (let i = 0; i < 80; i++) {
	let size = floor(random(15, 25)); 

	let s = new stars.Sprite(
		random(width),
		random(height)
	);

	s.w = size;
	s.h = size;
	s.image = random(['➕', '➗', '✖']);
	s.rotationSpeed = random(1, 3);
	s.layer = 1;
	}


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
    if (distance <= obj1.width && !hasCollided){
        ApplyElasticCollisions(obj1, obj2, m1, m2);
        collisions++;
        hasCollided = true;
    }

    if (distance > obj1.width){
        hasCollided = false;
    }

    obj1.text = String(round(obj1.vel.x * 100)/100) + ' m/s';
    obj2.text = String(round(obj2.vel.x * 100)/100) + ' m/s';

    if (obj1.x <= obj1.halfWidth+3){
        obj1.vel.x = OneDElasticCollisions(obj1.vel.x, 1, 0, 1000)[0];
        collisions++;
    }
    pi.textContent = String(collisions/sqrt(m2/m1))

}
