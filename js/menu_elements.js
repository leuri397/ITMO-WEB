if (document.location.toString().split('/').pop().match("index.html*"))
{
    var nav_panel = document.getElementsByTagName("nav").item(0).children;
    for (element of nav_panel)
    {
        if (element.innerText === "Главная")
        {
            element.className = "current-page";
        }
    }
}
else if (document.location.toString().split('/').pop().match("additional_content.html*"))
{
    var nav_panel = document.getElementsByTagName("nav").item(0).children;
    for (element of nav_panel)
    {
        if (element.innerText === "Дополнительный контент")
        {
            element.className = "current-page";
        }
    }
}

let navigation = document.getElementsByTagName("nav");
elements = navigation[0].children;
for (element in elements){
    elements[element].addEventListener("mouseenter", function( event ) {
    event.target.style.color = "#ffbf00";
    event.target.style.textShadow = "0px 0px 20px #ffbf00";
    setTimeout(function() {
        event.target.style.color = "";
        event.target.style.textShadow = "0 0 5px #a50068";
    }, 500);
    }, false);
}
