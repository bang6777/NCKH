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
    center: new google.maps.LatLng(10.029933, 105.768426),
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
    success: function(response) {
      // console.log(response);
      if (response.length > 0) {
        $.each(response, function(i, td) {
          coordinates.push({ lat: td.KV_LAT, lng: td.KV_LNG });
        });

        drawKhuonVien(coordinates);
      } else {
        alert("Hiện chưa khoanh vùng khuôn viên!");
      }
    },
    error: function(e) {
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

  //xem thong tin cac dinh
  polygon.addListener("click", showArrays);
  infoWindow = new google.maps.InfoWindow();
}

// get toa do
function GetToaDo() {
  coordinates = [];
  $.ajax({
    method: "GET",
    url: "/khuonvien/getToaDo",
    contentType: "application/json",
    success: function(response) {
      // console.log(response);
      if (response.length > 0) {
        $.each(response, function(i, td) {
          coordinates.push({ lat: td.KV_LAT, lng: td.KV_LNG });
        });
      } else {
        alert("Hiện chưa khoanh vùng khuôn viên!");
      }
    },
    error: function(e) {
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
  document.getElementById("btnCancel").disabled = false;

  //get toa do
  coordinates = [];
  markers = [];

  id = 0;
  await $.ajax({
    method: "GET",
    url: "/khuonvien/getToaDo",
    contentType: "application/json",
    success: function(response) {
      // console.log(response);
      if (response.length > 0) {
        $.each(response, function(i, td) {
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
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
  map.addListener("click", function(e) {
    placeMarker(e.latLng, map);
  });
}

//--------------Button Hoan Thanh
async function Save() {
  //dem sl dinh
  var sldinh = 0;
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].label != "null") {
      sldinh++;
    }
  }
  if (sldinh < 3) {
    alert("Số đỉnh phải lớn hơn hoặc bằng 3!");
  } else {
    google.maps.event.clearListeners(map, "click");
    setMapOnAll(null);
    //luu toa do
    coordinates = [];
    var j = 0;

    //cap nhat
    await $.ajax({
      url: "/khuonvien",
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({ KV_TRANGTHAI: "0" }),
      success: function() {
        // alert("Đã cập nhật thành công trạng thái tọa độ!");
      },
      error: function(e) {
        alert("Đã có lỗi xảy ra!");
        console.log(e);
      }
    });

    //luu
    for (var i = 0; i < markers.length; i++) {
      markers[i].setDraggable(false);
      if (markers[i].label != "null") {
        kv_lat = markers[i].position.lat().toFixed(6);
        kv_lng = markers[i].position.lng().toFixed(6);

        //ajax luu
        await $.ajax({
          url: "/khuonvien",
          method: "POST",
          data: JSON.stringify({
            KV_LAT: kv_lat,
            KV_LNG: kv_lng
          }),
          contentType: "application/json",
          success: function() {
            // alert("Đã thêm thành công tọa độ! " + kv_lat + "---" + kv_lng);
          },
          error: function(e) {
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
    document.getElementById("btnCancel").disabled = true;

    await load();
  }
}

//--------------------Button Hủy
function Cancel() {
  //button
  document.getElementById("btnEditMarker").disabled = false;
  document.getElementById("btnDone").disabled = true;
  document.getElementById("btnDeleteAllMarkers").disabled = true;
  document.getElementById("btnCancel").disabled = true;
  google.maps.event.clearListeners(map, "click");
  setMapOnAll(null);
  load();
}
//-----------------Ham
//6. Xoa tat ca marker
function clearMarkers() {
  setMapOnAll(null);
  markers = [];
  coordinates = [];
  id = 0;
  alert("da clear");
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
//------------------Trang chu
//Get vi tri xe
async function GetViTri() {
  Resetmap();
  list = $("#list-xe");
  list.html("");
  str = "";
  await $.ajax({
    type: "GET",
    url: "/xe/vitri",
    contentType: "application/json",
    success: function(response) {
      $.each(response, function(i, xe) {
        console.log(xe.XE_ID, xe.XE_LAT, xe.XE_LNG, xe.XE_TRANGTHAI);
        if (xe.XE_LAT != "" && xe.XE_LNG != "") {
          var vt = new google.maps.LatLng(xe.XE_LAT, xe.XE_LNG);
          if (xe.XE_TRANGTHAI == "0") {
            marker = new google.maps.Marker({
              position: vt,
              map: map,
              icon: "./img/bike-green-2.png",
              label: xe.XE_ID.toString(),
              title: xe.XE_ID + ": " + xe.XE_LAT + ", " + xe.XE_LNG
            });
            arrxe[xe_id] = marker;
            xe_id++;
          } else if (xe.XE_TRANGTHAI == "1") {
            marker = new google.maps.Marker({
              position: vt,
              map: map,
              icon: "./img/bike-red-2.png",
              label: xe.XE_ID.toString(),
              title: xe.XE_ID + ": " + xe.XE_LAT + ", " + xe.XE_LNG
            });
            arrxe[xe_id] = marker;
            xe_id++;
          } else if (xe.XE_TRANGTHAI == "3") {
            marker = new google.maps.Marker({
              position: vt,
              map: map,
              icon: "./img/bike-orange-2.png",
              label: xe.XE_ID.toString(),
              title: xe.XE_ID + ": " + xe.XE_LAT + ", " + xe.XE_LNG
            });
            arrxe[xe_id] = marker;
            xe_id++;
          }
          if (xe.XE_TRANGTHAI == "3") {
            str += "XE ID: " + arrxe[i].label.toString() + "<br>";
          }
        }
      });
      list.html(str);
    },
    error: function(e) {
      console.log(e);
    }
  });

  // await setTimeout(function() {
  //   list = $("#list-xe");
  //   list.html("");
  //   str = "";
  //   for (i = 0; i < arrxe.length; i++) {
  // var isInside = google.maps.geometry.poly.containsLocation(arrxe[i].getPosition(), polygon);
  // var isOnEdge = google.maps.geometry.poly.isLocationOnEdge(arrxe[i].getPosition(), polygon, 0.00001);
  // if (isInside == false && isOnEdge == false) {
  //   str += "XE ID: " + arrxe[i].label.toString() + "<br>";
  // }
  //   }
  //   list.html(str);
  //   console.log(str);
  // }, 1000);
}

//Chia toa do
function createLatLng(coordString) {
  var a = coordString.split(",");
  return new google.maps.LatLng(a[0], a[1]);
}

//Load lai tao marker
async function Reload() {
  await setInterval(function() {
    GetViTri();
  }, 2000);
}

//Ham
//Reset map
function Resetmap() {
  for (var i = 0; i < arrxe.length; i++) {
    arrxe[i].setMap(null);
  }
  arrxe = [];
  xe_id = 0;
}

function showArrays(event) {
  var contentString =
    "<b>KHUÔN VIÊN TRƯỜNG ĐẠI HỌC CẦN THƠ:</b><br>" +
    "Tọa độ vừa click: <br>" +
    event.latLng.lat().toFixed(6) +
    ", " +
    event.latLng.lng().toFixed(6) +
    "<br>";

  for (var i = 0; i < coordinates.length; i++) {
    contentString += "<br>" + "Tọa độ " + i + ": " + coordinates[i].lat + ", " + coordinates[i].lng;
  }

  infoWindow.setContent(contentString);
  infoWindow.setPosition(event.latLng);

  infoWindow.open(map);
}
