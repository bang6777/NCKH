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
  table = $("#tbTKVP").DataTable({
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

function ThongKeViPham() {
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
    url: "/tk-vipham",
    contentType: "application/json",
    data: JSON.stringify({ tungay: tungay, denngay: denngay }),
    success: function(response) {
      var tb = $("#tb");
      tb.html("");
      vipham_data = "";

      if ($.fn.DataTable.isDataTable("#tbTKVP")) {
        $("#tbTKVP")
          .DataTable()
          .destroy();
      }
      $("#tbTKVP tbody").empty();

      $.each(response, function(i, vipham) {
        vipham_data += `<tr>
                            <td>${vipham.VP_ID}</td>
                            <td class="chitiet">
                              <a onclick="Load_ChiTietMuonTra('${vipham.muontraMUONTRAID}')" data-toggle="modal" data-target="#ChiTietMuonTra">
                                ${vipham.muontraMUONTRAID}
                              </a>
                            </td>
                            <td id="loi[${i}]"></td>
                            <td>${formatDate(vipham.VP_THOIGIAN)}</td>
                          `;
        if (vipham.VP_TRANGTHAI == 0) {
          vipham_data += `<td>Chưa xử lý</td>
                                        `;
        } else if (vipham.VP_TRANGTHAI == 1) {
          vipham_data += `<td>Đã xử lý</td>`;
        }

        vipham_data += `<td>
                          <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietViPham" onclick="ChiTietViPham('${
                            vipham.VP_ID
                          }','${vipham.muontraMUONTRAID}')">
                          </i>
                        </td>
                      </tr>`;
        $.ajax({
          url: "/loi/" + vipham.loiLOIID,
          data: JSON.stringify({ LOI_ID: vipham.loiLOIID }),
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
