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
        document.querySelector(".close").addEventListener("click", function(e) {
            e.preventDefault();
            closeModal();
        });
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

// When the user clicks on the button, open the modal
function openModal(id) {
  modal.style.display = "block";
  fetch(link)
        .then(res => res.json())
        .then(sheet => findBike(sheet, id));
}

function closeModal() {
    modal.style.display = "none";
}

function findBike(sheet, id){
    const data = sheet.feed.entry;
    const bike = data.find(function(b) { return b.gsx$id.$t == id});
    if (bike) {
        showBike(bike);
    } else {
        alert("Unable to fetch bike data - sorry about that!");
    }
}

function showBike(bike) {
    console.log("bike: ", bike);
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
    const price_desc = document.querySelector(".price_desc");
    const price_amount = document.querySelector(".price_amount");

    bike_img.src="img/bikes/" + bike.gsx$image.$t + ".png";
    brand.textContent = bike.gsx$brand.$t;
    name.textContent = bike.gsx$name.$t;
    year.textContent = bike.gsx$year.$t;
    color.textContent = bike.gsx$color.$t;
    rider.textContent = bike.gsx$rider.$t;
    breaks.textContent = bike.gsx$breaks.$t;
    wheels.textContent = bike.gsx$wheelsizeinches.$t;
    size.textContent = bike.gsx$framesize.$t;
    gears.textContent = bike.gsx$gearsspeed.$t;
    weight.textContent = bike.gsx$weigthkg.$t;
    material.textContent = bike.gsx$framematerial.$t;
    type.textContent = bike.gsx$name.$t;
    descr.textContent = bike.gsx$description.$t;
    price_desc.textContent = bike.gsx$brand.$t + " " + bike.gsx$name.$t + ", " + bike.gsx$color.$t;
    price_amount.textContent = bike.gsx$price.$t;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    this.closeModal();
  }
}
