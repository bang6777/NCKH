//Reset modal
function ResetModal() {
  // document.getElementById("txtXe_ID_add").value = "";
  document.getElementById("txtXe_NamSanXuat_add").value = "";
  document.getElementById("txtXe_GhiChu_add").value = "";
  $("#XE_alert").html("");
}

//Add
function AddXE() {
  // var xe_id = $("#txtXe_ID_add").val();
  var xe_namsanxuat = $("#txtXe_NamSanXuat_add").val();
  var xe_imei = $("#txtXe_Imei_add").val();
  var xe_ghichu = $("#txtXe_GhiChu_add").val();
  // alert(xe_id + "------" + xe_namsanxuat + xe_ghichu);
  if (xe_namsanxuat == "" || xe_imei == "") {
    alert("Vui lòng điền đầy đủ các trường!");
  } else {
    $.ajax({
      url: "/xe",
      method: "POST",
      data: JSON.stringify({
        // XE_ID: xe_id,
        XE_NAMSANXUAT: xe_namsanxuat,
        XE_GHICHU: xe_ghichu,
        XE_IMEI: xe_imei
      }),
      contentType: "application/json",
      success: function() {
        GetAllXE();
        $("#btnCancelSave").click();
        alert("Đã thêm thành công xe! ");
      },
      error: function(e) {
        alert("Đã có lỗi xảy ra!");
        console.log(e);
      }
      // });
      // }
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

      if ($.fn.DataTable.isDataTable("#tbXe")) {
        $("#tbXe")
          .DataTable()
          .destroy();
      }
      $("#tbXe tbody").empty();

      $.each(response, function(i, xe) {
        xe_data += `<tr>
                      <td>${xe.XE_ID}</td>
                      <td>${xe.XE_IMEI}</td>
                      <td>${xe.XE_NAMSANXUAT}</td>
                      <td>${xe.XE_GHICHU}</td>
                      <td class="">
                      <i class="fa fa-edit fa-lg" data-toggle="modal" data-target="#EditXe" title="Cập nhật" onclick="UpdateModal('${xe.XE_ID}')" >
                      </i>
                      <i class="fa fa-trash fa-lg" title="Xóa" onclick="Delete('${xe.XE_ID}')" >
                      </i>
                    </td>
                    <td>
                    <button
                      data-toggle="modal"
                      data-target="#ThongKeXe-MuonTra"
                      class="btn btn-outline-dark btn-sm"
                      onclick="XE_MuonTra('${xe.XE_ID}')"
                    >
                      Mượn-trả
                    </button>
                    <button
                      data-toggle="modal"
                      data-target="#ThongKeXe-ViPham"
                      class="btn btn-outline-dark btn-sm"
                      onclick="Xe_ViPham('${xe.XE_ID}')"
                    >
                      Vi phạm
                    </button>
                    <button
                      data-toggle="modal"
                      data-target="#ThongKeXe-HuHong"
                      class="btn btn-outline-dark btn-sm"
                      onclick="XE_HuHong('${xe.XE_ID}')"
                    >
                      Hư hỏng
                    </button>
                  </td>
                    </tr>`;
      });
      tb.append(xe_data);
      LoadDataTable();
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
  var xe_imei = $("#txtXe_Imei_update").val();
  if (xe_namsanxuat == "" || xe_imei == "" || xe_id == "") {
    alert("Vui lòng điền đầy đủ các trường!");
  } else {
    $.ajax({
      url: "/xe/updateInfo/" + xe_id,
      method: "POST",
      data: JSON.stringify({
        XE_ID: xe_id,
        XE_IMEI: xe_imei,
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
        $("#txtXe_Imei_update").val(xe.XE_IMEI);
      });
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function Delete(a) {
  var xe_id = a;
  var ans = confirm("Bạn có muốn xóa xe: " + xe_id + "?");
  var r = "";
  if (ans == true) {
    $.ajax({
      url: "/xe/delete/" + xe_id,
      method: "POST",
      data: JSON.stringify({ XE_ID: xe_id }),
      contentType: "application/json",
      success: function(res) {
        if (res == "fk") {
          alert("Không thể xóa xe vì có vi phạm, mượn trả hoặc báo hư hỏng!");
        } else if (res == "ok") {
          alert("Đã xóa xe: " + xe_id);
        }
        GetAllXE();
      },
      error: function(res) {
        alert("Đã có lỗi xảy ra!");
      }
    });
  }
}

//Thong ke TK - MuonTra
function XE_MuonTra(a) {
  var xe_id = a;
  var sl = 0;
  $.ajax({
    type: "GET",
    url: "/muontra/xe/" + xe_id,
    data: JSON.stringify({ XE_ID: xe_id }),
    contentType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#XE_MuonTra");
      tb.html("");
      xe_data = "";
      $.each(response, function(i, xe) {
        xe_data += `<tr>
          <td>${xe.MUONTRA_ID}</td>
          <td>${xe.taikhoanTKID}</td>
          <td>${formatDate(xe.MUON_THOIGIAN)}</td>
          <td>${formatDate(xe.TRA_THOIGIAN)}</td>
        </tr>`;
        sl++;
      });
      tb.append(xe_data);
      document.getElementById("thongke-muontra").innerHTML = "Số lượt mượn trả: " + sl;
    },
    error: function(e) {
      console.log(e);
    }
  });
}
//Thong ke xe - HuHong
function XE_HuHong(a) {
  var xe_id = a;
  var sl = 0;
  $.ajax({
    type: "GET",
    url: "/huhong/xe/" + xe_id,
    data: JSON.stringify({ XE_ID: xe_id }),
    contentType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#XE_HuHong");
      tb.html("");
      xe_data = "";
      $.each(response, function(i, xe) {
        sl++;
        xe_data += `<tr>
          <td>${xe.HH_ID}</td>
          <td>${xe.taikhoanTKID}</td>
          <td>${xe.HH_MOTA}</td>
          <td>${formatDate(xe.HH_THOIGIAN)}</td>
        </tr>`;
      });
      tb.append(xe_data);
      document.getElementById("thongke-huhong").innerHTML = "Số lượt hư hỏng: " + sl;
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//Thong ke TK - ViPham
async function Xe_ViPham(a) {
  var xe_id = a;
  var sl = 0;
  await $.ajax({
    type: "GET",
    url: "/vipham/xe/" + xe_id,
    data: JSON.stringify({ XE_ID: xe_id }),
    contentType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#Xe_ViPham");
      tb.html("");
      xe_data = "";

      $.each(response, function(i, xe) {
        sl++;
        xe_data += `<tr>
          <td>${xe.VP_ID}</td>
          <td>${xe.muontraMUONTRAID}</td>
          <td id="id_loi[${xe.VP_ID}]"></td>
          
          <td>${formatDate(xe.VP_THOIGIAN)}</td>
        <\tr>`;
        $.ajax({
          url: "/loi/" + xe.loiLOIID,
          data: JSON.stringify({ LOI_ID: xe.loiLOIID }),
          method: "GET",
          contentType: "application/json",
          success: function(response) {
            console.log(response.LOI_TEN);
            tenloi = response.LOI_TEN;

            var loi_id = "id_loi[" + xe.VP_ID + "]";
            document.getElementById(loi_id).innerHTML = tenloi;
          },
          error: function(e) {
            alert("Đã có lỗi xảy ra!");
            console.log(e);
          }
        });
      });
      tb.append(xe_data);
      document.getElementById("thongke-vipham").innerHTML = "Số lượt vi phạm: " + sl;
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//Load table
function LoadDataTable() {
  table = $("#tbXe").DataTable({
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
