function validateForm(){
    if(document.getElementById("txt-existing-pwd").value == ""){
        showError(document.getElementById("message-form")," Existing Password is mandatory.");
        return false;
    }
    if(document.getElementById("txt-new-pwd").value == ""){
        showError(document.getElementById("message-form")," New Password is mandatory.");
        return false;
    }
    if(document.getElementById("txt-confirm-pwd").value == ""){
        showError(document.getElementById("message-form")," Confirm Password is mandatory.");
        return false;
    }
    if(document.getElementById("txt-new-pwd").value != document.getElementById("txt-confirm-pwd").value){
        showError(document.getElementById("message-form")," Passwords don't match");
        return false;
    }
    return true;    
}
function clearForm(){
    document.getElementById("txt-existing-pwd").value="";
    document.getElementById("txt-new-pwd").value="";
    document.getElementById("txt-confirm-pwd").value="";    
}
function savePassword(){ 

    if(!validateForm()){
        return;
    }
    const params= {
        "service": "change_pwd"        
    };
    const pwdData = {
        "existing_pwd": document.getElementById("txt-existing-pwd").value,
        "new_pwd": document.getElementById("txt-new-pwd").value,
        "confirm_pwd": document.getElementById("txt-confirm-pwd").value 
    };
    postData(params,pwdData).then((data) => {
        if(data.error){
            let error= JSON.parse(data.error);
            showError(document.getElementById("message-form"), error.error_message);            
        } else {
            showSuccess(document.getElementById("message-form"),"Password updated.");
            clearForm();         
        }        
    });
}