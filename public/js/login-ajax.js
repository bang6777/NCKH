function Login() {
  var tk_id = $("#TK_ID").val();
  var password = $("#password").val();
  // alert(tk_id + "---" + password);
  if (tk_id == "" || password == "") {
    alert("Vui lòng điền đầy đủ các trường!");
  } else {
    $.ajax({
      url: "/login",
      method: "POST",
      data: JSON.stringify({ TK_ID: tk_id, TK_PASSWORD: password }),
      contentType: "application/json",
      success: function(response) {
        if (response == "ok") {
          alert("Đăng nhập thành công!");
          location.href = "/";
        } else if (response == "err") {
          alert("Sai tài khoản hoặc mật khẩu hoặc bạn không có quyền vào trang web này!");
        }
      },
      error: function() {
        alert("Đã có lỗi xảy ra!");
      }
    });
  }
}
