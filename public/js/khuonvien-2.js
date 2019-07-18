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
  load();
}

//load
async function load() {
  await GetAndDraw();
  // await drawKhuonVien(coordinates);
}

//get va ve toa do
function GetAndDraw() {
  coordinates = [];
  // alert(coordinates.length + "lenght-----");
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
        // alert(coordinates.length + "-----");
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
  alert(coordinates.length);
  alert("da ve");
}

//get toa do
// function GetAndDraw() {
//   coordinates = [];
//   // alert(coordinates.length + "lenght-----");
//   $.ajax({
//     method: "GET",
//     url: "/khuonvien/getToaDo",
//     contentType: "application/json",
//     success: function(response) {
//       // console.log(response);
//       if (response.length > 0) {
//         $.each(response, function(i, td) {
//           coordinates.push({ lat: td.KV_LAT, lng: td.KV_LNG });
//         });

//         drawKhuonVien(coordinates);
//         // alert(coordinates.length + "-----");
//       } else {
//         alert("Hien k có tọa độ");
//       }
//     },
//     error: function(e) {
//       alert("Đã có lỗi xảy ra!");
//       console.log(e);
//     }
//   });
// }
