// function showFullOrd(){
// }
var itemList={
    "sp001":{   
        "name":"Sữa Chua Vị Kiwi",
        "price":21000,
        "photo":"images/sanpham/kiwi.jpg"
    },
    "sp002":{
        "name":"Sữa Chua Vị Xoài",
        "price":22000,
        "photo":"images/sanpham/mango.jpg"
    },
    "sp003":{
        "name":"Sữa Chua Vị Dưa lưới",
        "price":23000,
        "photo":"images/sanpham/cantaloupe.jpg"
    },
    "sp004":{
        "name":"Sữa Chua Vị Mâm Xôi",
        "price":24000,
        "photo":"images/sanpham/blackberry.jpg"
    },
    "sp005":{
        "name":"Sữa Chua Vị Dâu Tây",
        "price":25000,
        "photo":"images/sanpham/strawberry.jpg"
    },
    "sp006":{
        "name":"Sữa Chua Vị Việt Quất",
        "price":26000,
        "photo":"images/sanpham/blueberry.jpg"
    },
    "sp007":{
        "name":"Sữa Chua Vị Bưởi",
        "price":27000,
        "photo":"images/sanpham/grapes.jpg"
    },
    "sp008":{
        "name":"Sữa Chua Vị Táo Xanh",
        "price":28000,
        "photo":"images/sanpham/green-apple.jpg"
    },
    "sp009":{
        "name":"Sữa Chua Vị Dứa",
        "price":29000,
        "photo":"images/sanpham/pineapple.jpg"
    }
};
const ordTableBody = document.querySelector('.ord-table tbody');
const ordTableFooter = document.querySelector('.ord-table tfoot')
let totalPreTax = 0;
var htmls, html = [];
var index = 0; // index trong mảng html (thứ tự mặt hàng trong đơn hàng)
for(var key in localStorage){
    if(localStorage.hasOwnProperty(key)){
        let item = itemList[key]; //với mỗi key, lấy từng item theo key đó
        let photo = item.photo;
        let name = item.name;
        let price = convToVND(item.price);
        let orderCount = parseInt(localStorage.getItem(key));
        let total = convToVND(item.price*orderCount);
        totalPreTax += item.price*orderCount;
        html.push(`
            <tr>
                <td class="d-prod-img"><img src="${photo}" alt=""></td>
                <td class="d-prod-name">${name}</td>
                <td class="d-prod-quant">${orderCount}</td>
                <td class="d-prod-price">${price}</td>
                <td class="d-prod-total">${total}</td>
                <td class="d-prod-del">
                    <button class="d-prod-del-btn" data-code=${key} onclick="handleRemove('${index}', '${key}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        `)
    }
    index++;
}
htmls = html.join('')
ordTableBody.innerHTML = htmls;
ordTableFooter.innerHTML = getOrdFooter();
function handleRemove(removeIndex, removeKey){
    totalPreTax -= itemList[removeKey].price*parseInt(localStorage.getItem(removeKey));
    localStorage.removeItem(removeKey);
    let index = parseInt(removeIndex);
    // với mỗi nút remove, ta sẽ gán cứng một index trong lúc render giao diện
    // nên khi remove một phần tử, nếu dùng splice, index trong mảng sẽ thay đổi
    // nhưng index trong hàm của onclick thì không được cập nhật => LỖI
    // nên ta gán tạm thời tại phần tử đó là một chuỗi rỗng
    // khi join lại và render ra giao diện, html cũng sẽ bỏ qua
    // khi reload lại trang, mọi thứ sẽ được cập nhật lại
    html[index] = ` `
    htmls = html.join('');
    ordTableBody.innerHTML = htmls;
    ordTableFooter.innerHTML = getOrdFooter();
}
function getOrdFooter(){
    let discountRate = getDiscountRate();
    let discount = discountRate*totalPreTax;
    let tax = 0.1*(totalPreTax - discount);
    let total = totalPreTax - discount + tax;
    htmls = `
        <tr>
            <td class="totalPreTax" colspan="6">
                Tổng thành tiền (A) = ${convToVND(totalPreTax)}
            </td>
        </tr>
        <tr>
            <td class="discount" colspan="6">
                Chiết khấu (B) = ${discountRate*100}% x A = ${convToVND(discount)}
            </td>
        </tr>   
        <tr>
            <td class="tax" colspan="6">
                Thuế (C) = 10% x (A - B) = ${convToVND(tax)}
            </td>
        </tr>
        <tr>
            <td class="total" colspan="6">
                Tổng đơn hàng = A - B + C = ${convToVND(total)}
            </td>
        </tr>
        <tr>
            <td class="confirmation" colspan="6">
                <button id="confirm-btn">Xác nhận đơn hàng</button>
            </td>
        </tr>
    `
    // console.log(htmls)
    return htmls;
}
function convToVND(number){
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}
function getDiscountRate(){
    var currentTime = new Date();
    var weekDay = currentTime.getDay(); //Sun (0) - > Sat (6)
    var totalMins = currentTime.getHours()*60 + currentTime.getMinutes();
    if( ((weekDay >= 1) && (weekDay <= 3)) 
        && ((totalMins >= 420) && (totalMins <= 1020))
    )
        return 0.1;
    return 0;
}
window.onstorage = ()=>{
    location.reload();
}

