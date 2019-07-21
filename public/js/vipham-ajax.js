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

function GetAllViPham() {
  $.ajax({
    method: "GET",
    url: "/vipham/all",
    contenType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#tb");
      tb.html("");
      vipham_data = "";

      if ($.fn.DataTable.isDataTable("#tbViPham")) {
        $("#tbViPham")
          .DataTable()
          .destroy();
      }
      $("#tbViPham tbody").empty();

      $.each(response, function(i, vipham) {
        vipham_data += `<tr>
                            <td>${vipham.VP_ID}</td>
                            <td class="chitiet">
                              <a onclick="Load_ChiTietMuonTra('${vipham.MUONTRA_ID}')" data-toggle="modal" data-target="#ChiTietMuonTra">
                                ${vipham.MUONTRA_ID}
                              </a>
                            </td>
                            <td>${vipham.LOI_ID}</td>
                            <td>${vipham.TK_ID}</td>
                            <td>${vipham.XE_ID}</td>
                            <td>${vipham.VP_THOIGIAN}</td>
                            <td>
                       <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietViPham" onclick="ChiTietViPham('${
                         vipham.VP_ID
                       }')"></i>
                      </td>
                      `;

        vipham_data += `</tr>`;
      });
      tb.append(vipham_data);
      LoadDataTable();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

function Load_ChiTietMuonTra(a) {
  var mt_id = a;
  var vtMuon = "";
  var vtTra = "";
  // loadKhuonVien();

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
                      <td>${mt.XE_ID}</td>
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
                        ${mt.MUON_VITRI}
                      </td>
                    </tr>
                    <tr>
                      <td>Vị trí trả</td>
                      <td>
                        <img src="./img/marker-green.png" height="20px" />
                        ${mt.TRA_VITRI}
                      </td>
                    </tr>
                    `;
        vtMuon = mt.MUON_VITRI;
        vtTra = mt.TRA_VITRI;
      });
      tb.append(mt_data);
      MapPosition(vtMuon, vtTra);
      GetAndDraw();
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//Load map muon tra
function MapPosition(vitriMuon, vitriTra) {
  var mapProp = {
    center: new google.maps.LatLng(10.0299337, 105.7684266),
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  if (vitriMuon != null) {
    var vtMuon = createLatLng(vitriMuon);
    var markerMuon = new google.maps.Marker({
      position: vtMuon,
      map: map,
      icon: "./img/marker-red.png"
    });
  }
  if (vitriTra != null) {
    var vtTra = createLatLng(vitriTra);
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

//Load table
function LoadDataTable() {
  table = $("#tbViPham").DataTable({
    stateSave: true,
    columnDefs: [{ targets: [1, 2, 3, 4, 5, 6], searchable: false }],
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

//Chia toa do
function createLatLng(coordString) {
  var a = coordString.split(",");
  return new google.maps.LatLng(a[0], a[1]);
}

// function ChiTietViPham(a) {
//   var vp_id = a;
//   //var vtMuon = "";
//   //var vtTra = "";
//   //loadKhuonVien();

//   $.ajax({
//     type: "POST",
//     url: "/vipham/find",
//     data: JSON.stringify({ VP_ID: vp_id }),
//     contentType: "application/json",
//     success: function(response) {
//       var tb = $("#tbCTVP");
//       tb.html("");
//       vp_data = "";
//       $.each(response, function(i, vp) {
//         console.log(vp);
//         vp_data += `<tr>
//                       <td>ID vi phạm</td>
//                       <td>${vp.VP_ID}</td>
//                     </tr>
//                     <tr>
//                       <td>ID tài khoản</td>
//                       <td>${mt.TK_ID}</td>
//                     </tr>
//                     <tr>
//                       <td>ID xe</td>
//                       <td>${mt.XE_ID}</td>
//                     </tr>
//                     <tr>
//                       <td>Thời gian mượn</td>
//                       <td>${mt.MUON_THOIGIAN}</td>
//                     </tr>
//                     <tr>
//                       <td>Thời gian trả</td>
//                       <td>${mt.TRA_THOIGIAN}</td>
//                     </tr>
//                     <tr>
//                       <td>Vị trí mượn</td>
//                       <td>
//                         <img src="./img/marker-red.png" height="20px" />
//                         ${mt.MUON_VITRI}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Vị trí trả</td>
//                       <td>
//                         <img src="./img/marker-green.png" height="20px" />
//                         ${mt.TRA_VITRI}
//                       </td>
//                     </tr>
//                     `;
//         vtMuon = mt.MUON_VITRI;
//         vtTra = mt.TRA_VITRI;
//       });
//       tb.append(mt_data);
//       MapPosition(vtMuon, vtTra);
//     },
//     error: function(e) {
//       console.log(e);
//     }
//   });
// }
