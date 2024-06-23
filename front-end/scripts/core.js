const BACK_END_URL = "https://vume2htjpkhyebatlrawcc36fm0aljmy.lambda-url.ap-southeast-1.on.aws/";
const TOKEN_EXPIRED_MESSAGE = "Token has expired";
function openPopup(){
    document.getElementById("overlay").style.display="block";
}

function closePopup(){
    document.getElementById("overlay").style.display="none";
}
async function getData(params){   
    showLoader();  
    addAuthorizationHeader(params); 
    const requestOptions = {
        method: "GET",
        headers: params
    };
    const response = await fetch(BACK_END_URL, requestOptions);   
    hideLoader(); 
    return response.json();
}
async function deleteData(params){ 
    showLoader();    
    addAuthorizationHeader(params);      
    const requestOptions = {
        method: "DELETE",
        headers: params
    };
    const response = await fetch(BACK_END_URL, requestOptions);  
    hideLoader();  
    return response.json();
}
async function postData(params, data){    
    showLoader(); 
    addAuthorizationHeader(params);     
    const requestOptions = {
        method: "POST",
        headers: params,
        body: JSON.stringify(data)
    };
    const response = await fetch(BACK_END_URL, requestOptions); 
    hideLoader();   
    return response.json();
}
function resetMessageElement(msgElement){
    msgElement.textContent="";
    msgElement.classList.remove("success");
    msgElement.classList.remove("error");
    msgElement.style.display="none";
}
function showError(msgElement, errMsg){
   
    resetMessageElement(msgElement);
    if(errMsg.includes(TOKEN_EXPIRED_MESSAGE)){
        msgElement.textContent="Session Timed Out! Logout & Re-Login";    
    } else {
        msgElement.textContent="Failed! "+errMsg;    
    }    

    msgElement.classList.add("error");
    msgElement.style.display="block";
}
function showSuccess(msgElement, msg){
    resetMessageElement(msgElement);
    msgElement.textContent="Success! "+msg;
    msgElement.classList.add("success");
    msgElement.style.display="block";
    setTimeout(() => {
        msgElement.style.display="none";
    }, 3000);
}
function showLoader(){
    document.getElementById("loader").style.display="block";
}
function hideLoader(){
    document.getElementById("loader").style.display="none";
}
function displayUsername(){
    let username = sessionStorage.getItem("username");
    if(username){
        document.getElementById("username").textContent=username;
    } else {
        window.location.replace("login.html");
    }    
}
function logout(event){
    sessionStorage.clear();
    window.location.replace("login.html");    
}
function addAuthorizationHeader(params){
    if(sessionStorage.getItem("auth_token")){
        const authToken = sessionStorage.getItem("auth_token");
        params["Authorization"] = "Bearer "+authToken;
    }    
}
