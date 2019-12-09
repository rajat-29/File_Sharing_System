var table;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    today = + dd + '-' + getMonths(mm) + '-' + yyyy; 

$(document).ready(function() {
	table = $('#datatableses').DataTable({
		"processing": true,
		"serverSide": true,
		"dataSrc":"",
		"ajax": {
			"url": "/user/recentFiles",
			"type": "POST",
			"data": function ( d )
            {
                d.entryDate = today;
            }, 
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

function getMonths(mno) {
    var month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    return month[mno-1];
}