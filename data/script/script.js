const searchForm = document.querySelector
('.header-search-form');
const searchBar = document.querySelector('.header-search-input');
const searchBtn = document.getElementById('hd-search-btn')
const cartBtn = document.getElementById('hd-cart-btn');

searchBtn.addEventListener('click', searchBtnClick);
cartBtn.addEventListener('click', openOrderPage);

function searchBtnClick(e){
    e.preventDefault();
    sendData(searchBar.value)
}
function sendData(item){
    if(item.length > 0 ) searchForm.submit();
}
function openOrderPage(){
    window.location.href='donhang.html'
}