var user_name = document.getElementById('user_name');
var user_pass = document.getElementById('user_pass');
var user_submit = document.getElementById('user_submit');
var signUp = document.getElementById('signUp');
var sendFile = document.getElementById('sendFile');

user_submit.addEventListener("click", function() {
	if(user_name.value == '' || user_pass == '')
	{
		$.confirm({
	      title: 'Fields ?',
	      content: "Field is Empty !! ",
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
	request.open('POST',"/login/checkLogin");
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify({email : user_name.value,password : user_pass.value}));
	request.addEventListener("load", function() {
		var data = request.responseText;
		if(data == 'false')	{
			$.confirm({
		      title: 'Password ?',
		      content: "Password Doesn't Match !! ",
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
		else if(data == 'not exits') {
			$.confirm({
		      title: 'Email ?',
		      content: "Email not exits !! ",
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
		else if(data == 'deactivate') {
			$.confirm({
				title: 'Account ?',
				content: "Account has been deactivated !! ",
				draggable: true,
				buttons: {
				  OK: {
					  btnClass: 'btn-danger any-other-class',
					   action: function () {}
					},
				}
			});
		}
		else if(data == 'dobEmpty')	{
			window.location = "/login/newProfileUpdate";
		}
		else {
			window.location = data;
		}
	})
})