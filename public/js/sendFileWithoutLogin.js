var cancel_file = document.getElementById('cancel-btn');
var flag = 0;
var flag1 = 0;

cancel_file.addEventListener("click", function(){
	window.location = '/login/index';
})

 $('.uploadImage').submit(function(e){
     
    var emailFrom = $('#title').val();
    var emailTo = $('#emailTo').val();
    var message = $('#message').val();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    today = + dd + '-' + getMonths(mm) + '-' + yyyy; 

     if(flag == 1)
    {
      alert('From Email not  Correct')
      return false;
    }
     if(flag1 == 1)
    {
      alert('To Email not  Correct')
      return false;
    }
     
    $(this).ajaxSubmit({
       data: {emailFrom: emailFrom,emailTo: emailTo,entryDate: today,message: message},
       contentType: 'application/json',
       success: function(response){
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
	         	alert('Files are Uploaded');
	         	location.reload();
	        }   
        }
   });
     return false;
});

function getMonths(mno) {
    var month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    return month[mno-1];
}

function email_avail()
{  
  flag = 0;
  var obj1 = new Object();
  obj1.email = $('#title').val();
  
  var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkemail");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj1));
    request.addEventListener("load",function() {
      var data = request.responseText;
      
      if(data === 'false') {
        flag = 1;
      }
    });  
}

function email_availTo()
{  
  flag1 = 0;
  var obj1 = new Object();
  obj1.email = $('#emailTo').val();
  
  var request = new XMLHttpRequest();
    request.open('POST',"/admin/checkemail");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj1));
    request.addEventListener("load",function() {
      var data = request.responseText;
      if(data === 'false') {
        flag1 = 1;
      }
    });  
}