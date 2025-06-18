var $form;
var $popup;
var $countries;
$(document).ready(function() {
	$(".selectpicker").selectpicker().ajaxSelectPicker({
		values: $countries,
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
		}
	});
});

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
						window.location.replace(response.redirect);
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

function change_visa_priority(target = '', value = '') {
	if ( $.trim(target) && $.isNumeric(value) ) {
		$.post(SITEURL + 'visa_types/priority', { target : $.trim(target), value : $.trim(value) }, function(result) {});
	}
}

function change_visa_status(target, value) {
	if ( $.trim(target) && $.isNumeric(value) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'visa_types/status',
			data: { target : $.trim(target), value : $.trim(value) },
			dataType: 'json',
			success: function(response) {
				if ( response.status = 200 ) {
					$('button#status-' + atob($.trim(target))).removeClass('btn-success').removeClass('btn-danger').addClass(response.class);
					$('button#status-' + atob($.trim(target))).html(response.title);
					$('button#status-' + atob($.trim(target))).attr('onclick', "change_visa_status('"+$.trim(target)+"', '"+response.value+"')");
				}
			}
		});
	}
}

function popup_visa_edit(target = '') {
	$form = $('#edit-form');
	if ( $.trim(target) ) {
		$.ajax({
			type: 'GET',
			url: SITEURL + 'visa_types/edit',
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
					$('.banneruploader').imageUploader({
						preloaded: response.banner,
						imagesInputName: 'image',
						preloadedInputName: 'image',
						maxFiles: 1,
						maxSize: 1048576,
						label: 'Choose an image size below 1 MB. Recommended size is 200 KB.'
					}).find('input[type=file]').attr('name', 'image').removeAttr('multiple');
					selectpicker();
					$('select[name="bv_countries[]"]').trigger('change');
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

function selectpicker() {
	$(".selectpicker").selectpicker().ajaxSelectPicker({
		values: $countries,
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
		}
	});
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