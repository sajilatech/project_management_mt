var $form;
var $popup;
var $countries;
$(document).ready(function() {
	filter_table();
	$(".selectpicker").selectpicker();
	$(".selectfilter").selectpicker().on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		filter_table();
	});
});

function filter_table() {
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
				{ "data": "title" },
				{ "data": "countries" },
				{ "data": "destination" },
				{ "data": "a_price" },
				{ "data": "c_price" },
				{ "data": "priority" },
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
						if ( response.redirect ) {
							window.location.replace(response.redirect);
						} else {
							filter_table();
						}
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
		$.post(SITEURL + 'visa_lists/priority', { target : $.trim(target), value : $.trim(value) }, function(result) {});
	}
}

function delete_row(target = '') {
	if ( $.trim(target) ) {
		if ( confirm("Are you sure you want to delete ?") ) {
			$.ajax({
				type: 'POST',
				url: SITEURL + 'visa_lists/remove',
				data: { target : $.trim(target) },
				dataType: 'json',
				beforeSend: function() {
					$.blockUI({ message : '' });
				},
				success: function(response) {
					if ( response.status = 200 ) {
						$.toast({
							hideAfter: 3000,
							heading: 'Success',
							text: response.alerts,
							showHideTransition: 'slide',
							position: 'bottom-center',
							icon: 'error',
							stack: 1,
							beforeHide: function () {
								if ( response.redirect ) {
									location.replace(response.redirect);
								} else {
									filter_table();
								}
							}
						});
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
					$.unblockUI();
				}
			});
		}
	}
}

function change_status(target, value) {
	if ( $.trim(target) && $.trim(value) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'visa_lists/status',
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

function change_b2c(target, value) {
	if ( $.trim(target) && $.trim(value) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'visa_lists/business2c',
			data: { target : $.trim(target), value : $.trim(value) },
			dataType: 'json',
			beforeSend: function() {
				$.blockUI({ message : '' });
			},
			success: function(response) {
				if ( response.status = 200 ) {
					$('button#b2c-' + atob($.trim(target))).removeClass('btn-success').removeClass('btn-danger').addClass(response.class);
					$('button#b2c-' + atob($.trim(target))).html(response.title);
					$('button#b2c-' + atob($.trim(target))).attr('onclick', "change_status('"+$.trim(target)+"', '"+response.value+"')");
				}
			},
			complete: function() {
				$.unblockUI();
			}
		});
	}
}

function change_b2b(target, value) {
	if ( $.trim(target) && $.trim(value) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'visa_lists/business2b',
			data: { target : $.trim(target), value : $.trim(value) },
			dataType: 'json',
			beforeSend: function() {
				$.blockUI({ message : '' });
			},
			success: function(response) {
				if ( response.status = 200 ) {
					$('button#b2b-' + atob($.trim(target))).removeClass('btn-success').removeClass('btn-danger').addClass(response.class);
					$('button#b2b-' + atob($.trim(target))).html(response.title);
					$('button#b2b-' + atob($.trim(target))).attr('onclick', "change_status('"+$.trim(target)+"', '"+response.value+"')");
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
			url: SITEURL + 'visa_lists/add',
			data: { target : $.trim(target) },
			dataType: 'json',
			beforeSend: function() {
				$popup = '';
				$.blockUI({ message : '' });
				$('#popup-add').find('div.modal-body').html('');
				$('#popup-edit').find('div.modal-body').html('');
			},
			success: function(response) {
				if ( response.status == 200 ) {
					$popup = $('#popup-add');
					$popup.find('div.modal-body').html(response.html).ready(function () {
						$('.imageuploader').imageUploader({
							imagesInputName: 'image',
							maxFiles: 1,
							maxSize: 1048576,
							label: 'Choose an image size below 1 MB. Recommended size is 200 KB.'
						}).find('input[type=file]').attr('name', 'image').removeAttr('multiple');
						$(".selectpicker").selectpicker();
						$(".textarea").wysihtml5();
						countrypicker(true);
					});
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
			url: SITEURL + 'visa_lists/edit',
			data: { target : $.trim(target) },
			dataType: 'json',
			beforeSend: function() {
				$popup = '';
				$.blockUI({ message : '' });
				$('#popup-add').find('div.modal-body').html('');
				$('#popup-edit').find('div.modal-body').html('');
			},
			success: function(response) {
				if ( response.status == 200 ) {
					$popup = $('#popup-edit');
					$popup.find('div.modal-body').html(response.html).ready(function () {
						$('.imageuploader').imageUploader({
							preloaded: response.images,
							imagesInputName: 'image',
							preloadedInputName: 'image',
							maxFiles: 1,
							maxSize: 1048576,
							label: 'Choose an image size below 1 MB. Recommended size is 200 KB.'
						}).find('input[type=file]').attr('name', 'image').removeAttr('multiple');
						$(".selectpicker").selectpicker();
						$(".textarea").wysihtml5();
						countrypicker(true);
						$('select.country-picker').selectpicker('refresh');
					});
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

function countrypicker($selected = false) {
	if ( $("select.country-picker").length ) {
		$("select.country-picker").selectpicker().ajaxSelectPicker({
			ajax: {
				url: SITEURL + 'visa_types/countries',
				type: "POST",
				dataType: "json",
				data: {
					keyword: "{{{q}}}"
				}
			},
			locale: {
				emptyTitle: "Search country"
			},
			preprocessData: function (data) {
				var i,
					l = data.length,
					array = [];
				if (l) {
					for (i = 0; i < l; i++) {
						array.push(
							$.extend(true, data[i], {
								text: data[i].title,
								value: data[i].id
							})
						);
					}
				}
				
				return array;
			},
			preserveSelected: $selected
		});
	}
}

function plus_docs($target = '') {
    if ( $('table#'+ $target).length ) {
		$key = Number($('table#'+ $target).find('tbody tr').length);
		$row = Number($('table#'+ $target).find('tbody tr').length) + 1;
		
		$('table#'+ $target).find('tbody').append(
			'<tr id="docs-row-'+ $row +'">' +
				'<td><label class="form-control fw-normal">'+ $row +'</label>' +
				'<input type="hidden" name="docs['+ $key +'][defult]" id="doc-'+ $row +'-defult" value="0" required readonly /></td>' +
				'<td><input type="text" name="docs['+ $key +'][title]" id="doc-'+ $row +'-title" class="form-control" placeholder="Give a title" required /></td>' +
				'<th><select name="docs['+ $key +'][status]" id="doc-'+ $row +'-status" class="form-control selectpicker" title="Select" required>' +
					'<option value="1" selected>Necessary</option>' +
					'<option value="0">Unnecessary</option>' +
				'</select></th>' +
			'</tr>'
		).ready(function () {
			$(".selectpicker").selectpicker();
		});
	}
}

function drop_docs($target = '') {
    if ( $('table#'+ $target).length ) {
		$row = Number($('table#'+ $target).find('tbody tr').length);
		$('table#'+ $target).find('tbody tr#docs-row-'+ $row).remove();
	}
}

function refresh() {
    window.location.reload();
}