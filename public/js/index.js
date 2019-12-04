var user_name = document.getElementById('user_name');
var user_pass = document.getElementById('user_pass');
var user_submit = document.getElementById('user_submit');

user_submit.addEventListener("click", function() {
	if(user_name.value == '' || user_pass == '')
	{
		alert('Field is Empty');
		return;
	}

	var request = new XMLHttpRequest();
	request.open('POST',"/login/checkLogin");
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify({email : user_name.value,password : user_pass.value}));
	request.addEventListener("load", function() {
		var data = JSON.parse(request.responseText);
		
	})

})