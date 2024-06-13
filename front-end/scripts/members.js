function renderMembersTable(usrList){
    const membersTbl= document.getElementById("members-tbl"); 
    clearTable(membersTbl);
    const tBody = createTableBody();
    membersTbl.appendChild(tBody);       

for (let i = 0; i < usrList.length; i++) {  
    let tr = createTableRow();
    let td = createTableCell();   
    td.textContent = usrList[i]["username"];        
    tr.appendChild(td);

    td = createTableCell();   
    td.textContent = usrList[i]["first_name"];                
    tr.appendChild(td);

    td = createTableCell();   
    td.textContent = usrList[i]["last_name"];        
    tr.appendChild(td);

    td = createTableCell();   
    let loginStat = usrList[i]["login_stat"];
    td.textContent = loginStat ? "Enabled" : "Disabled";        
    tr.appendChild(td);
            
    td = createTableCell();                
let icon = createIcon("EDIT");  
icon.addEventListener("click", editMember);      
td.appendChild(icon);        
icon = createIcon("DEL");
icon.addEventListener("click", deleteMember);
td.setAttribute("data-username", usrList[i]["username"]);
td.appendChild(icon);
tr.appendChild(td);
tBody.appendChild(tr);

}
}
function listMembers(){    
    const params = {
        "service": "fetch_all_users"       
    };
    getData(params).then((data) => {        
        if(data.error){
            let error= JSON.parse(data.error);
            showError(document.getElementById("message-main"), error.error_message);            
        } else {
            let usrList = JSON.parse(data.data);
            renderMembersTable(usrList);
        }
    });    
}
function deleteMember(event){
    let username = event.srcElement.parentElement.getAttribute("data-username");
    const params= {
        "service": "delete_user",
        "username": username
    };
    deleteData(params).then((data) => {
        if(data.error){
            let error= JSON.parse(data.error);
            showError(document.getElementById("message-main"), error.error_message);                        
        }
        listMembers();
    });
}
function clearForm(){
    document.getElementById("txt-username").value="";
    document.getElementById("txt-username").disabled= false;
    document.getElementById("txt-firstname").value="";
    document.getElementById("txt-lastname").value="";    
    document.getElementById("cb-login-status").checked= true;
    document.getElementById("cb-login-status").value= "enabled";    
    resetMessageElement(document.getElementById("message-form"));
}
function addMember(){
    clearForm();    
    document.getElementById("popup-title").textContent = "Add Member";
    openPopup();
}
function validateForm(){
    if(document.getElementById("txt-username").value == ""){
        showError(document.getElementById("message-form")," Username is mandatory.");
        return false;
    }
    if(document.getElementById("txt-firstname").value == ""){
        showError(document.getElementById("message-form")," First Name is mandatory.");
        return false;
    }    
    return true;    
}
function saveMember(){ 

    if(!validateForm()){
        return;
    }
    const params= {
        "service": "save_user"        
    };
    let login_status = document.getElementById("cb-login-status").checked;
    login_status = login_status ? "enabled" : "disabled";
    const usrData = {
        "username": document.getElementById("txt-username").value,
        "firstname": document.getElementById("txt-firstname").value,
        "lastname": document.getElementById("txt-lastname").value,
        "login_status": login_status,
    };
    postData(params,usrData).then((data) => {
        if(data.error){
            let error= JSON.parse(data.error);
            showError(document.getElementById("message-form"), error.error_message);            
        } else {
            closePopup();
            showSuccess(document.getElementById("message-main"),"Family Member saved.");
            listMembers();
        }        
    });
}
function editMember(event){
    let username = event.srcElement.parentElement.getAttribute("data-username");    
    clearForm();        
    const params = {
        "service": "fetch_user_by_name",
        "username": username    
    };
    getData(params).then((data) => {        
        if(data.error){
            let error= JSON.parse(data.error);
            showError(document.getElementById("message-main"), error.error_message);            
        } else {            
            let usr = JSON.parse(data.data);            
            document.getElementById("txt-username").value = usr["username"];
            document.getElementById("txt-username").disabled = true;
            document.getElementById("txt-firstname").value = usr["first_name"];
            document.getElementById("txt-lastname").value = usr["last_name"];
            let login_status = usr["login_stat"];
            document.getElementById("cb-login-status").checked = login_status;
            login_status = login_status ? "enabled" : "disabled";
            document.getElementById("cb-login-status").value = login_status;
        }
    });   
    document.getElementById("popup-title").textContent = "Edit Member";
    openPopup();
}