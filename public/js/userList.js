var d;
var nameses = document.getElementById("nameses");
var username = document.getElementById("username");
var phone = document.getElementById("phone");
var city = document.getElementById("city");
var status = document.getElementById("status");
var role = document.getElementById("role");
var subject = document.getElementById("subject");
var to = document.getElementById("to");
var table;

$(document).ready(function() {
	table = $('#datatableses').DataTable({
		"processing": true,
		"serverSide": true,
		"dataSrc":"",
		"ajax": {
			"url": "/admin/showuser",
			"type": "POST",
			"data": function ( d )
            {
                d.role   = $('#roles').val();
                d.status = $('#selectoption').val();
            }, 
		},
		"columns": [
		{
				"data" : "email"
		},
		{
				"data" : "phone", "orderable": false
		},
		{
				"data" : "city"
		},
		{
				"data" : "status"
		},
		{
				"data" : "role"
		},
		{
				"data" : null, "orderable": false
		},
		],
		"columnDefs": [{
            "targets": -1,

                "render": function (data, type, row, meta) {  
              	if(data.role == "Admin")
                	return '<center><span class="actionbut emailbut" id="emailbut" data-toggle="modal" data-target="#myModal"><i class="fas fa-envelope"></i></span><span class="actionbut editbut" id="editbut" data-toggle="modal" data-target="#updateModal"><i class="fas fa-edit"></i></span></center>';
                else
                  return '<center><span class="actionbut emailbut" id="emailbut" data-toggle="modal" data-target="#myModal"><i class="fas fa-envelope"></i></span><span class="actionbut editbut" id="editbut" data-toggle="modal" data-target="#updateModal"><i class="fas fa-edit"></i></span><span class="actionbut activatebut" id="activatebut" onclick=reactivateUser("'+row._id+'","'+row.name+'","'+row.flag+'")><i class="fa fa-check-circle"></i></span></center>'

                }
        }],
	});
});