let sun, earth, moon, planets, size, mass;
const G = 6.67430e-11; 
const mass_input = document.getElementById('mass');
const size_input = document.getElementById('size');
const repeat_button = document.querySelector('.button-82-pushable');
const loss_width_percent = 0.3;
const loss_height_percent = .1;
const start_btn = document.querySelector('.button-86');

function setup(){
	const c = createCanvas(window.innerWidth - window.innerWidth*loss_width_percent, window.innerHeight - window.innerHeight*loss_height_percent);
    c.parent("canvas-container");
	sun = new Sprite(halfWidth, halfHeight, 75, DYN);
	sun.color = 'lightyellow';

	earth = new Sprite(halfWidth, halfHeight/3, 25,  DYN);
	earth.vel.x = 3;
	earth.vel.y = 0;
	earth.color = 'lightgreen';

	sun.mass   = 1.989e30;  
	earth.mass = 5.972e24;

	planets = new Group();
	planets.d = 25;
	earth.image = '🌍';
	earth.layer = 2
	sun.image = '🌞';
	sun.layer = 3;;

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
	s.image = '⭐';
	s.rotationSpeed = random(1, 3);
	s.layer = 1;
	}
	planet_images = ['🪐', '🌚', '🌕', '🟠'];
	repeat_button.addEventListener('click', (event) => {
		window.location.reload();
	});
	start_btn.addEventListener('click', (event) => {	
		if (Number(size_input.value) > 0 && Number(mass_input.value) > 0){

			let planet = new planets.Sprite(50, 50);
			if (size_input.value > 300){
				planet.d = 300;
			} else {
				planet.d = Number(size_input.value);
			}
			if (mass_input.value > 3000){
				planet.mass = 3000 * earth.mass;
				mass_input.value = 3000;
			}else{
				planet.mass = Number(mass_input.value) * earth.mass;
			}
			planet.image = random(planet_images)
		}})

}

function getGravityForce(object1, object2){
	let distance = Math.sqrt((object2.x - object1.x)**2 + (object2.y - object1.y)**2);
	let force = (G*object1.mass*object2.mass/distance**2)/10**15;
	return force;
}

function update() {
	background(22);
	if (mouse.pressing() && planets.length > 0){
		planets[planets.length - 1].moveTowards(mouse, .1);
	}
	for (let p of planets){
		p.attractTo(sun, getGravityForce(p, sun))
		sun.attractTo(p, getGravityForce(sun, p))
	}
	earth.attractTo(sun, getGravityForce(earth, sun));
	sun.attractTo(earth, getGravityForce(sun, earth));
	allSprites.rotationLock = true;
	for (let s of allSprites){
		if (s.x > width+s.w) s.x = 0 - s.w;
		if (s.y > height+s.h) s.y = 0 - s.h;
		if (s.x < 0 - s.w) s.x = width + s.w;
		if (s.y < 0 - s.h) s.y = height + s.h;
	}
}
