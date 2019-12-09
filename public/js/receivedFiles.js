var table;

$(document).ready(function() {
	table = $('#datatableses').DataTable({
		"processing": true,
		"serverSide": true,
		"dataSrc":"",
		"ajax": {
			"url": "/user/receivedFiles",
			"type": "POST",
		},
		"columns": [
		{
				"data" : "originalName"
		},
		{
				"data" : "from", "orderable": false
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
                  return '<center><span class="actionbut editbut" id="editbut" onclick=downloadFiles("'+row._id+'","'+encodeURIComponent(row.originalName)+'")><i class="fas fa-download"></i></center>'

                }
        }],
	});

	$('#refresh').on('click', function () {
        table.ajax.reload(null, false);
   	});

});

function downloadFiles(ides,namess)
{
    window.location = '/user/downloadSendFiles/' + namess;
}