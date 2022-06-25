employeeList = [];

document.querySelector("#btnDong").onclick = resetForm;

document.getElementById("btnThemNV").onclick = createNewEmployee;
function createNewEmployee() {
  let tknv, name, email, password, datepicker, luongCB, chucvu, gioLam;
  tknv = document.querySelector("#tknv").value.trim();
  name = document.querySelector("#name").value.trim();
  email = document.querySelector("#email").value.trim();
  password = document.querySelector("#password").value.trim();
  datepicker = document.querySelector("#datepicker").value;
  luongCB = document.querySelector("#luongCB").value;
  chucvu = document.querySelector("#chucvu").value;
  gioLam = document.querySelector("#gioLam").value;

  let validForm = isValidForm();
  if (!validForm) {
    console.log(validForm);
    return alert("Form nhập không hợp lệ !");
  }

  let index = findByID(tknv);
  if (index !== -1) {
    return alert("Tài khoản nhân viên đã tồn tại");
  }

  let newEmployee = new Employee(
    tknv,
    name,
    email,
    password,
    datepicker,
    luongCB,
    chucvu,
    gioLam
  );
  //   console.log(employeeList);
  //   console.log(newEmployee["tknv"]);
  //   console.log(newEmployee.totalSalary());
  employeeList.push(newEmployee);
  saveLocalStorage();
  renderTable();
  resetForm();
  document.querySelector("#btnDong").click();
}

document.querySelector("#btnCapNhat").onclick = updateEmployee;
function updateEmployee() {
  let tknv, name2, email2, password2, datepicker2, luongCB2, chucvu2, gioLam2;
  tknv = document.querySelector("#tknv").value;
  name2 = document.querySelector("#name").value.trim();
  email2 = document.querySelector("#email").value.trim();
  password2 = document.querySelector("#password").value.trim();
  datepicker2 = document.querySelector("#datepicker").value;
  luongCB2 = document.querySelector("#luongCB").value;
  chucvu2 = document.querySelector("#chucvu").value;
  gioLam2 = document.querySelector("#gioLam").value;

  let index = findByID(tknv);
  if (index === -1) {
    return alert("Nhân viên đã bị xóa");
  }

  let isValid = isValidForm();
  if (!isValid) {
    return alert("form nhập không hợp lệ");
  }

  let employee = employeeList[index];
  employee.name = name2;
  employee.email = email2;
  employee.password = password2;
  employee.datepicker = datepicker2;
  employee.luongCB = luongCB2;
  employee.chucvu = chucvu2;
  employee.gioLam = gioLam2;

  saveLocalStorage();
  renderTable();
  resetForm();

  document.querySelector("#btnDong").click();
  document.querySelector("#btnThemNV").style.display = "block";
  document.querySelector("#btnCapNhat").style.display = "none";
  document.querySelector("#tknv").disabled = false;
}

function delEmployee(id) {
  let index = findByID(id);
  if (index === -1) {
    return alert("Nhân viên không tồn tại");
  }

  let result = confirm(
    "Xác nhận xóa nhân viên " + employeeList[index].name + "?"
  );
  if (result) {
    employeeList.splice(index, 1);
    saveLocalStorage();
    renderTable();
  }
}

// document.querySelector("#searchName").oninput = searchEmployee;
document.querySelector("#btnTimNV").onclick = searchEmployee;
function searchEmployee() {
  let result = [];
  let input = document.querySelector("#searchName").value.toLowerCase().trim();

  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].rating().includes(input)) {
      result.push(employeeList[i]);
    }
  }
  renderTable(result);
}
// ------------------------------------------------------------
function isValidForm() {
  let isValid = document.querySelector("#formEmployee").checkValidity();

  if (!isValid) {
    // tai khoan
    let tknv = document.querySelector("#tknv");
    let tbTKNV = document.querySelector("#tbTKNV");
    if (tknv.validity.valueMissing) {
      tbTKNV.innerHTML = "Yêu cầu điền thông tin tài khoản";
      tbTKNV.style.display = "block";
    } else if (tknv.validity.patternMismatch) {
      tbTKNV.innerHTML = "Tài khoản không hợp lệ";
      tbTKNV.style.display = "block";
    } else {
      tbTKNV.innerHTML = "";
      tbTKNV.style.display = "none";
    }
    // ho ten
    let name = document.querySelector("#name");
    let tbTen = document.querySelector("#tbTen");
    if (name.validity.valueMissing) {
      tbTen.innerHTML = "Yêu cầu điền tên";
      tbTen.style.display = "block";
    } else if (name.validity.patternMismatch) {
      tbTen.innerHTML = "Tên không hợp lệ";
      tbTen.style.display = "block";
    } else {
      tbTen.innerHTML = "";
      tbTen.style.display = "none";
    }
    // email
    let email = document.querySelector("#email");
    let tbEmail = document.querySelector("#tbEmail");
    if (email.validity.valueMissing) {
      tbEmail.innerHTML = "Yêu cầu điền email";
      tbEmail.style.display = "block";
    } else if (email.validity.patternMismatch) {
      tbEmail.innerHTML = "Email không hợp lệ";
      tbEmail.style.display = "block";
    } else {
      tbEmail.innerHTML = "";
      tbEmail.style.display = "none";
    }
    // password
    let password = document.querySelector("#password");
    let tbMatkhau = document.querySelector("#tbMatKhau");
    if (password.validity.valueMissing) {
      tbMatkhau.innerHTML = "Yêu cầu điền mật khẩu";
      tbMatkhau.style.display = "block";
    } else if (password.validity.tooShort) {
      tbMatkhau.innerHTML = "Mật khẩu phải dài hơn 6 kí tự";
      tbMatkhau.style.display = "block";
    } else if (password.validity.patternMismatch) {
      tbMatkhau.innerHTML =
        "Mật khẩu không phù hợp (chứa 1 in hoa, 1 số và 1 kí tự đặc biệt)";
      tbMatkhau.style.display = "block";
    } else {
      tbMatkhau.innerHTML = "";
      tbMatkhau.style.display = "none";
    }
    // ngaylam
    let datepicker = document.querySelector("#datepicker");
    let tbNgay = document.querySelector("#tbNgay");
    if (datepicker.validity.valueMissing) {
      tbNgay.innerHTML = "Yêu cầu điền ngày làm";
      tbNgay.style.display = "block";
    } else if (
      dayjs(datepicker.value, "MM-DD-YYYY", true).isValid() &&
      dayjs(datepicker.value).isAfter(dayjs())
    ) {
      tbNgay.innerHTML = "Ngày làm không phù hợp";
      tbNgay.style.display = "block";
    } else {
      tbNgay.innerHTML = "";
      tbNgay.style.display = "none";
    }
    // luong co ban
    let luongCB = document.querySelector("#luongCB");
    let tbLuongCB = document.querySelector("#tbLuongCB");
    if (luongCB.validity.valueMissing) {
      tbLuongCB.innerHTML = "Yêu cầu điền lương cơ bản";
      tbLuongCB.style.display = "block";
    } else if (
      luongCB.validity.typeMissmatch ||
      luongCB.validity.rangeOverflow ||
      luongCB.validity.rangeUnderflow
    ) {
      tbLuongCB.innerHTML = "Lương cơ bản ngoài khoảng phù hợp";
      tbLuongCB.style.display = "block";
    } else {
      tbLuongCB.innerHTML = "";
      tbLuongCB.style.display = "none";
    }
    // chuc vu
    let chucvu = document.querySelector("#chucvu");
    let tbChucVu = document.querySelector("#tbChucVu");
    // console.log(chucvu.value);
    if (chucvu.validity.valueMissing) {
      tbChucVu.innerHTML = "Yêu cầu chọn Chức vụ";
      tbChucVu.style.display = "block";
    } else {
      tbChucVu.innerHTML = "";
      tbChucVu.style.display = "none";
    }
    // gio lam
    let gioLam = document.querySelector("#gioLam");
    let tbGioLam = document.querySelector("#tbGiolam");
    if (gioLam.validity.valueMissing) {
      tbGioLam.innerHTML = "Yêu cầu điền giờ làm";
      tbGioLam.style.display = "block";
    } else if (
      gioLam.validity.rangeUnderflow ||
      gioLam.validity.rangeOverflow
    ) {
      tbGioLam.innerHTML = "Giờ làm không phù hợp (range 80 to 200)";
      tbGioLam.style.display = "block";
    } else {
      tbGioLam.innerHTML = "";
      tbGioLam.style.display = "none";
    }
  }

  return isValid;
}

function findByID(id) {
  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].tknv === id) {
      return i;
    }
  }
  return -1;
}

function saveLocalStorage() {
  localStorage.setItem("employeeList", JSON.stringify(employeeList));
}

function renderTable(inputListData) {
  if (!inputListData) {
    inputListData = employeeList;
  }

  let html = "";
  for (let i = 0; i < inputListData.length; i++) {
    html += `<tr>
                <td>${inputListData[i].tknv}</td>
                <td>${inputListData[i].name}</td>
                <td>${inputListData[i].email}</td>
                <td>${inputListData[i].datepicker}</td>
                <td>${inputListData[i].chucvu}</td>
                <td>${inputListData[i].totalSalary()}</td>
                <td>${inputListData[i].rating()}</td>
                <td>
                  <btn class="btn btn-info" onclick="getEmployee('${
                    inputListData[i].tknv
                  }')">Sửa</btn>
                  <btn class="btn btn-danger" onclick="delEmployee('${
                    inputListData[i].tknv
                  }')">Xóa</btn>
                </td>
            </tr>`;
  }

  document.querySelector("#tableDanhSach").innerHTML = html;
}

function getEmployee(id) {
  let index = findByID(id);
  if (index === -1) {
    return alert("Nhân viên không tồn tại");
  }

  document.querySelector("#tknv").value = employeeList[index].tknv;
  document.querySelector("#name").value = employeeList[index].name;
  document.querySelector("#email").value = employeeList[index].email;
  document.querySelector("#password").value = employeeList[index].password;
  document.querySelector("#datepicker").value = employeeList[index].datepicker;
  document.querySelector("#luongCB").value = employeeList[index].luongCB;
  document.querySelector("#chucvu").value = employeeList[index].chucvu;
  document.querySelector("#gioLam").value = employeeList[index].gioLam;

  document.querySelector("#btnThem").click();
  document.querySelector("#btnThemNV").style.display = "none";
  document.querySelector("#btnCapNhat").style.display = "block";

  document.querySelector("#tknv").disabled = true;
}

function resetForm() {
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#chucvu").value = "";
  document.querySelector("#gioLam").value = "";

  document.querySelector("#tbTKNV").innerHTML = "";
  document.querySelector("#tbTKNV").style.display = "none";

  document.querySelector("#tbTen").innerHTML = "";
  document.querySelector("#tbTen").style.display = "none";

  document.querySelector("#tbEmail").innerHTML = "";
  document.querySelector("#tbEmail").style.display = "none";

  document.querySelector("#tbMatKhau").innerHTML = "";
  document.querySelector("#tbMatKhau").style.display = "none";

  document.querySelector("#tbNgay").innerHTML = "";
  document.querySelector("#tbNgay").style.display = "none";

  document.querySelector("#tbLuongCB").innerHTML = "";
  document.querySelector("#tbLuongCB").style.display = "none";

  document.querySelector("#tbChucVu").innerHTML = "";
  document.querySelector("#tbChucVu").style.display = "none";

  document.querySelector("#tbGiolam").innerHTML = "";
  document.querySelector("#tbGiolam").style.display = "none";
}

function mapData(data) {
  let dataMapped = [];
  for (let i = 0; i < data.length; i++) {
    let item = new Employee(
      data[i].tknv,
      data[i].name,
      data[i].email,
      data[i].password,
      data[i].datepicker,
      data[i].luongCB,
      data[i].chucvu,
      data[i].gioLam
    );
    dataMapped.push(item);
  }
  console.log(dataMapped);
  return dataMapped;
}

function renderTableOnLoad() {
  let employeeListStr = localStorage.getItem("employeeList");

  if (!employeeListStr) {
    return;
  }

  employeeList = mapData(JSON.parse(employeeListStr));
  renderTable();
}

window.onload = () => {
  renderTableOnLoad();
  document.querySelector("#btnCapNhat").style.display = "none";
};
