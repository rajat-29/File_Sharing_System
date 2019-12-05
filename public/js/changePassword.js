var oldpass = document.getElementById('oldpass');
var newpass = document.getElementById('newpass');
var submitbtn = document.getElementById('submitbtn');
var len,small,big,no,mat;

function checkPassword() {
	checkLength();
	checkCapital(oldpass.value);
	checkSmall(oldpass.value);
	checkNumber(oldpass.value);
	backCheck(oldpass.value);
	matchPassword();
}

function checkLength() {
	if(oldpass.value.length > 7)
	{
		document.getElementById("8char").className = "glyphicon glyphicon-ok";
		document.getElementById("8char").style.color = "green";
		len = 1;
	}
}

function checkCapital(strings) {
	if(strings.search(/[A-Z]/) > 0)
	{
		document.getElementById("ucase").className = "glyphicon glyphicon-ok";
		document.getElementById("ucase").style.color = "green";
		big = 1;

	}
}

function checkSmall(strings) {
	if(strings.search(/[a-z]/) >= 0)
	{
		document.getElementById("lcase").className = "glyphicon glyphicon-ok";
		document.getElementById("lcase").style.color = "green";
		small = 1;
	}
}

function checkNumber(strings) {
	if(strings.search(/[0-9]/) > 0)
	{
		document.getElementById("num").className = "glyphicon glyphicon-ok";
		document.getElementById("num").style.color = "green";
		no = 1;
	}
}

function matchPassword()
{

	if(oldpass.value == newpass.value)
	{
		document.getElementById("pwmatch").className = "glyphicon glyphicon-ok";
		document.getElementById("pwmatch").style.color = "green";
		mat = 1;
	}
	if(newpass.value.length < oldpass.value.length || newpass.value.length > oldpass.value.length)
	{
		document.getElementById("pwmatch").className = "glyphicon glyphicon-remove";
		document.getElementById("pwmatch").style.color = "red";
		mat = 0;
	}
}

function backCheck(strings)
{
    if(strings.search(/[0-9]/) < 0)
	{
		document.getElementById("num").className = "glyphicon glyphicon-remove";
		document.getElementById("num").style.color = "red";
		len = 0;
	}	
	if(strings.search(/[a-z]/) < 0)
	{
		document.getElementById("lcase").className = "glyphicon glyphicon-remove";
		document.getElementById("lcase").style.color = "red";
		small = 0;
	}
	if(strings.search(/[A-Z]/) < 0)
	{
		document.getElementById("ucase").className = "glyphicon glyphicon-remove";
		document.getElementById("ucase").style.color = "red";
		big = 0;
	}
	if(oldpass.value.length < 7)
	{
		document.getElementById("8char").className = "glyphicon glyphicon-remove";
		document.getElementById("8char").style.color = "red";
		no = 0;
	}
}

submitbtn.addEventListener("click", function() {
	if(oldpass.value == '' || newpass.value == '')
    {
        alert("Field is Empty")
        return;
    }

    if(len == 1 && small == 1 && big == 1 && no == 1 && mat == 1)
    {
    	
    }
    else
    {
    	alert('All Parameters are not fulfilled');
    	return;
    }
})