function GetAllHuHong() {
  $.ajax({
    method: "GET",
    url: "/huhong/all",
    contenType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#tb");
      tb.html("");
      huhong_data = "";

      if ($.fn.DataTable.isDataTable("#tbHuHong")) {
        $("#tbHuHong")
          .DataTable()
          .destroy();
      }
      $("#tbHuHong tbody").empty();

      $.each(response, function(i, huhong) {
        huhong_data += `<tr>
        <td>${huhong.HH_ID}</td>
                            <td class="chitiet">
                            <a onclick="LoadTK('${huhong.taikhoanTKID}')" data-toggle="modal" data-target="#ChiTietTK">
                            ${huhong.taikhoanTKID} </a>
                            </td>
                            
                            <td>${huhong.xeXEID}</td>
                            <td>${huhong.HH_MOTA}`;
        if (
          huhong.HH_MOTA == "Không khóa được xe" ||
          huhong.HH_MOTA == "Không mở được ổ khóa" ||
          huhong.HH_MOTA == "Đã khóa xe nhưng không cập nhật trên điện thoại"
        ) {
          huhong_data += `<i class="fa fa-check-square fa-lg mx-3" title="Kết thúc mượn trả" onclick="KetThucMuonTra('${huhong.taikhoanTKID}')" >
          </i></td>`;
        }
        huhong_data += `<td>${formatDate(huhong.HH_THOIGIAN)}</td>`;
        switch (huhong.HH_TRANGTHAI) {
          case 0: {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                    >
                        <option value="0" selected=true>Đang chờ</option>
                        <option value="1" >Đang sửa</option>
                        <option value="2">Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case 1: {
            huhong_data += `<td>
                <select
                id="slHH_TrangThai['${huhong.HH_ID}']"
                class="form-control form-control-sm"
                onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                >
                    <option value="0" >Đang chờ</option>
                    <option value="1" selected=true>Đang sửa</option>
                    <option value="2">Đã sửa</option>
                    <option value="3">Báo sai</option>
            </select>
          </td>`;
            break;
          }
          case 2: {
            huhong_data += `<td>
                <select
                id="slHH_TrangThai['${huhong.HH_ID}']"
                class="form-control form-control-sm"
                onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                >
                    <option value="0" >Đang chờ</option>
                    <option value="1" >Đang sửa</option>
                    <option value="2" selected=true>Đã sửa</option>
                    <option value="3">Báo sai</option>
            </select>
          </td>`;
            break;
          }
          case 3: {
            huhong_data += `<td>
                <select
                id="slHH_TrangThai['${huhong.HH_ID}']"
                class="form-control form-control-sm"
                onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                >
                    <option value="0" >Đang chờ</option>
                    <option value="1" >Đang sửa</option>
                    <option value="2" >Đã sửa</option>
                    <option value="3" selected=true>Báo sai</option>
            </select>
          </td>`;
            break;
          }
        }
        huhong_data += `</tr>`;
      });
      tb.append(huhong_data);
      LoadDataTable();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

function GetHHDangCho() {
  $.ajax({
    method: "GET",
    url: "/huhong/huhongdangcho",
    contenType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#tb");
      tb.html("");
      huhong_data = "";

      if ($.fn.DataTable.isDataTable("#tbHuHong")) {
        $("#tbHuHong")
          .DataTable()
          .destroy();
      }
      $("#tbHuHong tbody").empty();

      $.each(response, function(i, huhong) {
        huhong_data += `<tr>
        <td>${huhong.HH_ID}</td>
                            <td class="chitiet">
                            <a onclick="LoadTK('${huhong.taikhoanTKID}')" data-toggle="modal" data-target="#ChiTietTK">
                            ${huhong.taikhoanTKID} </a>
                            </td>
                            
                            <td>${huhong.xeXEID}</td>
                            <<td>${huhong.HH_MOTA}`;
        if (
          huhong.HH_MOTA == "Không khóa được xe" ||
          huhong.HH_MOTA == "Không mở được ổ khóa" ||
          huhong.HH_MOTA == "Đã khóa xe nhưng không cập nhật trên điện thoại"
        ) {
          huhong_data += `<i class="fa fa-check-square fa-lg mx-3" title="Kết thúc mượn trả" onclick="KetThucMuonTra('${huhong.taikhoanTKID}')" >
                              </i></td>`;
        }
        huhong_data += `<td>${formatDate(huhong.HH_THOIGIAN)}</td>`;
        switch (huhong.HH_TRANGTHAI) {
          case 0: {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                    >
                        <option value="0" selected=true>Đang chờ</option>
                        <option value="1" >Đang sửa</option>
                        <option value="2">Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case 1: {
            huhong_data += `<td>
                <select
                id="slHH_TrangThai['${huhong.HH_ID}']"
                class="form-control form-control-sm"
                onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                >
                    <option value="0" >Đang chờ</option>
                    <option value="1" selected=true>Đang sửa</option>
                    <option value="2">Đã sửa</option>
                    <option value="3">Báo sai</option>
            </select>
          </td>`;
            break;
          }
          case 2: {
            huhong_data += `<td>
                <select
                id="slHH_TrangThai['${huhong.HH_ID}']"
                class="form-control form-control-sm"
                onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                >
                    <option value="0" >Đang chờ</option>
                    <option value="1" >Đang sửa</option>
                    <option value="2" selected=true>Đã sửa</option>
                    <option value="3">Báo sai</option>
            </select>
          </td>`;
            break;
          }
          case 3: {
            huhong_data += `<td>
                <select
                id="slHH_TrangThai['${huhong.HH_ID}']"
                class="form-control form-control-sm"
                onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                >
                    <option value="0" >Đang chờ</option>
                    <option value="1" >Đang sửa</option>
                    <option value="2" >Đã sửa</option>
                    <option value="3" selected=true>Báo sai</option>
            </select>
          </td>`;
            break;
          }
        }
        huhong_data += `</tr>`;
      });
      tb.append(huhong_data);
      LoadDataTable();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}
function GetHHDangSua() {
  $.ajax({
    method: "GET",
    url: "/huhong/huhongdangsua",
    contenType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#tb");
      tb.html("");
      huhong_data = "";

      if ($.fn.DataTable.isDataTable("#tbHuHong")) {
        $("#tbHuHong")
          .DataTable()
          .destroy();
      }
      $("#tbHuHong tbody").empty();

      $.each(response, function(i, huhong) {
        huhong_data += `<tr>
                                <td>${huhong.HH_ID}</td>
                                <td class="chitiet"><a onclick="LoadTK('${huhong.taikhoanTKID}')" data-toggle="modal" data-target="#ChiTietTK">
                                ${huhong.taikhoanTKID} </a></td>
                                <td>${huhong.xeXEID}</td>
                                <td>${huhong.HH_MOTA}`;
        if (
          huhong.HH_MOTA == "Không khóa được xe" ||
          huhong.HH_MOTA == "Không mở được ổ khóa" ||
          huhong.HH_MOTA == "Đã khóa xe nhưng không cập nhật trên điện thoại"
        ) {
          huhong_data += `<i class="fa fa-check-square fa-lg mx-3" title="Kết thúc mượn trả" onclick="KetThucMuonTra('${huhong.taikhoanTKID}')" >
          </i></td>`;
        }
        huhong_data += `<td>${formatDate(huhong.HH_THOIGIAN)}</td>`;
        switch (huhong.HH_TRANGTHAI) {
          case 0: {
            huhong_data += `<td>
                        <select
                        id="slHH_TrangThai['${huhong.HH_ID}']"
                        class="form-control form-control-sm"
                        onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                        >
                            <option value="0" selected=true>Đang chờ</option>
                            <option value="1" >Đang sửa</option>
                            <option value="2">Đã sửa</option>
                            <option value="3">Báo sai</option>
                    </select>
                  </td>`;
            break;
          }
          case 1: {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" selected=true>Đang sửa</option>
                        <option value="2">Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case 2: {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" >Đang sửa</option>
                        <option value="2" selected=true>Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case 3: {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" >Đang sửa</option>
                        <option value="2" >Đã sửa</option>
                        <option value="3" selected=true>Báo sai</option>
                </select>
              </td>`;
            break;
          }
        }
        huhong_data += `</tr>`;
      });
      tb.append(huhong_data);
      LoadDataTable();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

function GetHHDaSua() {
  $.ajax({
    method: "GET",
    url: "/huhong/huhongdasua",
    contenType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#tb");
      tb.html("");
      huhong_data = "";

      if ($.fn.DataTable.isDataTable("#tbHuHong")) {
        $("#tbHuHong")
          .DataTable()
          .destroy();
      }
      $("#tbHuHong tbody").empty();

      $.each(response, function(i, huhong) {
        huhong_data += `<tr>
                                <td>${huhong.HH_ID}</td>
                                <td class="chitiet"><a onclick="LoadTK('${huhong.taikhoanTKID}')" data-toggle="modal" data-target="#ChiTietTK">
                                ${huhong.taikhoanTKID} </a></td>
                                <td>${huhong.xeXEID}</td>
                                <td>${huhong.HH_MOTA}`;
        if (
          huhong.HH_MOTA == "Không khóa được xe" ||
          huhong.HH_MOTA == "Không mở được ổ khóa" ||
          huhong.HH_MOTA == "Đã khóa xe nhưng không cập nhật trên điện thoại"
        ) {
          huhong_data += `<i class="fa fa-check-square fa-lg mx-3" title="Kết thúc mượn trả" onclick="KetThucMuonTra('${huhong.taikhoanTKID}')" >
          </i></td>`;
        }
        huhong_data += `<td>${formatDate(huhong.HH_THOIGIAN)}</td>`;
        switch (huhong.HH_TRANGTHAI) {
          case 0: {
            huhong_data += `<td>
                        <select
                        id="slHH_TrangThai['${huhong.HH_ID}']"
                        class="form-control form-control-sm"
                        onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                        >
                            <option value="0" selected=true>Đang chờ</option>
                            <option value="1" >Đang sửa</option>
                            <option value="2">Đã sửa</option>
                            <option value="3">Báo sai</option>
                    </select>
                  </td>`;
            break;
          }
          case 1: {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" selected=true>Đang sửa</option>
                        <option value="2">Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case 2: {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" >Đang sửa</option>
                        <option value="2" selected=true>Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case 3: {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" >Đang sửa</option>
                        <option value="2" >Đã sửa</option>
                        <option value="3" selected=true>Báo sai</option>
                </select>
              </td>`;
            break;
          }
        }
        huhong_data += `</tr>`;
      });
      tb.append(huhong_data);
      LoadDataTable();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

function GetHHBaoSai() {
  $.ajax({
    method: "GET",
    url: "/huhong/huhongbaosai",
    contenType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#tb");
      tb.html("");
      huhong_data = "";

      if ($.fn.DataTable.isDataTable("#tbHuHong")) {
        $("#tbHuHong")
          .DataTable()
          .destroy();
      }
      $("#tbHuHong tbody").empty();

      $.each(response, function(i, huhong) {
        huhong_data += `<tr>
                                <td>${huhong.HH_ID}</td>
                                <td class="chitiet"><a onclick="LoadTK('${huhong.taikhoanTKID}')" data-toggle="modal" data-target="#ChiTietTK">
                                ${huhong.taikhoanTKID} </a></td>
                                <td>${huhong.xeXEID}</td>
                                <<td>${huhong.HH_MOTA}`;
        if (
          huhong.HH_MOTA == "Không khóa được xe" ||
          huhong.HH_MOTA == "Không mở được ổ khóa" ||
          huhong.HH_MOTA == "Đã khóa xe nhưng không cập nhật trên điện thoại"
        ) {
          huhong_data += `<i class="fa fa-check-square fa-lg mx-3" title="Kết thúc mượn trả" onclick="KetThucMuonTra('${huhong.taikhoanTKID}')" >
                                  </i></td>`;
        }
        huhong_data += `<td>${formatDate(huhong.HH_THOIGIAN)}</td>`;
        switch (huhong.HH_TRANGTHAI) {
          case 0: {
            huhong_data += `<td>
                        <select
                        id="slHH_TrangThai['${huhong.HH_ID}']"
                        class="form-control form-control-sm"
                        onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                        >
                            <option value="0" selected=true>Đang chờ</option>
                            <option value="1" >Đang sửa</option>
                            <option value="2">Đã sửa</option>
                            <option value="3">Báo sai</option>
                    </select>
                  </td>`;
            break;
          }
          case 1: {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" selected=true>Đang sửa</option>
                        <option value="2">Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case 2: {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" >Đang sửa</option>
                        <option value="2" selected=true>Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case 3: {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    onchange="UpdateTrangThaiHuHong('${huhong.HH_ID}')"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" >Đang sửa</option>
                        <option value="2" >Đã sửa</option>
                        <option value="3" selected=true>Báo sai</option>
                </select>
              </td>`;
            break;
          }
        }
        huhong_data += `</tr>`;
      });
      tb.append(huhong_data);
      LoadDataTable();
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}
function LoadView() {
  var view = document.getElementById("slHH_View").value;
  if (view == 0) {
    GetHHDangCho();
  } else if (view == 1) {
    GetHHDangSua();
  } else if (view == 2) {
    GetHHDaSua();
  } else if (view == 3) {
    GetHHBaoSai();
  } else if (view == 4) {
    GetAllHuHong();
  }
}

//Load table
function LoadDataTable() {
  table = $("#tbHuHong").DataTable({
    stateSave: true,
    // columnDefs: [{ targets: [1, 2, 3, 4, 5], searchable: false }],
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

//Update trạng thái hư hỏng
async function UpdateTrangThaiHuHong(a) {
  var hh_id = a;
  var hh_trangthai;
  var hhTrangThai = "slHH_TrangThai['" + hh_id + "']";

  hh_trangthai = document.getElementById(hhTrangThai).value;
  // alert(hh_id);
  $.ajax({
    url: "/huhong/update-trangthai/" + hh_id,
    method: "POST",
    data: JSON.stringify({ HH_ID: hh_id, HH_TRANGTHAI: hh_trangthai }),
    contentType: "application/json",
    success: function() {
      alert("Đã cập nhật thành công trạng thái của hư hỏng: " + hh_id);
      LoadView();

      //cap nhat xe_trangthai = 2 neu hh_trangthai = 1
      if (hh_trangthai == 1) {
        $.ajax({
          type: "POST",
          url: "/huhong/find",
          data: JSON.stringify({ HH_ID: hh_id }),
          contentType: "application/json",
          success: function(response) {
            var xe_id = response.xeXEID;
            $.ajax({
              type: "POST",
              url: "/xe/updateTrangThai",
              data: JSON.stringify({ XE_ID: xe_id, XE_TRANGTHAI: "2" }),
              contentType: "application/json",
              success: function() {
                console.log("Đã cập nhật trạng thái xe = 2");
              },
              error: function(e) {
                console.log(e);
              }
            });
          },
          error: function(e) {
            console.log(e);
          }
        });
      }

      //cap nhat xe_trangthai = 0 neu hh_trangthai = 3
      else if (hh_trangthai == 2) {
        $.ajax({
          type: "POST",
          url: "/huhong/find",
          data: JSON.stringify({ HH_ID: hh_id }),
          contentType: "application/json",
          success: function(response) {
            var xe_id = response.xeXEID;
            $.ajax({
              type: "POST",
              url: "/xe/updateTrangThai",
              data: JSON.stringify({ XE_ID: xe_id, XE_TRANGTHAI: "0" }),
              contentType: "application/json",
              success: function() {
                console.log("Đã cập nhật trạng thái xe = 0");
              },
              error: function(e) {
                console.log(e);
              }
            });
          },
          error: function(e) {
            console.log(e);
          }
        });
      }
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
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

function KetThucMuonTra(tk_id) {
  var ans = confirm("Bạn có muốn kết thúc lượt mượn trả của : " + tk_id + "?");
  if (ans == true) {
    //ket thuc muon tra
    $.ajax({
      type: "PUT",
      url: "/muontra/" + tk_id,
      contentType: "application/json",
      success: function(res) {
        if (res == "no") {
          alert("Lượt mượn trả đã được kết thúc trước đó!");
        } else {
          alert("Kết thúc lượt mượn trả thành công!");
        }
      },
      error: function(e) {
        console.log(e);
        alert("Đã có lỗi xảy ra!");
      }
    });
  }
}
