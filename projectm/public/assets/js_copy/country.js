var $form;
var $formID;
var $popup;
let $preloaded;
$(document).ready(function() {
	$('.imageuploader').imageUploader();
});

$('form').submit(function(event){
	
	event.preventDefault();
	
	$form = $(this);
	$formID = $form.attr('id'); 
	var formData = new FormData(document.getElementById($formID));

	var $btn = $form.find("button[name=submit]");
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

function change_status(target, value) {
	if ( $.trim(target) && $.trim(value) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'country/status',
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
			url: SITEURL + 'country/add',
			data: { target : $.trim(target) },
			dataType: 'json',
			beforeSend: function() {
				$.blockUI({ message : '' });
				$('#popup-add, #popup-edit').find('div.modal-body').html('');
			},
			success: function(response) {
				if ( response.status == 200 ) {
					$popup = $('#popup-add');
					$popup.find('div.modal-body').html(response.html);
					$('.textareaedit').wysihtml5();
					$('.flaguploader').imageUploader({
						preloaded: response.flag,
						imagesInputName: 'flag',
						preloadedInputName: 'flag',
						maxFiles: 1
					}).find('input[type=file]').attr('name', 'flag').removeAttr('multiple');
					$('.imageuploader').imageUploader({
						preloaded: response.image,
						imagesInputName: 'image',
						preloadedInputName: 'image',
						maxFiles: 1
					}).find('input[type=file]').attr('name', 'image').removeAttr('multiple');
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
			url: SITEURL + 'country/edit',
			data: { target : $.trim(target) },
			dataType: 'json',
			beforeSend: function() {
				$.blockUI({ message : '' });
				$('#popup-add, #popup-edit').find('div.modal-body').html('');
			},
			success: function(response) {
				if ( response.status == 200 ) {
					$popup = $('#popup-edit');
					$popup.find('div.modal-body').html(response.html);
					$('.textareaedit').wysihtml5();
					$('.flaguploader').imageUploader({
						preloaded: response.flag,
						imagesInputName: 'flag',
						preloadedInputName: 'flag',
						maxFiles: 1
					}).find('input[type=file]').attr('name', 'flag').removeAttr('multiple');
					$('.imageuploader').imageUploader({
						preloaded: response.image,
						imagesInputName: 'image',
						preloadedInputName: 'image',
						maxFiles: 1
					}).find('input[type=file]').attr('name', 'image').removeAttr('multiple');
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

function preview_logo(input = '', target = '') {
	if ( input.files && input.files[0] ) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('img#' + target).attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	} else {
		remove_logo();
	}
}

function remove_logo(target = '') {
	$('input#bm-logo').val('');
	if ( $.trim($('img#' + target).attr('rel')) ) {
		$('img#' + target).attr('src', $.trim($('img#' + target).attr('rel')));
	} else {
		$('img#' + target).attr('src', BASEURL + 'assets/images/preview.jpg');
	}
}

function preview_banner(input = '', target = '') {
	if ( input.files && input.files[0] ) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('img#' + target).attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	} else {
		remove_banner();
	}
}

function remove_banner(target = '') {
	$('input#banner-image').val('');
	if ( $.trim($('img#' + target).attr('rel')) ) {
		$('img#' + target).attr('src', $.trim($('img#' + target).attr('rel')));
	} else {
		$('img#' + target).attr('src', BASEURL + 'assets/images/preview.jpg');
	}
}

function refresh() {
    window.location.reload();
}