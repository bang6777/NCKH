//Load thong tin TK
function LoadTK(a) {
  var tk = a;
  // alert(tk);
  $.ajax({
    type: "POST",
    url: "/taikhoan/find",
    data: JSON.stringify({ TK_ID: tk }),
    contentType: "application/json",
    success: function(response) {
      $.each(response, function(i, taikhoan) {
        console.log(taikhoan);

        $("#TK_ID").html(taikhoan.TK_ID);
        $("#TK_HOTEN").html(taikhoan.TK_HOTEN);
        if (taikhoan.TK_HIEULUC == 1) {
          $("#TK_HIEULUC").html("Còn hiệu lực");
        } else if (taikhoan.TK_HIEULUC == 0) {
          $("#TK_HIEULUC").html("Đã vô hiệu");
        }
        $("#TK_LOAI").html(taikhoan.TK_LOAI);
        $("#TK_DONVI").html(taikhoan.TK_DONVI);
      });
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//Get tat ca muon tra
function getAllMuonTra() {
  $.ajax({
    method: "GET",
    url: "/muontra/all",
    contentType: "application/json",
    success: function(response) {
      // console.log(response);
      var tb = $("#tb");
      tb.html("");
      mt_data = "";

      if ($.fn.DataTable.isDataTable("#tbMuonTra")) {
        $("#tbMuonTra")
          .DataTable()
          .destroy();
      }
      $("#tbMuonTra tbody").empty();

      $.each(response, function(i, mt) {
        console.log(response);
        mt_data += `<tr>
                      <td>${mt.MUONTRA_ID}</td>
                      <td class="chitiet">
                        <a onclick="LoadTK('${mt.TK_ID}')" data-toggle="modal" data-target="#ChiTietTK">
                          ${mt.TK_ID}  
                        </a>
                      </td>
                      <td>${mt.xeXEID}</td>
                      <td>${mt.MUON_THOIGIAN}</td>
                      <td>${mt.TRA_THOIGIAN}</td>
                      <td>
                       <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietMuonTra" onclick="ChiTietMuonTra('${
                         mt.MUONTRA_ID
                       }')"></i>
                      </td>
                    </tr>`;
      });
      tb.append(mt_data);
      LoadDataTable();
    }
  });
}

//Get chua tra
function getChuaTra() {
  $.ajax({
    method: "GET",
    url: "/muontra/chuatra",
    contentType: "application/json",
    success: function(response) {
      // console.log(response);
      var tb = $("#tb");
      tb.html("");
      mt_data = "";

      if ($.fn.DataTable.isDataTable("#tbMuonTra")) {
        $("#tbMuonTra")
          .DataTable()
          .destroy();
      }
      $("#tbMuonTra tbody").empty();

      $.each(response, function(i, mt) {
        console.log(response);
        mt_data += `<tr>
                      <td>${mt.MUONTRA_ID}</td>
                      <td class="chitiet">
                        <a onclick="LoadTK('${mt.TK_ID}')" data-toggle="modal" data-target="#ChiTietTK">
                          ${mt.TK_ID}  
                        </a>
                      </td>
                      <td>${mt.xeXEID}</td>
                      <td>${mt.MUON_THOIGIAN}</td>
                      <td>${mt.TRA_THOIGIAN}</td>
                      <td>
                       <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietMuonTra" onclick="ChiTietMuonTra('${
                         mt.MUONTRA_ID
                       }')"></i>
                      </td>
                    </tr>`;
      });
      tb.append(mt_data);
      LoadDataTable();
    }
  });
}

function ChiTietMuonTra(a) {
  var mt_id = a;
  var vtMuon = "";
  var vtTra = "";

  $.ajax({
    type: "POST",
    url: "/muontra/find",
    data: JSON.stringify({ MUONTRA_ID: mt_id }),
    contentType: "application/json",
    success: function(response) {
      var tb = $("#tbCTMT");
      tb.html("");
      mt_data = "";
      $.each(response, function(i, mt) {
        console.log(mt);
        mt_data += `<tr>
                      <td>ID mượn trả</td>
                      <td>${mt.MUONTRA_ID}</td>
                    </tr>  
                    <tr>
                      <td>ID tài khoản</td>
                      <td>${mt.TK_ID}</td>
                    </tr>
                    <tr>
                      <td>ID xe</td>
                      <td>${mt.xeXEID}</td>
                    </tr>
                    <tr>
                      <td>Thời gian mượn</td>
                      <td>${mt.MUON_THOIGIAN}</td>
                    </tr>
                    <tr>
                      <td>Thời gian trả</td>
                      <td>${mt.TRA_THOIGIAN}</td>
                    </tr>
                    <tr>
                      <td>Vị trí mượn</td>
                      <td>
                        <img src="./img/marker-red.png" height="20px" />
                        ${mt.MUON_VITRI_LAT}, ${mt.MUON_VITRI_LNG}
                      </td>
                    </tr>
                    <tr>
                      <td>Vị trí trả</td>
                      <td>
                        <img src="./img/marker-green.png" height="20px" />
                        ${mt.TRA_VITRI_LAT}, ${mt.TRA_VITRI_LNG}
                      </td>
                    </tr>
                    `;
        vtMuon_lat = mt.MUON_VITRI_LAT;
        vtMuon_lng = mt.MUON_VITRI_LNG;
        vtTra_lat = mt.TRA_VITRI_LAT;
        vtTra_lng = mt.TRA_VITRI_LNG;
      });
      tb.append(mt_data);
      MapPosition(vtMuon_lat, vtMuon_lng, vtTra_lat, vtTra_lng);
      GetAndDraw();
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//Load map muon tra
function MapPosition(vitriMuonLat, vitriMuonLng, vitriTraLat, vitriTraLng) {
  var mapProp = {
    center: new google.maps.LatLng(10.0299337, 105.7684266),
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  if (vitriMuonLat != null && vitriMuonLng != null) {
    var vtMuon = new google.maps.LatLng(vitriMuonLat, vitriMuonLng);
    var markerMuon = new google.maps.Marker({
      position: vtMuon,
      map: map,
      icon: "./img/marker-red.png"
    });
  }
  if (vitriTraLat != null && vitriTraLng != null) {
    var vtTra = new google.maps.LatLng(vitriTraLat, vitriTraLng);
    var markerTra = new google.maps.Marker({
      position: vtTra,
      map: map,
      icon: "./img/marker-green.png"
    });
  }
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
  // khuonvien = polygon;
  // alert("da ve");
}

//Chia toa do
function createLatLng(coordString) {
  var a = coordString.split(",");
  return new google.maps.LatLng(a[0], a[1]);
}

//Load View
function LoadView() {
  var view = document.getElementById("slMuonTra_View").value;
  if (view == 1) {
    getAllMuonTra();
  } else if (view == 0) {
    getChuaTra();
  }
}

//Load table
function LoadDataTable() {
  table = $("#tbMuonTra").DataTable({
    stateSave: true,
    // columnDefs: [{ targets: [1, 2, 3], searchable: false }],
    ordering: false,
    language: {
      lengthMenu: "Hiển thị _MENU_ dòng dữ liệu trên một trang:",
      info: "Hiển thị _START_ trong tổng số _TOTAL_ dòng dữ liệu:",
      infoEmpty: "Dữ liệu rỗng",
      emptyTable: "Chưa có dữ liệu nào ",
      processing: "Đang xử lý ",
      search: "Tìm kiếm theo ID: ",
      loadingRecords: "Đang load dữ liệu",
      zeroRecords: "Không tìm thấy dữ liệu",
      infoFiltered: "(Được từ tổng số _MAX_ dòng dữ liệu",
      paginate: {
        first: "|<",
        last: ">|",
        next: "Sau",
        previous: "Trước"
      }
    },
    pageLength: -1,
    lengthMenu: [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Tất cả"]]
  });
}
