function printBoardA(busArr) {              // service no. --> bus stop code

    let busStopCode = document.getElementById("bus-stop-code-1").value;
    let serviceNo = document.getElementById("service-no-1").value;
    let busStopName = getBusStopName(busStopData, busStopCode);

    let datetime = new Date();
    dayTimeStr = getDayTimeStr(datetime);

    let timeFirst;
    let timeSecond;
    let timeThird;

    let diffFirst;
    let diffSecond;
    let diffThird;

    if (busArr === undefined) {
        diffFirst = "NO EST. AVAILABLE";
    } else {
        timeFirst = busArr['NextBus']['EstimatedArrival'];
        timeSecond = busArr['NextBus2']['EstimatedArrival'];
        timeThird = busArr['NextBus3']['EstimatedArrival'];

        diffFirst = calcArrTime(datetime, timeFirst);
        diffSecond = calcArrTime(datetime, timeSecond);
        diffThird = calcArrTime(datetime, timeThird);
        console.log(diffThird);
    }

    document.getElementById("stopName").textContent = busStopName;
    document.getElementById("stopCode").textContent = busStopCode;
    document.getElementById("serviceNo").textContent = serviceNo;
    document.getElementById("requestTime").textContent = dayTimeStr;
    document.getElementById("timing1").textContent = diffFirst;
    document.getElementById("timing2").textContent = diffSecond;
    document.getElementById("timing3").textContent = diffThird;
}


function printBoardB(busArr) {              // bus stop code --> service no.

    let busStopCode = document.getElementById("bus-stop-code-2").value;
    let serviceNo = document.getElementById("service-no-2").value;
    let busStopName = getBusStopName(busStopData, busStopCode);

    let datetime = new Date();
    dayTimeStr = getDayTimeStr(datetime);

    let timeFirst;
    let timeSecond;
    let timeThird;

    let diffFirst;
    let diffSecond;
    let diffThird;

    if (busArr === undefined) {
        diffFirst = "NO EST. AVAILABLE";
    } else {
        timeFirst = busArr['NextBus']['EstimatedArrival'];
        timeSecond = busArr['NextBus2']['EstimatedArrival'];
        timeThird = busArr['NextBus3']['EstimatedArrival'];

        diffFirst = calcArrTime(datetime, timeFirst);
        diffSecond = calcArrTime(datetime, timeSecond);
        diffThird = calcArrTime(datetime, timeThird);
        console.log(diffThird);
    }

    document.getElementById("stopName").textContent = busStopName;
    document.getElementById("stopCode").textContent = busStopCode;
    document.getElementById("serviceNo").textContent = serviceNo;
    document.getElementById("requestTime").textContent = dayTimeStr;
    document.getElementById("timing1").textContent = diffFirst;
    document.getElementById("timing2").textContent = diffSecond;
    document.getElementById("timing3").textContent = diffThird;
}

function getBusStopName(busStopData, busStopCode) {
    for (let entry of busStopData) {
        if (entry['BusStopCode'] == busStopCode) {
            console.log(entry['Description']);
            return entry['Description'].toUpperCase();
        }
    }
}

function clearTimings() {
    document.getElementById("stopName").textContent = "";
    document.getElementById("stopCode").textContent = "";
    document.getElementById("serviceNo").textContent = "";
    document.getElementById("requestTime").textContent = "";
    document.getElementById("timing1").textContent = "";
    document.getElementById("timing2").textContent = "";
    document.getElementById("timing3").textContent = "";
    console.log(document.getElementById("stopCode").textContent);
}

function requestTimingA() {                      // service no. --> bus stop code
    let busArr;

    let busStopCode = document.getElementById("bus-stop-code-1").value;
    let serviceNo = document.getElementById("service-no-1").value;
    let urlBase="http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?";
    let url = urlBase + "BusStopCode=" + busStopCode;
    if (serviceNo) {
        url += "&ServiceNo=" + serviceNo;
    }

    const busHeaders = new Headers({
        'AccountKey': apiKey,
        'accept': 'application/json'
    });

    fetch(url, {
        headers: busHeaders
        }
    )
    .then(response => response.json())
    .then(data => {
        if (data === undefined) {
            busArr = data;
        } else {
            busArr = data['Services'][0];
            console.log(busArr);
        }
    })
    .then(() => printBoardA(busArr))
    .catch(error => console.error(error));
}

function requestTimingB() {                      // bus stop code --> service no.
    let busArr;

    let busStopCode = document.getElementById("bus-stop-code-2").value;
    let serviceNo = document.getElementById("service-no-2").value;
    let urlBase="http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?";
    let url = urlBase + "BusStopCode=" + busStopCode;
    if (serviceNo) {
        url += "&ServiceNo=" + serviceNo;
    }

    const busHeaders = new Headers({
        'AccountKey': apiKey,
        'accept': 'application/json'
    });

    fetch(url, {
        headers: busHeaders
        }
    )
    .then(response => response.json())
    .then(data => {
        if (data === undefined) {
            busArr = data;
        } else {
            busArr = data['Services'][0];
            console.log(busArr);
        }
    })
    .then(() => printBoardB(busArr))
    .catch(error => console.error(error));
}

// time functions

function getDayTimeStr(datetime) {
    const day = getDay(datetime);
    const time = getTime(datetime);
    let dayTimeStr = day + "/" + time;
    console.log(dayTimeStr);
    return dayTimeStr;
}

function getDay(datetime) {
    const dayLookup = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return dayLookup[datetime.getDay()];
}

function getTime(datetime) {
    let hours;
    let minutes;
    let seconds;

    if (datetime.getHours() < 10) {
        hours = "0" + datetime.getHours();
    } else {
        hours = datetime.getHours();
    }
    
    if (datetime.getMinutes() < 10) {
        minutes = "0" + datetime.getMinutes();
    } else {
        minutes = datetime.getMinutes();
    }

    if (datetime.getSeconds() < 10) {
        seconds = "0" + datetime.getSeconds();
    } else {
        seconds = datetime.getSeconds();
    }

    let timeStr = hours + ":" + minutes + ":" + seconds;
    return timeStr;
}

function calcArrTime(datetime, arrDatetime) {
    console.log("check null: " + arrDatetime);
    const parsedDatetime = Date.parse(datetime)/1000;
    const parsedArrDatetime = Date.parse(arrDatetime)/1000;
    console.log("check parse:" + parsedArrDatetime);
    if (!isNaN(parsedArrDatetime)) {
        let diff = Math.floor((parsedArrDatetime - parsedDatetime)/60);
        if (diff <= 0) {
            return "ARR.";
        } else if (diff > 0 && diff < 10) {
            return "0" + diff;
        } else {
            return diff;
        }
    } else {
        return "--";
    }
}

// select-by-bus-related functions

function populateByBus(busServicesData) {
    let options = [];
    for (const busSvc of busServicesData) {
        let tmp = busSvc['ServiceNo'];
        if (!options.includes(tmp)) {
            options.push(tmp);
        }
    }
    console.log(options);
    select = document.getElementById("service-no-1");
    for (const option of options) {
        let opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    }
}

function populateStopsAfter(busNo) {
    let options = [];
    for (const route of busRoutesData) {
        if (route['ServiceNo'] == busNo) {
            let tmp = [route['BusStopCode'], route['Direction'], route['StopSequence']];
            for (const stops of busStopData) {
                if (stops['BusStopCode'] == tmp[0]) {
                    tmp.push(stops['Description']);
                }
            }
            options.push(tmp);
        }
    }
    console.log(options);

    let countDir = 0;
    let countArr = []
    for (const option of options) {
        let tmpArr = [];
        let tmp = option[1];
        if (!countArr.includes(tmp)) {
            countArr.push(tmp);
        }
    }
    countDir = countArr.length;
    console.log(countDir);

    let dynamicGenerated = document.getElementById("bus-stop-code-1").getElementsByClassName("dynamic-generated");
    console.log(dynamicGenerated);
    while (dynamicGenerated[0]) {
        dynamicGenerated[0].remove();
    }

    for (let i = 1; i <= countDir; i++) {
        console.log("i = " + i);
        let routeDir = countArr[i - 1];
        let routeDirLength = getRouteDirLength(i, options);
        console.log("countDir = " + routeDir);
        console.log("total stops in direction" + routeDir + " = " + routeDirLength);

        let select = document.getElementById("bus-stop-code-1");
        let optSection = document.createElement('option');
        optSection.className = "dynamic-generated";
        optSection.value = "";
        optSection.textContent = "---------- Direction " + i + " ----------";
        optSection.disabled = true;
        select.appendChild(optSection);

        for (const option of options) {
            if (option[1] == i) {
                let opt = document.createElement('option');
                opt.className = "dynamic-generated";
                opt.value = option[0];
                opt.textContent = option[0] + " (" + option[3].toUpperCase() + ")";
                select.appendChild(opt);
            }
        }
    }
}

function getRouteDirLength(i, options) {
    let count = 0;
    for (const option of options) {
        if (option[1] == i) {
            count++;
        }
    }
    return count;
}

// select-by-stop-related functions

function populateByStop(busStopData) {
    let options = [];
    for (const busStop of busStopData) {
        options.push([busStop['BusStopCode'], busStop['Description']]);
    }
    console.log(options);
    select = document.getElementById("bus-stop-code-2-options");
    for (const option of options) {
        let opt = document.createElement('option');
        opt.value = option[0];
        opt.textContent = option[1];
        select.appendChild(opt);
    }
}

function populateBusesAfter(stopNo) {
    let options = [];
    for (const route of busRoutesData) {
        if (route['BusStopCode'] == stopNo) {
            options.push(route['ServiceNo']);
        }
    }
    console.log(options);

    let dynamicGenerated = document.getElementById("service-no-2").getElementsByClassName("dynamic-generated");
    console.log(dynamicGenerated);
    while (dynamicGenerated[0]) {
        dynamicGenerated[0].remove();
    }

    let select = document.getElementById("service-no-2");

    if (options.length == 0) {
        let opt = document.createElement('option');
        opt.className = "dynamic-generated";
        opt.value = "";
        opt.disabled = true;
        opt.innerText = "The bus stop code does not exist.";
        console.log(opt.value);
        select.appendChild(opt);
    }
    for (const option of options) {
        let opt = document.createElement('option');
        opt.className = "dynamic-generated";
        opt.value = option;
        opt.innerText = option;
        console.log(opt.value);
        select.appendChild(opt);
    }
}

// get apikey from config.json

let apiKey;

fetch("./config/config.json")
    .then(response => response.json())
    .then(data => {
        apiKey = data['apikey'];
    })
    .catch(error => console.error(error));

// load files from local

let busServicesData;

fetch("./data/bus_services.json")
    .then(response => response.json())
    .then (data => {
        busServicesData = data['value'];
        console.log(busServicesData);
        populateByBus(busServicesData);
    })
    .catch(error => console.error(error));

let busStopData;

fetch("./data/bus_stop_ids.json")
    .then(response => response.json())
    .then (data => {
        busStopData = data['value'];
        console.log(busStopData);
        populateByStop(busStopData);
    })
    .catch(error => console.error(error));

let busRoutesData;

fetch("./data/bus_routes.json")
    .then(response => response.json())
    .then (data => {
        busRoutesData = data['value'];
        console.log(busRoutesData);
    })
    .catch(error => console.error(error));

// form handler functions

function submitHandlerA() {     // service no. --> bus stop code
    clearTimings();
    requestTimingA();
    // printBoard(busArr);
    return false;
}

function submitHandlerB() {     // bus stop code --> service no.
    clearTimings();
    requestTimingB();
    // printBoard(busArr);
    return false;
}

// event scripts

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("searchByService").onsubmit = submitHandlerA;
    document.getElementById("searchByStop").onsubmit = submitHandlerB;
});

const selectBus = document.querySelector("#service-no-1");
selectBus.addEventListener('change', function() {
    let busNo = selectBus.value;
    console.log("bus no.: " + busNo);
    populateStopsAfter(busNo);
});

const selectStop = document.querySelector("#bus-stop-code-2");
selectStop.addEventListener('change', function() {
    let stopNo = selectStop.value;
    console.log("stop no.: " + stopNo);
    console.log("stop code check: " + stopNo.length);
    populateBusesAfter(stopNo);
})

