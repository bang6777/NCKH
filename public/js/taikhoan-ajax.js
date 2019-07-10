// $(document).ready(function() {
//   // GET REQUEST
//   $("input[name=btnTest]").click(function(event) {
//     event.preventDefault();
//     ajaxGet();
//   });
// });

function UpdateModal(a) {
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
        $("input[name=TK_ID]").val(taikhoan.TK_ID);
        $("input[name=TK_HOTEN]").val(taikhoan.TK_HOTEN);
        $("input[name=TK_DONVI]").val(taikhoan.TK_DONVI);
        $("input[name=TK_ID]").val(taikhoan.TK_ID);
        $("select[name=TK_QUYEN]").val(taikhoan.TK_QUYEN);
        $("select[name=TK_LOAI]").val(taikhoan.TK_LOAI);
      });
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//OK
function ajaxGet() {
  tk = $("input[name=TK_ID]").val();
  // alert(tk);
  $.ajax({
    type: "POST",
    url: "/taikhoan/find",
    data: JSON.stringify({ TK_ID: tk }),
    contentType: "application/json",
    success: function(response) {
      var tb = $("#tb");
      tb.html("");
      $.each(response, function(i, taikhoan) {
        console.log(taikhoan);
        tb.append(
          '\
              <tr>\
                <td class="id">' +
            taikhoan.TK_ID +
            "</td>\
                <td>" +
            taikhoan.TK_HOTEN +
            '</td>\
                <td>\
                  <button class="btnUpdate">UPDATE/PUT</button>\
                  <button class="btnDelete">DELETE</button>\
                </td>\
              </tr >\
              '
        );
        $("input[name=TK_ID]").val(taikhoan.TK_ID);
        $("input[name=TK_HOTEN]").val(taikhoan.TK_HOTEN);
        $("input[name=TK_DONVI]").val(taikhoan.TK_DONVI);
        $("input[name=TK_ID]").val(taikhoan.TK_ID);
        $("select[name=TK_QUYEN]").val(taikhoan.TK_QUYEN);
        $("select[name=TK_LOAI]").val(taikhoan.TK_LOAI);
      });
    },
    error: function(e) {
      console.log(e);
    }
  });
}
