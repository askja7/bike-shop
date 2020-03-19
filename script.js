const link = "https://spreadsheets.google.com/feeds/list/1c_aP8TUuOLRLSGDlnVhXoUHLZuwBGa3XFl3akgGpi7c/1/public/values?alt=json"

/* Filter functions for grid view */
function getFilterValue(id) {
    let select = document.getElementById(id);
    if (select && select.selectedIndex > 0) {
        return select.options[select.selectedIndex].value;
    }
    return "";
}

function setFilterValue(id, value) {
    let select = document.getElementById(id);
    if (select) {
        for (let i = 0; i < select.options.length; i++) {
            select.options[i].selected = (select.options[i].value === value);
        }
    }
}

function filterChange() {
    let search = new URLSearchParams("");
    let category = getFilterValue("category");
    let year = getFilterValue("year");
    let gender = getFilterValue("gender");
    if (category !== "") {
        search.append("category", category);
    }
    if (year !== "") {
        search.append("year", year);
    }
    if (gender !== "") {
        search.append("gender", gender);
    }
    history.replaceState({}, 'Bikes', window.location.pathname + '?' + search.toString());
    getData();
}

function clearFilters() {
    history.replaceState({}, 'Bikes', window.location.pathname);
    getData();
}

/* Setup event listeners */
window.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.endsWith("bikes.html")) {
        getData();
        document.getElementById("category").addEventListener("change", filterChange);
        document.getElementById("year").addEventListener("change", filterChange);
        document.getElementById("gender").addEventListener("change", filterChange);
        document.getElementById("clearButton").addEventListener("click", clearFilters);
    }

    document.querySelector(".burger-menu__toolbar a").addEventListener("click", toggleMenu);
    document.querySelector(".burger-menu-icon a").addEventListener("click", toggleMenu);
});

/* Data loading and template transforming */
function getData() {
    let search = new URLSearchParams(window.location.search);

    let filters = {
        category: search.get('category'),
        year: search.get('year'),
        gender: search.get('gender')
    };

    setFilterValue("category", filters.category);
    setFilterValue("year", filters.year);
    setFilterValue("gender", filters.gender);

	fetch(link)
		.then(res => res.json())
		.then(data => handleData(data, filters));
}

function handleData(data, filters) {
    const myData = data.feed.entry;

    // Clear the container
    document.getElementById("bikesGrid").innerHTML = "";
    myData
        .filter(bike => 
            (!filters.category || filters.category === bike.gsx$category.$t) &&
            (!filters.year || filters.year === bike.gsx$year.$t) &&
            (
                !filters.gender || 
                filters.gender === bike.gsx$rider.$t ||
                (
                    filters.gender === "Kids" && (
                        bike.gsx$rider.$t === "Boy" ||
                        bike.gsx$rider.$t === "Girl"
                    )
                )
            )
        )
        .forEach(showData);
}

function showData(singleRowData) {
	const bike_template = document.querySelector(".bike_template").content;
	const clone = bike_template.cloneNode(true);
	const brand = clone.querySelector(".card_brand");
	const name = clone.querySelector(".card_name");
	const bike_img = clone.querySelector(".card_bike_img");
    const buttonn = clone.querySelector(".learn_more");

    buttonn.id=singleRowData.gsx$id.$t;
	brand.textContent = singleRowData.gsx$brand.$t;
	name.textContent = singleRowData.gsx$name.$t;
	bike_img.alt = singleRowData.gsx$image.$t;
	singleRowData.gsx$image.$t = "img/bikes/" + singleRowData.gsx$image.$t + ".png";    
    if (singleRowData.gsx$image.$t == "img/bikes/.png") {
		bike_img.src = "https://via.placeholder.com/300x100";
	} else {
		bike_img.src = singleRowData.gsx$image.$t;
	}
    
    document.getElementById("bikesGrid").appendChild(clone);
}

function toggleMenu(e) {
    let menu = document.querySelector(".burger-menu");
    if (menu.classList.contains("open")) {
        menu.classList.remove("open");
    } else {
        menu.classList.add("open");
    }
    e.preventDefault();
}

function readFunction(e) {
    var Btn = e.target;
    var blogText = Btn.closest(".blogText");
    var dots = blogText.querySelector(".dots");
    var moreText = blogText.querySelector(".more");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        Btn.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        Btn.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
let important;
// When the user clicks on the button, open the modal
function showModule(e) {
  modal.style.display = "block";
  console.log(e);
  important = e;
  fetch(link)
        .then(res => res.json())
        .then(doData);
}
function doData(ndata){
    const newData = ndata.feed.entry;
    console.log(newData);
    newData.forEach(shownData);
}
function shownData(single){
    const mod = document.querySelector(".modal-content")
    const clone = mod.cloneNode(true);

    const key = single.gsx$id.$t;
    // console.log(important)
    // console.log(key);
    if (important==key) {
        const brand = document.querySelector(".cat_brand");
        const name = document.querySelector(".cat_name");
        const bike_img = document.querySelector(".cat_bike_img");
        const type = document.querySelector(".cat_type");
        const year = document.querySelector(".cat_year");
        const color = document.querySelector(".cat_color");
        const rider = document.querySelector(".cat_rider");
        const gears = document.querySelector(".cat_gears");
        const weight = document.querySelector(".cat_weight");
        const material = document.querySelector(".cat_material");
        const size = document.querySelector(".cat_size");
        const wheels = document.querySelector(".cat_wheels");
        const breaks = document.querySelector(".cat_breaks");
        const descr = document.querySelector(".description p");

        bike_img.src="img/bikes/" + single.gsx$image.$t + ".png";

        brand.textContent = single.gsx$brand.$t;
        name.textContent = single.gsx$name.$t;
        year.textContent = single.gsx$year.$t;
        color.textContent = single.gsx$color.$t;
        rider.textContent = single.gsx$rider.$t;
        breaks.textContent = single.gsx$breaks.$t;
        wheels.textContent = single.gsx$wheelsizeinches.$t;
        size.textContent = single.gsx$framesize.$t;
        gears.textContent = single.gsx$gearsspeed.$t;
        weight.textContent = single.gsx$weigthkg.$t;
        material.textContent = single.gsx$framematerial.$t;
        type.textContent = single.gsx$name.$t;

        descr.textContent = single.gsx$description.$t;

    }

}
// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// function filterBy(data, filters = {}) {
//   ** Set up the specific defaults that will show everything:
//   const defaults = {
//     category: null,
//     yearFrom: 1895,
//     yearTo: 2100,
//     gender: null
//   }

//   ** Merge any filters with the defaults
//   filters = Object.assign({}, defaults, filters);

//   ** Filter based on that filters object:
//   return data.filter(laur => {
//     return (laur.yearFrom >= filters.yearFrom) &&
//            (laur.yearTo <= filters.yearTo) &&
//            **and so on
//   });
// }
