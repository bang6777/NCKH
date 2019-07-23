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
var khuonvien;

//xe
var arrxe = [];
var xe_id = 0;

//load map
function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(10.0299337, 105.7684266),
    zoom: 16
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  load();
}

//load
async function load() {
  await GetAndDraw();
}

//get va ve toa do
function GetAndDraw() {
  coordinates = [];

  $.ajax({
    method: "GET",
    url: "/khuonvien/getToaDo",
    contentType: "application/json",
    success: function (response) {
      // console.log(response);
      if (response.length > 0) {
        $.each(response, function (i, td) {
          coordinates.push({ lat: td.KV_LAT, lng: td.KV_LNG });
        });

        drawKhuonVien(coordinates);
      } else {
        alert("Hiện chưa khoanh vùng khuôn viên!");
      }
    },
    error: function (e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

//Ve khuon vien
function drawKhuonVien(coordinates) {
  // Construct the polygon.
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
  // khuonvien = polygon;
  // alert("da ve");
}

// get toa do
function GetToaDo() {
  coordinates = [];
  $.ajax({
    method: "GET",
    url: "/khuonvien/getToaDo",
    contentType: "application/json",
    success: function (response) {
      // console.log(response);
      if (response.length > 0) {
        $.each(response, function (i, td) {
          coordinates.push({ lat: td.KV_LAT, lng: td.KV_LNG });
        });
      } else {
        alert("Hiện chưa khoanh vùng khuôn viên!");
      }
    },
    error: function (e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

//------------Button cap nhat
//Cap nhat khuon vien
async function updateKhuonVien() {
  //button
  document.getElementById("btnEditMarker").disabled = true;
  document.getElementById("btnDone").disabled = false;
  document.getElementById("btnDeleteAllMarkers").disabled = false;

  //get toa do
  coordinates = [];
  markers = [];

  id = 0;
  await $.ajax({
    method: "GET",
    url: "/khuonvien/getToaDo",
    contentType: "application/json",
    success: function (response) {
      // console.log(response);
      if (response.length > 0) {
        $.each(response, function (i, td) {
          coordinates.push({ lat: td.KV_LAT, lng: td.KV_LNG });
        });

        //dat marker
        if (coordinates.length > 0) {
          for (i = 0; i < coordinates.length; i++) {
            placeMarker(coordinates[i]);
          }
          polygon.setMap(null);
        }
      } else {
        alert("Hiện chưa khoanh vùng khuôn viên!");
      }
    },
    error: function (e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
  map.addListener("click", function (e) {
    placeMarker(e.latLng, map);
  });
}

//--------------Button Hoan Thanh
async function Save() {
  google.maps.event.clearListeners(map, "click");
  setMapOnAll(null);
  //luu toa do
  coordinates = [];
  var j = 0;
  document.getElementById("ToaDo").innerHTML = "";

  //cap nhat
  await $.ajax({
    url: "/khuonvien/update",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ KV_TRANGTHAI: "0" }),
    success: function () {
      // alert("Đã cập nhật thành công trạng thái tọa độ!");
    },
    error: function (e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });

  //luu
  for (var i = 0; i < markers.length; i++) {
    markers[i].setDraggable(false);
    if (markers[i].label != "null") {
      // document.getElementById("ToaDo").innerHTML +=
      // markers[i].id + "-" + "Lat: " + markers[i].position.lat() + " - Lng: " + markers[i].position.lng() + "<br>";
      kv_lat = markers[i].position.lat();
      kv_lng = markers[i].position.lng();

      //ajax luu
      await $.ajax({
        url: "/khuonvien",
        method: "POST",
        data: JSON.stringify({
          KV_LAT: kv_lat,
          KV_LNG: kv_lng
        }),
        contentType: "application/json",
        success: function () {
          // alert("Đã thêm thành công tọa độ! " + kv_lat + "---" + kv_lng);
        },
        error: function (e) {
          alert("Đã có lỗi xảy ra!");
          console.log(e);
        }
      });
    }
  }
  alert("Đã cập nhật thành công khuôn viên!");

  //button
  document.getElementById("btnEditMarker").disabled = false;
  document.getElementById("btnDone").disabled = true;
  document.getElementById("btnDeleteAllMarkers").disabled = true;

  await load();
}

//------------------Trang chu
//Get vi tri xe
async function GetViTri() {
  arrxe = [];
  xe_id = 0;
  await clearMarkers();
  await $.ajax({
    type: "GET",
    url: "/xe/vitri",
    contentType: "application/json",
    success: function (response) {
      $.each(response, function (i, xe) {
        console.log(xe.XE_ID, xe.XE_VITRI);
        var vt = createLatLng(xe.XE_VITRI);
        if (xe.XE_TRANGTHAI == "0") {
          marker = new google.maps.Marker({
            position: vt,
            map: map,
            icon: "./img/marker-green.png",
            label: xe.XE_ID
          });
          arrxe[xe_id] = marker;
          xe_id++;
        } else if (xe.XE_TRANGTHAI == "1") {
          marker = new google.maps.Marker({
            position: vt,
            map: map,
            icon: "./img/marker-red.png",
            label: xe.XE_ID
          });
          arrxe[xe_id] = marker;
          xe_id++;
        }
      });
    },
    error: function (e) {
      console.log(e);
    }
  });

  await setTimeout(function () {
    for (i = 0; i < arrxe.length; i++) {
      var isInside = google.maps.geometry.poly.containsLocation(arrxe[i].getPosition(), polygon);
      var isOnEdge = google.maps.geometry.poly.isLocationOnEdge(arrxe[i].getPosition(), polygon, 0.00001);
      if (isInside == false && isOnEdge == false) {
        // alert(xe.XE_ID + " Trong trường: " + isInside + "----Trên cạnh: " + isOnEdge);
        alert("Xe ID " + arrxe[i].label.toString() + " : ngoài trường");
      }
    }
  }, 1000);
}

//-----------------Ham
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

  google.maps.event.addListener(marker, "rightclick", function (point) {
    id = this.id;
    delMarker(id);
  });

  var delMarker = function (id) {
    marker = markers[id];
    markers[id].setMap(null);
    markers[id].label = "null";
  };
}

//Chia toa do
function createLatLng(coordString) {
  var a = coordString.split(",");
  return new google.maps.LatLng(a[0], a[1]);
}

//Load lai tao marker
async function Reload() {
  await setInterval(function () {
    GetViTri();
  }, 4000);
}

// Update vị trí
function UpdateViTri() {
  var str = $("#location").val();
  if (str != "") {


    var a = str.split(":");

    var xe_vitri = a[0];
    var xe_id = a[1];


    $.ajax({
      url: "/xe/update/" + xe_id,
      method: "POST",
      data: JSON.stringify({
        XE_ID: xe_id,
        XE_VITRI: xe_vitri
      }),
      contentType: "application/json",
      success: function () {
        alert("Đã cập nhật thành công vị trí xe: " + xe_id);
      },
      error: function (e) {
        alert("Đã có lỗi xảy ra!");
        console.log(e);
      }
    });
  }
}
