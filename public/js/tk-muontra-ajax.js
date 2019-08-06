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
  table = $("#tbTKMT").DataTable({
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

function ThongKeMuonTra() {
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
    url: "/tk-muontra",
    contentType: "application/json",
    data: JSON.stringify({ tungay: tungay, denngay: denngay }),
    success: function(response) {
      var tb = $("#tb");
      tb.html("");
      mt_data = "";

      if ($.fn.DataTable.isDataTable("#tbTKMT")) {
        $("#tbTKMT")
          .DataTable()
          .destroy();
      }
      $("#tbTKMT tbody").empty();

      $.each(response, function(i, mt) {
        console.log(response);
        mt_data += `<tr>
                      <td>${mt.MUONTRA_ID}</td>
                      <td class="chitiet">
                        <a onclick="LoadTK('${mt.taikhoanTKID}')" data-toggle="modal" data-target="#ChiTietTK">
                          ${mt.taikhoanTKID}  
                        </a>
                      </td>
                      <td>${mt.xeXEID}</td>
                      <td>${formatDate(mt.MUON_THOIGIAN)}</td>
                      <td>${formatDate(mt.TRA_THOIGIAN)}</td>
                      <td>
                       <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietMuonTra" onclick="ChiTietMuonTra('${
                         mt.MUONTRA_ID
                       }')"></i>
                      </td>
                    </tr>`;
      });
      tb.append(mt_data);
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
