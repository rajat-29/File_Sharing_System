function changePassword () {
	window.location = '/login/changePassword';
}

function homePage () {
	window.location = '/login/home';
}

function updateUserDetails () {
	var user_email = $('#user_email').val();
	var user_name = $('#user_name').val();
	var birth_date = $('#birth_date').val();
	var user_gender = $('#user_gender').val();
	var user_phone = $('#user_phone').val();
	var user_city = $('#user_city').val();
	var photoname = $('#profilepic').attr('src');

	var obj = new Object();
	obj.email = user_email;
	obj.name = user_name;
	obj.dob = birth_date;
	obj.gender = user_gender;
	obj.phone = user_phone;
	obj.city = user_city;
	obj.status = 'Confirmed';
	obj.photoname = photoname;

	if(birth_date == '' || user_gender == '' || user_phone == '' || user_city == '')
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
	else if(user_phone.length<10 || user_phone.length>10)
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

	var request = new XMLHttpRequest();
			request.open('POST', '/admin/updateuserdetails');
			request.setRequestHeader("Content-Type","application/json");
			request.send(JSON.stringify(obj))
			request.addEventListener("load",function()
        	{ 
        		alert("Data Updated Successfully");
			     window.location = '/login/home';     

        	});
}

 $('#userImage').submit(function(e){

    $(this).ajaxSubmit({
    	data: {title: 'abc'},
       contentType: 'application/json',
       success: function(response){
       	console.log(response)
	        if(response == 'false')
	        {
	         	alert('Files are Not Uploaded');
            location.reload();
	        } 
	        else if(response == 'format')
	        {
	           alert("File Format is not correct")
	        }
	        else
	        {
	         	window.location = '/login/editProfile'
	        }   
        }
   });
  return false;
});