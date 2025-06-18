var $form;
var $popup;
var $countries;
$(document).ready(function() {
	$('table#filter-list').dataTable();
	$(".selectpicker").selectpicker();
	$(".selectfilter").selectpicker().on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		filter_subtypes();
	});
	
	$('body').on('change', 'select[name=bs_bc_id]', function() {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'consultation_subtypes/countries',
			data: { target : $.trim($(this).val()) },
			dataType: 'json',
			beforeSend: function() {
				$.blockUI({ message : '' });
			},
			success: function(response) {
				$('select#bs-countries').val('').html(response);
				$('.selectpicker').selectpicker('refresh');
			},
			complete: function() {
				$.unblockUI();
			}
		});
	});
	
	$('body').on('change', 'select[name=filter_visa]', function() {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'consultation_subtypes/consultation_types',
			data: { target : $.trim($(this).val()) },
			dataType: 'json',
			beforeSend: function() {
				$.blockUI({ message : '' });
			},
			success: function(response) {
				$('select[name=filter_type]').val('').html(response).ready(function () {
					$('.selectfilter').selectpicker('refresh');
				});
			},
			complete: function() {
				$.unblockUI();
			}
		});
	});
});

function filter_subtypes() {
	$.ajax({
		'url': $('form#filter-form').attr('action'),
		'method': 'POST',
		'data': $('form#filter-form').serialize(),
		'dataType': 'json',
		'beforeSend': function() {
			if ( $('div.blockUI').length == 0 ) {
				$.blockUI({ message : '' });
			}
		}
	}).done( function(data) {
		$('table#filter-list').dataTable().fnDestroy();
		$('table#filter-list').dataTable({
			"ordering": true,
			"aaData": data,
			"columns": [
				{ "data": "key" },
				{ "data": "visa" },
				{ "data": "type" },
				{ "data": "countries" },
				{ "data": "title" },
				{ "data": "priority" },
				{ "data": "updated" },
				{ "data": "status" },
				{ "data": "action" }
			],
			"createdRow": function( row, data, dataIndex ) {
				// $(row).addClass(data.background);
			}
		});
		$.unblockUI();
	});
}

$('form').submit(function(event){
	
	event.preventDefault();
	
	$form = $(this);
	$formID = $form.attr('id'); 
	var formData = new FormData(document.getElementById($formID));

	var $btn = $("button[name=submit]");
	var $btnHtml = $btn.html();
	
	$.ajax({
		type: 'POST',
		url: $.trim($(this).attr('action')),
		data: formData,
		dataType: 'json',
		contentType: false,
		processData: false,
		beforeSend: function() {
			$("span.form-errors").text("");
			$btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
		},
		success: function(response) {
			if ( response.status == 200 ) {
				$.toast({
					hideAfter: 3000,
					heading: 'Success',
					text: response.alerts,
					showHideTransition: 'slide',
					position: 'bottom-center',
					icon: 'success',
					stack: 1,
					beforeShow: function () {
						$popup.modal('hide');
						$('form#'+$formID).trigger("reset");
					},
					beforeHide: function () {
						filter_subtypes();
						// window.location.replace(response.redirect);
					},
				});
			} else if ( response.status == 404 && response.errors ) {
				$popup.animate({ scrollTop: 0 });
				$.each(response.errors, function (i, errors) {
					$.each(errors, function (field, error) {
						$("span#" + field.replace(/[[\]]/g,'') + "-error").text(error);
					});
				});
			} else if ( response.status == 404 && response.alerts ) {
				$.toast({
					hideAfter: 5000,
					heading: 'Error',
					text: response.alerts,
					showHideTransition: 'slide',
					position: 'bottom-center',
					icon: 'error',
					stack: 1
				});
			}
		},
		complete: function() {
			$btn.html($btnHtml);
		}
	});
});

function change_priority(target = '', value = '') {
	if ( $.trim(target) && $.isNumeric(value) ) {
		$.post(SITEURL + 'consultation_subtypes/priority', { target : $.trim(target), value : $.trim(value) }, function(result) {});
	}
}

function change_status(target, value) {
	if ( $.trim(target) && $.isNumeric(value) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'consultation_subtypes/status',
			data: { target : $.trim(target), value : $.trim(value) },
			dataType: 'json',
			beforeSend: function() {
				$.blockUI({ message : '' });
			},
			success: function(response) {
				if ( response.status = 200 ) {
					$('button#status-' + atob($.trim(target))).removeClass('btn-success').removeClass('btn-danger').addClass(response.class);
					$('button#status-' + atob($.trim(target))).html(response.title);
					$('button#status-' + atob($.trim(target))).attr('onclick', "change_status('"+$.trim(target)+"', '"+response.value+"')");
				}
			},
			complete: function() {
				$.unblockUI();
			}
		});
	}
}

function popup_add(target = '') {
	$form = $('#add-form');
	if ( $.trim(target) ) {
		$.ajax({
			type: 'GET',
			url: SITEURL + 'consultation_subtypes/add',
			data: { target : $.trim(target) },
			dataType: 'json',
			beforeSend: function() {
				$popup = '';
				$.blockUI({ message : '' });
				$('#popup-add').find('div.modal-body').html('');
			},
			success: function(response) {
				if ( response.status == 200 ) {
					$popup = $('#popup-add');
					$popup.find('div.modal-body').html(response.html);
					$('.imageuploader').imageUploader({
						imagesInputName: 'image',
						maxFiles: 1,
						maxSize: 1048576,
						label: 'Choose an image size less than 1 MB. Recommended size is 200KB.'
					}).find('input[type=file]').attr('name', 'image').removeAttr('multiple');
					$('.banneruploader').imageUploader({
						imagesInputName: 'banner',
						maxFiles: 1,
						maxSize: 1048576,
						label: 'Choose an image size less than 1 MB. Recommended size is 200KB.'
					}).find('input[type=file]').attr('name', 'banner').removeAttr('multiple');
					$('.selectpicker').selectpicker('refresh');
				} else {
					$.toast({
						hideAfter: 5000,
						heading: 'Error',
						text: response.alerts,
						showHideTransition: 'slide',
						position: 'bottom-center',
						icon: 'error',
						stack: 1
					});
				}
			},
			complete: function() {
				$popup.modal('show');
				$.unblockUI();
			}
		});
	}
}

function popup_edit(target = '') {
	$form = $('#edit-form');
	if ( $.trim(target) ) {
		$.ajax({
			type: 'GET',
			url: SITEURL + 'consultation_subtypes/edit',
			data: { target : $.trim(target) },
			dataType: 'json',
			beforeSend: function() {
				$popup = '';
				$.blockUI({ message : '' });
				$('#popup-edit').find('div.modal-body').html('');
			},
			success: function(response) {
				if ( response.status == 200 ) {
					$popup = $('#popup-edit');
					$popup.find('div.modal-body').html(response.html);
					$('.imageuploader').imageUploader({
						preloaded: response.images,
						imagesInputName: 'image',
						preloadedInputName: 'image',
						maxFiles: 1,
						maxSize: 1048576,
						label: 'Choose an image size below 1 MB. Recommended size is 200 KB.'
					}).find('input[type=file]').attr('name', 'image').removeAttr('multiple');
					$('.banneruploader').imageUploader({
						preloaded: response.banner,
						imagesInputName: 'banner',
						preloadedInputName: 'banner',
						maxFiles: 1,
						maxSize: 1048576,
						label: 'Choose an image size below 1 MB. Recommended size is 200 KB.'
					}).find('input[type=file]').attr('name', 'banner').removeAttr('multiple');
					$('.selectpicker').selectpicker('refresh');
				} else {
					$.toast({
						hideAfter: 5000,
						heading: 'Error',
						text: response.alerts,
						showHideTransition: 'slide',
						position: 'bottom-center',
						icon: 'error',
						stack: 1
					});
				}
			},
			complete: function() {
				$popup.modal('show');
				$.unblockUI();
			}
		});
	}
}

function option_minus(target = 'bv-option-title') {
	if ( $.trim(target) ) {
		target = $.trim(target);
		var value = $.trim($('input#' + $.trim(target)).attr('rel'));
		if ( $.isNumeric(value) && value > 0 ) {
			$('div#options-list-'+ value).remove();
			var $assign = (Number(value) - 1);
			$('input#' + target).attr('rel', $assign);
		} else {
			$('input#' + target).attr('rel', 0);
		}
	}
}

function option_plus(target = 'bv-option-title') {
	if ( $.trim(target) ) {
		target = $.trim(target);
		var value = $.trim($('input#' + $.trim(target)).attr('rel'));
		if ( $.isNumeric(value) ) {
			var $assign = (Number(value) + 1);
			$('input#' + target).attr('rel', $assign);
			$('div.options-list').append('<div class="form-group" id="options-list-'+ $assign +'">' +
											'<input type="text" name="bv_option_values[]" id="bv-option-'+ $assign +'" class="form-control" placeholder="Give a name for the consultation type" required />' +
										'</div>');
		}
	}
}

function refresh() {
    window.location.reload();
}