var user_name = document.getElementById('user_name');
var user_email = document.getElementById('user_email');
var user_pass = document.getElementById('user_pass');
var user_phone = document.getElementById('user_phone');
var user_city = document.getElementById('user_city');
var user_role = document.getElementById('user_role');
var user_gender = document.getElementById('user_gender')
var adding = document.getElementById('submit-btn');
var cancel_addUser = document.getElementById('cancel-btn');
var flag = 0;

adding.addEventListener("click", function() {  

	var ph = user_phone.value;

	if(user_name.value == '' || user_email.value == '' || user_phone.value == '' || user_city.value == '')
	{
			$.confirm({
	    	title: 'Fields ?',
	    	content: "Fields can't be Empty ",
	    	draggable: true,
	   		buttons: {
	        OK: {
	            btnClass: 'btn-danger any-other-class',
	             action: function () {      
	        	}
	   		},
	    	}
			});
			return false;
	}
	else if(ph.length<10 || ph.length>10)
	{
		$.confirm({
	    	title: 'Phone No ?',
	    	content: "Phone No should be of length 10 ",
	    	draggable: true,
	   		buttons: {
	        OK: {
	            btnClass: 'btn-danger any-other-class',
	             action: function () {      
	        	}
	   		},
	    	}
		});
		return;
	}

	if(!ValidateEmail(user_email.value))
	{
		$.confirm({
	    	title: 'Email format ?',
	    	content: "Email format is not valid ",
	    	draggable: true,
	   		buttons: {
	        OK: {
	            btnClass: 'btn-danger any-other-class',
	             action: function () {      
	        	}
	   		},
	    	}
		});
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
	obj.flag = 1;

	if(flag == 1)
	{
		$.confirm({
		      title: 'User ?',
		      content: "User Is Already Registred !! ",
		      draggable: true,
		      buttons: {
		        OK: {
		            btnClass: 'btn-danger any-other-class',
		             action: function () { 
		          }
		          },
		          }
		    });
	}
	else
	{
		var request = new XMLHttpRequest();
	    request.open('POST',"/admin/addnewuser");
	    request.setRequestHeader("Content-Type","application/json");
	    request.send(JSON.stringify(obj))
	    request.addEventListener("load",function() {
	         $.confirm({
		    	title: 'New User ?',
		    	content: "New User is Registered ",
		    	draggable: true,
		   		buttons: {
		        OK: {
		            btnClass: 'btn-danger any-other-class',
		             action: function () {  
		             location.reload();    
		        	}
		   		},
		    	}
			});
	    });
	}
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


function email_avail()
{
	document.getElementById("email_info").style.display = 'visible';
	document.getElementById("email_info").style.display = 'block';
	document.getElementById("email_info").style.marginTop = '10px';
	document.getElementById("email_info").style.marginBottom = '10px';
	
	var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkemail");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({email: user_email.value}));
    request.addEventListener("load",function() {
    	var data = request.responseText;
    	if(data === 'true') {
    		display_email.innerHTML= "User " + user_email.value + " is already exist";
    		flag = 1;
    	}
    	else {
            display_email.innerHTML= user_email.value + " is available";
            flag = 0;
    	}
    });  
}