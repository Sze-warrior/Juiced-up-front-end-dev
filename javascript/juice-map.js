google.maps.event.addDomListener(window, 'load', initialise);

var map;
var islandMarkers = [];
var directionsService;
var directionsDisplay;
var myLocation; //this var is added from Brett

function initialise() {
      

    var mapOptions = {
        zoom: 10,
        center: { lat: -41.251906, lng: 174.792205}
    };

    //this map section is important!!! THis is going to
    //import the map and the directionsService and CalcRoute
    //allows us to get transport details by walking 
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    //calcRoute();

    //this code above is important!!! THis is going to
    //import the map and the directionsService and CalcRoute
    //allows us to get transport details by walking 

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            console.log(pos.coords);
            var myLocationAccuracy = new google.maps.Circle({
                'center': new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                'radius': pos.coords.accuracy,

            })
            myLocation = new google.maps.Marker({
                'position': new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
            });
        });
    }
    loadIslands(); // this is going to load the JSON file below 
                  //  to load the locations of the bars.
}


//This is to load the directions section for the map

function calcRoute(origin, destination){

    var request= {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
        transitOptions:{
            routingPreference: google.maps.TransitRoutePreference.LESS_WALKING
        },
        unitSystem: google.maps.UnitSystem.Metric
    }

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

//This is the functions and code needed to load the islands 

function loadIslands() {
    var request = new XMLHttpRequest();
    request.open('GET', 'juice.json', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            processIslands(data);
        } else {
            // We reached our target server, but it returned an error

        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
}

function processIslands(islands) {
    console.log(islands);

    islands.sort(function (islandA, islandB) {
        return islandB.lat - islandA.lat;
    });

    for (var i = 0; i < islands.length; i += 1) {
        addIslandMarker(islands[i]);
    }

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < islandMarkers.length; i += 1) {
        bounds.extend(islandMarkers[i].getPosition());
    }
    map.fitBounds(bounds);
}

function addIslandMarker(island) {
    var marker = new google.maps.Marker({
        'map': map,
        'position': new google.maps.LatLng(island.lat, island.lng),
        'title': island.name,
        'icon': 'barJuice.png'
    });
//this is what bret made
    islandMarkers.push(marker);

    var islandsList = document.querySelector("#islands-list");

    var listItem = document.createElement('li');
    listItem.innerHTML = "<a href='#'>" + island.name + "</a>";
    
    islandsList.appendChild(listItem);

    listItem.addEventListener('click', function(evt) { 
        evt.preventDefault();
        selectMarker(marker, listItem);
    });
//this is what me and bret worked on on friday
    google.maps.event.addDomListener(marker, 'click', function() {
        selectMarker(marker, listItem);
    });
}

function selectMarker(marker, listItem) {
    deselectAllMarkers();
    listItem.className = "active";
    marker.setIcon('barJuiceSelected.png');
    marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
    //map.setZoom(12);
    map.panTo(marker.getPosition());
    calcRoute(myLocation.getPosition(), marker.getPosition());
}

function deselectAllMarkers() {
    for (var i = 0; i < islandMarkers.length; i += 1) {
        islandMarkers[i].setIcon('barJuice.png');
        islandMarkers[i].setZIndex(null);
    }
    var listItems = document.querySelectorAll("#islands-list li");
    for (var i = 0; i < listItems.length; i += 1) {
        listItems[i].className = "";
    }
}




