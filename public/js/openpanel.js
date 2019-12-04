function openbar()
{
    var element = document.getElementById("viewscreen");
    element.classList.toggle("toggle-pc");

    var element = document.getElementById("sidebar");
    element.classList.toggle("sidebar-width");


    var element = document.getElementById("rightview");
    element.classList.toggle("set-rightview");
}

function dashboard()
{
    window.location = '/login/home';
}

function open_adduser_page()
{
    window.location = '/admin/addUser';
}