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

//All VP
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
                              <a onclick="Load_ChiTietMuonTra('${vipham.muontraMUONTRAID}')" data-toggle="modal" data-target="#ChiTietMuonTra">
                                ${vipham.muontraMUONTRAID}
                              </a>
                            </td>
                            <td>${vipham.loi.LOI_TEN}</td>
                            <td>${formatDate(vipham.VP_THOIGIAN)}</td>
                          `;
        if (vipham.VP_TRANGTHAI == 0) {
          vipham_data += `<td>
                                          <select
                                            id="slVP_TrangThai['${vipham.VP_ID}']"
                                            class="form-control form-control-sm"
                                            onchange="UpdateTrangThaiViPham('${vipham.VP_ID}')"
                                          >
                                              <option value=0 selected=true >Chưa xử lý</option>
                                              <option value=1 >Đã xử lý</option>
                                          </select>
                                        </td>
                                        `;
        } else if (vipham.VP_TRANGTHAI == 1) {
          vipham_data += `<td>
                            <select
                              id="slVP_TrangThai['${vipham.VP_ID}']"
                              class="form-control form-control-sm"
                              onchange="UpdateTrangThaiViPham('${vipham.VP_ID}')"
                            >
                                <option value=0>Chưa xử lý</option>
                                <option value=1 selected=true>Đã xử lý</option>
                            </select>
                          </td>
                          `;
        }

        vipham_data += `<td>   
                          <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietViPham" onclick="ChiTietViPham('${
                            vipham.VP_ID
                          }','${vipham.muontraMUONTRAID}')">
                          </i>
                        </td>
                      </tr>`;
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

//Chua Xu Ly
function GetChuaXuLy() {
  $.ajax({
    method: "GET",
    url: "/vipham/chuaxuly",
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
                              <a onclick="Load_ChiTietMuonTra('${vipham.muontraMUONTRAID}')" data-toggle="modal" data-target="#ChiTietMuonTra">
                                ${vipham.muontraMUONTRAID}
                              </a>
                            </td>
                            <td>${vipham.loi.LOI_TEN}</td>
                            <td>${formatDate(vipham.VP_THOIGIAN)}</td>
                          `;
        if (vipham.VP_TRANGTHAI == 0) {
          vipham_data += `<td>
                                          <select
                                            id="slVP_TrangThai['${vipham.VP_ID}']"
                                            class="form-control form-control-sm"
                                            onchange="UpdateTrangThaiViPham('${vipham.VP_ID}', '${vipham.muontraMUONTRAID}')"
                                          >
                                              <option value=0 selected=true >Chưa xử lý</option>
                                              <option value=1 >Đã xử lý</option>
                                          </select>
                                        </td>
                                        `;
        } else if (vipham.VP_TRANGTHAI == 1) {
          vipham_data += `<td>
                                          <select
                                            id="slVP_TrangThai['${vipham.VP_ID}']"
                                            class="form-control form-control-sm"
                                            onchange="UpdateTrangThaiViPham('${vipham.VP_ID}')"
                                          >
                                              <option value=0>Chưa xử lý</option>
                                              <option value=1 selected=true >Đã xử lý</option>
                                          </select>
                                        </td>
                                        `;
        }

        vipham_data += `<td>   
                          <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietViPham" onclick="ChiTietViPham('${
                            vipham.VP_ID
                          }','${vipham.muontraMUONTRAID}')">
                          </i>
                        </td>
                      </tr>`;
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

//Chua Da Ly
function GetDaXuLy() {
  $.ajax({
    method: "GET",
    url: "/vipham/daxuly",
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
                              <a onclick="Load_ChiTietMuonTra('${vipham.muontraMUONTRAID}')" data-toggle="modal" data-target="#ChiTietMuonTra">
                                ${vipham.muontraMUONTRAID}
                              </a>
                            </td>
                            <td>${vipham.loi.LOI_TEN}</td>
                            <td>${formatDate(vipham.VP_THOIGIAN)}</td>
                          `;
        if (vipham.VP_TRANGTHAI == 0) {
          vipham_data += `<td>
                            <select
                              id="slVP_TrangThai['${vipham.VP_ID}']"
                              class="form-control form-control-sm"
                              onchange="UpdateTrangThaiViPham('${vipham.VP_ID}')"
                            >
                                <option value=0 selected=true>Chưa xử lý</option>
                                <option value=1>Đã xử lý</option>
                            </select>
                          </td>
                          `;
        } else if (vipham.VP_TRANGTHAI == 1) {
          vipham_data += `<td>
                            <select
                              id="slVP_TrangThai['${vipham.VP_ID}']"
                              class="form-control form-control-sm"
                              onchange="UpdateTrangThaiViPham('${vipham.VP_ID}')"
                            >
                                <option value=0>Chưa xử lý</option>
                                <option value=1 selected=true>Đã xử lý</option>
                            </select>
                          </td>
                          `;
        }

        vipham_data += `<td>
                          <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietViPham" onclick="ChiTietViPham('${
                            vipham.VP_ID
                          }','${vipham.muontraMUONTRAID}')">
                          </i>
                        </td>
                      </tr>`;
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
                      <td>${mt.taikhoanTKID}</td>
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
                    `;
      });
      tb.append(mt_data);
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
    // columnDefs: [{ targets: [1, 2, 3, 4], searchable: false }],
    ordering: false,
    language: {
      lengthMenu: "Hiển thị _MENU_ dòng dữ liệu trên một trang:",
      info: "Hiển thị _START_ trong tổng số _TOTAL_ dòng dữ liệu:",
      infoEmpty: "Dữ liệu rỗng",
      emptyTable: "Chưa có dữ liệu nào ",
      processing: "Đang xử lý ",
      search: "Tìm kiếm: ",
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

    lengthMenu: [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Tất cả"]]
  });
}

//Chia toa do
function createLatLng(coordString) {
  var a = coordString.split(",");
  return new google.maps.LatLng(a[0], a[1]);
}

function ChiTietViPham(a, b) {
  var vp_id = a;
  var mt_id = b;
  $.ajax({
    type: "POST",
    url: "/vipham/chitiet",
    data: JSON.stringify({ VP_ID: vp_id, MUONTRA_ID: mt_id }),
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
                      <td>${vp.muontraMUONTRAID}</td>
                    </tr>
                    <tr>
                      <td>ID người dùng</td>
                      <td>${vp.muontra.taikhoanTKID}</td>
                    </tr>
                    <tr>
                      <td>Xe vi phạm</td>
                      <td>${vp.muontra.xeXEID}</td>
                    </tr>
                    <tr>
                      <td>Tên lỗi</td>
                      <td id="id_loi[${vp.loiLOIID}]"></td>
                    </tr>
                    <tr>
                      <td>Thời gian vi phạm</td>
                      <td>${formatDate(vp.VP_THOIGIAN)}</td>
                    </tr>
                    <tr>
                      <td>Vị trí vi phạm</td>
                      <td>
                        <img src="./img/marker-orange.png" height="20px"/>
                        ${vp.VP_LAT}, ${vp.VP_LNG}
                        </td>
                    </tr>
                    `;
      $.ajax({
        url: "/loi/" + vp.loiLOIID,
        data: JSON.stringify({ LOI_ID: vp.loiLOIID }),
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
      MapVP(vp.VP_LAT, vp.VP_LNG);
      GetAndDraw();
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//update xu ly
function UpdateTrangThaiViPham(a, b) {
  var vp_id = a;
  var vp_xuly_id = "slVP_TrangThai['" + vp_id + "']";
  var vp_xuly = Number(document.getElementById(vp_xuly_id).value);
  var mt_id = b;
  $.ajax({
    url: "/vipham/updateXuLy",
    method: "POST",
    data: JSON.stringify({ VP_ID: vp_id, VP_TRANGTHAI: vp_xuly, MUONTRA_ID: mt_id }),
    contentType: "application/json",
    success: function() {
      alert("Đã cập nhật thành công xử lý vi phạm: " + vp_id);
      LoadView();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

//Load map vi pham
function MapVP(vpLat, vpLng) {
  var mapProp = {
    center: new google.maps.LatLng(10.0299337, 105.7684266),
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  if (vpLat != null && vpLng != null) {
    var vtVP = new google.maps.LatLng(vpLat, vpLng);
    var markerVP = new google.maps.Marker({
      position: vtVP,
      map: map,
      icon: "./img/marker-orange.png"
    });
  }
}

//Load View
function LoadView() {
  var view = document.getElementById("slViPham_View").value;
  if (view == 2) {
    GetAllViPham();
  } else if (view == 0) {
    GetChuaXuLy();
  } else if (view == 1) {
    GetDaXuLy();
  }
}

//format Date
function formatDate(timestamp) {
  if (timestamp == null) return "";
  date = new Date(Date.parse(timestamp));

  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;
  var str = day + "-" + month + "-" + date.getFullYear() + " " + hour + " giờ " + min + " phút " + sec + " giây";

  return str;
}
