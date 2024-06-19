function validateForm(){
    if(document.getElementById("txt-username").value == ""){
        showError(document.getElementById("message")," Username is mandatory.");
        return false;
    }
    if(document.getElementById("pwd").value == ""){
        showError(document.getElementById("message")," Password is mandatory.");
        return false;
    }
    return true;    
}
function login(){
    if(!validateForm()){
        return;
    }
    const params= {
        "service": "auth_user"        
    };
    const authData = {
        "username": document.getElementById("txt-username").value,
        "pwd": document.getElementById("pwd").value,        
    };
    postData(params,authData).then((data) => {
        if(data.error){
            let error= JSON.parse(data.error);
            showError(document.getElementById("message"), error.error_message);            
        } else {
            let auth_data = JSON.parse(data.data);
            let auth_token = auth_data["auth_token"];
            let username = auth_data["username"];
            sessionStorage.setItem("auth_token", auth_token);
            sessionStorage.setItem("username", username);
            window.location.replace("home.html");
        }        
    });
}