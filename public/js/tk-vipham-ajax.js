// //tao datetime picker
// $(function() {
//   $("#tungay")
//     .datepicker({
//       autoclose: true,
//       todayHighlight: true
//     })
//     .datepicker("update", new Date());
//   $("#denngay")
//     .datepicker({
//       autoclose: true,
//       todayHighlight: true
//     })
//     .datepicker("update", new Date());
// });

// //Load table
// function LoadDataTableTK() {
//   table = $("#tbTKVP").DataTable({
//     stateSave: true,
//     // columnDefs: [{ targets: [1, 2, 3], searchable: false }],
//     ordering: false,
//     language: {
//       lengthMenu: "Hiển thị _MENU_ dòng dữ liệu trên một trang:",
//       info: "Hiển thị _START_ trong tổng số _TOTAL_ dòng dữ liệu:",
//       infoEmpty: "Dữ liệu rỗng",
//       emptyTable: "Chưa có dữ liệu nào ",
//       processing: "Đang xử lý ",
//       search: "Tìm kiếm: ",
//       loadingRecords: "Đang load dữ liệu",
//       zeroRecords: "Không tìm thấy dữ liệu",
//       infoFiltered: "(Được từ tổng số _MAX_ dòng dữ liệu",
//       paginate: {
//         first: "|<",
//         last: ">|",
//         next: "Sau",
//         previous: "Trước"
//       }
//     },
//     lengthMenu: [[5, 10, 15, 20, 25, -1], [5, 10, 15, 20, 25, "Tất cả"]]
//   });
// }

// function ThongKeViPham() {
//   var tungay =
//     $("#tungay")
//       .find("input")
//       .val() + " 00:00:00";
//   var denngay =
//     $("#denngay")
//       .find("input")
//       .val() + " 23:59:59";

//   $.ajax({
//     method: "POST",
//     url: "/tk-vipham",
//     contentType: "application/json",
//     data: JSON.stringify({ tungay: tungay, denngay: denngay }),
//     success: function(response) {
//       var tb = $("#tb");
//       tb.html("");
//       vipham_data = "";

//       if ($.fn.DataTable.isDataTable("#tbTKVP")) {
//         $("#tbTKVP")
//           .DataTable()
//           .destroy();
//       }
//       $("#tbTKVP tbody").empty();

//       $.each(response, function(i, vipham) {
//         vipham_data += `<tr>
//                             <td>${vipham.VP_ID}</td>
//                             <td class="chitiet">
//                               <a onclick="Load_ChiTietMuonTra('${vipham.muontraMUONTRAID}')" data-toggle="modal" data-target="#ChiTietMuonTra">
//                                 ${vipham.muontraMUONTRAID}
//                               </a>
//                             </td>
//                             <td id="loi[${i}]"></td>
//                             <td>${vipham.VP_THOIGIAN}</td>
//                           `;
//         if (vipham.VP_TRANGTHAI == 0) {
//           vipham_data += `<td>
//                                           <select
//                                             id="slVP_TrangThai['${vipham.VP_ID}']"
//                                             class="form-control form-control-sm"
//                                             onchange="UpdateTrangThaiViPham('${vipham.VP_ID}')"
//                                           >
//                                               <option value=0 selected=true >Chưa xử lý</option>
//                                               <option value=1 >Đã xử lý</option>
//                                           </select>
//                                         </td>
//                                         `;
//         } else if (vipham.VP_TRANGTHAI == 1) {
//           vipham_data += `<td>
//                                           <select
//                                             id="slVP_TrangThai['${vipham.VP_ID}']"
//                                             class="form-control form-control-sm"
//                                             onchange="UpdateTrangThaiViPham('${vipham.VP_ID}')"
//                                           >
//                                               <option value=0>Chưa xử lý</option>
//                                               <option value=1 selected=true >Đã xử lý</option>
//                                           </select>
//                                         </td>
//                                         `;
//         }

//         vipham_data += `<td>
//                           <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietViPham" onclick="ChiTietViPham('${
//                             vipham.VP_ID
//                           }')">
//                           </i>
//                         </td>
//                       </tr>`;
//         $.ajax({
//           url: "/loi/" + vipham.loiLOIID,
//           data: JSON.stringify({ LOI_ID: vipham.loiLOIID }),
//           method: "GET",
//           contentType: "application/json",
//           success: function(response) {
//             console.log(response.LOI_TEN);
//             var loi_id = "loi[" + i + "]";
//             document.getElementById(loi_id).innerHTML = response.LOI_TEN;
//           },
//           error: function(e) {
//             alert("Đã có lỗi xảy ra!");
//             console.log(e);
//           }
//         });
//       });
//       tb.append(vipham_data);
//       LoadDataTableTK();
//     }
//   });
// }
// function ChiTietViPham(a) {
//   var mt_id = a;
//   $.ajax({
//     type: "GET",
//     url: "/vipham/chitiet/" + mt_id,
//     // data: JSON.stringify({ VP_ID: vp_id }),
//     contentType: "application/json",
//     success: function(vp) {
//       var tb = $("#tbCTVP");
//       tb.html("");
//       vp_data = "";
//       console.log(vp);
//       vp_data += `<tr>
//                       <td>ID vi phạm</td>
//                       <td>${vp.VP_ID}</td>
//                     </tr>
//                     <tr>
//                       <td>ID mượn trả</td>
//                       <td>${vp.muontraMUONTRAID}</td>
//                     </tr>
//                     <tr>
//                       <td>ID người dùng</td>
//                       <td>${vp.muontra.taikhoanTKID}</td>
//                     </tr>
//                     <tr>
//                       <td>Xe vi phạm</td>
//                       <td>${vp.muontra.xeXEID}</td>
//                     </tr>
//                     <tr>
//                       <td>Tên lỗi</td>
//                       <td id="id_loi[${vp.loiLOIID}]"></td>
//                     </tr>
//                     <tr>
//                       <td>Thời gian vi phạm</td>
//                       <td>${vp.VP_THOIGIAN}</td>
//                     </tr>
//                     <tr>
//                       <td>Vị trí vi phạm</td>
//                       <td>${vp.VP_LAT}, ${vp.VP_LNG}</td>
//                     </tr>
//                     `;
//       $.ajax({
//         url: "/loi/" + vp.loiLOIID,
//         data: JSON.stringify({ LOI_ID: vp.loiLOIID }),
//         method: "GET",
//         contentType: "application/json",
//         success: function(response) {
//           console.log(response.LOI_TEN);
//           var loi_id = "id_loi[" + response.LOI_ID + "]";
//           document.getElementById(loi_id).innerHTML = response.LOI_TEN;
//         },
//         error: function(e) {
//           alert("Đã có lỗi xảy ra!");
//           console.log(e);
//         }
//       });
//       tb.append(vp_data);
//       MapVP(vp.VP_LAT, vp.VP_LNG);
//       GetAndDraw();
//     },
//     error: function(e) {
//       console.log(e);
//     }
//   });
// }

// function a() {
//   var b = $("#tungay")
//     .find("input")
//     .val();
//   alert(b);
// }
