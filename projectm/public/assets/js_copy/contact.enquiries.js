var $form;
var $popup;
var $countries;
$(document).ready(function() {
	if ( $(".selectfilter").length ) {
		filter_enquiries();
	} else if ( $(".selectfilterstaff").length ) {
		filter_enquiries_staff();
	}
	
	$(".datatable").dataTable();
	$(".selectpicker").selectpicker();
	$(".selectfilter").selectpicker().on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		filter_enquiries();
	});
	$(".selectfilterstaff").selectpicker().on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		filter_enquiries_staff();
	});
});

function filter_enquiries() {
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
				{ "data": "ref" },
				{ "data": "from" },
				{ "data": "client" },
				{ "data": "staff" },
				{ "data": "status" },
				{ "data": "updated" },
				{ "data": "spam" }
			],
			"createdRow": function( row, data, dataIndex ) {
				$(row).addClass(data.background);
			}
		});
		$('.selectpicker').selectpicker('refresh');
		$.unblockUI();
	});
}

function filter_enquiries_staff() {
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
				{ "data": "ref" },
				{ "data": "from" },
				{ "data": "client" },
				{ "data": "status" },
				{ "data": "updated" },
				{ "data": "spam" }
			],
			"createdRow": function( row, data, dataIndex ) {
				$(row).addClass(data.background);
			}
		});
		$('.selectpicker').selectpicker('refresh');
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
			$("ul.errors-list").find("li").removeClass('hide').addClass('hide');
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
				$popup.animate({ scrollBottom: 0 });
				$.each(response.errors, function (i, errors) {
					$.each(errors, function (field, error) {
						$("span#" + field.replace(/[[\]]/g,'') + "-error").text(error);
						$("span#" + field.replace(/[[\]]/g,'') + "-error").closest("li").removeClass('hide');
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

function change_status(target = '', value = '') {
	if ( $.trim(target) && $.trim(value) ) {
		$.confirm({
			title: 'Are you sure you want to change the status?',
			titleClass: 'title-cfrm',
			content: '' +
				'<form>' +
					'<div class="form-group">' +
						'<textarea type="text" class="form-control" placeholder="Type something here you want to share with the customer" rows="5" required />' +
					'</div>' +
				'</form>',
			buttons: {
				formSubmit: {
					text: 'Proceed',
					btnClass: 'btn-blue',
					action: function () {
						
						// fetch message
						var $message = this.$content.find('textarea').val();
						
						$.ajax({
							type: 'POST',
							url: SITEURL + 'contact_enquiries/status',
							data: { target : $.trim(target), value : $.trim(value), message : $.trim($message) },
							dataType: 'json',
							beforeSend: function() {
								$.blockUI({ message : '' });
							},
							success: function(response) {
								if ( response.status = 200 ) {
									if ( $(".selectfilter").length ) {
										filter_enquiries();
									} else if ( $(".selectfilterstaff").length ) {
										filter_enquiries_staff();
									}
								} else {
									$.unblockUI();
								}
							}
						});
					}
				},
				cancel: function () {
					if ( $(".selectfilter").length ) {
						filter_enquiries();
					} else if ( $(".selectfilterstaff").length ) {
						filter_enquiries_staff();
					}
				}
			},
			theme: 'material',
			animation: 'bottom',
			columnClass: 'medium',
			onContentReady: function () {
				// bind to events
				var jc = this;
				this.$content.find('form').on('submit', function (e) {
					// if the user submits the form by pressing enter in the field.
					e.preventDefault();
					jc.$$formSubmit.trigger('click'); // reference the button and click it
				});
			}
		});
	}
}

function assign_staff(target = '', value = '') {
	if ( $.trim(target) && $.trim(value) ) {
		$.confirm({
			title: 'Are you sure you want to continue?',
			titleClass: 'title-cfrm',
			content: '' +
				'<form>' +
					'<div class="form-group">' +
						'<textarea type="text" class="form-control" placeholder="Type something here you want to share with the customer" rows="5" required />' +
					'</div>' +
				'</form>',
			buttons: {
				formSubmit: {
					text: 'Proceed',
					btnClass: 'btn-blue',
					action: function () {
						
						// fetch message
						var $message = this.$content.find('textarea').val();
						
						$.ajax({
							type: 'POST',
							url: SITEURL + 'contact_enquiries/assign',
							data: { target : $.trim(target), value : $.trim(value), message : $.trim($message) },
							dataType: 'json',
							beforeSend: function() {
								$.blockUI({ message : '' });
							},
							success: function(response) {
								if ( response.status = 200 ) {
									if ( $(".selectfilter").length ) {
										filter_enquiries();
									} else if ( $(".selectfilterstaff").length ) {
										filter_enquiries_staff();
									}
								} else {
									$.unblockUI();
								}
							}
						});
					}
				},
				cancel: function () {
					if ( $(".selectfilter").length ) {
						filter_enquiries();
					} else if ( $(".selectfilterstaff").length ) {
						filter_enquiries_staff();
					}
				}
			},
			theme: 'material',
			animation: 'bottom',
			columnClass: 'medium',
			onContentReady: function () {
				// bind to events
				var jc = this;
				this.$content.find('form').on('submit', function (e) {
					// if the user submits the form by pressing enter in the field.
					e.preventDefault();
					jc.$$formSubmit.trigger('click'); // reference the button and click it
				});
			}
		});
	}
}

function report_spam(target = '', value = '') {
	if ( $.trim(target) && $.trim(value) ) {
		$.confirm({
			title: 'Are you sure you want to continue?',
			titleClass: 'title-cfrm',
			content: '' +
				'<form>' +
					'<div class="form-group">' +
						'<textarea type="text" class="form-control" placeholder="Type something here as a remark" rows="5" required />' +
					'</div>' +
				'</form>',
			buttons: {
				formSubmit: {
					text: 'Proceed',
					btnClass: 'btn-blue',
					action: function () {
						
						// fetch message
						var $message = this.$content.find('textarea').val();
						
						$.ajax({
							type: 'POST',
							url: SITEURL + 'contact_enquiries/spamer',
							data: { target : $.trim(target), value : $.trim(value), message : $.trim($message) },
							dataType: 'json',
							beforeSend: function() {
								$.blockUI({ message : '' });
							},
							success: function(response) {
								if ( response.status = 200 ) {
									if ( $(".selectfilter").length ) {
										filter_enquiries();
									} else if ( $(".selectfilterstaff").length ) {
										filter_enquiries_staff();
									}
								} else {
									$.unblockUI();
								}
							}
						});
					}
				},
				cancel: function () {
					if ( $(".selectfilter").length ) {
						filter_enquiries();
					} else if ( $(".selectfilterstaff").length ) {
						filter_enquiries_staff();
					}
				}
			},
			theme: 'material',
			animation: 'bottom',
			columnClass: 'medium',
			onContentReady: function () {
				// bind to events
				var jc = this;
				this.$content.find('form').on('submit', function (e) {
					// if the user submits the form by pressing enter in the field.
					e.preventDefault();
					jc.$$formSubmit.trigger('click'); // reference the button and click it
				});
			}
		});
	}
}

function trigger_popup(target = '', popup = '') {
	if ( $.trim(target) && $.trim(popup) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'contact_enquiries/popup',
			data: { target : $.trim(target), popup : $.trim(popup) },
			dataType: 'json',
			beforeSend: function() {
				$.blockUI({ message : '' });
				$popup = $('#popup-'+ $.trim(popup));
				$popup.find('div.modal-body').html('');
			},
			success: function(response) {
				if ( response.status == 200 ) {
					$popup.find('div.modal-body').html(response.html); 
					$('.selectpicker').selectpicker('refresh');
					$popup.modal('show');
				} else {
					$popup = '';
				}
			},
			complete: function() {
				$.unblockUI();
			}
		});
	}
}

function refresh() {
    window.location.reload();
}