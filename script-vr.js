window.onload = function() {

	class Fighter {

		constructor(name = 'Nameless', power = 15, health = 1000) {
			this.name = name;
			this.power = power;
			this.health = health;
		}

		setDamage(damage) {
			this.health = this.health - damage;
			view.log(`${this.name}'s health level is at ${this.health} points`);
		}

		hit(enemy, point) {
			let damage = point * this.power;
			view.log(`Single hit by ${this.name}`);
			view.singleHit(this.name);
			enemy.setDamage(damage);
		}

		doubleHit(enemy, point) {
			let damage = point * 2 * this.power;
			view.log(`Double hit by ${this.name}`);
			view.doubleHit(this.name);
			enemy.setDamage(damage);
		}

	}

	function fight() {

		let fighter1 = new Fighter('Homer Simpson', 20, 1000),
			fighter2 = new Fighter('Peter Griffin', 23, 900);

		let point = (function() {

			let points = [];

			for (let i = 8; i; i--) {
				points.push(Math.round(Math.random() * 10) + 5)
			}

			return points;

		})();

		let subjects = new Map().set(true, fighter1).set(false, fighter2),
			currentSubject = true;

		let fightFlow = new Promise(function(resolve) {

			view.fightStart();

			let fightFlow = setInterval(function(){

				let subject = subjects.get(currentSubject),
					object = subjects.get(!currentSubject);

				if (Math.random() < .8) 
					subject.hit(object, point.shift())
				else
					subject.doubleHit(object, point.shift());

				if ((point.length === 0) || (fighter1.health <= 0) || (fighter2.health <= 0)) {
					clearInterval(fightFlow);
					resolve();
				}

				currentSubject = !currentSubject;

			}, 1000);

		});

		fightFlow.then(() => {

			if (fighter1.health <= 0) {
				view.log(`<b>Fight ends with the victory of ${fighter2.name}</b>`);
				view.victory(fighter2.name);
			}
			else if (fighter2.health <= 0) {
				view.log(`<b>Fight ends with the victory of ${fighter1.name}</b>`);
				view.victory(fighter1.name);
			}
			else if (point.length <= 0) {
				view.log('<b>Fight ends with both fighters alive</b>');
				view.alive();
			}
			else 
				throw 'Something went wrong';

			view.log('------');

		});

	}

// VIEW

	let view = {

		graphics: document.getElementById('graphics'),
		battleLog: document.getElementById('battle-log'),

		log(text) {
			this.battleLog.firstElementChild.innerHTML += '<li>' + text + '</li>';
			this.battleLog.scrollTop = this.battleLog.scrollHeight - this.battleLog.clientHeight;
		},

		fightStart() {
			graphics.style.backgroundImage = 'url(img/' + 'vs' + (Math.round((Math.random()) + 1)) + '.jpg)';	
		},
		
		singleHit(subject) {
			let imgName = (subject.indexOf('Homer') !== -1) ? 'homer' : 'peter';
			graphics.style.backgroundImage = 'url(img/' + imgName + (Math.round((Math.random()) * 2 + 1)) + '.jpg)';
		},
		
		doubleHit(subject) {
			let imgName = (subject.indexOf('Homer') !== -1) ? 'homer' : 'peter';
			graphics.style.backgroundImage = 'url(img/' + imgName + (Math.round((Math.random()) * 2 + 1)) + 'dh.jpg)';
		},

		victory(subject) {
			let imgName = (subject.indexOf('Homer') !== -1) ? 'homer' : 'peter';
			graphics.style.backgroundImage = 'url(img/' + imgName + 'win' + (Math.round((Math.random()) + 1)) + '.jpg)';
		},

		alive() {
			graphics.style.backgroundImage = 'url(img/alive' + (Math.round((Math.random()) + 1)) + '.jpg)';
		}

	}

	document.getElementById('battle-start').onclick = fight;

}