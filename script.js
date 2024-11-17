let	text = document.getElementById('text');
let	leaf1 = document.getElementById('leaf1');
let	hill1 = document.getElementById('hill1');
let	hill4 = document.getElementById('hill4');
let	hill5 = document.getElementById('hill5');
let	jerapah = document.getElementById('jerapah');
let	gajah = document.getElementById('gajah');
let	burung = document.getElementById('burung');
let	buaya = document.getElementById('buaya');
let	harimau = document.getElementById('harimau');
let	kelinci = document.getElementById('kelinci');
window.addEventListener("scroll", () => {
	let value = window.scrollY;

	text.style.marginTop = value * 2.5 + "px";
	leaf1.style.left = value * 1 + "px";
	hill5.style.left = value * 1 + "px";
	hill4.style.left = value * -0.8 + "px";
	hill1.style.marginTop = value * 1 + "px";
	jerapah.style.left = value * -2 + "px";
	gajah.style.left = value * 2 + "px";
	burung.style.left = value * 3.2 + "px";
	buaya.style.left = value * -5 + "px";
	harimau.style.left = value * 5 + "px";
	kelinci.style.marginTop = value * 1 + "px";
})