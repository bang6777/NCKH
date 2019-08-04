//tao datetime picker
$(function() {
  $("#tungay")
    .datepicker({
      autoclose: true,
      todayHighlight: true
    })
    .datepicker("update", new Date());
  $("#denngay")
    .datepicker({
      autoclose: true,
      todayHighlight: true
    })
    .datepicker("update", new Date());
});

//Load table
function LoadDataTableTK() {
  table = $("#tbTKHH").DataTable({
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
    lengthMenu: [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Tất cả"]]
  });
}

function ThongKeHuHong() {
  var tungay =
    $("#tungay")
      .find("input")
      .val() + " 00:00:00";
  var denngay =
    $("#denngay")
      .find("input")
      .val() + " 23:59:59";

  $.ajax({
    method: "POST",
    url: "/tk-huhong",
    contentType: "application/json",
    data: JSON.stringify({ tungay: tungay, denngay: denngay }),
    success: function(response) {
      var tb = $("#tb");
      tb.html("");
      huhong_data = "";

      if ($.fn.DataTable.isDataTable("#tbTKHH")) {
        $("#tbTKHH")
          .DataTable()
          .destroy();
      }
      $("#tbTKHH tbody").empty();

      $.each(response, function(i, huhong) {
        huhong_data += `<tr>
        <td>${huhong.HH_ID}</td>
                            <td class="chitiet">
                            <a onclick="LoadTK('${huhong.taikhoanTKID}')" data-toggle="modal" data-target="#ChiTietTK">
                            ${huhong.taikhoanTKID} </a>
                            </td>
                            
                            <td>${huhong.xeXEID}</td>
                            <td>${huhong.HH_MOTA}</td>
                            <td>${huhong.HH_THOIGIAN}</td>
                      `;
        switch (huhong.HH_TRANGTHAI) {
          case 0: {
            huhong_data += `<td>Đang chờ</td>`;
            break;
          }
          case 1: {
            huhong_data += `<td>Đang sửa</td>`;
            break;
          }
          case 2: {
            huhong_data += `<td>Đã sửa</td>`;
            break;
          }
          case 3: {
            huhong_data += `<td>Báo sai</td>`;
            break;
          }
        }
        huhong_data += `</tr>`;
      });
      tb.append(huhong_data);
      LoadDataTableTK();
    }
  });
}

function a() {
  var b = $("#tungay")
    .find("input")
    .val();
  alert(b);
}
