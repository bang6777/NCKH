//Reset modal
function ResetModal() {
  document.getElementById("txtLoi_TenLoi_add").value = "";
  document.getElementById("txtLoi_MoTa_add").value = "";

  // $("#LOI_alert").html("");
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

      if ($.fn.DataTable.isDataTable("#tbLoi")) {
        $("#tbLoi")
          .DataTable()
          .destroy();
      }
      $("#tbLoi tbody").empty();

      $.each(response, function(i, loi) {
        loi_data += `<tr>
                        <td>${loi.LOI_ID}</td>
                        <td>${loi.LOI_TEN}</td>
                        <td>${loi.LOI_MOTA}</td>
                        <td class="">
                      <i class="fa fa-edit fa-lg" data-toggle="modal" data-target="#EditLoi" title="Cập nhật" onclick="UpdateModal('${loi.LOI_ID}')" >
                      </i>
                      <i class="fa fa-trash fa-lg" title="Xóa" onclick="Delete('${loi.LOI_ID}')" >
                      </i>
                    </td>
                    
                      </tr>`;
      });
      tb.append(loi_data);
      LoadDataTable();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

function AddLoi() {
  // var loi_id = $("#txtLoi_ID_add").val();
  var loi_mota = $("#txtLoi_MoTa_add").val();
  var loi_tenloi = $("#txtLoi_TenLoi_add").val();
  // alert(xe_id + "------" + xe_namsanxuat + xe_ghichu);
  if (loi_mota == "" || loi_tenloi == "") {
    alert("Vui lòng điền đầy đủ các trường!");
  } else {
    $.ajax({
      url: "/loi",
      method: "POST",
      data: JSON.stringify({
        // LOI_ID: loi_id,
        LOI_TEN: loi_tenloi,
        LOI_MOTA: loi_mota
      }),
      contentType: "application/json",
      success: function() {
        GetAllLoi();
        $("#btnCancelSave").click();
        alert("Đã thêm thành công tên lỗi!");
      },
      error: function(e) {
        alert("Đã có lỗi xảy ra!");
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
  if (loi_mota == "" || loi_tenloi == "" || loi_id == "") {
    alert("Vui lòng điền đầy đủ các trường!");
  } else {
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
}

function UpdateModal(a) {
  var tk = a;

  $.ajax({
    type: "GET",
    url: "/loi/" + tk,
    data: JSON.stringify({ LOI_ID: tk }),
    contentType: "application/json",
    success: function(loi) {
      // $.each(response, function(i, loi) {
      console.log(loi);
      $("#txtLoi_ID_update").val(loi.LOI_ID);
      $("#txtLoi_TenLoi_update").val(loi.LOI_TEN);
      $("#txtLoi_MoTa_update").val(loi.LOI_MOTA);
      // });
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function Delete(a) {
  var loi_id = a;
  var ans = confirm("Bạn có muốn xóa lỗi: " + loi_id + "?");
  if (ans == true) {
    $.ajax({
      url: "/loi/delete/" + loi_id,
      method: "POST",
      data: JSON.stringify({ LOI_ID: loi_id }),
      contentType: "application/json",
      success: function(res) {
        if (res == "fk") {
          alert("Không thể xóa lỗi vì có vi phạm, mượn trả hoặc báo hư hỏng!");
        } else if (res == "ok") {
          alert("Đã xóa lỗi: " + loi_id);
        }
        GetAllLoi();
      },
      error: function(res) {
        alert("Đã có lỗi xảy ra!");
      }
    });
  }
}

//Load table
function LoadDataTable() {
  table = $("#tbLoi").DataTable({
    stateSave: true,
    // columnDefs: [{ targets: [1, 2, 3], searchable: false }],
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
    pageLength: -1,
    lengthMenu: [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Tất cả"]]
  });
}
