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
