let obj1, obj2;
const G = 6.67430e-11; 
const unit_mass = 1.989e30;  
const pause_btn = document.getElementById('pause');
const start_btn = document.getElementById('start');
const restart_btn = document.getElementById('repeat');
function setup(){
    canvas = createCanvas(500, 200);
    world.gravity.y = 0;
    obj1 = new Sprite(halfWidth/2, halfHeight, 40, DYN);
    obj2 = new Sprite(width * 3/4, halfHeight, 35, DYN);
    obj1.mass = 10**15;
    obj2.mass = 10**15;
    obj1.color = 'aliceblue';
    allSprites.rotationLock = true;
    arrow = new Sprite(-50, -50, 30, 10, NONE);
    arrow.image = '➜'
    arrow.color = (255, 255, 255)
    obj2.vel.x = -1;
    world.timeScale = 0;
    pause_btn.addEventListener('click', () => {
        world.timeScale = 0;
    });

    start_btn.addEventListener('click', () => {
        world.timeScale = .645;
    });

    restart_btn.addEventListener('click', () => {
        obj1.pos = { x: halfWidth/2, y: halfHeight };
        obj2.pos = { x: width * 3/4, y: halfHeight };
        obj1.vel.x += -obj1.vel.x;
        obj2.vel.x += -obj2.vel.x;
    });
}

function getGravityForce(object1, object2){
	let distance = Math.sqrt((object2.x - object1.x)**2 + (object2.y - object1.y)**2);
    if (distance < 50){
        return 0;
    }
	let force = (G*object1.mass*object2.mass/distance**2)/10**15;
	return force;
}

function getArrow(object, object2, force){
    if (!object.vel) return;
    arrow.x = object.x + object.w / 2
    arrow.y = object.y
    arrow.rotation = atan2(object2.y - object.y, object2.x - object.x);
    if (force == 0){ arrow.x = -100;return;}
}


function update(){
    background('grey');
    let distance = Math.sqrt((obj2.x - obj1.x)**2 + (obj2.y - obj1.y)**2)
    if (distance > 10){
        obj1.vel.x = getGravityForce(obj1, obj2);
        obj2.vel.x = -getGravityForce(obj2, obj1);
    }
    obj1.text = String(floor(obj1.vel.x)+ ' N');
    obj2.text = String(floor(abs(obj2.vel.x)) + ' N');
    obj1.sleeping = false;
    obj2.sleeping = false;
    getArrow(obj1, obj2, obj1.vel.x);
    print(dist(obj1.x, obj1.y, mouse.x, mouse.y))
}
    