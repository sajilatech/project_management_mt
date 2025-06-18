var $form;
var $popup;
var $previous;
$(document).ready(function() {
	filter_packages();
	$(".selectpicker").selectpicker();
	$(".selectstatus").selectpicker().on('changed.bs.select', function (e, clickedIndex, isSelected, oldValue) {
		alert();
	});
	$(".selectfilter").selectpicker().on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		filter_packages();
	});
});

function filter_packages() {
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
				{ "data": "package" },
				{ "data": "client" },
				{ "data": "b_status" },
				{ "data": "staff" },
				{ "data": "p_status" },
				{ "data": "datetime" }
			],
			"createdRow": function( row, data, dataIndex ) {
				$(row).addClass(data.background);
			}
		});
		$('.selectpicker').selectpicker('refresh');
		$.unblockUI();
	});
}

function change_status(target = '', value = '', payment = '') {
	if ( $.trim(target) ) {
		var $selectbox = $('select#change-status-' + $.trim(target));
		if ( confirm('Are you sure you want to change the status?') ) {
			if ( $.trim(value) == 4 && $.trim(payment) == 'unpaid' ) {
				$.confirm({
					title: 'Payment details',
					content: '<form>' +
						'<div class="form-group">' +
							'<label>Payment Transaction Id/Reference No. <sup>*</sup></label>' +
							'<input type="text" name="payment_id" class="form-control" placeholder="Enter transaction id/reference no." required />' +
						'</div>' +
						'<div class="form-group">' +
							'<label>Payment Method <sup>*</sup></label>' +
							'<select name="payment_method" class="form-control" required>' +
								'<option value="cash">Cash</option>' +
								'<option value="card">Card</option>' +
							'</select>' +
						'</div>' +
						'<div class="form-group">' +
							'<label>Payment Notes</label>' +
							'<textarea name="payment_notes" class="form-control" placeholder="Type something"></textarea>' +
						'</div>' +
					'</form>',
					buttons: {
						formSubmit: {
							text: 'Submit',
							btnClass: 'btn-blue',
							action: function () {
								$.ajax({
									type: 'POST',
									url: SITEURL + 'vacation_package/status',
									data: [ this.$content.find('form').serialize(), $.param({ target : $.trim(target), value : $.trim(value) }) ].join('&'),
									dataType: 'json',
									beforeSend: function() {
										$.blockUI({ message : '' });
									},
									success: function(response) {
										if ( response.status = 200 ) {
											filter_packages();
										} else {
											$.unblockUI();
										}
									}
								});
							}
						},
						cancel: function () {
							filter_packages();
						},
					},
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
			} else {
				$.ajax({
					type: 'POST',
					url: SITEURL + 'vacation_package/status',
					data: { target : $.trim(target), value : $.trim(value) },
					dataType: 'json',
					beforeSend: function() {
						$.blockUI({ message : '' });
					},
					success: function(response) {
						if ( response.status = 200 ) {
							filter_packages();
						} else {
							$.unblockUI();
						}
					}
				});
			}
		} else {
			filter_packages();
		}
	}
}

function assign_staff(target = '', value = '') {
	if ( $.trim(target) ) {
		var $selectbox = $('select#assign-staff-' + $.trim(target));
		if ( confirm('Are you sure you want to continue?') ) {
			$.ajax({
				type: 'POST',
				url: SITEURL + 'vacation_package/assign',
				data: { target : $.trim(target), value : $.trim(value) },
				dataType: 'json',
				beforeSend: function() {
					$.blockUI({ message : '' });
				},
				success: function(response) {
					if ( response.status = 200 ) {
						filter_packages();
					} else {
						$.unblockUI();
					}
				}
			});
		} else {
			filter_packages();
		}
	}
}

function trigger_popup(target = '', popup = '') {
	if ( $.trim(target) && $.trim(popup) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'vacation_package/popup',
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