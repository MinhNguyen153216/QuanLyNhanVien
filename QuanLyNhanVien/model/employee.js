function Employee(tknv, name, email, password, datepicker, luongCB, chucvu, gioLam){
    this.tknv = tknv;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.luongCB = luongCB;
    this.chucvu = chucvu;
    this.gioLam = gioLam;

    this.totalSalary = totalSalary;
    this.rating = rating;
}

function totalSalary(){
    if(this.chucvu === 'Giám đốc'){
        return this.luongCB *3;
    }else if(this.chucvu === 'Trưởng Phòng'){
        return this.luongCB *2;
    }else if(this.chucvu === 'Nhân Viên'){
        return this.luongCB *1;
    }else{
        return 0;
    }
}

function rating(){
    if(this.gioLam >= 160){
        return "nhân viên khá";
    }else if(this.gioLam >= 176){
        return "nhân viên giỏi";
    }else if(this.gioLam >= 192){
        return "nhân viên xuất sắc";
    }else{
        return "nhân viên trung bình";
    }
}