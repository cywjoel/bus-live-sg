function searchHandler(e) {
    let busForms, toggleTabs;
    
    busForms = document.getElementsByClassName("bus-form");
    for (i = 0; i < busForms.length; i++) {
        busForms[i].style.display = "none";
    }

    toggleTabs = document.getElementsByClassName("toggle-tabs");
    for (let i = 0; i < toggleTabs.length; i++) {
        toggleTabs[i].className = toggleTabs[i].className.replace(" active", "");
    }

    if (e.currentTarget.id == "searchBusService") {
        console.log(e.currentTarget.id);
        document.getElementById("searchByService").style.display = "grid";
        e.currentTarget.className += " active";
    } else if (e.currentTarget.id == "searchBusStopCode") {
        console.log(e.currentTarget.className);
        document.getElementById("searchByStop").style.display = "grid";
        e.currentTarget.className += " active";
    }
}

const button = document.querySelectorAll(".toggle-tabs");
button[0].addEventListener("click", (e) => searchHandler(e));
button[1].addEventListener("click" , (e) => searchHandler(e));