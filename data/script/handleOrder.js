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
const placeOrdBtnElements =  document.querySelectorAll('.product span button');
const placeOrdBtns = [...placeOrdBtnElements];
placeOrdBtns.forEach((placeOrdBtn, index)=>{
    let listKey = `sp00${index+1}`;
    placeOrdBtn.addEventListener('click', ()=>placeOrd(listKey, placeOrdBtn));
})

function placeOrd(productId, element){
    let productCount = getInput(element);
    let currentItemCount;
    if(typeof localStorage[productId] === 'undefined')
        currentItemCount = 0;
    else
        currentItemCount = parseInt(window.localStorage.getItem(productId));
    // if(productCount >= 0 && productCount <= 100){
    //     let totalCount = currentItemCount + productCount;
    //     if(totalCount <= 100){
    //         window.localStorage.setItem(productId, totalCount);
    //     }else{
    //         alert('Tổng số lượng vượt 100, nên chỉ thêm 100 sản phẩm')
    //         window.localStorage.setItem(productId, 100);
    //     }
    // }
    // else if (productCount < 0)
    //     alert('Số lượng không hợp lệ')
    // else{
    //     alert('Số lượng vượt quá 100, nên chỉ thêm 100 sản phẩm')
    //     window.localStorage.setItem(productId, 100);
    // }
    

    if(productCount > 0){
        let totalCount = currentItemCount + productCount;
        if(totalCount <= 100){
            window.localStorage.setItem(productId, totalCount);
        }else{
            alert('Tổng số lượng vượt 100, nên chỉ thêm 100 sản phẩm')
            window.localStorage.setItem(productId, 100);
        }
    }
    else if(productCount < 0)
        alert('Số lượng không hợp lệ')
}

function getInput(element){
    let count = element.previousElementSibling.value;
    element.previousElementSibling.value = 0;
    return parseInt(count);
}