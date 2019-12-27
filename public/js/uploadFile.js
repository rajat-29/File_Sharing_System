var cancel_addUser = document.getElementById('cancel-btn');
var flag = 0;

 $('.uploadImage').submit(function(e){
     
    var title = $('#title').val();
    var message = $('#message').val();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    today = + dd + '-' + getMonths(mm) + '-' + yyyy; 

    if(flag == 1)
    {
      alert('Email not  Correct')
      return false;
    }
     
    $(this).ajaxSubmit({
       data: {title: title,entryDate: today,message: message},
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

cancel_addUser.addEventListener("click", function(){
	location.reload();
})

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