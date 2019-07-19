//KHAI BAO BIEN
var map;
var markers = [];
var id = 0;
var blnDelete = true;
var check = [];
var checkID = 0;
var polygon;
var coordinates = [];
var done = 0;
//load map
function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(10.0299337, 105.7684266),
    zoom: 16
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  loadKhuonVien();
}

//get toa do
function getToaDo() {
  coordinates = [];
  alert(coordinates.length + "lenght-----");
  $.ajax({
    method: "GET",
    url: "/khuonvien/getToaDo",
    contentType: "application/json",
    success: function(response) {
      // console.log(response);
      if (response.length > 0) {
        $.each(response, function(i, td) {
          coordinates.push({ lat: td.KV_LAT, lng: td.KV_LNG });
          // alert("done");
        });
        // alert("doneeeeee");
        // drawKhuonVien(coordinates);
        alert(coordinates.length + "-----");
      } else {
        alert("Hien k có tọa độ");
      }
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

// promise.then(getToaDo()).then(drawKhuonVien(coordinates));

async function loadKhuonVien() {
  await getToaDo();
  await drawKhuonVien(coordinates);
  alert("toi day");
  // await alert(coordinates.length);
}

//Ve khuon vien
function drawKhuonVien(coordinates) {
  // Construct the polygon.
  alert(coordinates.length + "draw");
  polygon = new google.maps.Polygon({
    paths: coordinates,
    strokeColor: "#FFCC00",
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: "#FFCC00",
    fillOpacity: 0.35
    //editable : true
  });
  polygon.setMap(map);
  // alert(coordinates.length);
  alert("da ve");
}

//Cap nhat khuon vien
function updateKhuonVien() {
  document.getElementById("btnEditMarker").disabled = true;
  // getToaDo();
  //dat marker
  if (coordinates.length > 0) {
    for (i = 0; i < coordinates.length; i++) {
      placeMarker(coordinates[i]);
    }
    polygon.setMap(null);
    // polygon = null;
  }

  map.addListener("click", function(e) {
    placeMarker(e.latLng, map);
  });
}

//4. Luu khuon vien
function Done() {
  google.maps.event.clearListeners(map, "click");
  setMapOnAll(null);
  //cap nhat trang thai

  //luu toa do
  coordinates = [];
  var j = 0;
  document.getElementById("ToaDo").innerHTML = "";
  for (var i = 0; i < markers.length; i++) {
    markers[i].setDraggable(false);
    if (markers[i].label != "null") {
      document.getElementById("ToaDo").innerHTML +=
        markers[i].id + "-" + "Lat: " + markers[i].position.lat() + " - Lng: " + markers[i].position.lng() + "<br>";

      //them ajax
      kv_lat = markers[i].position.lat();
      kv_lng = markers[i].position.lng();
      alert(kv_lat + "---" + kv_lng);

      //cap nhat trang thai
      $.ajax({
        url: "/khuonvien/update",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ KV_TRANGTHAI: "0" }),
        success: function() {
          alert("Đã cập nhật thành công trạng thái tọa độ!");

          // luu;
          $.ajax({
            url: "/khuonvien",
            method: "POST",
            data: JSON.stringify({
              KV_LAT: kv_lat,
              KV_LNG: kv_lng
            }),
            contentType: "application/json",
            success: function() {
              alert("Đã thêm thành công tọa độ! " + kv_lat + "---" + kv_lng);
              // getToaDo();
            },
            error: function(e) {
              alert("Đã có lỗi xảy ra!");
              console.log(e);
            }
          });
        },
        error: function(e) {
          alert("Đã có lỗi xảy ra!");
          console.log(e);
        }
      });

      coordinates[j] = {
        lat: markers[i].position.lat(),
        lng: markers[i].position.lng()
      };
      j++;
    }
  }

  polygon.setMap(null);
  // drawKhuonVien(coordinates);

  document.getElementById("btnEditMarker").disabled = false;
}

function capnhat() {
  $.ajax({
    url: "/khuonvien/update",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ KV_TRANGTHAI: "0" }),
    success: function() {
      alert("Đã cập nhật thành công trạng thái tọa độ!");
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

function luu(kv_lat, kv_lng) {
  $.ajax({
    url: "/khuonvien",
    method: "POST",
    data: JSON.stringify({
      KV_LAT: kv_lat,
      KV_LNG: kv_lng
    }),
    contentType: "application/json",
    success: function() {
      alert("Đã thêm thành công tọa độ! " + kv_lat + "---" + kv_lng);
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

async function Save() {
  try {
    google.maps.event.clearListeners(map, "click");
    setMapOnAll(null);
    coordinates = [];
    alert(coordinates.length + "lenght save-----");
    var j = 0;
    document.getElementById("ToaDo").innerHTML = "";

    await capnhat();

    for (var i = 0; i < markers.length; i++) {
      markers[i].setDraggable(false);
      if (markers[i].label != "null") {
        document.getElementById("ToaDo").innerHTML +=
          markers[i].id + "-" + "Lat: " + markers[i].position.lat() + " - Lng: " + markers[i].position.lng() + "<br>";
        alert("da ghi");
        // coordinates[j] = {
        //   lat: markers[i].position.lat(),
        //   lng: markers[i].position.lng()
        // };
        // j++;
        kv_lat = markers[i].position.lat();
        kv_lng = markers[i].position.lng();
        alert("bat dau luu");
        await luu(kv_lat, kv_lng);
      }
    }
    // await polygon.setMap(null);
    // await drawKhuonVien(coordinates);
    // await getToaDo();

    document.getElementById("btnEditMarker").disabled = false;
    await loadKhuonVien();
  } catch (e) {
    console.log(e);
  }
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
  } else {
    id++;
    placeMarker(position);
  }

  google.maps.event.addListener(marker, "rightclick", function(point) {
    id = this.id;
    delMarker(id);
  });

  var delMarker = function(id) {
    marker = markers[id];
    markers[id].setMap(null);
    markers[id].label = "null";
  };
}
