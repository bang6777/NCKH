//Reset modal
function ResetModal() {
  document.getElementById("txtTK_ID_add").value = "";
  document.getElementById("txtTK_Password_add").value = "";
  document.getElementById("txtTK_HoTen_add").value = "";
  document.getElementById("slTK_DonVi_add").value = "-1";
  document.getElementById("slTK_Quyen_add").value = "-1";
  document.getElementById("slTK_Loai_add").value = "-1";
  $("#TK_alert").html("");
}

//Add
function AddTK() {
  var tk_id = $("#txtTK_ID_add").val();
  var tk_hoten = $("#txtTK_HoTen_add").val();
  var tk_password = $("#txtTK_Password_add").val();
  var tk_donvi = $("#slTK_DonVi_add").val();
  var tk_quyen = $("#slTK_Quyen_add").val();
  var tk_loai = $("#slTK_Loai_add").val();

  if (tk_id == "" || tk_hoten == "" || tk_password == "" || tk_donvi == "" || tk_quyen == "" || tk_loai == "") {
    alert("Vui lòng điền đầy đủ các trường!");
  } else {
    $.ajax({
      type: "POST",
      url: "/taikhoan/find",
      data: JSON.stringify({ TK_ID: tk_id }),
      contentType: "application/json",
      success: function(response) {
        var length = Object.keys(response).length;
        console.log(length);
        if (length > 0) {
          $("#TK_alert").html("ID đã tồn tại. Vui lòng chọn ID khác!");
        } else {
          $.ajax({
            url: "/taikhoan",
            method: "POST",
            data: JSON.stringify({
              TK_ID: tk_id,
              TK_PASSWORD: tk_password,
              TK_HOTEN: tk_hoten,
              TK_QUYEN: tk_quyen,
              TK_DONVI: tk_donvi,
              TK_LOAI: tk_loai
            }),
            contentType: "application/json",
            success: function() {
              LoadView();
              $("#btnCancelSave").click();
              alert("Đã thêm thành công tài khoản: " + tk_id);
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

//Load data vao modal updat
function UpdateModal(a) {
  var tk = a;

  $.ajax({
    type: "POST",
    url: "/taikhoan/find",
    data: JSON.stringify({ TK_ID: tk }),
    contentType: "application/json",
    success: function(response) {
      $.each(response, function(i, taikhoan) {
        console.log(taikhoan);
        $("input[name=TK_ID]").val(taikhoan.TK_ID);
        $("input[name=TK_HOTEN]").val(taikhoan.TK_HOTEN);
        $("select[name=TK_DONVI]").val(taikhoan.TK_DONVI);
        $("select[name=TK_QUYEN]").val(taikhoan.TK_QUYEN);
        $("select[name=TK_LOAI]").val(taikhoan.TK_LOAI);
      });
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//Update hieu luc
function UpdateHieuLuc(a) {
  var tk_id = a;
  var tk_hieuluc;
  var ckHieuLuc = "ckHieuLuc[" + tk_id + "]";
  var c = document.getElementById(ckHieuLuc);

  if (c.checked == true) {
    tk_hieuluc = 1;
  } else {
    tk_hieuluc = 0;
  }

  $.ajax({
    url: "/taikhoan/update-hieuluc/" + tk_id,
    method: "POST",
    data: JSON.stringify({ TK_ID: tk_id, TK_HIEULUC: tk_hieuluc }),
    contentType: "application/json",
    success: function() {
      alert("Đã cập nhật thành công hiệu lực tài khoản: " + tk_id);
      LoadView();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

//Delete
function Delete(a) {
  var tk_id = a;
  var ans = confirm("Bạn có muốn xóa tài khoản: " + tk_id + "?");
  var r = "";
  if (ans == true) {
    $.ajax({
      url: "/taikhoan/delete/" + tk_id,
      method: "POST",
      data: JSON.stringify({ TK_ID: tk_id }),
      contentType: "application/json",
      success: function(res) {
        if (res == "fk") {
          alert("Không thể xóa tài khoản vì có vi phạm, mượn trả hoặc báo hư hỏng!");
        } else if (res == "ok") {
          alert("Đã xóa tài khoản: " + tk_id);
        }
        LoadView();
      },
      error: function(res) {
        alert("Đã có lỗi xảy ra!");
      }
    });
  }
}

// Update thong tin
function UpdateInfo() {
  var tk_id = $("#txtTK_ID_update").val();
  var tk_hoten = $("#txtTK_HoTen_update").val();
  var tk_donvi = $("#slTK_DonVi_update").val();
  var tk_quyen = $("#slTK_Quyen_update").val();
  var tk_loai = $("#slTK_Loai_update").val();
  $.ajax({
    url: "/taikhoan/update/" + tk_id,
    method: "POST",
    data: JSON.stringify({
      TK_ID: tk_id,
      TK_HOTEN: tk_hoten,
      TK_DONVI: tk_donvi,
      TK_QUYEN: tk_quyen,
      TK_LOAI: tk_loai
    }),
    contentType: "application/json",
    success: function() {
      alert("Đã cập nhật thành công thông tin tài khoản: " + tk_id);
      LoadView();
      $("#btnCancelUpdate").click();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

//Get tat ca tai khoan
function GetAllTK() {
  $.ajax({
    method: "GET",
    url: "/taikhoan/all",
    contenType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#tb");
      tb.html("");
      tk_data = "";

      if ($.fn.DataTable.isDataTable("#tableTK")) {
        $("#tableTK")
          .DataTable()
          .destroy();
      }
      $("#tableTK tbody").empty();

      $.each(response, function(i, tk) {
        tk_data += `<tr>
                      <td> ${tk.TK_ID}</td>
                      <td> ${tk.TK_HOTEN}</td>
                      <td> ${tk.TK_DONVI}</td>
                      <td> ${tk.TK_LOAI}</td>
                      <td>
                        <div class="custom-control custom-switch">
                  `;

        if (tk.TK_HIEULUC == 1) {
          tk_data += `<input
                        type="checkbox"
                        class="custom-control-input"
                        checked="true"
                        id="ckHieuLuc[${tk.TK_ID}]"
                        onclick="UpdateHieuLuc('${tk.TK_ID}')"
                        name= "TK_HIEULUC"
                      />`;
        } else {
          tk_data += `<input
                        type="checkbox"
                        class="custom-control-input"
                        id="ckHieuLuc[${tk.TK_ID}]"
                        onclick="UpdateHieuLuc('${tk.TK_ID}')"
                        name= "TK_HIEULUC"
                      />`;
        }
        tk_data += `<label class="custom-control-label" for="ckHieuLuc[${tk.TK_ID}]"></label>
                        </div>
                      </td>
                      <td class="">
                      <i class="fa fa-edit fa-lg" data-toggle="modal" data-target="#EditTK" title="Cập nhật" onclick="UpdateModal('${tk.TK_ID}')" >
                      </i>
                      <i class="fa fa-trash fa-lg" title="Xóa" onclick="Delete('${tk.TK_ID}')" >
                      </i>
                    </td>
                      
                      `;
        tk_data += `
                      <td>
                      <button data-toggle="modal" data-target="#ThongKeTK-MuonTra" class="btn btn-outline-dark btn-sm" onclick="TK_MuonTra('${
                        tk.TK_ID
                      }')">
                        Mượn-trả
                      </button>
                      <button data-toggle="modal" data-target="#ThongKeTK-ViPham" class="btn btn-outline-dark btn-sm" onclick="TK_ViPham('${
                        tk.TK_ID
                      }')">
                        Vi phạm
                      </button>
                      <button data-toggle="modal" data-target="#ThongKeTK-HuHong" class="btn btn-outline-dark btn-sm"  onclick="TK_HuHong('${
                        tk.TK_ID
                      }')">
                        Hư hỏng
                      </button>
                      </td>
                      
                    </tr>
                  `;
      });
      tb.append(tk_data);
      LoadDataTable();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

//Get tai khoan con hieu luc
function GetTKConHieuLuc() {
  $.ajax({
    method: "GET",
    url: "/taikhoan/conhieuluc",
    contenType: "application/json",
    success: function(response) {
      console.log(response);
      JSON.stringify(response);
      var tb = $("#tb");
      tb.html("");
      tk_data = "";

      if ($.fn.DataTable.isDataTable("#tableTK")) {
        $("#tableTK")
          .DataTable()
          .destroy();
      }
      $("#tableTK tbody").empty();

      $.each(response, function(i, tk) {
        tk_data += `<tr>
                      <td> ${tk.TK_ID}</td>
                      <td> ${tk.TK_HOTEN}</td>
                      <td> ${tk.TK_DONVI}</td>
                      <td> ${tk.TK_LOAI}</td>
                      <td>
                        <div class="custom-control custom-switch">
                  `;

        if (tk.TK_HIEULUC == 1) {
          tk_data += `<input
                        type="checkbox"
                        class="custom-control-input"
                        checked="true"
                        id="ckHieuLuc[${tk.TK_ID}]"
                        onclick="UpdateHieuLuc('${tk.TK_ID}')"
                        name= "TK_HIEULUC"
                      />`;
        } else {
          tk_data += `<input
                        type="checkbox"
                        class="custom-control-input"
                        id="ckHieuLuc[${tk.TK_ID}]"
                        onclick="UpdateHieuLuc('${tk.TK_ID}')"
                        name= "TK_HIEULUC"
                      />`;
        }
        tk_data += `<label class="custom-control-label" for="ckHieuLuc[${tk.TK_ID}]"></label>
                        </div>
                      </td>
                      <td class="">
                      <i class="fa fa-edit fa-lg" data-toggle="modal" data-target="#EditTK" title="Cập nhật" onclick="UpdateModal('${tk.TK_ID}')" >
                      </i>
                      <i class="fa fa-trash fa-lg" title="Xóa" onclick="Delete('${tk.TK_ID}')" >
                      </i>
                    </td>
                      
                      `;
        tk_data += `
                      <td>
                      <button data-toggle="modal" data-target="#ThongKeTK-MuonTra" class="btn btn-outline-dark btn-sm" onclick="TK_MuonTra('${
                        tk.TK_ID
                      }')">
                        Mượn-trả
                      </button>
                      <button data-toggle="modal" data-target="#ThongKeTK-ViPham" class="btn btn-outline-dark btn-sm" onclick="TK_ViPham('${
                        tk.TK_ID
                      }')">
                        Vi phạm
                      </button>
                      <button data-toggle="modal" data-target="#ThongKeTK-HuHong" class="btn btn-outline-dark btn-sm"  onclick="TK_HuHong('${
                        tk.TK_ID
                      }')">
                        Hư hỏng
                      </button>
                      </td>
                      
                    </tr>
                  `;
      });

      tb.append(tk_data);
      LoadDataTable();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

//Get tai khoan khong con hieu luc
function GetTKVoHieuLuc() {
  $.ajax({
    method: "GET",
    url: "/taikhoan/vohieuluc",
    contenType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#tb");
      tb.html("");
      tk_data = "";

      if ($.fn.DataTable.isDataTable("#tableTK")) {
        $("#tableTK")
          .DataTable()
          .destroy();
      }
      $("#tableTK tbody").empty();

      $.each(response, function(i, tk) {
        tk_data += `<tr>
                      <td> ${tk.TK_ID}</td>
                      <td> ${tk.TK_HOTEN}</td>
                      <td> ${tk.TK_DONVI}</td>
                      <td> ${tk.TK_LOAI}</td>
                      <td>
                        <div class="custom-control custom-switch">
                  `;

        if (tk.TK_HIEULUC == 1) {
          tk_data += `<input
                        type="checkbox"
                        class="custom-control-input"
                        checked="true"
                        id="ckHieuLuc[${tk.TK_ID}]"
                        onclick="UpdateHieuLuc('${tk.TK_ID}')"
                        name= "TK_HIEULUC"
                      />`;
        } else {
          tk_data += `<input
                        type="checkbox"
                        class="custom-control-input"
                        id="ckHieuLuc[${tk.TK_ID}]"
                        onclick="UpdateHieuLuc('${tk.TK_ID}')"
                        name= "TK_HIEULUC"
                      />`;
        }
        tk_data += `<label class="custom-control-label" for="ckHieuLuc[${tk.TK_ID}]"></label>
                        </div>
                      </td>
                      <td class="">
                      <i class="fa fa-edit fa-lg" data-toggle="modal" data-target="#EditTK" title="Cập nhật" onclick="UpdateModal('${tk.TK_ID}')" >
                      </i>
                      <i class="fa fa-trash fa-lg" title="Xóa" onclick="Delete('${tk.TK_ID}')" >
                      </i>
                    </td>
                      
                      `;
        tk_data += `
                      <td>
                      <button data-toggle="modal" data-target="#ThongKeTK-MuonTra" class="btn btn-outline-dark btn-sm" onclick="TK_MuonTra('${
                        tk.TK_ID
                      }')">
                        Mượn-trả
                      </button>
                      <button data-toggle="modal" data-target="#ThongKeTK-ViPham" class="btn btn-outline-dark btn-sm" onclick="TK_ViPham('${
                        tk.TK_ID
                      }')">
                        Vi phạm
                      </button>
                      <button data-toggle="modal" data-target="#ThongKeTK-HuHong" class="btn btn-outline-dark btn-sm"  onclick="TK_HuHong('${
                        tk.TK_ID
                      }')">
                        Hư hỏng
                      </button>
                      </td>
                      
                    </tr>
                  `;
      });
      tb.append(tk_data);
      LoadDataTable();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

//Thong ke TK - MuonTra
function TK_MuonTra(a) {
  var tk_id = a;
  var sl = 0;
  $.ajax({
    type: "GET",
    url: "/muontra/" + tk_id,
    data: JSON.stringify({ TK_ID: tk_id }),
    contentType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#TK_MuonTra");
      tb.html("");
      tk_data = "";
      $.each(response, function(i, tk) {
        tk_data += `<tr>
          <td>${tk.MUONTRA_ID}</td>
          <td>${tk.xeXEID}</td>
          <td>${tk.MUON_THOIGIAN}</td>
          <td>${tk.TRA_THOIGIAN}</td>
        </tr>`;
        sl++;
      });
      tb.append(tk_data);
      document.getElementById("thongke-muontra").innerHTML = "Số lượt mượn trả: " + sl;
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//Thong ke TK - ViPham
function TK_ViPham(a) {
  var tk_id = a;
  var sl = 0;
  $.ajax({
    type: "GET",
    url: "/vipham/taikhoan/" + tk_id,
    data: JSON.stringify({ TK_ID: tk_id }),
    contentType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#TK_ViPham");
      tb.html("");
      tk_data = "";
      $.each(response, function(i, tk) {
        tk_data += `<tr>
          <td>${tk.VP_ID}</td>
          <td>${tk.muontraMUONTRAID}</td>
          <td id="id_loi[${tk.VP_ID}]"></td>
          <td>${tk.VP_THOIGIAN}</td>
        <\tr>`;
        $.ajax({
          url: "/loi/" + tk.loiLOIID,
          data: JSON.stringify({ LOI_ID: tk.loiLOIID }),
          method: "GET",
          contentType: "application/json",
          success: function(response) {
            console.log(response.LOI_TEN);
            tenloi = response.LOI_TEN;
            var loi_id = "id_loi[" + tk.VP_ID + "]";
            document.getElementById(loi_id).innerHTML = response.LOI_TEN;
          },
          error: function(e) {
            alert("Đã có lỗi xảy ra!");
            console.log(e);
          }
        });

        sl++;
      });
      tb.append(tk_data);
      document.getElementById("thongke-vipham").innerHTML = "Số lượt vi phạm: " + sl;
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//Thong ke TK - HuHong
function TK_HuHong(a) {
  var tk_id = a;
  var sl = 0;
  $.ajax({
    type: "GET",
    url: "/huhong/taikhoan/" + tk_id,
    data: JSON.stringify({ TK_ID: tk_id }),
    contentType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#TK_HuHong");
      tb.html("");
      tk_data = "";
      $.each(response, function(i, tk) {
        sl++;
        tk_data += `<tr>
          <td>${tk.HH_ID}</td>
          <td>${tk.xeXEID}</td>
          <td>${tk.HH_MOTA}</td>
          <td>${tk.HH_THOIGIAN}</td>
        </tr>`;
      });
      tb.append(tk_data);
      document.getElementById("thongke-huhong").innerHTML = "Số lượt hư hỏng: " + sl;
    },
    error: function(e) {
      console.log(e);
    }
  });
}
//Reset data modal cap nhat MK
function ResetModalMK() {
  $("#txtTK_ID_editMK").val("");
  $("#txtTK_PASSWORD_editMK").val("");
}

//Cap nhat MK
function EditMK() {
  var tk_id = $("#txtTK_ID_editMK").val();
  var tk_password = $("#txtTK_PASSWORD_editMK").val();
  $.ajax({
    url: "/taikhoan/updateMK/" + tk_id,
    method: "POST",
    data: JSON.stringify({
      TK_ID: tk_id,
      TK_PASSWORD: tk_password
    }),
    contentType: "application/json",
    success: function() {
      alert("Đã cập nhật thành công mật khẩu tài khoản: " + tk_id);
      LoadView();
      $("#btnCancelEditMK").click();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

//Load View
function LoadView() {
  var view = document.getElementById("slTK_View").value;
  if (view == 1) {
    GetTKConHieuLuc();
  } else if (view == 2) {
    GetAllTK();
  } else if (view == 0) {
    GetTKVoHieuLuc();
  }
}

//Load table
function LoadDataTable() {
  table = $("#tableTK").DataTable({
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

    lengthMenu: [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Tất cả"]]
  });
}
