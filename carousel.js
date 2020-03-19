var slide = 1;

function setStripPos() {
	if (slide === 1) {
		document.querySelector(".strip").style.transform = "translateX(0)";
	} else if (slide === 2) {
		document.querySelector(".strip").style.transform = "translateX(-33.3333333%)";
	} else if (slide === 3) {
		document.querySelector(".strip").style.transform = "translateX(-66.6666666%)";
	}
}

function setActiveDot() {
	document.querySelectorAll(".slider.center ul li a span").forEach(function(span, idx) {
		span.classList.remove("active");
		if ((idx + 1) === slide) {
			span.classList.add("active");
		}
	});
}

function arrowLeftClicked(e) {
	e.preventDefault();
	if (slide > 1) {
		slide--;
		setStripPos();
		setActiveDot();
	}
}

function arrowRightClicked(e) {
	e.preventDefault();
	if (slide < 3) {
		slide++;
		setStripPos();
		setActiveDot();
	}
}

function dotClicked(e) {
	e.preventDefault();
	let a = e.target.href ? e.target : e.target.parentNode;
	let href = a.getAttribute("href");
	slide = parseInt(href.replace("#slide", ""), 10);
	setStripPos();
	setActiveDot();
}


window.addEventListener("DOMContentLoaded", function() {
	document.getElementById("arrowLeft").addEventListener("click", arrowLeftClicked);
	document.getElementById("arrowRight").addEventListener("click", arrowRightClicked);
	document.querySelectorAll(".slider.center ul li a").forEach(function(a) {
		a.addEventListener("click", dotClicked);
	});
});