function renderInventoryTable(invList){
    const invTbl= document.getElementById("inv-tbl"); 
    clearTable(invTbl);
    const tBody = createTableBody();
    invTbl.appendChild(tBody);       

for (let i = 0; i < invList.length; i++) {  
    let tr = createTableRow();
    let td = createTableCell();   
    td.textContent = invList[i]["item_name"];        
    tr.appendChild(td);

    td = createTableCell();   
    td.textContent = invList[i]["cat_name"];                
    tr.appendChild(td);

    td = createTableCell();   
    td.textContent = invList[i]["qty_level"];        
    tr.appendChild(td);


    td = createTableCell();   
    td.textContent = invList[i]["last_updated_by"];        
    tr.appendChild(td);

    td = createTableCell();   
    td.textContent = invList[i]["last_updated_at"];        
    tr.appendChild(td);

    td = createTableCell();   
    td.textContent = invList[i]["comment"];        
    tr.appendChild(td);
    td = createTableCell();
    let icon = createIcon("EDIT");
    icon.addEventListener("click", editInventoryItem);
    td.appendChild(icon);        
    icon = createIcon("DEL");   
    icon.addEventListener("click", deleteInventory);
td.setAttribute("data-item-name", invList[i]["item_name"]);       
    td.appendChild(icon);
    tr.appendChild(td);

    tBody.appendChild(tr);
}}
function listInventory(){    
    const params = {
        "service": "fetch_all_inventory"       
    };
    getData(params).then((data) => {        
        if(data.error){
            let error= JSON.parse(data.error);
            showError(document.getElementById("message-main"), error.error_message);            
        } else {
            let invList = JSON.parse(data.data);
            renderInventoryTable(invList);
        }
    });    
}
function deleteInventory(event){
    let item_name = event.srcElement.parentElement.getAttribute("data-item-name");
    const params= {
        "service": "delete_inventory_item",
        "item-name": item_name
    };
    deleteData(params).then((data) => {
        if(data.error){
            let error= JSON.parse(data.error);
            showError(document.getElementById("message-main"), error.error_message);                        
        }
        listInventory(); 
    });
}function clearForm(){
    document.getElementById("txt-item-name").value="";
    document.getElementById("txt-item-name").disabled= false;
    document.getElementById("sel-cat-name").value="";
    clearOptions(document.getElementById("sel-cat-name"));
    document.getElementById("sel-status").value="";
    document.getElementById("txt-comment").value="";
    resetMessageElement(document.getElementById("message-form"));
}function loadCategories(){
    const params = {
        "service": "fetch_all_categories"       
    };
    getData(params).then((data) => {        
        if(data.error){
            let error= JSON.parse(data.error);
            showError(document.getElementById("message-main"), error.error_message);            
        } else {
            let catList = JSON.parse(data.data);
            const catElem = document.getElementById("sel-cat-name");
            for(let i=0; i<catList.length;i++){
                let optionElem = createOption();
                optionElem.value = catList[i]["cat_name"];
                optionElem.textContent = catList[i]["cat_name"];
                catElem.appendChild(optionElem);
            }            
        }
    });       
}
function addInventoryItem(){
    clearForm();
    loadCategories();
    document.getElementById("popup-title").textContent = "Add Inventory Item";
    openPopup();
}
function validateForm(){
    if(document.getElementById("txt-item-name").value == ""){
        showError(document.getElementById("message-form")," Item Name is mandatory.");
        return false;
    }
    if(document.getElementById("sel-cat-name").value == ""){
        showError(document.getElementById("message-form")," Category Name is mandatory.");
        return false;
    }
    if(document.getElementById("sel-status").value == ""){
        showError(document.getElementById("message-form")," Status is mandatory.");
        return false;
    }
    return true;    
}
function saveInventory(){ 

    if(!validateForm()){
        return;
    }
    const params= {
        "service": "save_inventory_item"        
    };
    const invData = {
        "item_name": document.getElementById("txt-item-name").value,
        "cat_name": document.getElementById("sel-cat-name").value,
        "item_status": document.getElementById("sel-status").value,
        "comment": document.getElementById("txt-comment").value,
    };
    postData(params,invData).then((data) => {
        if(data.error){
            let error= JSON.parse(data.error);
            showError(document.getElementById("message-form"), error.error_message);            
        } else {
            closePopup();
            showSuccess(document.getElementById("message-main"),"Inventory Item saved.");
            listInventory();
        }        
    });
}
function editInventoryItem(event){
    let item_name = event.srcElement.parentElement.getAttribute("data-item-name");    
    clearForm();    
    loadCategories();
    const params = {
        "service": "fetch_inventory_by_name",
        "item-name": item_name    
    };
    getData(params).then((data) => {        
        if(data.error){
            let error= JSON.parse(data.error);
            showError(document.getElementById("message-main"), error.error_message);            
        } else {            
            let invItem = JSON.parse(data.data);            
            document.getElementById("txt-item-name").value = invItem["item_name"];
            document.getElementById("txt-item-name").disabled = true;
            document.getElementById("sel-cat-name").value = invItem["cat_name"];            
            document.getElementById("sel-status").value = invItem["qty_level"];
            document.getElementById("txt-comment").value = invItem["comment"];
        }
    });   
    document.getElementById("popup-title").textContent = "Edit Inventory Item";
    openPopup();
}