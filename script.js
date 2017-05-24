// Firstly, let's create some classes

class Fighter {
	
	constructor(name = 'Nameless', power = 15, health = 1000) {
		this.name = name;
		this.power = power;
		this.health = health;
	}

	setDamage(damage) {
		this.health = this.health - damage;
		console.log(`${this.name}'s health level is at ${this.health} points`);
	}

	hit(enemy, point) {
		let damage = point * this.power
		enemy.setDamage(damage);
	}

}

class ImprovedFighter extends Fighter {

	doubleHit(enemy, point) {
		super.hit(enemy, point * 2);
	}

}

// Let's try the spread operator

let fightClub = [['Vasya', 20, 1000], ['Petya', 18, 900]];

let fighter = new Fighter(...fightClub[0]);

let improvedFighter = new ImprovedFighter(...fightClub[1]);

// Let the battle begin! *fanfare sound*

function fight(fighter, improvedFighter, ...point) {

	// Let's try to use some arrow functions and also check if the parameters were correct
		
	if (!(fighter instanceof Fighter) || !(improvedFighter instanceof Fighter)) {
		throw 'Who\'s going to fight, huh?';
	}
	else if ((fighter.health < 0) || (improvedFighter.health < 0)) {
		throw 'Looks like some of our fighters is already finished';
	}
	else if (point.length < 0) {
		throw 'You should add some point parameters';
	}
	else {
		point.forEach(elem => {
			if (typeof elem !== 'number') throw 'Point parameters should be numbers';
		});
	}

	// Let's also try to use some Map()'s and also make our cycle shorter

	let subjects = new Map().set(true, fighter).set(false, improvedFighter);
	let currentSubject = true;

	// Here's a cycle of hits

	while ((point.length > 0) && (fighter.health > 0) && (improvedFighter.health > 0)) {

		subjects.get(currentSubject).hit(subjects.get(!currentSubject), point.shift());
		currentSubject = !currentSubject;

	}

	// And here we go with the results

	if (fighter.health <= 0) console.log(`Fight ends with the victory of ${improvedFighter.name}`)
	else if (improvedFighter.health <= 0) console.log(`Fight ends with the victory of ${fighter.name}`)
	else if (point.length <= 0) console.log('Fight ends with both fighters alive');

}