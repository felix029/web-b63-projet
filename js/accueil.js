let canvas = null;
let ctx = null;


window.addEventListener("load", () => {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");

	tick();
})

const tick = () => {


	window.requestAnimationFrame(tick);
}