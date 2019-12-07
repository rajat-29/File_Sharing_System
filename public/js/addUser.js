var user_name = document.getElementById('user_name');
var user_email = document.getElementById('user_email');
var user_pass = document.getElementById('user_pass');
var user_phone = document.getElementById('user_phone');
var user_city = document.getElementById('user_city');
var user_role = document.getElementById('user_role');
var user_gender = document.getElementById('user_gender')
var adding = document.getElementById('submit-btn');
var cancel_addUser = document.getElementById('cancel-btn');

adding.addEventListener("click", function() {  

	var ph = user_phone.value;

	if(user_name.value == '' || user_email.value == '' || user_phone.value == '' || user_city.value == '')
	{
		
			alert("Field can't be Empty");
			return false;
	}
	else if(ph.length<10 || ph.length>10)
	{
		alert('Phone No should be of length 10');
		return;
	}

	if(!ValidateEmail(user_email.value))
	{
		alert('Email format is not valid')
		return;
	}
	
	var obj = new Object();
	obj.name = user_name.value;
	obj.email = user_email.value;
	obj.password = user_pass.value;
	obj.phone = user_phone.value;
	obj.city = user_city.value;
	obj.gender = user_gender.value;
	obj.dob = "-";
	obj.role = user_role.value;
	obj.status = 'Pending';
	obj.photoname = '/default.png'
	obj.flag = 0;

   	var request = new XMLHttpRequest();
    request.open('POST',"/admin/addnewuser");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj))
    request.addEventListener("load",function() {
         alert("New User is Registered");
         location.reload();
    });  
})

function ValidateEmail(mail) 
{
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
   {
    return (true)
   }
    return (false)
}

cancel_addUser.addEventListener("click", function(){
	location.reload();
})