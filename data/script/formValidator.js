const formElement = document.getElementById('form')
const submitBtn = document.querySelector('.submit-btn');


submitBtn.onclick = (e)=>{
    e.preventDefault();
    validate(formElement);
}

function validate(form){
    const inputElements = form.querySelectorAll('.form-input input');
    const inputLists = [...inputElements];
    for(element of inputLists){
        switch(element.name){
            case 'email':
                let emailReg =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if(!emailReg.test(element.value))
                    alert('Vui lòng nhập Email hợp lệ.');
                break;
            case 'pw':
                let pwReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                if(pwReg.test(element.value)){
                    var pw = element.value;
                    var pwValid = true;
                }
                else alert('Mật khẩu phải có độ dài tối thiểu là 8 kí tự, ít nhất một kí tự in hoa, một số và một kí tự đặc biệt.');
                break;
            case 'pw2':
                if(element.value != pw && pwValid)
                    alert('Mật khẩu nhập lại không khớp');
                break;
            case 'name':
                if(element.value.length < 4)
                    alert('Vui lòng kiểm tra lại họ và tên');
        }
    }
    const fileInput = document.querySelector('.form-input--file input')
    const contactMsg = document.querySelector('.form-input textarea');
    if(fileInput){
        if(!fileInput.value)
            alert('Ảnh đại diện không được để trống');
    }
    if(contactMsg){
        if(contactMsg.value.length < 10)
            alert('Nội dung mô tả quá ngắn.')
    }
}