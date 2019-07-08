$(document).ready(function () {
  // GET REQUEST
  $("#btnAll").click(function (event) {
    event.preventDefault();

    ajaxGet();
  });
});

function ajaxGet() {
  $.ajax({
    type: "GET",
    url: "/taikhoan/all",
    // data: { "taikhoan": taikhoan },
    contentType: "application/json",
    success: function (response) {
      var tb = $("#tb");
      tb.html("");
      tb.append('đá');
      $.each(response, function (i, taikhoan) {

        tb.append(
          '\
              <tr>\
                <td class="id">' + taikhoan.TK_ID + '</td>\
                <td>' + taikhoan.TK_HOTEN + '</td>\
                <td>\
                  <button class="btnUpdate">UPDATE/PUT</button>\
                  <button class="btnDelete">DELETE</button>\
                </td>\
              </tr >\
              '
        );
      })
    },
    error: function (e) {
      console.log(e);
    }
  });
}
