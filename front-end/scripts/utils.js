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
            break;

        case "DEL":
            iElement.classList.add("fa");
            iElement.classList.add("fa-trash");
            break;
    }
    return iElement;
}