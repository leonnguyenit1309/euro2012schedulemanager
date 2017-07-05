$(function() {
	$.fn.dataTable.ext.errMode = 'throw';
	// $.fn.dataTable.ext.errorMode = "none";
	// $.fn.dataTable.ext.errMode = function ( settings, helpPage, message ) {
	//     console.log(message);
	// };

	/* Lang Data */
	var applang = {
		datatable_lang: {
			"sProcessing": "Đang xử lý...",
			"sLengthMenu": "Hiển thị _MENU_ mục",
			"sZeroRecords": "Không tìm thấy dữ liệu nào phù hợp",
			"sInfo": "Đang xem từ _START_ đến _END_ trong tổng số _TOTAL_ mục",
			"sInfoEmpty": "Đang xem 0 đến 0 trong tổng số 0 mục",
			"sInfoFiltered": "(được lọc từ _MAX_ mục)",
			"sInfoPostFix": "",
			"sSearch": "Tìm kiếm:",
			"sUrl": "",
			"oPaginate": {
				"sFirst": "Đầu",
				"sPrevious": "Trước",
				"sNext": "Tiếp",
				"sLast": "Cuối"
			}
		},
		dialog: {
			confirm: {
				delete_title: "Xác nhận xóa dữ liệu.",
				delete_message: "Bạn có chắc là muốn xóa thông tin này không?"
			}
		}
	};

	/* Functions Utilities */
	/* Make a full site url from url and request data type: html or json */
	var site_url = function(uri, type) {
		type = typeof type !== 'undefined' ? type : "html";
		uri = typeof uri !== 'undefined' ? uri : baseurl;
		if (uri === baseurl) {
			return baseurl;
		} else {
			return baseurl + uri + "." + type;
		}
	};

	var image_url = function(image_path) {
		image_path = typeof image_path !== 'undefined' ? image_path : "";
		return baseurl + '/resources/images/' + image_path;
	};

	var site_image = function(image_path, stuff_options) {
		image_path = typeof image_path !== 'undefined' ? image_path : "";
		stuff_options = typeof stuff_options !== 'undefined' ? stuff_options : "";
		return '<img src="' + image_url(image_path) + '" ' + stuff_options + ' />';
	};

	/* Redirect to a page by it uri */
	var go_to_page = function(uri) {
		window.location.replace(site_url(uri));
	};

	var form_change = function( type, title, action ){
		type = typeof type !== 'undefined' ? type : "add";
		title = typeof title !== 'undefined' ? title : "";
		action = typeof action !== 'undefined' ? action : "";

		if ( type === 'add' ) {
			$('.form-title').html(title);
			$('.save-btn').attr('value', 'POST');
			$('.save-btn').html('<i class="glyphicon glyphicon-plus"></i>&nbsp;Thêm');

		}

		if ( type === 'update' ) {
			$('.form-title').html(title);
			$('.save-btn').attr('value', 'PUT');
			$('.save-btn').html('<i class="glyphicon glyphicon-floppy-disk"></i>&nbsp;Cập nhật');
		}
		$('.form-action').attr('action',  action );

	};

	/* Show a popup message notify */
	var show_notify = function(message, notify_type) {
		message = typeof message !== 'undefined' ? message : "Thông báo";
		notify_type = typeof notify_type !== 'undefined' ? notify_type : "info";
		$.notify({
			// options
			icon: 'fa fa-2x fa-' + notify_type,
			message: message
		}, {
			// settings
			type: notify_type,
			placement: {
				from: "bottom",
				align: "center"
			},
			animate: {
				enter: 'animated bounceInUp',
				exit: 'animated bounceOutDown'
			},
			delay: 3000,
			offset: {
				y: 0
			}
		});
	};



	/*=================================*/
	/*    ACTIONS FOR GROUPS   */
	/*=================================*/
	if ($('#groups-content').length !== 0) {


		/*Load groups data table*/
		var datatbl = $('#tblGroups').DataTable({
			"processing": true,
			"ajax": site_url('/api/v1/groups', 'json'),
			"columns": [{
				"data": "groupName"
			}, {
				data: function(row, type, set) {
					var edit_link = site_url('/dashboard/groups/' + row.groupId, 'json');
					return '<a class="edit-link" href="javascript;;" title="' + row.groupId + '" ><i class="fa fa-edit fa-lg" ></i>Cập nhật</a> &nbsp; <a class="delete-link" href="javascript;;" title="' + row.groupId + '"><i class="fa fa-trash-o fa-lg"></i>Xóa</a>';
				}
			}],
			"pageLength": 5,
			"lengthMenu": [
			[5, 10, 20, -1],
			[5, 10, 20, "All"]
			],
			columnDefs: [{
				targets: [0],
				"searchable": true
			}, {
				targets: [1],
				"orderable": false,
				"searchable": false
			}],
			"language": applang.datatable_lang
		});

		/* Delete groups action */
		$('#tblGroups').on('click', 'a.delete-link', function(event) {
			var group_id = $(this).attr('title');
			var url = site_url('/api/v1/groups/' + group_id, 'json');
			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-flag" ></i> ' + applang.dialog.confirm.delete_title,
				message: 'Bạn có chắc là muốn xóa bảng đấu có mã "' + group_id + '" không?',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$.ajax({
							url: url,
							type: 'DELETE',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								if (data.status === "success") {
									show_notify("<strong>Thông báo:</strong> " + data.message);
									datatbl.ajax.reload();

								} else {
									show_notify("<strong>Thông báo:</strong> " + data.message, "alert");
								}
							}
						});
					}
				}
			});
			event.preventDefault();
		});


		$('#groups-content').on('click', '.add-show-form', function(event) {
			form_change('add', 'Thêm bảng đấu', site_url('/api/v1/groups', 'json') );
			event.preventDefault();
		});


		$('#tblGroups').on('click', 'a.edit-link', function(event) {

			var group_id = $(this).attr("title");

			form_change('update', 'Cập nhật thông tin bảng đấu', site_url('/api/v1/groups/' + group_id, 'json') );


			$.ajax({
				url: site_url('/api/v1/groups/' + group_id, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					if (data.hasOwnProperty('group') || data.status === "success") {
						$('#groupId').val(data.group.groupId);
						$('#groupName').val(data.group.groupName);
					} else {
						show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
					}
				}
			});

			event.preventDefault();
		});

		// Form validation and Submit form
		$('#frmGroup').validate({
			rules: {
				groupName: {
					required: true,
					minlength: 2,
					maxlength: 200,
				}
			},
			messages:{
				groupName: {
					required: "Tên bảng đấu không được để trống.",
					minlength: "Tên bảng đấu phải nhiều hơn {0} kí tự.",
					maxlength: "Tên bảng đấu phải ít hơn {0} kí tự",
				}
			},
			errorClass: 'help-block col-lg-6',
			errorElement: 'span',
			highlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
			},
			submitHandler : function(form) {


		 		// Begin form actions
		 		var groupName = $('#groupName').val();
		 		var groupId = $('#groupId').val();

		 		var ajax_url = $(form).attr('action');
		 		var method = $('.save-btn').attr('value');

		 		var json = {
		 			"groupId": groupId,
		 			"groupName": groupName
		 		};

		 		$.ajax({
		 			url: ajax_url,
		 			data: JSON.stringify(json),
		 			type: method,
		 			contentType: 'application/json',
		 			beforeSend: function(xhr) {
		 				xhr.setRequestHeader("Accept", "application/json");
		 				xhr.setRequestHeader("Content-Type", "application/json");
		 			},
		 			success: function(data) {
		 				if (data.hasOwnProperty('group') || data.status === "success") {
		 					show_notify("<strong>Thông báo:</strong> " + data.message);
		 					datatbl.ajax.reload();
		 				} else {
		 					show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
		 				}
		 			}
		 		});

		 		return false;
		 	}
		 });

	}



	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR Stages   */
	/*=================================*/
	if ($('#stages-content').length !== 0) {


		/*Load stages data table*/
		var datatbl = $('#tblStages').DataTable({
			"processing": true,
			"ajax": site_url('/api/v1/stages', 'json'),
			"columns": [{
				"data": "stageName"
			}, {
				data: function(row, type, set) {
					var edit_link = site_url('/dashboard/stages/' + row.stageId, 'json');
					return '<a class="edit-link" href="javascript;;" title="' + row.stageId + '" ><i class="fa fa-edit fa-lg" ></i>Cập nhật</a> &nbsp; <a class="delete-link" href="javascript;;" title="' + row.stageId + '"><i class="fa fa-trash-o fa-lg"></i>Xóa</a>' ;
				}
			}],
			"pageLength": 5,
			"lengthMenu": [
			[5, 10, 20, -1],
			[5, 10, 20, "All"]
			],
			columnDefs: [{
				targets: [0],
				"searchable": true
			}, {
				targets: [1],
				"orderable": false,
				"searchable": false
			}],
			"language": applang.datatable_lang
		});


		/* Delete stages action */
		$('#tblStages').on('click', 'a.delete-link', function(event) {
			var stage_id = $(this).attr('title');
			var url = site_url('/api/v1/stages/' + stage_id, 'json');
			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-"' + pageIconCss + ' ></i> ' + applang.dialog.confirm.delete_title,
				message: 'Bạn có chắc là muốn xóa vòng đấu có mã "' + stage_id + '" không?',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$.ajax({
							url: url,
							type: 'DELETE',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								if (data.status === "success") {
									show_notify("<strong>Thông báo:</strong> " + data.message);
									datatbl.ajax.reload();

								} else {
									show_notify("<strong>Thông báo:</strong> " + data.message, "alert");
								}
							}
						});
					}
				}
			});
			event.preventDefault();
		});


		$('#stages-content').on('click', '.add-show-form', function(event) {
			form_change('add', 'Thêm vòng đấu', site_url('/api/v1/stages', 'json') );
			event.preventDefault();
		});


		$('#tblStages').on('click', 'a.edit-link', function(event) {

			var stage_id = $(this).attr("title");

			form_change('update', 'Cập nhật thông tin vòng đấu', site_url('/api/v1/stages/' + stage_id, 'json') );


			$.ajax({
				url: site_url('/api/v1/stages/' + stage_id, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					if (data.hasOwnProperty('stage') || data.status === "success") {
						$('#stageId').val(data.stage.stageId);
						$('#stageName').val(data.stage.stageName);
					} else {
						show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
					}
				}
			});

			event.preventDefault();
		});

		// Form validation and Submit form
		$('#frmStage').validate({
			rules: {
				stageName: {
					required: true,
					minlength: 2,
					maxlength: 200,
				}
			},
			messages:{
				stageName: {
					required: "Tên vòng đấu không được để trống.",
					minlength: "Tên vòng đấu phải nhiều hơn {0} kí tự.",
					maxlength: "Tên vòng đấu phải ít hơn {0} kí tự",
				}
			},
			errorClass: 'help-block col-lg-6',
			errorElement: 'span',
			highlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
			},
			submitHandler : function(form) {


		 		// Begin form actions
		 		var stageName = $('#stageName').val();
		 		var stageId = $('#stageId').val();

		 		var ajax_url = $(form).attr('action');
		 		var method = $('.save-btn').attr('value');

		 		var json = {
		 			"stageId": stageId,
		 			"stageName": stageName
		 		};

		 		$.ajax({
		 			url: ajax_url,
		 			data: JSON.stringify(json),
		 			type: method,
		 			contentType: 'application/json',
		 			beforeSend: function(xhr) {
		 				xhr.setRequestHeader("Accept", "application/json");
		 				xhr.setRequestHeader("Content-Type", "application/json");
		 			},
		 			success: function(data) {
		 				if (data.hasOwnProperty('stage') || data.status === "success") {
		 					show_notify("<strong>Thông báo:</strong> " + data.message);
		 					datatbl.ajax.reload();
		 				} else {
		 					show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
		 				}
		 			}
		 		});

		 		return false;
		 	}
		 });

	}



	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR StandingTypes   */
	/*=================================*/
	if ($('#standingtypes-content').length !== 0) {


		/*Load standingtypes data table*/
		var datatbl = $('#tblStandingTypes').DataTable({
			"processing": true,
			"ajax": site_url('/api/v1/standingtypes', 'json'),
			"columns": [{
				"data": "standingTypeName"
			}, {
				data: function(row, type, set) {
					var edit_link = site_url('/dashboard/standingTypes/' + row.standingTypeId, 'json');
					return '<a class="edit-link" href="javascript;;" title="' + row.standingTypeId + '" ><i class="fa fa-edit fa-lg" ></i>Cập nhật</a> &nbsp; <a class="delete-link" href="javascript;;" title="' + row.standingTypeId + '"><i class="fa fa-trash-o fa-lg"></i>Xóa</a>' ;
				}
			}],
			"pageLength": 5,
			"lengthMenu": [
			[5, 10, 20, -1],
			[5, 10, 20, "All"]
			],
			columnDefs: [{
				targets: [0],
				"searchable": true
			}, {
				targets: [1],
				"orderable": false,
				"searchable": false
			}],
			"language": applang.datatable_lang
		});


		/* Delete standingtypes action */
		$('#tblStandingTypes').on('click', 'a.delete-link', function(event) {
			var standingType_id = $(this).attr('title');
			var url = site_url('/api/v1/standingtypes/' + standingType_id, 'json');
			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-"' + pageIconCss + ' ></i> ' + applang.dialog.confirm.delete_title,
				message: 'Bạn có chắc là muốn xóa loại bảng xếp hạng có mã "' + standingType_id + '" không?',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$.ajax({
							url: url,
							type: 'DELETE',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								if (data.status === "success") {
									show_notify("<strong>Thông báo:</strong> " + data.message);
									datatbl.ajax.reload();

								} else {
									show_notify("<strong>Thông báo:</strong> " + data.message, "alert");
								}
							}
						});
					}
				}
			});
			event.preventDefault();
		});


		$('#standingtypes-content').on('click', '.add-show-form', function(event) {
			form_change('add', 'Thêm loại bảng xếp hạng', site_url('/api/v1/standingtypes', 'json') );
			event.preventDefault();
		});


		$('#tblStandingTypes').on('click', 'a.edit-link', function(event) {

			var standingType_id = $(this).attr("title");

			form_change('update', 'Cập nhật thông tin loại bảng xếp hạng', site_url('/api/v1/standingtypes/' + standingType_id, 'json') );


			$.ajax({
				url: site_url('/api/v1/standingtypes/' + standingType_id, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					if (data.hasOwnProperty('standingType') || data.status === "success") {
						$('#standingTypeId').val(data.standingType.standingTypeId);
						$('#standingTypeName').val(data.standingType.standingTypeName);
					} else {
						show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
					}
				}
			});

			event.preventDefault();
		});

		// Form validation and Submit form
		$('#frmStandingType').validate({
			rules: {
				standingTypeName: {
					required: true,
					minlength: 10,
					maxlength: 200,
				}
			},
			messages:{
				standingTypeName: {
					required: "Tên loại bảng xếp hạng không được để trống.",
					minlength: "Tên loại bảng xếp hạng phải nhiều hơn {0} kí tự.",
					maxlength: "Tên loại bảng xếp hạng phải ít hơn {0} kí tự",
				}
			},
			errorClass: 'help-block col-lg-6',
			errorElement: 'span',
			highlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
			},
			submitHandler : function(form) {


		 		// Begin form actions
		 		var standingTypeName = $('#standingTypeName').val();
		 		var standingTypeId = $('#standingTypeId').val();

		 		var ajax_url = $(form).attr('action');
		 		var method = $('.save-btn').attr('value');

		 		var json = {
		 			"standingTypeId": standingTypeId,
		 			"standingTypeName": standingTypeName
		 		};

		 		$.ajax({
		 			url: ajax_url,
		 			data: JSON.stringify(json),
		 			type: method,
		 			contentType: 'application/json',
		 			beforeSend: function(xhr) {
		 				xhr.setRequestHeader("Accept", "application/json");
		 				xhr.setRequestHeader("Content-Type", "application/json");
		 			},
		 			success: function(data) {
		 				if (data.hasOwnProperty('standingType') || data.status === "success") {
		 					show_notify("<strong>Thông báo:</strong> " + data.message);
		 					datatbl.ajax.reload();
		 				} else {
		 					show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
		 				}
		 			}
		 		});

		 		return false;
		 	}
		 });
	}




	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR Nations   */
	/*=================================*/
	if ($('#nations-content').length !== 0) {


		/*Load nations data table*/
		var datatbl = $('#tblNations').DataTable({
			"processing": true,
			"ajax": site_url('/api/v1/nations', 'json'),
			"columns": [{
				data: function(row, type, set){
					var image_src  = site_url('/resources/images/flags/32x32/' + row.nationCode, 'png');
					return '<img alt="' + row.nationCode + '" src="' + image_src + '" />' + '&nbsp; <strong>' + row.nationName + '</strong> ('  + row.nationCode + ')';
				}
			}, {
				data: function(row, type, set) {
					var edit_link = site_url('/dashboard/nations/' + row.nationId, 'json');
					return '<a class="edit-link" href="javascript;;" title="' + row.nationId + '" ><i class="fa fa-edit fa-lg" ></i>Cập nhật</a> &nbsp; <a class="delete-link" href="javascript;;" title="' + row.nationId + '"><i class="fa fa-trash-o fa-lg"></i>Xóa</a>' ;
				}
			}],
			"pageLength": 5,
			"lengthMenu": [
			[5, 10, 20, -1],
			[5, 10, 20, "All"]
			],
			columnDefs: [{
				targets: [0],
				"searchable": true
			}, {
				targets: [1],
				"orderable": false,
				"searchable": false
			}],
			"language": applang.datatable_lang
		});


		/* Delete nations action */
		$('#tblNations').on('click', 'a.delete-link', function(event) {
			var nation_id = $(this).attr('title');
			var url = site_url('/api/v1/nations/' + nation_id, 'json');
			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-"' + pageIconCss + ' ></i> ' + applang.dialog.confirm.delete_title,
				message: 'Bạn có chắc là muốn xóa quốc gia có mã "' + nation_id + '" không?',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$.ajax({
							url: url,
							type: 'DELETE',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								if (data.status === "success") {
									show_notify("<strong>Thông báo:</strong> " + data.message);
									datatbl.ajax.reload();

								} else {
									show_notify("<strong>Thông báo:</strong> " + data.message, "alert");
								}
							}
						});
					}
				}
			});
			event.preventDefault();
		});


		$('#nations-content').on('click', '.add-show-form', function(event) {
			form_change('add', 'Thêm quốc gia', site_url('/api/v1/nations', 'json') );
			event.preventDefault();
		});


		$('#tblNations').on('click', 'a.edit-link', function(event) {

			var nation_id = $(this).attr("title");

			form_change('update', 'Cập nhật thông tin quốc gia', site_url('/api/v1/nations/' + nation_id, 'json') );


			$.ajax({
				url: site_url('/api/v1/nations/' + nation_id, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					if (data.hasOwnProperty('nation') || data.status === "success") {
						$('#nationId').val(data.nation.nationId);
						$('#nationName').val(data.nation.nationName);
						$('#nationCode').val(data.nation.nationCode);
					} else {
						show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
					}
				}
			});

			event.preventDefault();
		});

		// Form validation and Submit form
		$('#frmNation').validate({
			rules: {
				nationName: {
					required: true,
					minlength: 1,
					maxlength: 200,
				},
				nationCode: {
					required: true,
					minlength: 3,
					maxlength: 3,
				}
			},
			messages:{
				nationName: {
					required: "Tên quốc gia không được để trống.",
					minlength: "Tên quốc gia phải có nhiều hơn {0} kí tự.",
					maxlength: "Tên quốc gia phải có ít hơn {0} kí tự.",
				},
				nationCode: {
					required: "Mã quốc tế không được để trống.",
					minlength: "Mã quốc tế phải có chính xác {0} kí tự.",
					maxlength: "Mã quốc tế phải có chính xác {0} kí tự.",
				}
			},
			errorClass: 'help-block col-lg-6',
			errorElement: 'span',
			highlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
			},
			submitHandler : function(form) {


		 		// Begin form actions
		 		var nationId = $('#nationId').val();
		 		var nationName = $('#nationName').val();
		 		var nationCode = $('#nationCode').val();

		 		var ajax_url = $(form).attr('action');
		 		var method = $('.save-btn').attr('value');

		 		var json = {
		 			"nationId": nationId,
		 			"nationCode": nationCode,
		 			"nationName": nationName
		 		};

		 		$.ajax({
		 			url: ajax_url,
		 			data: JSON.stringify(json),
		 			type: method,
		 			contentType: 'application/json',
		 			beforeSend: function(xhr) {
		 				xhr.setRequestHeader("Accept", "application/json");
		 				xhr.setRequestHeader("Content-Type", "application/json");
		 			},
		 			success: function(data) {
		 				if (data.hasOwnProperty('nation') || data.status === "success") {
		 					show_notify("<strong>Thông báo:</strong> " + data.message);
		 					datatbl.ajax.reload();
		 				} else {
		 					show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
		 				}
		 			}
		 		});

		 		return false;
		 	}
		 });

	}


	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR Stadiums   */
	/*=================================*/
	if ($('#stadiums-content').length !== 0) {


		/*Load stadiums data table*/
		var datatbl = $('#tblStadiums').DataTable({
			"processing": true,
			"ajax": site_url('/api/v1/stadiums', 'json'),
			"columns": [{
				data: function( row, type, set ){
					var image_src  = site_url('/resources/images/flags/18x18/' + row.national.nationCode, 'png');
					return '<img src="' + image_src + '"  alt="' + row.national.nationCode + '" title="' + row.national.nationName + '"  />' + '&nbsp;<strong>' + row.national.nationName + '</strong>';
				}
			}, {
				"data": "stadiumName"
			}, {
				"data": "stadiumAddress"
			}, {
				data:function(row, type, set){
					if (row.stadiumStatus === true) {
						return '<span class="label label-success"><i class="fa fa-clock-o" ></i> Đang sữ dụng</span>';

					}
					return '<span class="label label-primary"><i class="fa fa-circle-o" ></i> Chưa sữ dụng</span>';

				}
			}, {
				data: function(row, type, set) {
					var edit_link = site_url('/dashboard/stadiums/' + row.stadiumId, 'json');
					return '<a class="edit-link" href="javascript;;" title="' + row.stadiumId + '" ><i class="fa fa-edit fa-lg" ></i>Cập nhật</a> &nbsp; <a class="delete-link" href="javascript;;" title="' + row.stadiumId + '"><i class="fa fa-trash-o fa-lg"></i>Xóa</a>' ;
				}
			}],
			"pageLength": 5,
			"lengthMenu": [
			[5, 10, 20, -1],
			[5, 10, 20, "All"]
			],
			columnDefs: [{
				targets: [0, 1, 2, 3],
				"searchable": true
			}, {
				targets: [4],
				"orderable": false,
				"searchable": false
			}],
			"language": applang.datatable_lang
		});


		/* Delete stadiums action */
		$('#tblStadiums').on('click', 'a.delete-link', function(event) {
			var stadium_id = $(this).attr('title');
			var url = site_url('/api/v1/stadiums/' + stadium_id, 'json');
			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-"' + pageIconCss + ' ></i> ' + applang.dialog.confirm.delete_title,
				message: 'Bạn có chắc là muốn xóa quốc gia có mã "' + stadium_id + '" không?',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$.ajax({
							url: url,
							type: 'DELETE',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								if (data.status === "success") {
									show_notify("<strong>Thông báo:</strong> " + data.message);
									datatbl.ajax.reload();

								} else {
									show_notify("<strong>Thông báo:</strong> " + data.message, "alert");
								}
							}
						});
					}
				}
			});
			event.preventDefault();
		});


		$('#stadiums-content').on('click', '.add-show-form', function(event) {
			form_change('add', 'Thêm quốc gia', site_url('/api/v1/stadiums', 'json') );
			event.preventDefault();
		});


		$('#tblStadiums').on('click', 'a.edit-link', function(event) {

			var stadium_id = $(this).attr("title");

			form_change('update', 'Cập nhật thông tin quốc gia', site_url('/api/v1/stadiums/' + stadium_id, 'json') );


			$.ajax({
				url: site_url('/api/v1/stadiums/' + stadium_id, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					if (data.hasOwnProperty('stadium') || data.status === "success") {
						$('#stadiumId').val(data.stadium.stadiumId);
						$('#nationId').val(data.stadium.national.nationId);
						$('#stadiumName').val(data.stadium.stadiumName);
						$('#stadiumAddress').val(data.stadium.stadiumAddress);
					} else {
						show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
					}
				}
			});

			event.preventDefault();
		});

		$('#frmStadium').validate({
			rules: {
				stadiumName: {
					required: true,
					minlength: 3,
					maxlength: 200,
				},
				stadiumAddress: {
					required: true,
					minlength: 5,
					maxlength: 200,
				}
			},
			messages:{
				stadiumName: {
					required: "Tên quốc gia không được để trống.",
					minlength: "Tên quốc gia phải nhiều hơn {0} kí tự.",
					maxlength: "Tên quốc gia phải ít hơn {0} kí tự",
				},
				stadiumAddress: {
					required: "Tên quốc gia không được để trống.",
					minlength: "Tên quốc gia phải nhiều hơn {0} kí tự.",
					maxlength: "Tên quốc gia phải ít hơn {0} kí tự",
				}
			},
			errorClass: 'help-block col-lg-6',
			errorElement: 'span',
			highlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
			},
			submitHandler : function(form) {


		 		// Begin form actions
		 		var stadiumId = $('#stadiumId').val();
		 		var nationId = $('#nationId').val();
		 		var stadiumName = $('#stadiumName').val();
		 		var stadiumAddress = $('#stadiumAddress').val();

		 		var ajax_url = $(form).attr('action');
		 		var method = $('.save-btn').attr('value');

		 		var json = {
		 			"stadiumId": stadiumId,
		 			"nationId": nationId,
		 			"stadiumName": stadiumName,
		 			"stadiumAddress": stadiumAddress
		 		};

		 		$.ajax({
		 			url: ajax_url,
		 			data: JSON.stringify(json),
		 			type: method,
		 			contentType: 'application/json',
		 			beforeSend: function(xhr) {
		 				xhr.setRequestHeader("Accept", "application/json");
		 				xhr.setRequestHeader("Content-Type", "application/json");
		 			},
		 			success: function(data) {
		 				if (data.hasOwnProperty('stadium') || data.status === "success") {
		 					show_notify("<strong>Thông báo:</strong> " + data.message);
		 					datatbl.ajax.reload();
		 				} else {
		 					show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
		 				}
		 			}
		 		});

		 		return false;
		 	}
		 });

	}


	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR Referees   */
	/*=================================*/
	if ($('#referees-content').length !== 0) {


		/*Load referees data table*/
		var datatbl = $('#tblReferees').DataTable({
			"processing": true,
			"ajax": site_url('/api/v1/referees', 'json'),
			"columns": [{
				data: function( row, type, set ){
					var image_src  = site_url('/resources/images/flags/18x18/' + row.national.nationCode, 'png');
					return '<img src="' + image_src + '"  alt="' + row.national.nationCode + '" title="' + row.national.nationName + '"  />' + '&nbsp;<strong>' + row.national.nationName + '</strong> (' + row.national.nationCode + ')';
				}
			}, {
				"data": "refereeName"
			}, {
				data:function(row, type, set){
					if (row.refereeStatus === true) {
						return '<span class="label label-success"><i class="fa fa-clock-o" ></i> Đang điều khiển trận đấu</span>';

					}
					return '<span class="label label-primary"><i class="fa fa-circle-o" ></i> Đang nhàn rỗi.</span>';

				}
			}, {
				data: function(row, type, set) {
					var edit_link = site_url('/dashboard/referees/' + row.refereeId, 'json');
					return '<a class="edit-link" href="javascript;;" title="' + row.refereeId + '" ><i class="fa fa-edit fa-lg" ></i>Cập nhật</a> &nbsp; <a class="delete-link" href="javascript;;" title="' + row.refereeId + '"><i class="fa fa-trash-o fa-lg"></i>Xóa</a>' ;
				}
			}],
			"pageLength": 5,
			"lengthMenu": [
			[5, 10, 20, -1],
			[5, 10, 20, "All"]
			],
			columnDefs: [{
				targets: [0, 1, 2],
				"searchable": true
			}, {
				targets: [3],
				"orderable": false,
				"searchable": false
			}],
			"language": applang.datatable_lang
		});


		/* Delete referees action */
		$('#tblReferees').on('click', 'a.delete-link', function(event) {
			var referee_id = $(this).attr('title');
			var url = site_url('/api/v1/referees/' + referee_id, 'json');
			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-"' + pageIconCss + ' ></i> ' + applang.dialog.confirm.delete_title,
				message: 'Bạn có chắc là muốn xóa trọng tài có mã "' + referee_id + '" không?',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$.ajax({
							url: url,
							type: 'DELETE',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								if (data.status === "success") {
									show_notify("<strong>Thông báo:</strong> " + data.message);
									datatbl.ajax.reload();

								} else {
									show_notify("<strong>Thông báo:</strong> " + data.message, "alert");
								}
							}
						});
					}
				}
			});
			event.preventDefault();
		});


		$('#referees-content').on('click', '.add-show-form', function(event) {
			form_change('add', 'Thêm trọng tài', site_url('/api/v1/referees', 'json') );
			event.preventDefault();
		});


		$('#tblReferees').on('click', 'a.edit-link', function(event) {

			var referee_id = $(this).attr("title");

			form_change('update', 'Cập nhật thông tin trọng tài', site_url('/api/v1/referees/' + referee_id, 'json') );


			$.ajax({
				url: site_url('/api/v1/referees/' + referee_id, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					if (data.hasOwnProperty('referee') || data.status === "success") {
						$('#refereeId').val(data.referee.refereeId);
						$('#nationId').val(data.referee.national.nationId);
						$('#refereeName').val(data.referee.refereeName);
						$('#refereeAddress').val(data.referee.refereeAddress);
					} else {
						show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
					}
				}
			});

			event.preventDefault();
		});

		$('#frmReferee').validate({
			rules: {
				refereeName: {
					required: true,
					minlength: 3,
					maxlength: 200,
				}
			},
			messages:{
				refereeName: {
					required: "Tên trọng tài không được để trống.",
					minlength: "Tên trọng tài phải nhiều hơn {0} kí tự.",
					maxlength: "Tên trọng tài phải ít hơn {0} kí tự",
				}
			},
			errorClass: 'help-block col-lg-6',
			errorElement: 'span',
			highlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
			},
			submitHandler : function(form) {


		 		// Begin form actions
		 		var refereeId = $('#refereeId').val();
		 		var nationId = $('#nationId').val();
		 		var refereeName = $('#refereeName').val();

		 		var ajax_url = $(form).attr('action');
		 		var method = $('.save-btn').attr('value');

		 		var json = {
		 			"refereeId": refereeId,
		 			"nationId": nationId,
		 			"refereeName": refereeName,
		 		};

		 		$.ajax({
		 			url: ajax_url,
		 			data: JSON.stringify(json),
		 			type: method,
		 			contentType: 'application/json',
		 			beforeSend: function(xhr) {
		 				xhr.setRequestHeader("Accept", "application/json");
		 				xhr.setRequestHeader("Content-Type", "application/json");
		 			},
		 			success: function(data) {
		 				if (data.hasOwnProperty('referee') || data.status === "success") {
		 					show_notify("<strong>Thông báo:</strong> " + data.message);
		 					datatbl.ajax.reload();
		 				} else {
		 					show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
		 				}
		 			}
		 		});

		 		return false;
		 	}
		 });

	}

	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR Teams   */
	/*=================================*/
	if ($('#teams-content').length !== 0) {


		/*Load teams data table*/
		var datatbl = $('#tblTeams').DataTable({
			"processing": true,
			"ajax": site_url('/api/v1/teams', 'json'),
			"columns": [{
				data: function( row, type, set ){
					var image_src  = site_url('/resources/images/flags/18x18/' + row.national.nationCode, 'png');
					return '<a href="' + site_url('/dashboard/teams/' + row.teamId + '/details') + '" title="' + row.national.nationName + '" ><img src="' + image_src + '"  alt="' + row.national.nationCode + '" title="' + row.national.nationName + '"  />' + '&nbsp;<strong>' + row.national.nationName + '</strong></a>';
				}
			}, {
				"data": "teamCoach"
			}, {
				"data": "teamNickname"
			}, {
				"data": "teamAtablishedYear"
			}, {
				data: function(row, type, set) {
					var edit_link = site_url('/dashboard/teams/' + row.teamId, 'json');
					return '<a class="edit-link" href="javascript;;" title="' + row.teamId + '" ><i class="fa fa-edit fa-lg" ></i>Cập nhật</a> &nbsp; <a class="delete-link" href="javascript;;" title="' + row.teamId + '"><i class="fa fa-trash-o fa-lg"></i>Xóa</a>' ;
				}
			}],
			"pageLength": 5,
			"lengthMenu": [
			[5, 10, 20, -1],
			[5, 10, 20, "All"]
			],
			columnDefs: [{
				targets: [0, 1, 2, 3],
				"searchable": true
			}, {
				targets: [4],
				"orderable": false,
				"searchable": false
			}],
			"language": applang.datatable_lang
		});


		/* Delete teams action */
		$('#tblTeams').on('click', 'a.delete-link', function(event) {
			var team_id = $(this).attr('title');
			var url = site_url('/api/v1/teams/' + team_id, 'json');
			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-"' + pageIconCss + ' ></i> ' + applang.dialog.confirm.delete_title,
				message: 'Bạn có chắc là muốn xóa đội bóng có mã "' + team_id + '" không?',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$.ajax({
							url: url,
							type: 'DELETE',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								if (data.status === "success") {
									show_notify("<strong>Thông báo:</strong> " + data.message);
									datatbl.ajax.reload();

								} else {
									show_notify("<strong>Thông báo:</strong> " + data.message, "alert");
								}
							}
						});
					}
				}
			});
			event.preventDefault();
		});


		$('#teams-content').on('click', '.add-show-form', function(event) {
			form_change('add', 'Thêm đội bóng', site_url('/api/v1/teams', 'json') );
			event.preventDefault();
		});


		$('#tblTeams').on('click', 'a.edit-link', function(event) {

			var team_id = $(this).attr("title");

			form_change('update', 'Cập nhật thông tin đội bóng', site_url('/api/v1/teams/' + team_id, 'json') );


			$.ajax({
				url: site_url('/api/v1/teams/' + team_id, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					if (data.hasOwnProperty('team') || data.status === "success") {
						$('#nationId').val(data.team.national.nationId);
						$('#teamId').val(data.team.teamId);
						$('#teamCoach').val(data.team.teamCoach);
						$('#teamNickname').val(data.team.teamNickname);
						$('#teamAtablishedYear').val(data.team.teamAtablishedYear);
						$('#teamDescription').val(data.team.teamDescription);
					} else {
						show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
					}
				}
			});

			event.preventDefault();
		});

		CKEDITOR.replace('teamDescription');

		$('#frmTeam').validate({
			rules: {
				teamCoach: {
					required: true,
					minlength: 3,
					maxlength: 200,
				},
				teamNickname: {
					required: true,
					minlength: 3,
					maxlength: 200,
				},
				teamAtablishedYear: {
					required: true,
					min: 1800,
					max: 2016
				},
				teamDescription: {
					required: true,
					minlength: 3
				}
			},
			messages:{
				teamCoach: {
					required: "Tên huấn luyện viên không được để trống.",
					minlength: "Tên huấn luyện viên phải nhiều hơn {0} kí tự.",
					maxlength: "Tên huấn luyện viên phải ít hơn {0} kí tự",
				},
				teamNickname: {
					required: "Bí danh đội bóng không được để trống.",
					minlength: "Bí danh đội bóng phải nhiều hơn {0} kí tự.",
					maxlength: "Bí danh đội bóng phải ít hơn {0} kí tự",
				},
				teamAtablishedYear: {
					required: "Năm thành lập không được để trống.",
					min: "Năm thành lập phải từ năm {0} trở đi.",
					max: "Năm thành lập phải từ {0} trở lại.",
				},
				teamDescription: {
					required: "Mô tả đội bóng không được để trống.",
					minlength: "Mô tả đội bóng phải nhiều hơn {0} kí tự."
				}
			},
			errorClass: 'help-block col-lg-6',
			errorElement: 'span',
			highlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
			},
			submitHandler : function(form) {


		 		// Begin form actions
		 		var teamId = $('#teamId').val();
		 		var nationId = $('#nationId').val();
		 		var teamCoach = $('#teamCoach').val();
		 		var teamNickname = $('#teamNickname').val();
		 		var teamAtablishedYear = $('#teamAtablishedYear').val();
		 		var teamDescription = $('#teamDescription').val();

		 		var ajax_url = $(form).attr('action');
		 		var method = $('.save-btn').attr('value');

		 		var json = {
		 			"teamId": teamId,
		 			"nationId": nationId,
		 			"teamCoach": teamCoach,
		 			"teamNickname": teamNickname,
		 			"teamAtablishedYear": teamAtablishedYear,
		 			"teamDescription": teamDescription,
		 		};

		 		$.ajax({
		 			url: ajax_url,
		 			data: JSON.stringify(json),
		 			type: method,
		 			contentType: 'application/json',
		 			beforeSend: function(xhr) {
		 				xhr.setRequestHeader("Accept", "application/json");
		 				xhr.setRequestHeader("Content-Type", "application/json");
		 			},
		 			success: function(data) {
		 				if (data.hasOwnProperty('team') || data.status === "success") {
		 					show_notify("<strong>Thông báo:</strong> " + data.message);
		 					datatbl.ajax.reload();
		 				} else {
		 					show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
		 				}
		 			}
		 		});

		 		return false;
		 	}
		 });

	}




	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR Players   */
	/*=================================*/
	if ($('#players-content').length !== 0) {


		/*Load players data table*/
		var datatbl = $('#tblPlayers').DataTable({
			"processing": true,
			"ajax": site_url('/api/v1/players', 'json'),
			"columns": [{
				data: function( row, type, set ){
					var image_src  = site_url('/resources/images/flags/18x18/' + row.teamPlayFor.national.nationCode, 'png');
					return '<img src="' + image_src + '"  alt="' + row.teamPlayFor.national.nationCode + '" title="' + row.teamPlayFor.national.nationName + '"  />' + '&nbsp;<strong>' + row.teamPlayFor.national.nationName + '</strong>';
				}
			}, {
				"data": "playerName"
			}, {
				"data": "playerNumber"
			}, {
				data: function(row, type, set) {
					return '<a class="edit-link" href="javascript;;" player-id="' + row.playerId + '" title="' + row.teamPlayFor.teamId + '/' + row.playerNumber + '" ><i class="fa fa-edit fa-lg" ></i>Cập nhật</a> &nbsp; <a class="delete-link" href="javascript;;" title="' + row.teamPlayFor.teamId + '/' + row.playerNumber + '"><i class="fa fa-trash-o fa-lg"></i>Xóa</a>' ;
				}
			}],
			"pageLength": 5,
			"lengthMenu": [
			[5, 10, 20, -1],
			[5, 10, 20, "All"]
			],
			columnDefs: [{
				targets: [0, 1, 2],
				"searchable": true
			}, {
				targets: [3],
				"orderable": false,
				"searchable": false
			}],
			"language": applang.datatable_lang
		});


		/* Delete players action */
		$('#tblPlayers').on('click', 'a.delete-link', function(event) {
			var player_id = $(this).attr('title');
			var url = site_url('/api/v1/players/' + player_id, 'json');
			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-"' + pageIconCss + ' ></i> ' + applang.dialog.confirm.delete_title,
				message: 'Bạn có chắc là muốn xóa cầu thủ có mã "' + player_id + '" không?',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$.ajax({
							url: url,
							type: 'DELETE',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								if (data.status === "success") {
									show_notify("<strong>Thông báo:</strong> " + data.message);
									datatbl.ajax.reload();

								} else {
									show_notify("<strong>Thông báo:</strong> " + data.message, "alert");
								}
							}
						});
					}
				}
			});
			event.preventDefault();
		});


		$('#players-content').on('click', '.add-show-form', function(event) {
			form_change('add', 'Thêm cầu thủ', site_url('/api/v1/players', 'json') );
			event.preventDefault();
		});


		$('#tblPlayers').on('click', 'a.edit-link', function(event) {

			var player_id = $(this).attr("player-id");
			var player_param = $(this).attr("title");

			form_change('update', 'Cập nhật thông tin cầu thủ', site_url('/api/v1/players/' + player_id, 'json') );


			$.ajax({
				url: site_url('/api/v1/players/' + player_param, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					if (data.hasOwnProperty('player') || data.status === "success") {
						$('#teamId').val(data.player.teamPlayFor.teamId);
						$('#playerId').val(data.player.playerId);
						$('#playerNumber').val(data.player.playerNumber);
						$('#playerName').val(data.player.playerName);
					} else {
						show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
					}
				}
			});

			event.preventDefault();
		});

		$('#frmPlayer').validate({
			rules: {
				playerNumber: {
					required: true,
					min: 1,
					max: 99,
				},
				playerName: {
					required: true,
					minlength: 4,
					maxlength: 200,
				}
			},
			messages:{
				playerNumber: {
					required: "Số áo cầu thủ không được để trống.",
					minlength: "Số áo cầu thủ phải từ {0} trở lên.",
					maxlength: "Số áo cầu thủ phải nhỏ hơn {0}.",
				},
				playerName: {
					required: "Tên cầu thủ không được để trống.",
					minlength: "Tên cầu thủ phải nhiều hơn {0} kí tự.",
					maxlength: "Tên cầu thủ phải ít hơn {0} kí tự",
				}
			},
			errorClass: 'help-block col-lg-6',
			errorElement: 'span',
			highlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
			},
			submitHandler : function(form) {


		 		// Begin form actions
		 		var teamId = $('#teamId').val();
		 		var playerId = $('#playerId').val();
		 		var playerNumber = $('#playerNumber').val();
		 		var playerName = $('#playerName').val();

		 		var ajax_url = $(form).attr('action');
		 		var method = $('.save-btn').attr('value');

		 		var json = {
		 			"teamId": teamId,
		 			"playerId": playerId,
		 			"playerNumber": playerNumber,
		 			"playerName": playerName
		 		};

		 		$.ajax({
		 			url: ajax_url,
		 			data: JSON.stringify(json),
		 			type: method,
		 			contentType: 'application/json',
		 			beforeSend: function(xhr) {
		 				xhr.setRequestHeader("Accept", "application/json");
		 				xhr.setRequestHeader("Content-Type", "application/json");
		 			},
		 			success: function(data) {
		 				if (data.hasOwnProperty('player') || data.status === "success") {
		 					show_notify("<strong>Thông báo:</strong> " + data.message);
		 					datatbl.ajax.reload();
		 				} else {
		 					show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
		 				}
		 			}
		 		});

		 		return false;
		 	}
		 });

	}



	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR Configs   */
	/*=================================*/
	if ($('#configs-content').length !== 0) {


		/*Load configs data table*/
		var datatbl = $('#tblConfigs').DataTable({
			"processing": true,
			"ajax": site_url('/api/v1/configs', 'json'),
			"columns": [{
				"data": "configKey"
			}, {
				"data": "configValue"
			}, {
				data: function(row, type, set) {
					var edit_link = site_url('/dashboard/configs/' + row.configId, 'json');
					return '<a class="edit-link" href="javascript;;" title="' + row.configId + '" ><i class="fa fa-edit fa-lg" ></i>Cập nhật</a> &nbsp; <a class="delete-link" href="javascript;;" title="' + row.configId + '"><i class="fa fa-trash-o fa-lg"></i>Xóa</a>' ;
				}
			}],
			"pageLength": 5,
			"lengthMenu": [
			[5, 10, 20, -1],
			[5, 10, 20, "All"]
			],
			columnDefs: [{
				targets: [0, 1],
				"searchable": true
			}, {
				targets: [2],
				"orderable": false,
				"searchable": false
			}],
			"language": applang.datatable_lang
		});


		/* Delete configs action */
		$('#tblConfigs').on('click', 'a.delete-link', function(event) {
			var config_id = $(this).attr('title');
			var url = site_url('/api/v1/configs/' + config_id, 'json');
			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-"' + pageIconCss + ' ></i> ' + applang.dialog.confirm.delete_title,
				message: 'Bạn có chắc là muốn xóa cấu hình có mã "' + config_id + '" không?',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$.ajax({
							url: url,
							type: 'DELETE',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								if (data.status === "success") {
									show_notify("<strong>Thông báo:</strong> " + data.message);
									datatbl.ajax.reload();

								} else {
									show_notify("<strong>Thông báo:</strong> " + data.message, "alert");
								}
							}
						});
					}
				}
			});
			event.preventDefault();
		});


		$('#configs-content').on('click', '.add-show-form', function(event) {
			form_change('add', 'Thêm cấu hình', site_url('/api/v1/configs', 'json') );
			event.preventDefault();
		});


		$('#tblConfigs').on('click', 'a.edit-link', function(event) {

			var config_id = $(this).attr("title");

			form_change('update', 'Cập nhật thông tin cấu hình', site_url('/api/v1/configs/' + config_id, 'json') );


			$.ajax({
				url: site_url('/api/v1/configs/' + config_id, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					if (data.hasOwnProperty('config') || data.status === "success") {
						$('#configId').val(data.config.configId);
						$('#configKey').val(data.config.configKey);
						$('#configValue').val(data.config.configValue);
					} else {
						show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
					}
				}
			});

			event.preventDefault();
		});

		$('#frmConfig').validate({
			rules: {
				configKey: {
					required: true,
					minlength: 3,
					maxlength: 200,
					nowhitespace: true,
				},
				configValue: {
					required: true,
					minlength: 3,
					maxlength: 200,
				}
			},
			messages:{
				configKey: {
					required: "Khóa cấu hình không được để trống.",
					minlength: "Khóa cấu hình phải nhiều hơn {0} kí tự.",
					maxlength: "Khóa cấu hình phải ít hơn {0} kí tự",
					nowhitespace: "Khóa cấu hình không được chứa khoảng trắng"
				},
				configValue: {
					required: "Tên cấu hình không được để trống.",
					minlength: "Tên cấu hình phải nhiều hơn {0} kí tự.",
					maxlength: "Tên cấu hình phải ít hơn {0} kí tự",
				}
			},
			errorClass: 'help-block col-lg-6',
			errorElement: 'span',
			highlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-success').addClass('has-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).parents('.form-group').removeClass('has-error').addClass('has-success');
			},
			submitHandler : function(form) {


		 		// Begin form actions
		 		var configId = $('#configId').val();
		 		var configKey = $('#configKey').val();
		 		var configValue = $('#configValue').val();

		 		var ajax_url = $(form).attr('action');
		 		var method = $('.save-btn').attr('value');

		 		var json = {
		 			"configId": configId,
		 			"configKey": configKey,
		 			"configValue": configValue
		 		};

		 		$.ajax({
		 			url: ajax_url,
		 			data: JSON.stringify(json),
		 			type: method,
		 			contentType: 'application/json',
		 			beforeSend: function(xhr) {
		 				xhr.setRequestHeader("Accept", "application/json");
		 				xhr.setRequestHeader("Content-Type", "application/json");
		 			},
		 			success: function(data) {
		 				if (data.hasOwnProperty('config') || data.status === "success") {
		 					show_notify("<strong>Thông báo:</strong> " + data.message);
		 					datatbl.ajax.reload();
		 				} else {
		 					show_notify("<strong>Lổi:</strong> " + data.message, 'warning');
		 				}
		 			}
		 		});

		 		return false;
		 	}
		 });

	}


	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR teaminfo details   */
	/*=================================*/
	if ( $('#teamdetails-content').length !== 0 ) {


		$('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
			$.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
		} );

		// Load list players
		/*Load configs data table*/
		var tblplPlayersInTeam = $('#tblplPlayersInTeam').DataTable({
			"processing": true,
			"ajax": site_url('/api/v1/players/' + teaminfo_id , 'json'),
			scrollY: 200,
			scrollCollapse: true,
			"columns": [{
				"data": "playerName"
			}, {
				"data": "playerNumber"
			}],
			"pageLength": 5,
			"lengthMenu": [
			[5, 10, 20, -1],
			[5, 10, 20, "All"]
			],
			columnDefs: [{
				targets: [0, 1],
				"searchable": true
			}],
			"language": applang.datatable_lang
		});


	}



	/*----------------------------------------------------------------------------*/




	/*=================================*/
	/*    ACTIONS FOR group schedules   */
	/*=================================*/
	if ($('#groupschedules-content').length !== 0) {



		/*Load matches schedules data table*/
		var datatbl = $('#tblGroupMatchSchedules').DataTable({
			"processing": true,
			"ajax": function (data, callback, settings) {
				$.ajax({
					type: "GET",
					url: site_url('/api/v1/schedules/group', 'json'),
					success: function (json) {
						if ( json.status === "success" ) {
							callback(json);
						} else {
							var api = new $.fn.dataTable.Api(settings);
							var container = api.table().container();
							$(container).find('.dataTables_processing').hide();
							show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> Vòng đấu bảng ' + json.message, 'warning');
						}

					}
				});
			},
			"columns": [{
				data:function(row, type, set){

					var match_date = row.match.matchDateTime.hourOfDay + ' giờ '   +  row.match.matchDateTime.minuteOfHour +  ' phút, ngày ' + row.match.matchDateTime.dayOfMonth + ' tháng ' + row.match.matchDateTime.monthOfYear + ' năm ' + row.match.matchDateTime.year;
					var team_a = {
						"img_1_src": site_url('/resources/images/logos/teams/70x70/' + row.matchResultHome.teamPlay.national.nationCode, 'png' ),
						"img_2_src": site_url('/resources/images/flags/32x32/' + row.matchResultHome.teamPlay.national.nationCode, 'png'),
						"nation_name": row.matchResultHome.teamPlay.national.nationName,
						"nation_code": row.matchResultHome.teamPlay.national.nationCode,
						"goals": row.matchResultHome.matchGoalWin
					};

					var team_b = {
						"img_1_src": site_url('/resources/images/logos/teams/70x70/' + row.matchResultAway.teamPlay.national.nationCode, 'png' ),
						"img_2_src": site_url('/resources/images/flags/32x32/' + row.matchResultAway.teamPlay.national.nationCode, 'png'),
						"nation_name": row.matchResultAway.teamPlay.national.nationName,
						"nation_code": row.matchResultAway.teamPlay.national.nationCode,
						"goals": row.matchResultAway.matchGoalWin
					};

					return '<div class="row"> <div class="col-lg-12 msc-top bg-info"><span class="msc-datetime"><i class="fa fa-object-group"></i>&nbsp; Trận đấu: ' + row.matchTypeName + '</span> - <span class="msc-datetime"><i class="fa fa-clock-o"></i>&nbsp; Thời gian: ' + match_date + '</span><a href="javascript;;" data-match-id="' + row.match.matchId + '" class="btn btn-metis-6 btn-xs pull-right msc-detail-btn"> <i class="fa fa-futbol-o"> </i>&nbsp;Chi tiết </a> </div> <div class="col-lg-3 msc-left col-lg-offset-2"> <div class="row"> <div class="col-lg-12 text-center"><img src="' + team_a.img_1_src + '" alt="' + team_a.nation_name + '" /></div> <div class="col-lg-12 text-center"><strong>' + team_a.nation_name + ' (' +  team_a.nation_code+ ')</strong> <img src="' + team_a.img_2_src + '" alt="' + team_a.nation_name + '" /></div> </div> </div> <div class="col-lg-2 msc-mid"> <div class="row"> <div class="col-lg-12  text-center"> <span class="msc-teama">' + team_a.goals + '</span><span class="msc-team-div">-</span><span class="msc-teamb">' + team_b.goals + '</span> </div> </div> </div> <div class="col-lg-3 msc-right"> <div class="row"> <div class="col-lg-12 text-center"><img src="' + team_b.img_1_src + '" alt="' + team_b.nation_name + '" /></div> <div class="col-lg-12 text-center"><img src="' + team_b.img_2_src + '" alt="' + team_b.nation_name + '" /> <strong>' + team_b.nation_name + ' (' + team_b.nation_code + ')</strong></div> </div> </div> <div class="col-lg-12 msc-buttom"> <span class="msc-referee"><i class="fa fa-bullhorn"></i>&nbsp;Trọng Tài: ' + row.referees[0].refereeName + ' (' + row.referees[0].national.nationName + ')</span> <span class="msc-stadium pull-right"><i class="fa fa-map"></i>&nbsp;Sân Vận Động: ' + row.match.matchStadium.stadiumName + ' - ' + row.match.matchStadium.stadiumAddress + ' (' + row.match.matchStadium.national.nationName + ')</span></div> </div>';
				}

			}],
			"ordering": false,
			"pageLength": 4,
			"lengthMenu": [
			[4, 8, 16, -1],
			[4, 8, 16, "All"]
			],
			"language": applang.datatable_lang
		});



		// Show a match details and show form update goals
		$('#groupschedules-content').on('click', '.msc-detail-btn', function(event) {

			var match_id = $(this).attr('data-match-id');


			$('#loading').show();
			$.ajax({
				url: site_url('/api/v1/schedules/detail/' + match_id, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					$('#loading').hide();
					if (data.status === "success") {

						BootstrapDialog.show({
							title: 'Thông tin chi tiết trận đấu: ' + data.matchesdetail.matchTypeName,
							message: function(dialog) {

								var match_date = data.matchesdetail.match.matchDateTime.hourOfDay + ' giờ '   +  data.matchesdetail.match.matchDateTime.minuteOfHour +  ' phút, ngày ' + data.matchesdetail.match.matchDateTime.dayOfMonth + ' tháng ' + data.matchesdetail.match.matchDateTime.monthOfYear + ' năm ' + data.matchesdetail.match.matchDateTime.year;
								var team_a = {
									"img_1_src": site_url('/resources/images/logos/teams/70x70/' + data.matchesdetail.matchResultHome.teamPlay.national.nationCode, 'png' ),
									"img_2_src": site_url('/resources/images/flags/32x32/' + data.matchesdetail.matchResultHome.teamPlay.national.nationCode, 'png'),
									"nation_name": data.matchesdetail.matchResultHome.teamPlay.national.nationName,
									"nation_code": data.matchesdetail.matchResultHome.teamPlay.national.nationCode,
									"goals": data.matchesdetail.matchResultHome.matchGoalWin
								};

								var team_b = {
									"img_1_src": site_url('/resources/images/logos/teams/70x70/' + data.matchesdetail.matchResultAway.teamPlay.national.nationCode, 'png' ),
									"img_2_src": site_url('/resources/images/flags/32x32/' + data.matchesdetail.matchResultAway.teamPlay.national.nationCode, 'png'),
									"nation_name": data.matchesdetail.matchResultAway.teamPlay.national.nationName,
									"nation_code": data.matchesdetail.matchResultAway.teamPlay.national.nationCode,
									"goals": data.matchesdetail.matchResultAway.matchGoalWin
								};

								var $content = $('<div class="row matches-details"> <div class="col-md-12 msc-top"> <span class="msc-datetime"> <i class="fa fa-clock-o"> </i> Thời gian: ' + match_date + '</span> </div> <div class="col-md-4 msc-left"> <div class="row"> <div class="col-md-12 text-center"> <img alt="' + team_a.nation_name + '" src="' + team_a.img_1_src + '"/> </div> <div class="col-md-12 text-center"> <strong> ' + team_a.nation_name + ' (' +  team_a.nation_code+ ') </strong> <img alt="' + team_a.nation_name + '" src="' + team_a.img_2_src + '"/> </div> </div> </div> <div class="col-md-4 msc-mid"> <div class="row"> <div class="col-md-12 text-center"> <form id="frmDetailMatches" action="" class="form-inline" > <input  class="msc-teama form-control" type="text" id="teamHomeGoal" name="teamHomeGoal" value="' + team_a.goals + '" /> <span class="msc-team-div"> - </span> <input type="text" class="msc-teamb form-control" id="teamAwayGoal" name="teamAwayGoal" value="' + team_b.goals + '" /> </form> </div> </div> </div> <div class="col-md-4 msc-right"> <div class="row"> <div class="col-md-12 text-center"> <img alt="' + team_b.nation_name + '" src="' + team_b.img_1_src + '"/> </div> <div class="col-md-12 text-center"> <img alt="' + team_b.nation_name + '" src="' + team_b.img_2_src + '"/> <strong> ' + team_b.nation_name + ' (' + team_b.nation_code + ') </strong> </div> </div> </div> <hr /> <div class="col-md-12 msc-buttom"> <span class="msc-referee"> <i class="fa fa-bullhorn"> </i> Trọng Tài: <br/>' + data.matchesdetail.referees[0].refereeName + ' (' + data.matchesdetail.referees[0].national.nationName + ') <br/>' + data.matchesdetail.referees[1].refereeName + ' (' + data.matchesdetail.referees[1].national.nationName + ') <br/>' + data.matchesdetail.referees[2].refereeName + ' (' + data.matchesdetail.referees[2].national.nationName + ') <br/> </span> </div> <div class="col-md-12 msc-buttom"> <span class="msc-stadium"> <i class="fa fa-map"> </i> Sân Vận Động: <br/>' + data.matchesdetail.match.matchStadium.stadiumName + ' - ' + data.matchesdetail.match.matchStadium.stadiumAddress + ' (' + data.matchesdetail.match.matchStadium.national.nationName + ') </span> </div> </div>');
								var $footerButton = dialog.getButton('btnSaveGoals');
								$content.find('button').click({$footerButton: $footerButton}, function(event) {
									event.data.$footerButton.enable();
									event.data.$footerButton.stopSpin();
									dialog.setClosable(true);
								});

								return $content;
							},
							buttons: [{
								id: 'btnClose',
								label: '<i class="fa fa-close"></i> Đóng',
								action: function(dialog) {
									dialog.close();
								}
							},
							{
								id: 'btnSaveGoals',
								label: '<i class="fa fa-save"></i> Cập Nhật Tỉ Số',
								cssClass: 'btn-info',
								action: function(dialog) {
									var $button = this;
									$button.disable();
									$button.spin();

									var teamHomeGoal = $('#teamHomeGoal').val();
									var teamAwayGoal = $('#teamAwayGoal').val();
									var json = {
										"teamHomeGoal": teamHomeGoal,
										"teamAwayGoal": teamAwayGoal
									};
									$.ajax({
										url: site_url('/api/v1/schedules/updateresult/' + match_id , 'json'),
										type: "PUT",
										data: JSON.stringify(json),
										contentType: 'application/json',
										beforeSend: function(xhr) {
											xhr.setRequestHeader("Accept", "application/json");
											xhr.setRequestHeader("Content-Type", "application/json");
										},
										success: function(data) {
											$button.enable();
											$button.stopSpin();
											if (data.status === "success") {
												datatbl.ajax.reload();
												show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
											} else {
												show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
											}
										}
									});


								}
							},
							{
								id: 'btnLock',
								label: '<i class="fa fa-lock"></i> Khóa',
								cssClass: 'btn-info',
								action: function(dialog) {
									var $button = this;
									$button.disable();
									$button.spin();

									var json = {
										"matchId": match_id
									};
									$.ajax({
										url: site_url('/api/v1/schedules/lockmatch/' + match_id , 'json'),
										type: "PUT",
										data: JSON.stringify(json),
										contentType: 'application/json',
										beforeSend: function(xhr) {
											xhr.setRequestHeader("Accept", "application/json");
											xhr.setRequestHeader("Content-Type", "application/json");
										},
										success: function(data) {
											$button.enable();
											$button.stopSpin();
											if (data.status === "success") {
												datatbl.ajax.reload();
												show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
											} else {
												show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
											}
										}
									});

								}
							}]
						});


						//datatbl.ajax.reload();
						//show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
					} else {
						show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
					}
				}
			});

event.preventDefault();

});



$('#groupschedules-content').on('click', '.lock-all-groupmatches', function(event) {
	BootstrapDialog.confirm({
		type: BootstrapDialog.TYPE_INFO,
		title: '<i class="fa fa-futbol-o" ></i> Khóa tất cả các trận đấu vòng bảng.',
		message: 'Bạn có chắc là muốn khóa tất cả các trận đấu vòng bảng và cập nhật lên bảng xếp hạng. Điều này có thể mất chút ít thời gian.',
		closable: true,
		draggable: true,
		btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
		btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
		btnOKClass: "btn-primary",
		callback: function(result) {
			if (result) {
				$('#loading').show();
				$.ajax({
					url: site_url('/api/v1/schedules/lockall/group', 'json'),
					type: "GET",
					contentType: 'application/json',
					beforeSend: function(xhr) {
						xhr.setRequestHeader("Accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					},
					success: function(data) {
						$('#loading').hide();
						if (data.status === "success") {
							datatbl.ajax.reload();
							show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
						} else {
							show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
						}
					}
				});
			}
		}
	});

	event.preventDefault();
});

		// Tao lich thi dau vong bang
		$('#groupschedules-content').on('click', '.add-all-groupmatches', function(event) {


			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_INFO,
				title: '<i class="fa fa-futbol-o" ></i> Tạo các trận đấu vòng bảng.',
				message: 'Bạn có chắc là muộn tự tạo ngẩu nhiên các trận đấu vòng bảng. Điều này có thể mất chút ít thời gian.',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$('#loading').show();
						$.ajax({
							url: site_url('/api/v1/schedules/addall/group', 'json'),
							type: "GET",
							contentType: 'application/json',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								$('#loading').hide();
								if (data.status === "success") {
									datatbl.ajax.reload();
									show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
								} else {
									show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
								}
							}
						});
					}
				}
			});

			event.preventDefault();

		});


		// Tao ngau nhien ti so cac tran dau trong vong bang
		$('#groupschedules-content').on('click', '.randomgoal-all-groupmatches', function(event) {


			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-futbol-o" ></i> Tạo ngẩu nhiên các tỉ số.',
				message: 'Bạn có chắc là muộn tự tạo ngẩu nhiên các tỉ số vòng bảng. Điều này có thể mất chút ít thời gian.',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$('#loading').show();
						$.ajax({
							url: site_url('/api/v1/schedules/randomallgoal/group', 'json'),
							type: "GET",
							contentType: 'application/json',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								$('#loading').hide();
								if (data.status === "success") {
									datatbl.ajax.reload();
									show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
								} else {
									show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
								}
							}
						});
					}
				}
			});

			event.preventDefault();

		});





	}


	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR stages quarter   */
	/*=================================*/
	if ( $('.stageschedules-quarter-list-box').length ) {


		/*Load matches schedules data table*/
		var datatblquarter = $('#tblStageMatchQuarterSchedules').DataTable({
			"processing": true,
			"ajax": function (data, callback, settings) {
				$.ajax({
					type: "GET",
					url: site_url('/api/v1/schedules/quarter', 'json'),
					success: function (json) {
						if ( json.status === "success" ) {
							callback(json);
						} else {
							var api = new $.fn.dataTable.Api(settings);
							var container = api.table().container();
							$(container).find('.dataTables_processing').hide();
							show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> Vòng loại tứ kết ' + json.message, 'warning');
						}

					}
				});
			},
			"columns": [{
				data:function(row, type, set){

					var match_date = row.match.matchDateTime.hourOfDay + ' giờ '   +  row.match.matchDateTime.minuteOfHour +  ' phút, ngày ' + row.match.matchDateTime.dayOfMonth + ' tháng ' + row.match.matchDateTime.monthOfYear + ' năm ' + row.match.matchDateTime.year;
					var team_a = {
						"img_1_src": site_url('/resources/images/logos/teams/70x70/' + row.matchResultHome.teamPlay.national.nationCode, 'png' ),
						"img_2_src": site_url('/resources/images/flags/32x32/' + row.matchResultHome.teamPlay.national.nationCode, 'png'),
						"nation_name": row.matchResultHome.teamPlay.national.nationName,
						"nation_code": row.matchResultHome.teamPlay.national.nationCode,
						"goals": row.matchResultHome.matchGoalWin
					};

					var team_b = {
						"img_1_src": site_url('/resources/images/logos/teams/70x70/' + row.matchResultAway.teamPlay.national.nationCode, 'png' ),
						"img_2_src": site_url('/resources/images/flags/32x32/' + row.matchResultAway.teamPlay.national.nationCode, 'png'),
						"nation_name": row.matchResultAway.teamPlay.national.nationName,
						"nation_code": row.matchResultAway.teamPlay.national.nationCode,
						"goals": row.matchResultAway.matchGoalWin
					};

					return '<div class="row"> <div class="col-lg-12 msc-top bg-info"><span class="msc-datetime"><i class="fa fa-object-group"></i>&nbsp; Trận đấu: ' + row.matchTypeName + '</span> - <span class="msc-datetime"><i class="fa fa-clock-o"></i>&nbsp; Thời gian: ' + match_date + '</span><a href="javascript;;" data-match-id="' + row.match.matchId + '" class="btn btn-metis-6 btn-xs pull-right msc-detail-btn"> <i class="fa fa-futbol-o"> </i>&nbsp;Chi tiết </a> </div> <div class="col-lg-3 msc-left col-lg-offset-2"> <div class="row"> <div class="col-lg-12 text-center"><img src="' + team_a.img_1_src + '" alt="' + team_a.nation_name + '" /></div> <div class="col-lg-12 text-center"><strong>' + team_a.nation_name + ' (' +  team_a.nation_code+ ')</strong> <img src="' + team_a.img_2_src + '" alt="' + team_a.nation_name + '" /></div> </div> </div> <div class="col-lg-2 msc-mid"> <div class="row"> <div class="col-lg-12  text-center"> <span class="msc-teama">' + team_a.goals + '</span><span class="msc-team-div">-</span><span class="msc-teamb">' + team_b.goals + '</span> </div> </div> </div> <div class="col-lg-3 msc-right"> <div class="row"> <div class="col-lg-12 text-center"><img src="' + team_b.img_1_src + '" alt="' + team_b.nation_name + '" /></div> <div class="col-lg-12 text-center"><img src="' + team_b.img_2_src + '" alt="' + team_b.nation_name + '" /> <strong>' + team_b.nation_name + ' (' + team_b.nation_code + ')</strong></div> </div> </div> <div class="col-lg-12 msc-buttom"> <span class="msc-referee"><i class="fa fa-bullhorn"></i>&nbsp;Trọng Tài: ' + row.referees[0].refereeName + ' (' + row.referees[0].national.nationName + ')</span> <span class="msc-stadium pull-right"><i class="fa fa-map"></i>&nbsp;Sân Vận Động: ' + row.match.matchStadium.stadiumName + ' - ' + row.match.matchStadium.stadiumAddress + ' (' + row.match.matchStadium.national.nationName + ')</span></div> </div>';
				}

			}],
			"ordering": false,
			"pageLength": 4,
			"lengthMenu": [
			[4, 8, 16, -1],
			[4, 8, 16, "All"]
			],
			"language": applang.datatable_lang
		});


		// Tao lich thi dau vong loai tu ket
		$('.stageschedules-quarter-list-box').on('click', '.add-all-stagematches', function(event) {


			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_INFO,
				title: '<i class="fa fa-futbol-o" ></i> Tạo các trận đấu vòng bảng.',
				message: 'Bạn có chắc là muộn tự tạo ngẩu nhiên các trận đấu vòng bảng. Điều này có thể mất chút ít thời gian.',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$('#loading').show();
						$.ajax({
							url: site_url('/api/v1/schedules/addall/quarter', 'json'),
							type: "GET",
							contentType: 'application/json',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								$('#loading').hide();
								if (data.status === "success") {
									datatblquarter.ajax.reload();
									show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
								} else {
									show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
								}
							}
						});
					}
				}
			});

			event.preventDefault();

		});

		// Tao ngau nhien ti so cac tran dau trong vong loai tu ket
		$('.stageschedules-quarter-list-box').on('click', '.randomgoal-all-stagematches', function(event) {


			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-futbol-o" ></i> Tạo ngẩu nhiên các tỉ số.',
				message: 'Bạn có chắc là muộn tự tạo ngẩu nhiên các tỉ số vòng loại tứ kết. Điều này có thể mất chút ít thời gian.',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$('#loading').show();
						$.ajax({
							url: site_url('/api/v1/schedules/randomallgoal/quarter', 'json'),
							type: "GET",
							contentType: 'application/json',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								$('#loading').hide();
								if (data.status === "success") {
									datatblquarter.ajax.reload();
									show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
								} else {
									show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
								}
							}
						});
					}
				}
			});

			event.preventDefault();

		});

		// Show a match details and show form update goals
		$('.stageschedules-quarter-list-box').on('click', '.msc-detail-btn', function(event) {

			var match_id = $(this).attr('data-match-id');


			$('#loading').show();
			$.ajax({
				url: site_url('/api/v1/schedules/detail/' + match_id, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					$('#loading').hide();
					if (data.status === "success") {

						BootstrapDialog.show({
							title: 'Thông tin chi tiết trận đấu: ' + data.matchesdetail.matchTypeName,
							message: function(dialog) {

								var match_date = data.matchesdetail.match.matchDateTime.hourOfDay + ' giờ '   +  data.matchesdetail.match.matchDateTime.minuteOfHour +  ' phút, ngày ' + data.matchesdetail.match.matchDateTime.dayOfMonth + ' tháng ' + data.matchesdetail.match.matchDateTime.monthOfYear + ' năm ' + data.matchesdetail.match.matchDateTime.year;
								var team_a = {
									"img_1_src": site_url('/resources/images/logos/teams/70x70/' + data.matchesdetail.matchResultHome.teamPlay.national.nationCode, 'png' ),
									"img_2_src": site_url('/resources/images/flags/32x32/' + data.matchesdetail.matchResultHome.teamPlay.national.nationCode, 'png'),
									"nation_name": data.matchesdetail.matchResultHome.teamPlay.national.nationName,
									"nation_code": data.matchesdetail.matchResultHome.teamPlay.national.nationCode,
									"goals": data.matchesdetail.matchResultHome.matchGoalWin
								};

								var team_b = {
									"img_1_src": site_url('/resources/images/logos/teams/70x70/' + data.matchesdetail.matchResultAway.teamPlay.national.nationCode, 'png' ),
									"img_2_src": site_url('/resources/images/flags/32x32/' + data.matchesdetail.matchResultAway.teamPlay.national.nationCode, 'png'),
									"nation_name": data.matchesdetail.matchResultAway.teamPlay.national.nationName,
									"nation_code": data.matchesdetail.matchResultAway.teamPlay.national.nationCode,
									"goals": data.matchesdetail.matchResultAway.matchGoalWin
								};

								var $content = $('<div class="row matches-details"> <div class="col-md-12 msc-top"> <span class="msc-datetime"> <i class="fa fa-clock-o"> </i> Thời gian: ' + match_date + '</span> </div> <div class="col-md-4 msc-left"> <div class="row"> <div class="col-md-12 text-center"> <img alt="' + team_a.nation_name + '" src="' + team_a.img_1_src + '"/> </div> <div class="col-md-12 text-center"> <strong> ' + team_a.nation_name + ' (' +  team_a.nation_code+ ') </strong> <img alt="' + team_a.nation_name + '" src="' + team_a.img_2_src + '"/> </div> </div> </div> <div class="col-md-4 msc-mid"> <div class="row"> <div class="col-md-12 text-center"> <form id="frmDetailMatches" action="" class="form-inline" > <input  class="msc-teama form-control" type="text" id="teamHomeGoal" name="teamHomeGoal" value="' + team_a.goals + '" /> <span class="msc-team-div"> - </span> <input type="text" class="msc-teamb form-control" id="teamAwayGoal" name="teamAwayGoal" value="' + team_b.goals + '" /> </form> </div> </div> </div> <div class="col-md-4 msc-right"> <div class="row"> <div class="col-md-12 text-center"> <img alt="' + team_b.nation_name + '" src="' + team_b.img_1_src + '"/> </div> <div class="col-md-12 text-center"> <img alt="' + team_b.nation_name + '" src="' + team_b.img_2_src + '"/> <strong> ' + team_b.nation_name + ' (' + team_b.nation_code + ') </strong> </div> </div> </div> <hr /> <div class="col-md-12 msc-buttom"> <span class="msc-referee"> <i class="fa fa-bullhorn"> </i> Trọng Tài: <br/>' + data.matchesdetail.referees[0].refereeName + ' (' + data.matchesdetail.referees[0].national.nationName + ') <br/>' + data.matchesdetail.referees[1].refereeName + ' (' + data.matchesdetail.referees[1].national.nationName + ') <br/>' + data.matchesdetail.referees[2].refereeName + ' (' + data.matchesdetail.referees[2].national.nationName + ') <br/> </span> </div> <div class="col-md-12 msc-buttom"> <span class="msc-stadium"> <i class="fa fa-map"> </i> Sân Vận Động: <br/>' + data.matchesdetail.match.matchStadium.stadiumName + ' - ' + data.matchesdetail.match.matchStadium.stadiumAddress + ' (' + data.matchesdetail.match.matchStadium.national.nationName + ') </span> </div> </div>');
								var $footerButton = dialog.getButton('btnSaveGoals');
								$content.find('button').click({$footerButton: $footerButton}, function(event) {
									event.data.$footerButton.enable();
									event.data.$footerButton.stopSpin();
									dialog.setClosable(true);
								});

								return $content;
							},
							buttons: [{
								id: 'btnClose',
								label: '<i class="fa fa-close"></i> Đóng',
								action: function(dialog) {
									dialog.close();
								}
							},
							{
								id: 'btnSaveGoals',
								label: '<i class="fa fa-save"></i> Cập Nhật Tỉ Số',
								cssClass: 'btn-info',
								action: function(dialog) {
									var $button = this;
									$button.disable();
									$button.spin();

									var teamHomeGoal = $('#teamHomeGoal').val();
									var teamAwayGoal = $('#teamAwayGoal').val();
									var json = {
										"teamHomeGoal": teamHomeGoal,
										"teamAwayGoal": teamAwayGoal
									};
									$.ajax({
										url: site_url('/api/v1/schedules/updateresult/' + match_id , 'json'),
										type: "PUT",
										data: JSON.stringify(json),
										contentType: 'application/json',
										beforeSend: function(xhr) {
											xhr.setRequestHeader("Accept", "application/json");
											xhr.setRequestHeader("Content-Type", "application/json");
										},
										success: function(data) {
											$button.enable();
											$button.stopSpin();
											if (data.status === "success") {
												datatblquarter.ajax.reload();
												show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
											} else {
												show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
											}
										}
									});


								}
							},
							{
								id: 'btnLock',
								label: '<i class="fa fa-lock"></i> Khóa',
								cssClass: 'btn-info',
								action: function(dialog) {
									var $button = this;
									$button.disable();
									$button.spin();

									var json = {
										"matchId": match_id
									};
									$.ajax({
										url: site_url('/api/v1/schedules/lockmatch/' + match_id , 'json'),
										type: "PUT",
										data: JSON.stringify(json),
										contentType: 'application/json',
										beforeSend: function(xhr) {
											xhr.setRequestHeader("Accept", "application/json");
											xhr.setRequestHeader("Content-Type", "application/json");
										},
										success: function(data) {
											$button.enable();
											$button.stopSpin();
											if (data.status === "success") {
												datatblquarter.ajax.reload();
												show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
											} else {
												show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
											}
										}
									});

								}
							}]
						});


						//datatblquarter.ajax.reload();
						//show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
					} else {
						show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
					}
				}
			});

event.preventDefault();

});


		// lock all
		$('.stageschedules-quarter-list-box').on('click', '.lock-all-stagematches', function(event) {
			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_INFO,
				title: '<i class="fa fa-futbol-o" ></i> Khóa tất cả các trận đấu vòng loại tứ kết.',
				message: 'Bạn có chắc là muốn khóa tất cả các trận đấu vòng loại tứ kết và cập nhật lên bảng xếp hạng. Điều này có thể mất chút ít thời gian.',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$('#loading').show();
						$.ajax({
							url: site_url('/api/v1/schedules/lockall/quarter', 'json'),
							type: "GET",
							contentType: 'application/json',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								$('#loading').hide();
								if (data.status === "success") {
									datatblquarter.ajax.reload();
									show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
								} else {
									show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
								}
							}
						});
					}
				}
			});

			event.preventDefault();
		});





	}




	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR stages semi   */
	/*=================================*/
	if ( $('.stageschedules-semi-list-box').length ) {


		/*Load matches schedules data table*/
		var datatblsemi = $('#tblStageMatchSemiSchedules').DataTable({
			"processing": true,
			"ajax": function (data, callback, settings) {
				$.ajax({
					type: "GET",
					url: site_url('/api/v1/schedules/semi', 'json'),
					success: function (json) {
						if ( json.status === "success" ) {
							callback(json);
						} else {
							var api = new $.fn.dataTable.Api(settings);
							var container = api.table().container();
							$(container).find('.dataTables_processing').hide();
							show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> Vòng loại bán kết ' + json.message, 'warning');
						}

					}
				});
			},
			"columns": [{
				data:function(row, type, set){

					var match_date = row.match.matchDateTime.hourOfDay + ' giờ '   +  row.match.matchDateTime.minuteOfHour +  ' phút, ngày ' + row.match.matchDateTime.dayOfMonth + ' tháng ' + row.match.matchDateTime.monthOfYear + ' năm ' + row.match.matchDateTime.year;
					var team_a = {
						"img_1_src": site_url('/resources/images/logos/teams/70x70/' + row.matchResultHome.teamPlay.national.nationCode, 'png' ),
						"img_2_src": site_url('/resources/images/flags/32x32/' + row.matchResultHome.teamPlay.national.nationCode, 'png'),
						"nation_name": row.matchResultHome.teamPlay.national.nationName,
						"nation_code": row.matchResultHome.teamPlay.national.nationCode,
						"goals": row.matchResultHome.matchGoalWin
					};

					var team_b = {
						"img_1_src": site_url('/resources/images/logos/teams/70x70/' + row.matchResultAway.teamPlay.national.nationCode, 'png' ),
						"img_2_src": site_url('/resources/images/flags/32x32/' + row.matchResultAway.teamPlay.national.nationCode, 'png'),
						"nation_name": row.matchResultAway.teamPlay.national.nationName,
						"nation_code": row.matchResultAway.teamPlay.national.nationCode,
						"goals": row.matchResultAway.matchGoalWin
					};

					return '<div class="row"> <div class="col-lg-12 msc-top bg-info"><span class="msc-datetime"><i class="fa fa-object-group"></i>&nbsp; Trận đấu: ' + row.matchTypeName + '</span> - <span class="msc-datetime"><i class="fa fa-clock-o"></i>&nbsp; Thời gian: ' + match_date + '</span><a href="javascript;;" data-match-id="' + row.match.matchId + '" class="btn btn-metis-6 btn-xs pull-right msc-detail-btn"> <i class="fa fa-futbol-o"> </i>&nbsp;Chi tiết </a> </div> <div class="col-lg-3 msc-left col-lg-offset-2"> <div class="row"> <div class="col-lg-12 text-center"><img src="' + team_a.img_1_src + '" alt="' + team_a.nation_name + '" /></div> <div class="col-lg-12 text-center"><strong>' + team_a.nation_name + ' (' +  team_a.nation_code+ ')</strong> <img src="' + team_a.img_2_src + '" alt="' + team_a.nation_name + '" /></div> </div> </div> <div class="col-lg-2 msc-mid"> <div class="row"> <div class="col-lg-12  text-center"> <span class="msc-teama">' + team_a.goals + '</span><span class="msc-team-div">-</span><span class="msc-teamb">' + team_b.goals + '</span> </div> </div> </div> <div class="col-lg-3 msc-right"> <div class="row"> <div class="col-lg-12 text-center"><img src="' + team_b.img_1_src + '" alt="' + team_b.nation_name + '" /></div> <div class="col-lg-12 text-center"><img src="' + team_b.img_2_src + '" alt="' + team_b.nation_name + '" /> <strong>' + team_b.nation_name + ' (' + team_b.nation_code + ')</strong></div> </div> </div> <div class="col-lg-12 msc-buttom"> <span class="msc-referee"><i class="fa fa-bullhorn"></i>&nbsp;Trọng Tài: ' + row.referees[0].refereeName + ' (' + row.referees[0].national.nationName + ')</span> <span class="msc-stadium pull-right"><i class="fa fa-map"></i>&nbsp;Sân Vận Động: ' + row.match.matchStadium.stadiumName + ' - ' + row.match.matchStadium.stadiumAddress + ' (' + row.match.matchStadium.national.nationName + ')</span></div> </div>';
				}

			}],
			"ordering": false,
			"pageLength": 4,
			"lengthMenu": [
			[4, 8, 16, -1],
			[4, 8, 16, "All"]
			],
			"language": applang.datatable_lang
		});


		// Tao lich thi dau vong loai bán kết
		$('.stageschedules-semi-list-box').on('click', '.add-all-stagematches', function(event) {


			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_INFO,
				title: '<i class="fa fa-futbol-o" ></i> Tạo các trận đấu vòng bảng.',
				message: 'Bạn có chắc là muộn tự tạo ngẩu nhiên các trận đấu vòng bảng. Điều này có thể mất chút ít thời gian.',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$('#loading').show();
						$.ajax({
							url: site_url('/api/v1/schedules/addall/semi', 'json'),
							type: "GET",
							contentType: 'application/json',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								$('#loading').hide();
								if (data.status === "success") {
									datatblsemi.ajax.reload();
									show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
								} else {
									show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
								}
							}
						});
					}
				}
			});

			event.preventDefault();

		});

		// Tao ngau nhien ti so cac tran dau trong vong loai bán kết
		$('.stageschedules-semi-list-box').on('click', '.randomgoal-all-stagematches', function(event) {


			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-futbol-o" ></i> Tạo ngẩu nhiên các tỉ số.',
				message: 'Bạn có chắc là muộn tự tạo ngẩu nhiên các tỉ số vòng loại bán kết. Điều này có thể mất chút ít thời gian.',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$('#loading').show();
						$.ajax({
							url: site_url('/api/v1/schedules/randomallgoal/semi', 'json'),
							type: "GET",
							contentType: 'application/json',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								$('#loading').hide();
								if (data.status === "success") {
									datatblsemi.ajax.reload();
									show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
								} else {
									show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
								}
							}
						});
					}
				}
			});

			event.preventDefault();

		});

		// Show a match details and show form update goals
		$('.stageschedules-semi-list-box').on('click', '.msc-detail-btn', function(event) {

			var match_id = $(this).attr('data-match-id');


			$('#loading').show();
			$.ajax({
				url: site_url('/api/v1/schedules/detail/' + match_id, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					$('#loading').hide();
					if (data.status === "success") {

						BootstrapDialog.show({
							title: 'Thông tin chi tiết trận đấu: ' + data.matchesdetail.matchTypeName,
							message: function(dialog) {

								var match_date = data.matchesdetail.match.matchDateTime.hourOfDay + ' giờ '   +  data.matchesdetail.match.matchDateTime.minuteOfHour +  ' phút, ngày ' + data.matchesdetail.match.matchDateTime.dayOfMonth + ' tháng ' + data.matchesdetail.match.matchDateTime.monthOfYear + ' năm ' + data.matchesdetail.match.matchDateTime.year;
								var team_a = {
									"img_1_src": site_url('/resources/images/logos/teams/70x70/' + data.matchesdetail.matchResultHome.teamPlay.national.nationCode, 'png' ),
									"img_2_src": site_url('/resources/images/flags/32x32/' + data.matchesdetail.matchResultHome.teamPlay.national.nationCode, 'png'),
									"nation_name": data.matchesdetail.matchResultHome.teamPlay.national.nationName,
									"nation_code": data.matchesdetail.matchResultHome.teamPlay.national.nationCode,
									"goals": data.matchesdetail.matchResultHome.matchGoalWin
								};

								var team_b = {
									"img_1_src": site_url('/resources/images/logos/teams/70x70/' + data.matchesdetail.matchResultAway.teamPlay.national.nationCode, 'png' ),
									"img_2_src": site_url('/resources/images/flags/32x32/' + data.matchesdetail.matchResultAway.teamPlay.national.nationCode, 'png'),
									"nation_name": data.matchesdetail.matchResultAway.teamPlay.national.nationName,
									"nation_code": data.matchesdetail.matchResultAway.teamPlay.national.nationCode,
									"goals": data.matchesdetail.matchResultAway.matchGoalWin
								};

								var $content = $('<div class="row matches-details"> <div class="col-md-12 msc-top"> <span class="msc-datetime"> <i class="fa fa-clock-o"> </i> Thời gian: ' + match_date + '</span> </div> <div class="col-md-4 msc-left"> <div class="row"> <div class="col-md-12 text-center"> <img alt="' + team_a.nation_name + '" src="' + team_a.img_1_src + '"/> </div> <div class="col-md-12 text-center"> <strong> ' + team_a.nation_name + ' (' +  team_a.nation_code+ ') </strong> <img alt="' + team_a.nation_name + '" src="' + team_a.img_2_src + '"/> </div> </div> </div> <div class="col-md-4 msc-mid"> <div class="row"> <div class="col-md-12 text-center"> <form id="frmDetailMatches" action="" class="form-inline" > <input  class="msc-teama form-control" type="text" id="teamHomeGoal" name="teamHomeGoal" value="' + team_a.goals + '" /> <span class="msc-team-div"> - </span> <input type="text" class="msc-teamb form-control" id="teamAwayGoal" name="teamAwayGoal" value="' + team_b.goals + '" /> </form> </div> </div> </div> <div class="col-md-4 msc-right"> <div class="row"> <div class="col-md-12 text-center"> <img alt="' + team_b.nation_name + '" src="' + team_b.img_1_src + '"/> </div> <div class="col-md-12 text-center"> <img alt="' + team_b.nation_name + '" src="' + team_b.img_2_src + '"/> <strong> ' + team_b.nation_name + ' (' + team_b.nation_code + ') </strong> </div> </div> </div> <hr /> <div class="col-md-12 msc-buttom"> <span class="msc-referee"> <i class="fa fa-bullhorn"> </i> Trọng Tài: <br/>' + data.matchesdetail.referees[0].refereeName + ' (' + data.matchesdetail.referees[0].national.nationName + ') <br/>' + data.matchesdetail.referees[1].refereeName + ' (' + data.matchesdetail.referees[1].national.nationName + ') <br/>' + data.matchesdetail.referees[2].refereeName + ' (' + data.matchesdetail.referees[2].national.nationName + ') <br/> </span> </div> <div class="col-md-12 msc-buttom"> <span class="msc-stadium"> <i class="fa fa-map"> </i> Sân Vận Động: <br/>' + data.matchesdetail.match.matchStadium.stadiumName + ' - ' + data.matchesdetail.match.matchStadium.stadiumAddress + ' (' + data.matchesdetail.match.matchStadium.national.nationName + ') </span> </div> </div>');
								var $footerButton = dialog.getButton('btnSaveGoals');
								$content.find('button').click({$footerButton: $footerButton}, function(event) {
									event.data.$footerButton.enable();
									event.data.$footerButton.stopSpin();
									dialog.setClosable(true);
								});

								return $content;
							},
							buttons: [{
								id: 'btnClose',
								label: '<i class="fa fa-close"></i> Đóng',
								action: function(dialog) {
									dialog.close();
								}
							},
							{
								id: 'btnSaveGoals',
								label: '<i class="fa fa-save"></i> Cập Nhật Tỉ Số',
								cssClass: 'btn-info',
								action: function(dialog) {
									var $button = this;
									$button.disable();
									$button.spin();

									var teamHomeGoal = $('#teamHomeGoal').val();
									var teamAwayGoal = $('#teamAwayGoal').val();
									var json = {
										"teamHomeGoal": teamHomeGoal,
										"teamAwayGoal": teamAwayGoal
									};
									$.ajax({
										url: site_url('/api/v1/schedules/updateresult/' + match_id , 'json'),
										type: "PUT",
										data: JSON.stringify(json),
										contentType: 'application/json',
										beforeSend: function(xhr) {
											xhr.setRequestHeader("Accept", "application/json");
											xhr.setRequestHeader("Content-Type", "application/json");
										},
										success: function(data) {
											$button.enable();
											$button.stopSpin();
											if (data.status === "success") {
												datatblsemi.ajax.reload();
												show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
											} else {
												show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
											}
										}
									});


								}
							},
							{
								id: 'btnLock',
								label: '<i class="fa fa-lock"></i> Khóa',
								cssClass: 'btn-info',
								action: function(dialog) {
									var $button = this;
									$button.disable();
									$button.spin();

									var json = {
										"matchId": match_id
									};
									$.ajax({
										url: site_url('/api/v1/schedules/lockmatch/' + match_id , 'json'),
										type: "PUT",
										data: JSON.stringify(json),
										contentType: 'application/json',
										beforeSend: function(xhr) {
											xhr.setRequestHeader("Accept", "application/json");
											xhr.setRequestHeader("Content-Type", "application/json");
										},
										success: function(data) {
											$button.enable();
											$button.stopSpin();
											if (data.status === "success") {
												datatblsemi.ajax.reload();
												show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
											} else {
												show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
											}
										}
									});

								}
							}]
						});


						//datatblsemi.ajax.reload();
						//show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
					} else {
						show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
					}
				}
			});

event.preventDefault();

});


		// lock all
		$('.stageschedules-semi-list-box').on('click', '.lock-all-stagematches', function(event) {
			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_INFO,
				title: '<i class="fa fa-futbol-o" ></i> Khóa tất cả các trận đấu vòng loại bán kết.',
				message: 'Bạn có chắc là muốn khóa tất cả các trận đấu vòng loại bán kết và cập nhật lên bảng xếp hạng. Điều này có thể mất chút ít thời gian.',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$('#loading').show();
						$.ajax({
							url: site_url('/api/v1/schedules/lockall/semi', 'json'),
							type: "GET",
							contentType: 'application/json',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								$('#loading').hide();
								if (data.status === "success") {
									datatblsemi.ajax.reload();
									show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
								} else {
									show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
								}
							}
						});
					}
				}
			});

			event.preventDefault();
		});





	}






	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR stages final   */
	/*=================================*/
	if ( $('.stageschedules-final-list-box').length ) {


		/*Load matches schedules data table*/
		var datatblfinal = $('#tblStageMatchFinalSchedules').DataTable({
			"processing": true,
			"ajax": function (data, callback, settings) {
				$.ajax({
					type: "GET",
					url: site_url('/api/v1/schedules/final', 'json'),
					success: function (json) {
						if ( json.status === "success" ) {
							callback(json);
						} else {
							var api = new $.fn.dataTable.Api(settings);
							var container = api.table().container();
							$(container).find('.dataTables_processing').hide();
							show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> Vòng chung kết ' + json.message, 'warning');
						}

					}
				});
			},
			"columns": [{
				data:function(row, type, set){

					var match_date = row.match.matchDateTime.hourOfDay + ' giờ '   +  row.match.matchDateTime.minuteOfHour +  ' phút, ngày ' + row.match.matchDateTime.dayOfMonth + ' tháng ' + row.match.matchDateTime.monthOfYear + ' năm ' + row.match.matchDateTime.year;
					var team_a = {
						"img_1_src": site_url('/resources/images/logos/teams/70x70/' + row.matchResultHome.teamPlay.national.nationCode, 'png' ),
						"img_2_src": site_url('/resources/images/flags/32x32/' + row.matchResultHome.teamPlay.national.nationCode, 'png'),
						"nation_name": row.matchResultHome.teamPlay.national.nationName,
						"nation_code": row.matchResultHome.teamPlay.national.nationCode,
						"goals": row.matchResultHome.matchGoalWin
					};

					var team_b = {
						"img_1_src": site_url('/resources/images/logos/teams/70x70/' + row.matchResultAway.teamPlay.national.nationCode, 'png' ),
						"img_2_src": site_url('/resources/images/flags/32x32/' + row.matchResultAway.teamPlay.national.nationCode, 'png'),
						"nation_name": row.matchResultAway.teamPlay.national.nationName,
						"nation_code": row.matchResultAway.teamPlay.national.nationCode,
						"goals": row.matchResultAway.matchGoalWin
					};

					return '<div class="row"> <div class="col-lg-12 msc-top bg-info"><span class="msc-datetime"><i class="fa fa-object-group"></i>&nbsp; Trận đấu: ' + row.matchTypeName + '</span> - <span class="msc-datetime"><i class="fa fa-clock-o"></i>&nbsp; Thời gian: ' + match_date + '</span><a href="javascript;;" data-match-id="' + row.match.matchId + '" class="btn btn-metis-6 btn-xs pull-right msc-detail-btn"> <i class="fa fa-futbol-o"> </i>&nbsp;Chi tiết </a> </div> <div class="col-lg-3 msc-left col-lg-offset-2"> <div class="row"> <div class="col-lg-12 text-center"><img src="' + team_a.img_1_src + '" alt="' + team_a.nation_name + '" /></div> <div class="col-lg-12 text-center"><strong>' + team_a.nation_name + ' (' +  team_a.nation_code+ ')</strong> <img src="' + team_a.img_2_src + '" alt="' + team_a.nation_name + '" /></div> </div> </div> <div class="col-lg-2 msc-mid"> <div class="row"> <div class="col-lg-12  text-center"> <span class="msc-teama">' + team_a.goals + '</span><span class="msc-team-div">-</span><span class="msc-teamb">' + team_b.goals + '</span> </div> </div> </div> <div class="col-lg-3 msc-right"> <div class="row"> <div class="col-lg-12 text-center"><img src="' + team_b.img_1_src + '" alt="' + team_b.nation_name + '" /></div> <div class="col-lg-12 text-center"><img src="' + team_b.img_2_src + '" alt="' + team_b.nation_name + '" /> <strong>' + team_b.nation_name + ' (' + team_b.nation_code + ')</strong></div> </div> </div> <div class="col-lg-12 msc-buttom"> <span class="msc-referee"><i class="fa fa-bullhorn"></i>&nbsp;Trọng Tài: ' + row.referees[0].refereeName + ' (' + row.referees[0].national.nationName + ')</span> <span class="msc-stadium pull-right"><i class="fa fa-map"></i>&nbsp;Sân Vận Động: ' + row.match.matchStadium.stadiumName + ' - ' + row.match.matchStadium.stadiumAddress + ' (' + row.match.matchStadium.national.nationName + ')</span></div> </div>';
				}

			}],
			"ordering": false,
			"pageLength": 4,
			"lengthMenu": [
			[4, 8, 16, -1],
			[4, 8, 16, "All"]
			],
			"language": applang.datatable_lang
		});


		// Tao lich thi dau vong loai bán kết
		$('.stageschedules-final-list-box').on('click', '.add-all-stagematches', function(event) {


			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_INFO,
				title: '<i class="fa fa-futbol-o" ></i> Tạo các trận đấu vòng bảng.',
				message: 'Bạn có chắc là muộn tự tạo ngẩu nhiên các trận đấu vòng bảng. Điều này có thể mất chút ít thời gian.',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$('#loading').show();
						$.ajax({
							url: site_url('/api/v1/schedules/addall/final', 'json'),
							type: "GET",
							contentType: 'application/json',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								$('#loading').hide();
								if (data.status === "success") {
									datatblfinal.ajax.reload();
									show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
								} else {
									show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
								}
							}
						});
					}
				}
			});

			event.preventDefault();

		});

		// Tao ngau nhien ti so cac tran dau trong vong loai bán kết
		$('.stageschedules-final-list-box').on('click', '.randomgoal-all-stagematches', function(event) {


			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_WARNING,
				title: '<i class="fa fa-futbol-o" ></i> Tạo ngẩu nhiên các tỉ số.',
				message: 'Bạn có chắc là muộn tự tạo ngẩu nhiên các tỉ số vòng loại bán kết. Điều này có thể mất chút ít thời gian.',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$('#loading').show();
						$.ajax({
							url: site_url('/api/v1/schedules/randomallgoal/final', 'json'),
							type: "GET",
							contentType: 'application/json',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								$('#loading').hide();
								if (data.status === "success") {
									datatblfinal.ajax.reload();
									show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
								} else {
									show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
								}
							}
						});
					}
				}
			});

			event.preventDefault();

		});

		// Show a match details and show form update goals
		$('.stageschedules-final-list-box').on('click', '.msc-detail-btn', function(event) {

			var match_id = $(this).attr('data-match-id');


			$('#loading').show();
			$.ajax({
				url: site_url('/api/v1/schedules/detail/' + match_id, 'json'),
				type: "GET",
				contentType: 'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data) {
					$('#loading').hide();
					if (data.status === "success") {

						BootstrapDialog.show({
							title: 'Thông tin chi tiết trận đấu: ' + data.matchesdetail.matchTypeName,
							message: function(dialog) {

								var match_date = data.matchesdetail.match.matchDateTime.hourOfDay + ' giờ '   +  data.matchesdetail.match.matchDateTime.minuteOfHour +  ' phút, ngày ' + data.matchesdetail.match.matchDateTime.dayOfMonth + ' tháng ' + data.matchesdetail.match.matchDateTime.monthOfYear + ' năm ' + data.matchesdetail.match.matchDateTime.year;
								var team_a = {
									"img_1_src": site_url('/resources/images/logos/teams/70x70/' + data.matchesdetail.matchResultHome.teamPlay.national.nationCode, 'png' ),
									"img_2_src": site_url('/resources/images/flags/32x32/' + data.matchesdetail.matchResultHome.teamPlay.national.nationCode, 'png'),
									"nation_name": data.matchesdetail.matchResultHome.teamPlay.national.nationName,
									"nation_code": data.matchesdetail.matchResultHome.teamPlay.national.nationCode,
									"goals": data.matchesdetail.matchResultHome.matchGoalWin
								};

								var team_b = {
									"img_1_src": site_url('/resources/images/logos/teams/70x70/' + data.matchesdetail.matchResultAway.teamPlay.national.nationCode, 'png' ),
									"img_2_src": site_url('/resources/images/flags/32x32/' + data.matchesdetail.matchResultAway.teamPlay.national.nationCode, 'png'),
									"nation_name": data.matchesdetail.matchResultAway.teamPlay.national.nationName,
									"nation_code": data.matchesdetail.matchResultAway.teamPlay.national.nationCode,
									"goals": data.matchesdetail.matchResultAway.matchGoalWin
								};

								var $content = $('<div class="row matches-details"> <div class="col-md-12 msc-top"> <span class="msc-datetime"> <i class="fa fa-clock-o"> </i> Thời gian: ' + match_date + '</span> </div> <div class="col-md-4 msc-left"> <div class="row"> <div class="col-md-12 text-center"> <img alt="' + team_a.nation_name + '" src="' + team_a.img_1_src + '"/> </div> <div class="col-md-12 text-center"> <strong> ' + team_a.nation_name + ' (' +  team_a.nation_code+ ') </strong> <img alt="' + team_a.nation_name + '" src="' + team_a.img_2_src + '"/> </div> </div> </div> <div class="col-md-4 msc-mid"> <div class="row"> <div class="col-md-12 text-center"> <form id="frmDetailMatches" action="" class="form-inline" > <input  class="msc-teama form-control" type="text" id="teamHomeGoal" name="teamHomeGoal" value="' + team_a.goals + '" /> <span class="msc-team-div"> - </span> <input type="text" class="msc-teamb form-control" id="teamAwayGoal" name="teamAwayGoal" value="' + team_b.goals + '" /> </form> </div> </div> </div> <div class="col-md-4 msc-right"> <div class="row"> <div class="col-md-12 text-center"> <img alt="' + team_b.nation_name + '" src="' + team_b.img_1_src + '"/> </div> <div class="col-md-12 text-center"> <img alt="' + team_b.nation_name + '" src="' + team_b.img_2_src + '"/> <strong> ' + team_b.nation_name + ' (' + team_b.nation_code + ') </strong> </div> </div> </div> <hr /> <div class="col-md-12 msc-buttom"> <span class="msc-referee"> <i class="fa fa-bullhorn"> </i> Trọng Tài: <br/>' + data.matchesdetail.referees[0].refereeName + ' (' + data.matchesdetail.referees[0].national.nationName + ') <br/>' + data.matchesdetail.referees[1].refereeName + ' (' + data.matchesdetail.referees[1].national.nationName + ') <br/>' + data.matchesdetail.referees[2].refereeName + ' (' + data.matchesdetail.referees[2].national.nationName + ') <br/> </span> </div> <div class="col-md-12 msc-buttom"> <span class="msc-stadium"> <i class="fa fa-map"> </i> Sân Vận Động: <br/>' + data.matchesdetail.match.matchStadium.stadiumName + ' - ' + data.matchesdetail.match.matchStadium.stadiumAddress + ' (' + data.matchesdetail.match.matchStadium.national.nationName + ') </span> </div> </div>');
								var $footerButton = dialog.getButton('btnSaveGoals');
								$content.find('button').click({$footerButton: $footerButton}, function(event) {
									event.data.$footerButton.enable();
									event.data.$footerButton.stopSpin();
									dialog.setClosable(true);
								});

								return $content;
							},
							buttons: [{
								id: 'btnClose',
								label: '<i class="fa fa-close"></i> Đóng',
								action: function(dialog) {
									dialog.close();
								}
							},
							{
								id: 'btnSaveGoals',
								label: '<i class="fa fa-save"></i> Cập Nhật Tỉ Số',
								cssClass: 'btn-info',
								action: function(dialog) {
									var $button = this;
									$button.disable();
									$button.spin();

									var teamHomeGoal = $('#teamHomeGoal').val();
									var teamAwayGoal = $('#teamAwayGoal').val();
									var json = {
										"teamHomeGoal": teamHomeGoal,
										"teamAwayGoal": teamAwayGoal
									};
									$.ajax({
										url: site_url('/api/v1/schedules/updateresult/' + match_id , 'json'),
										type: "PUT",
										data: JSON.stringify(json),
										contentType: 'application/json',
										beforeSend: function(xhr) {
											xhr.setRequestHeader("Accept", "application/json");
											xhr.setRequestHeader("Content-Type", "application/json");
										},
										success: function(data) {
											$button.enable();
											$button.stopSpin();
											if (data.status === "success") {
												datatblfinal.ajax.reload();
												show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
											} else {
												show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
											}
										}
									});


								}
							},
							{
								id: 'btnLock',
								label: '<i class="fa fa-lock"></i> Khóa',
								cssClass: 'btn-info',
								action: function(dialog) {
									var $button = this;
									$button.disable();
									$button.spin();

									var json = {
										"matchId": match_id
									};
									$.ajax({
										url: site_url('/api/v1/schedules/lockmatch/' + match_id , 'json'),
										type: "PUT",
										data: JSON.stringify(json),
										contentType: 'application/json',
										beforeSend: function(xhr) {
											xhr.setRequestHeader("Accept", "application/json");
											xhr.setRequestHeader("Content-Type", "application/json");
										},
										success: function(data) {
											$button.enable();
											$button.stopSpin();
											if (data.status === "success") {
												datatblfinal.ajax.reload();
												show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
											} else {
												show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
											}
										}
									});

								}
							}]
						});


						//datatblfinal.ajax.reload();
						//show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
					} else {
						show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
					}
				}
			});

event.preventDefault();

});


		// lock all
		$('.stageschedules-final-list-box').on('click', '.lock-all-stagematches', function(event) {
			BootstrapDialog.confirm({
				type: BootstrapDialog.TYPE_INFO,
				title: '<i class="fa fa-futbol-o" ></i> Khóa tất cả các trận đấu vòng loại bán kết.',
				message: 'Bạn có chắc là muốn khóa tất cả các trận đấu vòng loại bán kết và cập nhật lên bảng xếp hạng. Điều này có thể mất chút ít thời gian.',
				closable: true,
				draggable: true,
				btnCancelLabel: '<i class="glyphicon glyphicon-remove" ></i> Hủy',
				btnOKLabel: '<i class="glyphicon glyphicon-ok" ></i> Đồng ý',
				btnOKClass: "btn-primary",
				callback: function(result) {
					if (result) {
						$('#loading').show();
						$.ajax({
							url: site_url('/api/v1/schedules/lockall/final', 'json'),
							type: "GET",
							contentType: 'application/json',
							beforeSend: function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success: function(data) {
								$('#loading').hide();
								if (data.status === "success") {
									datatblfinal.ajax.reload();
									show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
								} else {
									show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
								}
							}
						});
					}
				}
			});

			event.preventDefault();
		});





	}




	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR standing groups   */
	/*=================================*/
	if ( $('#groupstanding-content').length !== 0 ) {


		$('.groupstanding-list-box').each(function() {
			var tablestanding = $(this).find('.table-standing').first();
			var groupid = $(this).attr('data-group-id');
			var datatbl = $(tablestanding).DataTable({
				"processing": true,
				"ajax": site_url('/api/v1/standings/groups/' + groupid, 'json'),
				"columns": [{
					data: function(row, type, set){
						return '<img src="' + site_url('/resources/images/flags/18x18/' + row.teamStanding.national.nationCode, 'png'  ) + '" alt="' + row.teamStanding.national.nationName + '" /> <strong>' + row.teamStanding.national.nationName + '</strong> (' + row.teamStanding.national.nationCode + ')';
					}
				},
				{
					data: function(row, type, set){
						return row.standingTotalGoal;
					}
				},
				{
					data: function(row, type, set){
						return row.standingTotalGoalAgains;
					}
				},
				{
					data: function(row, type, set){
						return row.standingTotalGoalDifference;
					}
				},
				{
					data: function(row, type, set){
						return row.standingPosition;
					}
				}],
				"paging":   false,
				"ordering": false,
				"filtering": false,
				"bFilter": false,
				"info":     false,
				"language": applang.datatable_lang
			});


		});

	}



	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR standing stages   */
	/*=================================*/
	if ( $('#stagestanding-content').length !== 0 ) {


		$('.stagestanding-list-box').each(function() {
			var tablestanding = $(this).find('.table-standing').first();
			var stageid = $(this).attr('data-stage-id');
			var datatbl = $(tablestanding).DataTable({
				"processing": true,
				"ajax": site_url('/api/v1/standings/stages/' + stageid, 'json'),
				"columns": [{
					data: function(row, type, set){
						return '<img src="' + site_url('/resources/images/flags/18x18/' + row.teamStanding.national.nationCode, 'png'  ) + '" alt="' + row.teamStanding.national.nationName + '" /> <strong>' + row.teamStanding.national.nationName + '</strong> (' + row.teamStanding.national.nationCode + ')';
					}
				},
				{
					data: function(row, type, set){
						return row.standingTotalGoal;
					}
				},
				{
					data: function(row, type, set){
						return row.standingTotalGoalAgains;
					}
				},
				{
					data: function(row, type, set){
						return row.standingTotalGoalDifference;
					}
				},
				{
					data: function(row, type, set){
						return row.standingPosition;
					}
				}],
				"paging":   false,
				"ordering": false,
				"filtering": false,
				"bFilter": false,
				"info":     false,
				"language": applang.datatable_lang
			});


		});

	}



	/*----------------------------------------------------------------------------*/

	/*=================================*/
	/*    ACTIONS FOR Champion   */
	/*=================================*/
	if ($('#championinfo').length) {


		$.ajax({
			url: site_url('/api/v1/champion' , 'json'),
			type: "GET",
			contentType: 'application/json',
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(data) {
				if (data.status === "success") {
					var championlogo = site_url('/resources/images/logos/teams/70x70/' + data.champion.national.nationCode, 'png' );
					var championflag = site_url('/resources/images/flags/200x200/' + data.champion.national.nationCode, 'png' );
					var championname = data.champion.national.nationName;
					$('#championlogo').attr('src', championlogo);
					$('#championflag').attr('src', championflag);
					$('#championname').html(championname);
					$('#championname').attr('href', site_url('/dashboard/teams/' + data.champion.teamId + '/details'));

					$('#champion img').each(function(index, el) {
						$(this).attr('alt', championname);
					});
					show_notify('<strong><i class="fa fa-check fa-2x"></i> Thành Công:</strong> ' + data.message, 'success');
				} else {
					show_notify('<strong><i class="fa fa-alert fa-2x"></i> Lổi:</strong> ' + data.message, 'warning');
				}
			}
		});

	}





	/* Metis Loader */
	Metis.dashboard();
	Metis.MetisTable();
});

