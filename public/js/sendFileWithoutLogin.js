var cancel_file = document.getElementById('cancel-btn');

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
