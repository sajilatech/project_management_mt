var $form, $countries;
var $popup, $popupp, $popuppp;
$(document).ready(function() {
	
	$('table#filter-list').dataTable();
	$(".selectpicker").selectpicker();
	$(".selectfilter").selectpicker().on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		filter_groupby();
	});
	
	$(".selectfilterinner").selectpicker().on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		filter_orderby();
	});
	
	$("body").on('change', 'select.selectfilter', function (e) { var $select = $(this);
		$form = $('form#filter-form');
		if ( $.inArray($.trim($select.attr('name')), ['filter_school']) !== -1 ) {
			$.ajax({
				type: 'POST',
				url: SITEURL + 'applications/autoload',
				data: { target : $.trim($select.attr('name')), value : $.trim($select.val()) },
				dataType: 'json',
				beforeSend: function() { $.blockUI({ message : '' });
					if ( $.trim($select.attr('name')) == 'filter_school' ) {
						$form.find('select[name=filter_academic]').val('').html('');
					}
				},
				success: function(response) {
					if ( $.trim($select.attr('name')) == 'filter_school' ) {
						$form.find('select[name=filter_academic]').val('').html(response.academics);
						$('.selectfilter').selectpicker('refresh');
					}
				},
				complete: function() {
					$.unblockUI();
				}
			});
		}
	});
});

function filter_groupby() {
	$.ajax({
		'url': SITEURL + 'applications/filter_groupby',
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
				{ "data": "school" },
				{ "data": "academic" },
				{ "data": "requests" },
				{ "data": "deadline" },
				{ "data": "actions" }
			]
		});
		$.unblockUI();
	});
}

function filter_orderby() {
	$.ajax({
		'url': SITEURL + 'applications/filter_orderby',
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
				{ "data": "academic" },
				{ "data": "client" },
				{ "data": "score" },
				{ "data": "method" },
				{ "data": "status" },
				{ "data": "updated" }
			],
			"createdRow": function( row, data, dataIndex ) {
				$(row).addClass(data.background);
			}
		});
		$.unblockUI();
	});
}

$('form').filter('.with-ajax').submit(function(event) {
	
	event.preventDefault();
	
	$form = $(this);
	$formID = $form.attr('id');

	var $btn = $form.find("button[type=submit]");
	var $btnHtml = $btn.html();
	
	$.ajax({
		type: 'POST',
		url: $.trim($(this).attr('action')),
		data: $form.serialize(),
		dataType: 'json',
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
						if ( $popup ) {
						$popup.modal('hide'); }
						$('form#'+$formID).trigger("reset");
					},
					beforeHide: function () {
						if ( response.redirect ) {
							location.replace(response.redirect);
						}
					},
				});
			} else if ( response.status == 404 && response.errors ) {
				if ( $popup ) {
				$popup.animate({ scrollBottom: 0 }); }
				$.each(response.errors, function (i, errors) {
					$.each(errors, function (field, error) {
						$form.find("span#" + field.replace(/[[\]]/g,'') + "-error").text(error);
						$form.find("span#" + field.replace(/[[\]]/g,'') + "-error").closest("li").removeClass('hide');
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
							url: SITEURL + 'applications/status',
							data: { target : $.trim(target), value : $.trim(value), message : $.trim($message) },
							dataType: 'json',
							beforeSend: function() {
								$.blockUI({ message : '' });
							},
							success: function(response) {
								if ( response.status = 200 ) {
									if ( $(".selectfilter").length ) {
										filter_groupby();
									} else if ( $(".selectfilterinner").length ) {
										filter_orderby();
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
						filter_groupby();
					} else if ( $(".selectfilterinner").length ) {
						filter_orderby();
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
							url: SITEURL + 'applications/assign',
							data: { target : $.trim(target), value : $.trim(value), message : $.trim($message) },
							dataType: 'json',
							beforeSend: function() {
								$.blockUI({ message : '' });
							},
							success: function(response) {
								if ( response.status = 200 ) {
									if ( $(".selectfilter").length ) {
										filter_groupby();
									} else if ( $(".selectfilterinner").length ) {
										filter_orderby();
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
						filter_groupby();
					} else if ( $(".selectfilterinner").length ) {
						filter_orderby();
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
			url: SITEURL + 'applications/popup',
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

function hyphener(str = '') {
	return str.replace(/\W+/g, '_').replace(/\_$/, '').toLowerCase();
}

function refresh() {
    location.reload();
}