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

function GetAllViPham() {
  $.ajax({
    method: "GET",
    url: "/vipham/all",
    contenType: "application/json",
    success: function(response) {
      console.log(response);
      var tb = $("#tb");
      tb.html("");
      vipham_data = "";
      $.each(response, function(i, vipham) {
        vipham_data += `<tr>
                            <td>${vipham.VP_ID}</td>
                            <td>${vipham.MUONTRA_ID}</td>
                            <td>${vipham.LOI_ID}</td>
                            <td>${vipham.TK_ID}</td>
                            <td>${vipham.XE_ID}</td>
                            <td>${vipham.VP_THOIGIAN}</td>
                            <td>
                       <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietViPham" onclick="ChiTietViPham('${
                         vipham.VP_ID
                       }')"></i>
                      </td>
                      `;

        vipham_data += `</tr>`;
      });
      tb.append(vipham_data);
    },
    error: function(e) {
      alert("Đã có lỗi xảy ra!");
      console.log(e);
    }
  });
}

// function ChiTietViPham(a) {
//   var vp_id = a;
//   //var vtMuon = "";
//   //var vtTra = "";
//   //loadKhuonVien();

//   $.ajax({
//     type: "POST",
//     url: "/vipham/find",
//     data: JSON.stringify({ VP_ID: vp_id }),
//     contentType: "application/json",
//     success: function(response) {
//       var tb = $("#tbCTVP");
//       tb.html("");
//       vp_data = "";
//       $.each(response, function(i, vp) {
//         console.log(vp);
//         vp_data += `<tr>
//                       <td>ID vi phạm</td>
//                       <td>${vp.VP_ID}</td>
//                     </tr>
//                     <tr>
//                       <td>ID tài khoản</td>
//                       <td>${mt.TK_ID}</td>
//                     </tr>
//                     <tr>
//                       <td>ID xe</td>
//                       <td>${mt.XE_ID}</td>
//                     </tr>
//                     <tr>
//                       <td>Thời gian mượn</td>
//                       <td>${mt.MUON_THOIGIAN}</td>
//                     </tr>
//                     <tr>
//                       <td>Thời gian trả</td>
//                       <td>${mt.TRA_THOIGIAN}</td>
//                     </tr>
//                     <tr>
//                       <td>Vị trí mượn</td>
//                       <td>
//                         <img src="./img/marker-red.png" height="20px" />
//                         ${mt.MUON_VITRI}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Vị trí trả</td>
//                       <td>
//                         <img src="./img/marker-green.png" height="20px" />
//                         ${mt.TRA_VITRI}
//                       </td>
//                     </tr>
//                     `;
//         vtMuon = mt.MUON_VITRI;
//         vtTra = mt.TRA_VITRI;
//       });
//       tb.append(mt_data);
//       MapPosition(vtMuon, vtTra);
//     },
//     error: function(e) {
//       console.log(e);
//     }
//   });
// }
