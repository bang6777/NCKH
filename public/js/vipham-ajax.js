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

// function GetAllViPham() {
//   $.ajax({
//     method: "GET",
//     url: "/vipham/all",
//     contenType: "application/json",
//     success: function(response) {
//       console.log(response);
//       var tb = $("#tb");
//       tb.html("");
//       vipham_data = "";

//       if ($.fn.DataTable.isDataTable("#tbViPham")) {
//         $("#tbViPham")
//           .DataTable()
//           .destroy();
//       }
//       $("#tbViPham tbody").empty();

//       $.each(response, function(i, vipham) {
//         vipham_data += `<tr>
//                             <td>${vipham.VP_ID}</td>
//                             <td class="chitiet">
//                               <a onclick="Load_ChiTietMuonTra('${vipham.MUONTRA_ID}')" data-toggle="modal" data-target="#ChiTietMuonTra">
//                                 ${vipham.MUONTRA_ID}
//                               </a>
//                             </td>
//                             <td>${vipham.LOI_ID}</td>
//                             <td>${vipham.VP_THOIGIAN}</td>
//                             <td>
//                        <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietViPham" onclick="ChiTietViPham('${
//                          vipham.MUONTRA_ID
//                        }')"></i>
//                       </td>
//                       `;

//         vipham_data += `</tr>`;
//       });
//       tb.append(vipham_data);
//       LoadDataTable();
//     },
//     error: function(e) {
//       alert("Đã có lỗi xảy ra!");
//       console.log(e);
//     }
//   });
// }

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
                            <td id="loi[${i}]"></td>
                            <td>${vipham.VP_THOIGIAN}</td>
                          `;
        if (vipham.DA_XU_LY_VP == 0) {
          vipham_data += `<td>
                                          <select
                                            id="slVP_TrangThai['${vipham.HH_ID}']"
                                            class="form-control form-control-sm"
                                            onchange="UpdateTrangThaiViPham('${vipham.HH_ID}')"
                                          >
                                              <option value="0" selected=true >Chưa xử lý</option>
                                              <option value="1" >Đã xử lý</option>
                                          </select>
                                        </td>
                                        `;
        } else if (vipham.DA_XU_LY_VP == 1) {
          vipham_data += `<td>
                                          <select
                                            id="slVP_TrangThai['${vipham.HH_ID}']"
                                            class="form-control form-control-sm"
                                            onchange="UpdateTrangThaiViPham('${vipham.HH_ID}')"
                                          >
                                              <option value="0">Chưa xử lý</option>
                                              <option value="1" selected=true >Đã xử lý</option>
                                          </select>
                                        </td>
                                        `;
        }

        vipham_data += `<td>   
                          <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietViPham" onclick="ChiTietViPham('${
                            vipham.MUONTRA_ID
                          }')">
                          </i>
                        </td>
                      </tr>`;
        $.ajax({
          url: "/loi/" + vipham.LOI_ID,
          data: JSON.stringify({ LOI_ID: vipham.LOI_ID }),
          method: "GET",
          contentType: "application/json",
          success: function(response) {
            console.log(response.LOI_TEN);
            var loi_id = "loi[" + i + "]";
            document.getElementById(loi_id).innerHTML = response.LOI_TEN;
          },
          error: function(e) {
            alert("Đã có lỗi xảy ra!");
            console.log(e);
          }
        });
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

//Load table
function LoadDataTable() {
  table = $("#tbViPham").DataTable({
    stateSave: true,
    columnDefs: [{ targets: [1, 2, 3, 4], searchable: false }],
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

function ChiTietViPham(a) {
  var mt_id = a;
  $.ajax({
    type: "GET",
    url: "/vipham/chitiet/" + mt_id,
    // data: JSON.stringify({ VP_ID: vp_id }),
    contentType: "application/json",
    success: function(vp) {
      var tb = $("#tbCTVP");
      tb.html("");
      vp_data = "";
      console.log(vp);
      vp_data += `<tr>
                      <td>ID vi phạm</td>
                      <td>${vp.VP_ID}</td>
                    </tr>
                    <tr>
                      <td>ID mượn trả</td>
                      <td>${vp.MUONTRA_ID}</td>
                    </tr>
                    <tr>
                      <td>ID người dùng</td>
                      <td>${vp.muontra.TK_ID}</td>
                    </tr>
                    <tr>
                      <td>Xe vi phạm</td>
                      <td>${vp.muontra.XE_ID}</td>
                    </tr>
                    <tr>
                      <td>ID lỗi</td>
                      <td>${vp.LOI_ID}</td>
                    </tr>
                    <tr>
                      <td>Tên lỗi</td>
                      <td id="id_loi[${vp.LOI_ID}]"></td>
                    </tr>
                    <tr>
                      <td>Thời gian vi phạm</td>
                      <td>${vp.VP_THOIGIAN}</td>
                    </tr>
                    `;
      $.ajax({
        url: "/loi/" + vp.LOI_ID,
        data: JSON.stringify({ LOI_ID: vp.LOI_ID }),
        method: "GET",
        contentType: "application/json",
        success: function(response) {
          console.log(response.LOI_TEN);
          var loi_id = "id_loi[" + response.LOI_ID + "]";
          document.getElementById(loi_id).innerHTML = response.LOI_TEN;
        },
        error: function(e) {
          alert("Đã có lỗi xảy ra!");
          console.log(e);
        }
      });
      tb.append(vp_data);
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//update xu ly
function UpdateTrangThaiViPham(a) {
  var vp_id = a;

  var vp_xuly = "slVP_TrangThai['" + vp_id + "']";
  var c = document.getElementById(vp_xuly).value;

  $.ajax({
    url: "/vipham/updateXuLy/" + vp_id,
    method: "POST",
    data: JSON.stringify({ VP_ID: vp_id, DA_XU_LY_VP: vp_xuly }),
    contentType: "application/json",
    success: function() {
      alert("Đã cập nhật thành công xử lý vi phạm: " + vp_id);
      // LoadView();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}
