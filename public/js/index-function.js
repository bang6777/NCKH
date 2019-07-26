$(document).ready(function () {
  GetViTri();
});

//Khai bao bien
var arrxe = [];
id = 0;

//------------------Trang chu
//Get vi tri xe
function GetViTri() {
  clearMarkers();
  $.ajax({
    type: "GET",
    url: "/xe/vitri",
    contentType: "application/json",
    success: function (response) {
      $.each(response, function (i, xe) {
        console.log(xe.XE_ID, xe.XE_LAT, xe.XE_LNG, xe.XE_TRANGTHAI);
        if (xe.XE_VITRI == "") {
          var vt = createLatLng(xe.XE_VITRI);
          if (xe.XE_TRANGTHAI == "0") {
            marker = new google.maps.Marker({
              position: vt,
              map: map,
              icon: "./img/marker-green.png",
              label: xe.XE_ID
            });
            arrxe[id] = marker;
            id++;
          } else if (xe.XE_TRANGTHAI == "1") {
            marker = new google.maps.Marker({
              position: vt,
              map: map,
              icon: "./img/marker-red.png",
              label: xe.XE_ID
            });
            arrxe[id] = marker;
            id++;
          }
          var isInside = google.maps.geometry.poly.containsLocation(marker.getPosition(), polygon);
          var isOnEdge = google.maps.geometry.poly.isLocationOnEdge(marker.getPosition(), polygon, 0.00001);
          if (isInside == false && isOnEdge == false) {
            alert(xe.XE_ID + " Trong trường: " + isInside + "----Trên cạnh: " + isOnEdge);
          }
        }
      });
    },
    error: function (e) {
      console.log(e);
    }
  });
}

//----------------Ham
//Chia toa do
function createLatLng(coordString) {
  var a = coordString.split(",");
  return new google.maps.LatLng(a[0], a[1]);
}

//Load lai tao marker
function Reload() {
  setInterval(function () {
    GetViTri();
  }, 20000);
}

//Xoa tat ca marker
function clearMarkers() {
  setMapOnAll(null);
}

function setMapOnAll(map) {
  for (var i = 0; i < arrxe.length; i++) {
    arrxe[i].setMap(map);
  }
}
