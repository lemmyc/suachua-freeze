const formElement = document.getElementById('form')
const submitBtn = document.querySelector('.submit-btn');


submitBtn.onclick = (e)=>{
    e.preventDefault();
    if(validate(formElement)){
        formSubmit(formElement);
    }
}

function validate(form){
    const inputElements = form.querySelectorAll('.form-input input');
    const inputLists = [...inputElements];
    var isAllValid = 1;
    for(element of inputLists){
        switch(element.name){
            case 'email':
                let emailReg =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if(!emailReg.test(element.value)){
                    alert('Vui lòng nhập Email hợp lệ.');
                    isAllValid = 0;
                }
                break;
            case 'pw':
                let pwReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                if(pwReg.test(element.value)){
                    var pw = element.value;
                    var pwValid = true;
                }
                else{
                    alert('Mật khẩu phải có độ dài tối thiểu là 8 kí tự, ít nhất một kí tự in hoa, một số và một kí tự đặc biệt.');
                    isAllValid = 0;
                } 
                break;
            case 'pw2':
                if(element.value != pw && pwValid){
                    alert('Mật khẩu nhập lại không khớp');
                    isAllValid = 0;
                }
                break;
            case 'name':
                if(element.value.length < 4){
                    alert('Vui lòng kiểm tra lại họ và tên');
                    isAllValid = 0;
                }
        }
    }
    const fileInput = document.querySelector('.form-input--file input')
    const contactMsg = document.querySelector('.form-input textarea');
    if(fileInput){
        if(!fileInput.value){
            alert('Ảnh đại diện không được để trống');
            isAllValid = 0;
        }
    }
    if(contactMsg){
        if(contactMsg.value.length < 10){
            alert('Nội dung mô tả quá ngắn.')
            isAllValid = 0;
        }
    }
    return isAllValid;
}

function formSubmit(form){
    var data={} //khoi tao object chua data = rong
    const formCssSlt = `.form-input input, 
                        .form-input--select input[type="radio"]:checked, 
                        .form-input select option:checked, 
                        .form-input textarea, 
                        .form-input--file input
                        ` //chi dinh css selector

    // lay tat ca cac element input
    const formElements = [...form.querySelectorAll(formCssSlt)];

    for(var element of formElements){
        // lay name de lam key tu put
        elementName = element.getAttribute('name');
        
        // lay value tu input
        elementValue = elementName !== 'avatar' ? element.value : element.files[0];

        // Them dulieu vao object-data
        switch(elementName){
            case 'pw':
                data['password'] = elementValue;
                break;
            case 'pw2':
                break;
            default:
                data[elementName] = elementValue;
        }
    }
    // call api chuyen du lieu den server
    console.log(data)
}