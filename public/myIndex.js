function checkPhoneNumber(inputtxt) {
    return inputtxt.match(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/);
}

function checkEmail(mail) {
    return mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
}

function validate() {

    var fname = document.getElementById("signUpFieldFirstName")
    var lname = document.getElementById("signUpFieldLastName")
    var email = document.getElementById("signUpFieldEmail")
    var phone =  document.getElementById("signUpFieldPhone")
    var country =  document.getElementById("signUpFieldCountry")
    var password =  document.getElementById("signUpFieldPassword")
    var cpassword =  document.getElementById("signUpFieldPasswordConfirm")

    var check = true;

    if(fname.value.trim() == ''){
        showValidate(fname);
        check = false;
    }
    else hideValidate(fname);

    if(lname.value.trim() == ''){
        showValidate(lname);
        check = false;
    }
    else hideValidate(lname);

    if(!checkEmail(email.value)){
        showValidate(email);
        check = false;
    }
    else hideValidate(email);

    if(!checkPhoneNumber(phone.value)){
        showValidate(phone);
        check = false;
    }
    else hideValidate(phone);

    if(country.value == ''){
        showValidate(country);
        check = false;
    }
    else hideValidate(country);

    if(password.value.trim() == ''){
        showValidate(password);
        check = false;
    }
    else hideValidate(password);

    if(cpassword.value != password.value){
        showValidate(cpassword);
        check = false;
    }
    else hideValidate(cpassword);

    return check;
}

function showValidate(input) {
    input.parentElement.classList.add('alert-validate');
}

function hideValidate(input) {
    input.parentElement.classList.remove('alert-validate');
}