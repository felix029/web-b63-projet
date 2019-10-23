let canvas = null;
let ctx = null;
let fightingGoalie = null;

window.addEventListener("load", () => {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");

	// fightingGoalie = new Goalie();

	tick();
})

const tick = () => {

	// fightingGoalie.tick();

	window.requestAnimationFrame(tick);
}