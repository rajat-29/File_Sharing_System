var table;

$(document).ready(function() {
	table = $('#datatableses').DataTable({
		"processing": true,
		"serverSide": true,
		"dataSrc":"",
		"ajax": {
			"url": "/user/showSendFiles",
			"type": "POST",
		},
		"columns": [
		{
				"data" : "originalName"
		},
		{
				"data" : "to", "orderable": false
		},
		{
				"data" : "message"
		},
		{
				"data" : "type"
		},
		{
				"data" : "entryDate"
		},
		{
				"data" : null, "orderable": false
		},
		],
		"columnDefs": [{
            "targets": -1,

                "render": function (data, type, row, meta) {  
                  return '<center><span class="actionbut editbut" id="editbut" data-toggle="modal" data-target="#updateModal"><i class="fas fa-edit"></i></span><span class="actionbut activatebut" id="activatebut" onclick=reactivateUser("'+row._id+'","'+row.name+'","'+row.flag+'")><i class="fa fa-check-circle"></i></span></center>'

                }
        }],
	});

	$('#refresh').on('click', function () {
        table.ajax.reload(null, false);
   	});

});
