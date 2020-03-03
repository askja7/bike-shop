const banner = document.querySelectorAll(".banner img");
if (banner[0].clientHeight <= document.documentElement.clientHeight) {
	banner[0].style="width:100%";
}
else {
	banner[0].style="height:100%";
}
if (banner[1].clientHeight <= document.documentElement.clientHeight) {
	banner[1].style="height:100%";
}
else {
	banner[1].style="width:100%";
}
if (banner[2].clientHeight <= document.documentElement.clientHeight) {
	banner[2].style="height:100%";
}
else {
	banner[2].style="width:100%";
}
let banner_path = "file:///C:/Users/madci/Desktop/OhWheelie-master/img/home/";
const first_photo = "first-photo.jpg";
const second_photo = "second-photo.jpg";
const third_photo = "third-photo.jpg";
const slider = document.querySelectorAll(".slider li a span")
setInterval(function(){

	if ((banner[0].classList.contains("hidden"))==false) {
		banner[0].classList.add("hidden");
		banner[1].classList.remove("hidden");
		slider[1].classList.add("active");
		slider[0].classList.remove("active");

	}
	else if((banner[1].classList.contains("hidden"))==false){
		banner[1].classList.add("hidden");
		banner[2].classList.remove("hidden");
		slider[2].classList.add("active");
		slider[1].classList.remove("active");
	}
	else{
		banner[2].classList.add("hidden");
		banner[0].classList.remove("hidden");
		slider[0].classList.add("active");
		slider[2].classList.remove("active");
	}
}, 5000)

