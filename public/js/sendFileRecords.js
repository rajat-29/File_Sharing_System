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
                  return '<center><span class="actionbut editbut" id="editbut" onclick=downloadFiles("'+row._id+'","'+encodeURIComponent(row.originalName)+'")><i class="fas fa-download"></i></span><span class="actionbut deactivatebut" id="deactivatebut" onclick=deleteFiles("'+row._id+'","'+encodeURIComponent(row.originalName)+'")><i class="fa fa-trash"></i></span></center>'

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

function deleteFiles(ides,namess)
{
	var obj1 = new Object();
	obj1._id = ides;
				
	$.confirm({
    	title: 'Delete File ?',
    	content: "Are you sure to Delete " + namess,
    	draggable: true,
   		buttons: {
        Yes: {
             btnClass: 'btn-success any-other-class',
            	action: function () {
            	 btnClass: 'btn-red any-other-class'
            	var request = new XMLHttpRequest()
				request.open('POST','/user/deleteSendFiles');
				request.setRequestHeader("Content-Type","application/json");
				request.send(JSON.stringify(obj1))
				request.addEventListener("load",function()
        		{
         			table.ajax.reload(null, false);
        		});			
        	}
   		},
        No: {
            btnClass: 'btn-danger any-other-class',
             action: function () {      
        	}
   		},
    	}
		});
}