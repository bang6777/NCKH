$(document).ready(function() {
  $("#btnAdd").on("click", function() {
    ResetModal();
  });
  // $("#tableTK").on("draw.dt", function() {
  //   LoadView();
  // });
});

//Reset modal
function ResetModal() {
  document.getElementById("txtLoi_ID_add").value = "";
  document.getElementById("txtLoi_TenLoi_add").value = "";
  document.getElementById("txtLoi_MoTa_add").value = "";

  $("#LOI_alert").html("");
}

function GetAllLoi() {
  $.ajax({
    method: "GET",
    url: "/loi/all",
    contenType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#tb");
      tb.html("");
      loi_data = "";
      $.each(response, function(i, loi) {
        loi_data += `<tr>
                        <td>${loi.LOI_ID}</td>
                        <td>${loi.LOI_TEN}</td>
                        <td>${loi.LOI_MOTA}</td>
                        <td class="">
                      <i class="fa fa-edit fa-lg" data-toggle="modal" data-target="#EditLoi" title="Cập nhật" onclick="UpdateModal('${
                        loi.LOI_ID
                      }')" >
                      </i>
                      <i class="fa fa-trash fa-lg" title="Xóa" onclick="Delete('${loi.LOI_ID}')" >
                      </i>
                    </td>
                    
                      </tr>`;
      });
      tb.append(loi_data);
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

function AddLoi() {
  var loi_id = $("#txtLoi_ID_add").val();
  var loi_mota = $("#txtLoi_MoTa_add").val();
  var loi_tenloi = $("#txtLoi_TenLoi_add").val();
  // alert(xe_id + "------" + xe_namsanxuat + xe_ghichu);
  if (loi_id == "" || loi_mota == "" || loi_tenloi == "") {
    alert("Vui lòng điền đầy đủ các trường!");
  } else {
    $.ajax({
      type: "POST",
      url: "/loi/find",
      data: JSON.stringify({ LOI_ID: loi_id }),
      contentType: "application/json",
      success: function(response) {
        var length = Object.keys(response).length;
        console.log(length);
        if (length > 0) {
          $("#LOI_alert").html("ID đã tồn tại. Vui lòng chọn ID khác!");
        } else {
          $.ajax({
            url: "/loi",
            method: "POST",
            data: JSON.stringify({
              LOI_ID: loi_id,
              LOI_TEN: loi_tenloi,
              LOI_MOTA: loi_mota
            }),
            contentType: "application/json",
            success: function() {
              GetAllLoi();
              $("#btnCancelSave").click();
              alert("Đã thêm thành công loi: " + loi_id);
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

// Update thong tin
function UpdateInfo() {
  var loi_id = $("#txtLoi_ID_update").val();
  var loi_mota = $("#txtLoi_MoTa_update").val();
  var loi_tenloi = $("#txtLoi_TenLoi_update").val();

  $.ajax({
    url: "/loi/update/" + loi_id,
    method: "POST",
    data: JSON.stringify({
      LOI_ID: loi_id,
      LOI_TEN: loi_tenloi,
      LOI_MOTA: loi_mota
    }),
    contentType: "application/json",
    success: function() {
      alert("Đã cập nhật thành công thông tin lỗi: " + loi_id);
      GetAllLoi();
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
    url: "/loi/find",
    data: JSON.stringify({ LOI_ID: tk }),
    contentType: "application/json",
    success: function(response) {
      $.each(response, function(i, loi) {
        console.log(loi);
        $("#txtLoi_ID_update").val(loi.LOI_ID);
        $("#txtLoi_TenLoi_update").val(loi.LOI_TEN);
        $("#txtLoi_MoTa_update").val(loi.LOI_MOTA);
      });
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function Delete(a) {
  var loi_id = a;
  var ans = confirm("Bạn có muốn xóa tài khoản: " + loi_id + "?");
  if (ans == true) {
    $.ajax({
      url: "/loi/delete/" + loi_id,
      method: "POST",
      data: JSON.stringify({ LOI_ID: loi_id }),
      contentType: "application/json",
      success: function(res) {
        alert(res);
        if (res == "fk") {
          alert("Không thể xóa tài khoản vì có vi phạm, mượn trả hoặc báo hư hỏng!");
        } else if (res == "ok") {
          alert("Đã xóa tài khoản: " + loi_id);
        }
        GetAllLoi();
      },
      error: function(res) {
        alert("Đã có lỗi xảy ra!");
      }
    });
  }
}
