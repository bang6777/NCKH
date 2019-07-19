$(document).ready(function() {
  GetViTri();
  // Reload();
});

var arrxe = [];
id = 0;

function GetViTri() {
  clearMarkers();
  $.ajax({
    type: "GET",
    url: "/xe/vitri",
    contentType: "application/json",
    success: function(response) {
      $.each(response, function(i, xe) {
        console.log(xe.XE_ID, xe.XE_VITRI);
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
      });
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//Chia toa do
function createLatLng(coordString) {
  var a = coordString.split(",");
  return new google.maps.LatLng(a[0], a[1]);
}

//Load lai tao marker
function Reload() {
  setInterval(function() {
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

//Add
function AddXE() {
  var xe_id = $("#txtXe_ID_add").val();
  var xe_namsanxuat = $("#txtXe_NamSanXuat_add").val();
  var xe_ghichu = $("#txtXe_GhiChu_add").val();
  // alert(xe_id + "------" + xe_namsanxuat + xe_ghichu);
  if (xe_id == "" || xe_namsanxuat == "" || xe_ghichu == "") {
    alert("Vui lòng điền đầy đủ các trường!");
  } else {
    $.ajax({
      type: "POST",
      url: "/xe/find",
      data: JSON.stringify({ XE_ID: xe_id }),
      contentType: "application/json",
      success: function(response) {
        var length = Object.keys(response).length;
        console.log(length);
        if (length > 0) {
          $("#XE_alert").html("ID đã tồn tại. Vui lòng chọn ID khác!");
        } else {
          $.ajax({
            url: "/xe",
            method: "POST",
            data: JSON.stringify({
              XE_ID: xe_id,
              XE_NAMSANXUAT: xe_namsanxuat,
              XE_GHICHU: xe_ghichu
            }),
            contentType: "application/json",
            success: function() {
              GetAllXE();
              $("#btnCancelSave").click();
              alert("Đã thêm thành công xe: " + xe_id);
            },
            error: function(e) {
              alert("Đã có lỗi xảy ra!");
              console.log(e);
            }
          });
        }
      },
      error: function(e) {
        console.log(e);
      }
    });
  }
}

function GetAllXE() {
  $.ajax({
    method: "GET",
    url: "/xe/all",
    contenType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#tb");
      tb.html("");
      xe_data = "";
      $.each(response, function(i, xe) {
        xe_data += `<tr>
                      <td>${xe.XE_ID}</td>
                      <td>${xe.XE_NAMSANXUAT}</td>
                      <td>${xe.XE_GHICHU}</td>
                      <td class="">
                      <i class="fa fa-edit fa-lg" data-toggle="modal" data-target="#EditXe" title="Cập nhật" onclick="UpdateModal('${
                        xe.XE_ID
                      }')" >
                      </i>
                      <i class="fa fa-trash fa-lg" title="Xóa" onclick="Delete('${xe.XE_ID}')" >
                      </i>
                    </td>
                    <td>
                    <button
                      data-toggle="modal"
                      data-target="#ThongKeXe-MuonTra"
                      class="btn btn-outline-dark btn-sm"
                    >
                      Mượn-trả
                    </button>
                    <button
                      data-toggle="modal"
                      data-target="#ThongKeXe-ViPham"
                      class="btn btn-outline-dark btn-sm"
                    >
                      Vi phạm
                    </button>
                    <button
                      data-toggle="modal"
                      data-target="#ThongKeXe-HuHong"
                      class="btn btn-outline-dark btn-sm"
                    >
                      Hư hỏng
                    </button>
                  </td>
                    </tr>`;
      });
      tb.append(xe_data);
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

// Update thong tin
function UpdateInfo() {
  var xe_id = $("#txtXe_ID_update").val();
  var xe_namsanxuat = $("#txtXe_NamSanXuat_update").val();
  var xe_ghichu = $("#txtXe_GhiChu_update").val();

  $.ajax({
    url: "/xe/updateInfo/" + xe_id,
    method: "POST",
    data: JSON.stringify({
      XE_ID: xe_id,
      XE_NAMSANXUAT: xe_namsanxuat,
      XE_GHICHU: xe_ghichu
    }),
    contentType: "application/json",
    success: function() {
      alert("Đã cập nhật thành công thông tin xe: " + xe_id);
      GetAllXE();
      $("#btnCancelUpdate").click();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

function UpdateModal(a) {
  var tk = a;

  $.ajax({
    type: "POST",
    url: "/xe/find",
    data: JSON.stringify({ XE_ID: tk }),
    contentType: "application/json",
    success: function(response) {
      $.each(response, function(i, xe) {
        console.log(xe);
        $("#txtXe_ID_update").val(xe.XE_ID);
        $("#txtXe_NamSanXuat_update").val(xe.XE_NAMSANXUAT);
        $("#txtXe_GhiChu_update").val(xe.XE_GHICHU);
      });
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function Delete(a) {
  var xe_id = a;
  var ans = confirm("Bạn có muốn xóa tài khoản: " + xe_id + "?");
  var r = "";
  if (ans == true) {
    $.ajax({
      url: "/xe/delete/" + xe_id,
      method: "POST",
      data: JSON.stringify({ XE_ID: xe_id }),
      contentType: "application/json",
      success: function(res) {
        if (res == "fk") {
          alert("Không thể xóa tài khoản vì có vi phạm, mượn trả hoặc báo hư hỏng!");
        } else if (res == "ok") {
          alert("Đã xóa tài khoản: " + xe_id);
        }
        GetAllXE();
      },
      error: function(res) {
        alert("Đã có lỗi xảy ra!");
      }
    });
  }
}
