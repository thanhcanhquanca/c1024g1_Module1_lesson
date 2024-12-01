// kiểm tra năm nhuận

let year = prompt("nhập vào năm bất kỳ");
let isLeapYear = false;

if (year % 4 === 0){
    if (year % 100 === 0){
        if (year % 400){
            isLeapYear = true ;
        }
    }else {
        isLeapYear = false;
    }
}else {
    isLeapYear = false;
}

if (isLeapYear){
    alert(`${year} là năm nhuận`);
}else {
    alert(`${year} không phải là năm nhuận`);
}