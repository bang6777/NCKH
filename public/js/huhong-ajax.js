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
      $.each(response, function(i, huhong) {
        huhong_data += `<tr>
                            <td>${huhong.HH_ID}</td>
                            <td>${huhong.TK_ID}</td>
                            <td>${huhong.XE_ID}</td>
                            <td>${huhong.HH_MOTA}</td>
                            <td>${huhong.HH_THOIGIAN}</td>
                      `;
        switch (huhong.HH_TRANGTHAI) {
          case "0": {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    >
                        <option value="0" selected=true>Đang chờ</option>
                        <option value="1" >Đang sửa</option>
                        <option value="2">Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case "1": {
            huhong_data += `<td>
                <select
                id="slHH_TrangThai['${huhong.HH_ID}']"
                class="form-control form-control-sm"
                >
                    <option value="0" >Đang chờ</option>
                    <option value="1" selected=true>Đang sửa</option>
                    <option value="2">Đã sửa</option>
                    <option value="3">Báo sai</option>
            </select>
          </td>`;
            break;
          }
          case "2": {
            huhong_data += `<td>
                <select
                id="slHH_TrangThai['${huhong.HH_ID}']"
                class="form-control form-control-sm"
                >
                    <option value="0" >Đang chờ</option>
                    <option value="1" >Đang sửa</option>
                    <option value="2" selected=true>Đã sửa</option>
                    <option value="3">Báo sai</option>
            </select>
          </td>`;
            break;
          }
          case "3": {
            huhong_data += `<td>
                <select
                id="slHH_TrangThai['${huhong.HH_ID}']"
                class="form-control form-control-sm"
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
      $.each(response, function(i, huhong) {
        huhong_data += `<tr>
                              <td>${huhong.HH_ID}</td>
                              <td>${huhong.TK_ID}</td>
                              <td>${huhong.XE_ID}</td>
                              <td>${huhong.HH_MOTA}</td>
                              <td>${huhong.HH_THOIGIAN}</td>
                        `;
        // if (huhong.HH_TRANGTHAI == 0) {
        //   huhong_data += `<td>
        //               <select
        //               id="slHH_TrangThai['${huhong.HH_ID}']"
        //               class="form-control form-control-sm"
        //               >
        //                   <option value="0" selected=true>Đang chờ</option>
        //                   <option value="1" >Đang sửa</option>
        //                   <option value="2">Đã sửa</option>
        //                   <option value="3">Báo sai</option>
        //           </select>
        //         </td>`;
        // }

        switch (huhong.HH_TRANGTHAI) {
          case "0": {
            huhong_data += `<td>
                      <select
                      id="slHH_TrangThai['${huhong.HH_ID}']"
                      class="form-control form-control-sm"
                      >
                          <option value="0" selected=true>Đang chờ</option>
                          <option value="1" >Đang sửa</option>
                          <option value="2">Đã sửa</option>
                          <option value="3">Báo sai</option>
                  </select>
                </td>`;
            break;
          }
          case "1": {
            huhong_data += `<td>
                  <select
                  id="slHH_TrangThai['${huhong.HH_ID}']"
                  class="form-control form-control-sm"
                  >
                      <option value="0" >Đang chờ</option>
                      <option value="1" selected=true>Đang sửa</option>
                      <option value="2">Đã sửa</option>
                      <option value="3">Báo sai</option>
              </select>
            </td>`;
            break;
          }
          case "2": {
            huhong_data += `<td>
                  <select
                  id="slHH_TrangThai['${huhong.HH_ID}']"
                  class="form-control form-control-sm"
                  >
                      <option value="0" >Đang chờ</option>
                      <option value="1" >Đang sửa</option>
                      <option value="2" selected=true>Đã sửa</option>
                      <option value="3">Báo sai</option>
              </select>
            </td>`;
            break;
          }
          case "3": {
            huhong_data += `<td>
                  <select
                  id="slHH_TrangThai['${huhong.HH_ID}']"
                  class="form-control form-control-sm"
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
      $.each(response, function(i, huhong) {
        huhong_data += `<tr>
                                <td>${huhong.HH_ID}</td>
                                <td>${huhong.TK_ID}</td>
                                <td>${huhong.XE_ID}</td>
                                <td>${huhong.HH_MOTA}</td>
                                <td>${huhong.HH_THOIGIAN}</td>
                          `;
        // if (huhong.HH_TRANGTHAI == 0) {
        //   huhong_data += `<td>
        //               <select
        //               id="slHH_TrangThai['${huhong.HH_ID}']"
        //               class="form-control form-control-sm"
        //               >
        //                   <option value="0" selected=true>Đang chờ</option>
        //                   <option value="1" >Đang sửa</option>
        //                   <option value="2">Đã sửa</option>
        //                   <option value="3">Báo sai</option>
        //           </select>
        //         </td>`;
        // }

        switch (huhong.HH_TRANGTHAI) {
          case "0": {
            huhong_data += `<td>
                        <select
                        id="slHH_TrangThai['${huhong.HH_ID}']"
                        class="form-control form-control-sm"
                        >
                            <option value="0" selected=true>Đang chờ</option>
                            <option value="1" >Đang sửa</option>
                            <option value="2">Đã sửa</option>
                            <option value="3">Báo sai</option>
                    </select>
                  </td>`;
            break;
          }
          case "1": {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" selected=true>Đang sửa</option>
                        <option value="2">Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case "2": {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" >Đang sửa</option>
                        <option value="2" selected=true>Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case "3": {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
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
      $.each(response, function(i, huhong) {
        huhong_data += `<tr>
                                <td>${huhong.HH_ID}</td>
                                <td>${huhong.TK_ID}</td>
                                <td>${huhong.XE_ID}</td>
                                <td>${huhong.HH_MOTA}</td>
                                <td>${huhong.HH_THOIGIAN}</td>
                          `;
        // if (huhong.HH_TRANGTHAI == 0) {
        //   huhong_data += `<td>
        //               <select
        //               id="slHH_TrangThai['${huhong.HH_ID}']"
        //               class="form-control form-control-sm"
        //               >
        //                   <option value="0" selected=true>Đang chờ</option>
        //                   <option value="1" >Đang sửa</option>
        //                   <option value="2">Đã sửa</option>
        //                   <option value="3">Báo sai</option>
        //           </select>
        //         </td>`;
        // }

        switch (huhong.HH_TRANGTHAI) {
          case "0": {
            huhong_data += `<td>
                        <select
                        id="slHH_TrangThai['${huhong.HH_ID}']"
                        class="form-control form-control-sm"
                        >
                            <option value="0" selected=true>Đang chờ</option>
                            <option value="1" >Đang sửa</option>
                            <option value="2">Đã sửa</option>
                            <option value="3">Báo sai</option>
                    </select>
                  </td>`;
            break;
          }
          case "1": {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" selected=true>Đang sửa</option>
                        <option value="2">Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case "2": {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" >Đang sửa</option>
                        <option value="2" selected=true>Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case "3": {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
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
      $.each(response, function(i, huhong) {
        huhong_data += `<tr>
                                <td>${huhong.HH_ID}</td>
                                <td>${huhong.TK_ID}</td>
                                <td>${huhong.XE_ID}</td>
                                <td>${huhong.HH_MOTA}</td>
                                <td>${huhong.HH_THOIGIAN}</td>
                          `;
        // if (huhong.HH_TRANGTHAI == 0) {
        //   huhong_data += `<td>
        //               <select
        //               id="slHH_TrangThai['${huhong.HH_ID}']"
        //               class="form-control form-control-sm"
        //               >
        //                   <option value="0" selected=true>Đang chờ</option>
        //                   <option value="1" >Đang sửa</option>
        //                   <option value="2">Đã sửa</option>
        //                   <option value="3">Báo sai</option>
        //           </select>
        //         </td>`;
        // }

        switch (huhong.HH_TRANGTHAI) {
          case "0": {
            huhong_data += `<td>
                        <select
                        id="slHH_TrangThai['${huhong.HH_ID}']"
                        class="form-control form-control-sm"
                        >
                            <option value="0" selected=true>Đang chờ</option>
                            <option value="1" >Đang sửa</option>
                            <option value="2">Đã sửa</option>
                            <option value="3">Báo sai</option>
                    </select>
                  </td>`;
            break;
          }
          case "1": {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" selected=true>Đang sửa</option>
                        <option value="2">Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case "2": {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
                    >
                        <option value="0" >Đang chờ</option>
                        <option value="1" >Đang sửa</option>
                        <option value="2" selected=true>Đã sửa</option>
                        <option value="3">Báo sai</option>
                </select>
              </td>`;
            break;
          }
          case "3": {
            huhong_data += `<td>
                    <select
                    id="slHH_TrangThai['${huhong.HH_ID}']"
                    class="form-control form-control-sm"
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
  // LoadDataTable();
  //   } else if (view == 2) {
  //     GetAllTK();
  //     // LoadDataTable();
  //   } else if (view == 0) {
  //     GetTKVoHieuLuc();
  //     // LoadDataTable();
  //   }
}
