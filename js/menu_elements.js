
var nav_panel = document.getElementsByTagName("nav").item(0).children;
for (element of nav_panel)
{
    if (element.href === document.location.toString())
    {
        element.className = "current-page";
    }
}

let navigation = document.getElementsByTagName("nav");
elements = navigation[0].children;
for (element in elements){
    elements[element].addEventListener("mouseenter", function( event ) {

    event.target.style.color = "#ffbf00";
    event.target.style.textShadow = "0 0 20px #ffbf00";

    }, false);
    elements[element].addEventListener("mouseleave", function( event ) {
        setTimeout(function() {

        event.target.style.color = "";
        event.target.style.textShadow = "0 0 5px #a50068";
        
        }, 200);
     }, false);
}
