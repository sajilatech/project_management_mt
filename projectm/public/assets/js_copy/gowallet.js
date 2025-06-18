var $today = new Date(), $form, $popup, $iti;
$(document).ready(function() {
	if ( $("table.datatable").length ) {
		$datatable = $("table.datatable").DataTable();
	}

	if ( $('select.select2').length ) {
		$('select.select2').selectpicker();
	}
	
	if ( $('.country-select').length ) {
		$('.country-select').countrySelect();
	}
	
	if ( $('.country-prefix').length ) {
		$('.country-prefix').intlTelInput({
			preferredCountries : ['ca','us','gb','ng'],
			separateDialCode : false
		});
	}
	
	if ( $('.datepicker').length ) {
		$('.datepicker').datepicker({
			dateFormat: 'dd-mm-yy',
			minDate: $today
		});
	}

	if ( $('.daterangepickerr').length ) {		
		$('.daterangepickerr').daterangepicker({
			timePicker: false,
			autoUpdateInput: false,
			locale: {
				format: 'YYYY-MM-DD hh:mm A'
			}
	    }).on('apply.daterangepicker', function(ev, picker) {
			$(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
		}).on('cancel.daterangepicker', function(ev, picker) {
			$(this).val('');
		});
    }

	if ( $('#filter-user-log').length ) {
		$('#filter-user-log').DataTable({});
	}
});

$('form').filter('.ajax').submit(function(event) {
	
	event.preventDefault();
	
	var $form = $(this);
	var $btn = $form.find("button[type=submit]");
	var $btnHtml = $btn.html();
	
	$.ajax({
		type: 'POST',
		url: $.trim($form.attr('action')),
		data: $form.serialize(),
		dataType: 'json',
		beforeSend: function() {
			$("span.form-errors").text("");
			$btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
		},
		success: function(response) {
			if ( response.status == 200 ) {
				$.toast({
					hideAfter: 5000,
					heading: 'Success',
					text: response.alerts,
					showHideTransition: 'slide',
					position: 'bottom-right',
					icon: 'success',
					stack: 1,
					beforeShow: function () {
						$form.trigger("reset");
					},
					afterShown: function () {
						if ( response.redirect ) {
							location.href = response.redirect;
						} else if ( response.replace ) {
							location.replace(response.replace);
						}
					}
				});
			} else if ( response.errors ) {
				$.each(response.errors, function (i, errors) {
					$.each(errors, function (field, error) {
						$form.find("span#" + field.replace(/[[\]]/g,'') + "-error").text(error);
					});
				});
			} else if ( response.alerts ) {
				$.toast({
					hideAfter: 5000,
					heading: 'Error',
					text: response.alerts,
					showHideTransition: 'slide',
					position: 'bottom-right',
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

/*function filter_credit() {
	if ( $('table#example2').length ) {
		var actions = $('#filter-actions').find(":selected").val();
		$.ajax({
			'url': SITEURL + 'Gowallet/gocredit_search',
			'method': 'POST',
			'data': $('form#gocredit-search').serialize(),
			'dataType': 'json',
			'beforeSend': function() {
				if ( $('div.blockUI').length == 0 ) {
					$.blockUI({ message : '' });
				}
			}
		}).done(function(response) {
			if ( response.status == 200 ) {
				$('table#example2').dataTable().fnDestroy();
				$( ".gocredit-ajax" ).html(response.html);
				if ( $("#example2").length ) {
					$datatable = $("#example2").DataTable({
						"paging": true,
						"lengthChange": true,
						"searching": true,
						"ordering": true,
						"info": true,
						"autoWidth": false,
						"responsive": true,	
					});
				}
			}
			$.unblockUI();
		});
	}
}

function reset_credit( thiss ) {
	$form = $(thiss).closest('form');
	if ( $form.length ) {
		$form.trigger("reset");
		$form.find('select').trigger("change");
		filter_credit();
	}
}*/

/*function filter_debit() {
	if ( $('table#example2').length ) {
		var actions = $('#filter-actions').find(":selected").val();
		$.ajax({
			'url': SITEURL + 'Gowallet/godebit_search',
			'method': 'POST',
			'data': $('form#godebit-search').serialize(),
			'dataType': 'json',
			'beforeSend': function() {
				if ( $('div.blockUI').length == 0 ) {
					$.blockUI({ message : '' });
				}
			}
		}).done(function(response) {
			if ( response.status == 200 ) {
				$('table#example2').dataTable().fnDestroy();
				$( ".godebit-ajax" ).html(response.html);
				if ( $("#example2").length ) {
					$datatable = $("#example2").DataTable({
						"paging": true,
						"lengthChange": true,
						"searching": true,
						"ordering": true,
						"info": true,
						"autoWidth": false,
						"responsive": true,	
					});
				}
			}
			$.unblockUI();
		});
	}
}

function reset_debit( thiss ) {
	$form = $(thiss).closest('form');
	if ( $form.length ) {
		$form.trigger("reset");
		$form.find('select').trigger("change");
		filter_debit();
	}
}*/

function filter_wallet() {
	if ( $('table#example2').length ) {
		$.ajax({
			'url': SITEURL + 'Gowallet/gowallet_search',
			'method': 'POST',
			'data': $('form#gowallet-search').serialize(),
			'dataType': 'json',
			'beforeSend': function() {
				if ( $('div.blockUI').length == 0 ) {
					$.blockUI({ message : '' });
				}
			}
		}).done(function(response) {
			if ( response.status == 200 ) {
				$('table#example2').dataTable().fnDestroy();
				$( ".gowallet-ajax" ).html(response.html);
				if ( $("#example2").length ) {
					$datatable = $("#example2").DataTable({
						"paging": true,
						"lengthChange": true,
						"searching": true,
						"ordering": true,
						"info": true,
						"autoWidth": false,
						"responsive": true,	
					});
				}
			}
			$.unblockUI();
		});
	}
}

function reset_wallet( thiss ) {
	$form = $(thiss).closest('form');
	if ( $form.length ) {
		$form.trigger("reset");
		$form.find('select').trigger("change");
		filter_wallet();
	}
}

function filter_balance() {
	if ( $('table#example2').length ) {
		$.ajax({
			'url': SITEURL + 'Gowallet/balance_search',
			'method': 'POST',
			'data': $('form#gobalance-search').serialize(),
			'dataType': 'json',
			'beforeSend': function() {
				if ( $('div.blockUI').length == 0 ) {
					$.blockUI({ message : '' });
				}
			}
		}).done(function(response) {
			if ( response.status == 200 ) {
				$('table#example2').dataTable().fnDestroy();
				$( ".gobalance-ajax" ).html(response.html);
				if ( $("#example2").length ) {
					$datatable = $("#example2").DataTable({
						"paging": true,
						"lengthChange": true,
						"searching": true,
						"ordering": true,
						"info": true,
						"autoWidth": false,
						"responsive": true,	
					});
				}
			}
			$.unblockUI();
		});
	}
}

function reset_balance( thiss ) {
	$form = $(thiss).closest('form');
	if ( $form.length ) {
		$form.trigger("reset");
		$form.find('select').trigger("change");
		filter_balance();
	}
}

function filter_transaction() {
	if ( $('table#example2').length ) {
		$.ajax({
			'url': SITEURL + 'Gowallet/transaction_search',
			'method': 'POST',
			'data': $('form#gotransaction-search').serialize(),
			'dataType': 'json',
			'beforeSend': function() {
				if ( $('div.blockUI').length == 0 ) {
					$.blockUI({ message : '' });
				}
			}
		}).done(function(response) {
			if ( response.status == 200 ) {
				$('table#example2').dataTable().fnDestroy();
				$( ".gotransaction-ajax" ).html(response.html);
				if ( $("#example2").length ) {
					$datatable = $("#example2").DataTable({
						"paging": true,
						"lengthChange": true,
						"searching": true,
						"ordering": true,
						"info": true,
						"autoWidth": false,
						"responsive": true,	
					});
				}
			}
			$.unblockUI();
		});
	}
}

function reset_transaction( thiss ) {
	$form = $(thiss).closest('form');
	if ( $form.length ) {
		$form.trigger("reset");
		$form.find('select').trigger("change");
		filter_transaction();
	}
}

function paymentDetails(paymentId = '') {
	if ( $.trim(paymentId) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'gowallet/payment_details',
			dataType : 'JSON',
			data : { paymentId : $.trim(paymentId) },
			success : function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {
						$('.payment-details').html(response.html);
						$('#modal-lg').modal('show');
					}
				} else if ( response.status == 400 ) {
					alert(response.alerts);
				}
			}
		});
	}
}