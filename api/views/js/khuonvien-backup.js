// var map;
// var markers = [];
// var id = 0;
// var blnDelete = true;
// var check = [];
// var checkID = 0;

// var polygon;
// //add Marker
// var coordinates = [];
// function addMarker() {
//     //enable button Delete + Done,
//     document.getElementById("btnDeleteAllMarkers").disabled = false;
//     document.getElementById("btnDone").disabled = false;
//     // disable button Add + Edit
//     document.getElementById("btnAddMarker").disabled = true;
//     document.getElementById("btnEditMarker").disabled = true;
    
//     // This event listener calls addMarker() when the map is clicked.
//     map.addListener('click', function (e) {
//         placeMarker(e.latLng, map);
//     });
// }

// // Adds a marker to the map and push to the array.
// function placeMarker(position) {
//     //alert(markers[id]);
//     if (!markers[id]) {
//         //  alert("okay");
//         marker = new google.maps.Marker({
//             position: position,
//             map: map,
//             label: id.toString(),
//             id: id,
//             draggable: true,
//             animation: google.maps.Animation.DROP
//         });
        
//         //markers.push(marker);
//         markers[id] = marker;
//         map.panTo(position);
//         id++;
//     }

//     else {
//         //alert("not okay");
//         id++;
//         placeMarker(position);
//     }



//     google.maps.event.addListener(marker, "rightclick", function (point) { id = this.id; delMarker(id) });

//     var delMarker = function (id) {
//         if (blnDelete == true) {
//             marker = markers[id];
//             markers[id].setMap(null);
//             markers[id].label = "null";
//             //markers.splice(id,1);
//         }
//     }
// }

// // Sets the map on all markers in the array.
// function setMapOnAll(map) {
//     for (var i = 0; i < markers.length; i++) {
//         markers[i].setMap(map);
//     }
// }

// // Removes the markers from the map, but keeps them in the array.
// function clearMarkers() {
//     setMapOnAll(null);
//     markers = [];
//     coordinates = [];
//     id = 0;
// }

// //ve khuon vien
// function draw() {
    
//     // Construct the polygon.
//     polygon = new google.maps.Polygon({
//         paths: coordinates,
//         strokeColor: '#FFCC00',
//         strokeOpacity: 0.8,
//         strokeWeight: 3,
//         fillColor: '#FFCC00',
//         fillOpacity: 0.35,
//         //editable : true
//     });
//     polygon.setMap(map);
// }

// function Xem() {
//     string = "";
//     for (var i = 0; i < markers.length; i++) {
//         string += markers[i].id + "-" + markers[i].label + "\n";
//     }
//     alert("Markers: " + string);
// }

// function Edit() {
//     blnDelete = true;
//     polygon.setMap(null);

//     //enable button Delete + Done,
//     document.getElementById("btnDeleteAllMarkers").disabled = false;
//     document.getElementById("btnDone").disabled = false;
//     // disable button Add + Edit
//     document.getElementById("btnAddMarker").disabled = true;
//     document.getElementById("btnEditMarker").disabled = true;
    

//     map.addListener('click', function (e) {
//         placeMarker(e.latLng, map);
//     });
    
//     for (var i = 0; i < markers.length; i++) {
//         if (markers[i].label != "null"){
//             markers[i].setDraggable(true);
//             markers[i].setMap(map);
//         }
//     }
// }

// //stop addMarker
function Done() {
    //disable button Delete + Done,
    document.getElementById("btnDeleteAllMarkers").disabled = true;
    document.getElementById("btnDone").disabled = true;
    // enable button Add + Edit
    // document.getElementById("btnAddMarker").disabled = false;
    document.getElementById("btnEditMarker").disabled = false;

    google.maps.event.clearListeners(map, 'click');
    blnDelete = false;
    setMapOnAll(null);
    coordinates = [];
    var j=0;
    document.getElementById('ToaDo').innerHTML = "";
    for (var i = 0; i < markers.length; i++) {
        markers[i].setDraggable(false);
        if (markers[i].label != "null"){
            document.getElementById('ToaDo').innerHTML += markers[i].id + "-" + "Lat: " + markers[i].position.lat() + " - Lng: " + markers[i].position.lng() + "<br>";
            coordinates[j] = { lat: markers[i].position.lat(), lng: markers[i].position.lng()};
            j++;
        }
    }
    draw();
}

// function Check(){
//     var myLat = Number(document.getElementById("txtLat").value);
//     var myLng = Number(document.getElementById("txtLng").value);
//     var myLatLng = new google.maps.LatLng(myLat, myLng);
    
//     var markerCheck = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         label: 'Check ' + checkID.toString(),
//     });
//     checkID++;
//     var isInside = google.maps.geometry.poly.containsLocation(markerCheck.getPosition(), polygon);
//     var isOnEdge = google.maps.geometry.poly.isLocationOnEdge(markerCheck.getPosition(), polygon, 0.00001)
    
//     alert("Trong trường: " + isInside + "----Trên cạnh: " +isOnEdge);
//     //markerCheck.setMap(null);
// }