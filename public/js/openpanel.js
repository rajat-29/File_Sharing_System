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

function openuserlist()
{
    window.location = '/admin/manage_users';
}

function allFiles()
{
    window.location = '/admin/manage_files';
}



function uploadFile()
{
    window.location = '/user/uploadFile';
}

function sendFileRecords()
{
    window.location = '/user/sendFileRecords';
}

function recentFiles()
{
    window.location = "/user/recentFiles";
}

function receivedFiles()
{
    window.location = "/user/receivedFiles";
}

function changepassword()
{
    window.location = "/login/changePassword";
}

function openlogoutpage()
{
    $.confirm({
    theme: 'supervan',
    title: 'Confirm Logout!',
    content: 'Do you really want logout?',
    draggable: true,
    buttons: {
        Yes: {
            action: function () {
             window.location = "/login/logout";
        }
    },
        No: {
             action: function () {}
    },
    }
    });
}

function editProfile()
{
    window.location = '/login/editProfile';
}