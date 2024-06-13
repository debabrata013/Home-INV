function clearTable(tblElem){
    tblElem.removeChild(tblElem.getElementsByTagName("tbody")[0]);
}function createTableBody(){
    const tBody = document.createElement("tbody");
    return tBody;
}
function createTableRow(){
    const tr = document.createElement("tr");
    return tr;
}
function createTableCell(){
    const td = document.createElement("td");     
    return td;
}
function createIcon(iconType){
    const iElement = document.createElement("i");
    switch(iconType){
        
        case "EDIT": 
        iElement.classList.add("fa");
        iElement.classList.add("fa-edit");
        iElement.classList.add("fa-fw");           
            break;

        case "DEL":
            iElement.classList.add("fa");
            iElement.classList.add("fa-trash");
            break;
    }
    return iElement;
}function createOption(){
    const option = document.createElement("option");
    return option;
}
function clearOptions(selectElem){
    const optionsLength = selectElem.options.length;
    for(let i=optionsLength; i>0; i--){
        selectElem.remove(i);
    }    
}