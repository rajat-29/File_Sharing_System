var adding = document.getElementById('submit-btn');
var cancel_addUser = document.getElementById('cancel-btn');

 $('.uploadImage').submit(function(e){
     
    var title = $('#title').val();
    var message = $('#message').val();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    today = + dd + '-' + getMonths(mm) + '-' + yyyy; 
     
    $(this).ajaxSubmit({
       data: {title: title,entryDate: today,message: message},
       contentType: 'application/json',
       success: function(response){
	        if(response == 'false')
	        {
	         	alert('Files are Not Uploaded');
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