const BACK_END_URL = "https://y7zmxsgidirhrghvaq32unp7ae0bfrko.lambda-url.ap-southeast-1.on.aws/";
function openPopup(){
    document.getElementById("overlay").style.display="block";
}

function closePopup(){
    document.getElementById("overlay").style.display="none";
}
async function getData(params){   
    showLoader();   
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
    msgElement.textContent="Failed! "+errMsg;
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