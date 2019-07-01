function loadHeadFoot() {
    $(function () {
        // $('.footer').load('../footer.html');
        $('#header').load('header.html');

    })
}

// Khai bao bien
var map;
var markers = [];
var id = 0;
var blnDelete = true;
var check = [];
var checkID = 0;
var polygon;
var coordinates = [];
//

//load map
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(10.0299337, 105.7684266),
        zoom: 16,
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    loadKhuonVien();
}

//load map vi tri chi tiet muon tra
function MapPosition() {
    var vtMuon = new google.maps.LatLng(10.02998, 105.769601);
    var vtTra = new google.maps.LatLng(10.03054, 105.768646);

    var mapProp = {
        center: vtMuon,
        zoom: 16,
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var markerMuon = new google.maps.Marker({
        position: vtMuon,
        map: map,
        icon: 'img/marker-red.png',
    });

    var markerTra = new google.maps.Marker({
        position: vtTra,
        map: map,
        icon: 'img/marker-green.png',
    });
}
/*---------------Khuon Vien------------------------- */
//1. Lay toa do
function getToaDo(){
    // coordinates[0] = { lat: 10.028958677252596, lng: 105.76534381491831 };
    // coordinates[1] = { lat: 10.026063882281509, lng: 105.76837649880792 };
    // coordinates[2] = { lat: 10.030332111075557, lng: 105.77185979381204 };
    // coordinates[3] = { lat: 10.033522681017374, lng: 105.76826205701684 };
    
    coordinates = [
        { lat: 10.028958677252596, lng: 105.76534381491831 },
        { lat: 10.026063882281509, lng: 105.76837649880792 },
        { lat: 10.030332111075557, lng: 105.77185979381204 },
        { lat: 10.033522681017374, lng: 105.76826205701684 },
    ]
}
//2.Load khuon vien
function loadKhuonVien() {
    getToaDo();
    drawKhuonVien(coordinates);
}

//3. Ve khuon vien
function drawKhuonVien(coordinates){
    // Construct the polygon.
    polygon = new google.maps.Polygon({
        paths: coordinates,
        strokeColor: '#FFCC00',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#FFCC00',
        fillOpacity: 0.35,
        //editable : true
    });
    polygon.setMap(map);
}

//3. Cap nhat khuon vien
function updateKhuonVien(){
    document.getElementById("btnEditMarker").disabled = true;

    polygon.setMap(null);
    clearMarkers();
    loadKhuonVien();
    
    map.addListener('click', function (e) {
        placeMarker(e.latLng, map);
    });
    
    //Danh dau toa do da co
    // for (var i = 0; i < coordinates.length; i++) {
    //     marker = new google.maps.Marker({
    //         position: coordinates[i],
    //         map: map,
    //         label: id.toString(),
    //         id: id,
    //         draggable: true,
    //         animation: google.maps.Animation.DROP
    //     });  
    //     markers[id] = marker;
    //     id++;
    // }
}

//Dat marker
function placeMarker(position) {
    if (!markers[id]) {
        marker = new google.maps.Marker({
            position: position,
            map: map,
            label: id.toString(),
            id: id,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        
        markers[id] = marker;
        map.panTo(position);
        id++;
    }

    else {
        id++;
        placeMarker(position);
    }

    google.maps.event.addListener(marker, "rightclick", function (point) { id = this.id; delMarker(id) });

    var delMarker = function (id) {
            marker = markers[id];
            markers[id].setMap(null);
            markers[id].label = "null";
    }
}



//4. Luu khuon vien
function Done() {
    google.maps.event.clearListeners(map, 'click');
    setMapOnAll(null);

    //luu toa do
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

    polygon.setMap(null);
    drawKhuonVien(coordinates);
    document.getElementById("btnEditMarker").disabled = false;
}


//5.Kiem tra toa do
function Check(){
    var myLat = Number(document.getElementById("txtLat").value);
    var myLng = Number(document.getElementById("txtLng").value);
    var myLatLng = new google.maps.LatLng(myLat, myLng);
    
    var markerCheck = new google.maps.Marker({
        position: myLatLng,
        map: map,
        label: 'Check ' + checkID.toString(),
    });
    checkID++;
    var isInside = google.maps.geometry.poly.containsLocation(markerCheck.getPosition(), polygon);
    var isOnEdge = google.maps.geometry.poly.isLocationOnEdge(markerCheck.getPosition(), polygon, 0.00001)
    
    alert("Trong trường: " + isInside + "----Trên cạnh: " +isOnEdge);
    //markerCheck.setMap(null);
}

//6. Xoa tat ca marker
function clearMarkers() {
    setMapOnAll(null);
    markers = [];
    coordinates = [];
    id = 0;
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}


function Xem() {
    string = "";
    for (var i = 0; i < markers.length; i++) {
        string += markers[i].id + "-" + markers[i].label + "\n";
    }
    alert("Markers: " + string);
}


