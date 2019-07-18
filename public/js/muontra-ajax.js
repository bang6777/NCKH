//Load thong tin TK
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

//Get tat ca muon tra
function getAllMuonTra() {
  $.ajax({
    method: "GET",
    url: "/muontra/all",
    contentType: "application/json",
    success: function(response) {
      // console.log(response);
      var tb = $("#tb");
      tb.html("");
      mt_data = "";

      $.each(response, function(i, mt) {
        console.log(response);
        mt_data += `<tr>
                      <td>${i + 1}</td>
                      <td class="chitiet">
                        <a onclick="LoadTK('${mt.TK_ID}')" data-toggle="modal" data-target="#ChiTietTK">
                          ${mt.TK_ID}  
                        </a>
                      </td>
                      <td>${mt.XE_ID}</td>
                      <td>${mt.MUON_THOIGIAN}</td>
                      <td>${mt.TRA_THOIGIAN}</td>
                      <td>
                       <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietMuonTra" onclick="ChiTietMuonTra('${
                         mt.MUONTRA_ID
                       }')"></i>
                      </td>
                    </tr>`;
      });
      tb.append(mt_data);
    }
  });
}

//Get chua tra
function getChuaTra() {
  $.ajax({
    method: "GET",
    url: "/muontra/chuatra",
    contentType: "application/json",
    success: function(response) {
      // console.log(response);
      var tb = $("#tb");
      tb.html("");
      mt_data = "";

      $.each(response, function(i, mt) {
        console.log(response);
        mt_data += `<tr>
                      <td>${i + 1}</td>
                      <td class="chitiet">
                        <a onclick="LoadTK('${mt.TK_ID}')" data-toggle="modal" data-target="#ChiTietTK">
                          ${mt.TK_ID}  
                        </a>
                      </td>
                      <td>${mt.XE_ID}</td>
                      <td>${mt.MUON_THOIGIAN}</td>
                      <td>${mt.TRA_THOIGIAN}</td>
                      <td>
                       <i class="fa fa-info-circle fa-lg" data-toggle="modal" data-target="#ChiTietMuonTra" onclick="ChiTietMuonTra('${
                         mt.MUONTRA_ID
                       }')"></i>
                      </td>
                    </tr>`;
      });
      tb.append(mt_data);
    }
  });
}

function ChiTietMuonTra(a) {
  var mt_id = a;
  var vtMuon = "";
  var vtTra = "";
  loadKhuonVien();

  $.ajax({
    type: "POST",
    url: "/muontra/find",
    data: JSON.stringify({ MUONTRA_ID: mt_id }),
    contentType: "application/json",
    success: function(response) {
      var tb = $("#tbCTMT");
      tb.html("");
      mt_data = "";
      $.each(response, function(i, mt) {
        console.log(mt);
        mt_data += `<tr>
                      <td>ID mượn trả</td>
                      <td>${mt.MUONTRA_ID}</td>
                    </tr>  
                    <tr>
                      <td>ID tài khoản</td>
                      <td>${mt.TK_ID}</td>
                    </tr>
                    <tr>
                      <td>ID xe</td>
                      <td>${mt.XE_ID}</td>
                    </tr>
                    <tr>
                      <td>Thời gian mượn</td>
                      <td>${mt.MUON_THOIGIAN}</td>
                    </tr>
                    <tr>
                      <td>Thời gian trả</td>
                      <td>${mt.TRA_THOIGIAN}</td>
                    </tr>
                    <tr>
                      <td>Vị trí mượn</td>
                      <td>
                        <img src="./img/marker-red.png" height="20px" />
                        ${mt.MUON_VITRI}
                      </td>
                    </tr>
                    <tr>
                      <td>Vị trí trả</td>
                      <td>
                        <img src="./img/marker-green.png" height="20px" />
                        ${mt.TRA_VITRI}
                      </td>
                    </tr>
                    `;
        vtMuon = mt.MUON_VITRI;
        vtTra = mt.TRA_VITRI;
      });
      tb.append(mt_data);
      MapPosition(vtMuon, vtTra);
    },
    error: function(e) {
      console.log(e);
    }
  });
}

//Load map muon tra
function MapPosition(vitriMuon, vitriTra) {
  var mapProp = {
    center: new google.maps.LatLng(10.0299337, 105.7684266),
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  if (vitriMuon != null) {
    var vtMuon = createLatLng(vitriMuon);
    var markerMuon = new google.maps.Marker({
      position: vtMuon,
      map: map,
      icon: "./img/marker-red.png"
    });
  }
  if (vitriTra != null) {
    var vtTra = createLatLng(vitriTra);
    var markerTra = new google.maps.Marker({
      position: vtTra,
      map: map,
      icon: "./img/marker-green.png"
    });
  }
}

//Chia toa do
function createLatLng(coordString) {
  var a = coordString.split(",");
  return new google.maps.LatLng(a[0], a[1]);
}

//Load View
function LoadView() {
  var view = document.getElementById("slMuonTra_View").value;
  if (view == 1) {
    getAllMuonTra();
    // LoadDataTable();
  } else if (view == 0) {
    getChuaTra();
    // LoadDataTable();
  }
}
