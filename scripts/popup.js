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
    console.log(busStopData[0]);
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

// get apikey from config.json

let apiKey;

fetch("./config/config.json")
    .then(response => response.json())
    .then(data => {
        apiKey = data['apikey'];
    })
    .catch(error => console.error(error));

// load files from local

let busStopData;

fetch("./data/bus_stop_ids.json")
    .then(response => response.json())
    .then (data => {
        busStopData = data['value'];
        console.log(busStopData);
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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("query-api-1").onclick = submitHandlerA;
})

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("query-api-2").onclick = submitHandlerB;
})

