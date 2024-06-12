function renderCategoriesTable(catList){
    const catTbl= document.getElementById("cat-tbl"); 
    clearTable(catTbl);
    const tBody = createTableBody();
    catTbl.appendChild(tBody);   
    for (let i = 0; i < catList.length; i++) {  
        let tr = createTableRow();
        let td = createTableCell();
        td.textContent = catList[i]["cat_name"];        
        tr.appendChild(td);
        td = createTableCell();
        let delIcon = createIcon("DEL");
        delIcon.addEventListener("click", deleteCategory);
td.setAttribute("data-cat-name", catList[i]["cat_name"]);        
        td.appendChild(delIcon);
        tr.appendChild(td);
        tBody.appendChild(tr);
    }
}function listCategories(){    
    const params = {
        "service": "fetch_all_categories"       
    };
    getData(params).then((data) => {        
        if(data.error){
            let error= JSON.parse(data.error);   
            showError(document.getElementById("message-main"), error.error_message);

        } else {
            let catList = JSON.parse(data.data);
            renderCategoriesTable(catList);
        }
    });    
}
function deleteCategory(event){
    let cat_name = event.srcElement.parentElement.getAttribute("data-cat-name");
    const params= {
        "service": "delete_category",
        "cat-name": cat_name
    };
    deleteData(params).then((data) => {
        if(data.error){
            let error= JSON.parse(data.error);  
            showError(document.getElementById("message-main"), error.error_message);          
        }
        listCategories(); 
    });
}
function clearForm(){
    document.getElementById("txt-cat-name").value=""; 
    resetMessageElement(document.getElementById("message-form"));   
}function addCategory(){
    clearForm();
    openPopup();
}function saveCategory(){ 
    if(!validateForm()){
        return;
    }
    const params= {
        "service": "save_category"        
    };
    const catData = {
        "cat_name": document.getElementById("txt-cat-name").value,
    };
    postData(params,catData).then((data) => {
        if(data.error){
            let error= JSON.parse(data.error);
            showError(document.getElementById("message-form"), error.error_message);
        } else {
            closePopup();            
            listCategories();    
             showSuccess(document.getElementById("message-main"),"New Category has been added.");        
        }        
    });
}
function validateForm(){
    if(document.getElementById("txt-cat-name").value == ""){
        showError(document.getElementById("message-form"),"Category Name is mandatory.");
        return false;
    }
    return true;    
}