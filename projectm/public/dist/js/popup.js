function overlay() {
    el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    
}
function restore() {
    el.style.visibility = (el.style.visibility == "hidden") ? "visible" : "hidden";
    

}
