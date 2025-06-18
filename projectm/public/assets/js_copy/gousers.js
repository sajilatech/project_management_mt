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

	var date = new Date();
	var year = date.getFullYear();
	var url = $(location).attr('href'),
    parts = url.split("/"),
    user = parts[parts.length-1];
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

function filter_gousers() {
	if ( $('table#example2').length ) {
		var subscription = $('#filter-subscription').find(":selected").val();
		var plans = $('#filter-plans').find(":selected").val();
		var verifiedStatus = $('#filter-verified').find(":selected").val();
		$.ajax({
			'url': SITEURL + 'Gousers/gousers_search',
			'method': 'POST',
			'data': $('form#gousers-search').serialize(),
			'dataType': 'json',
			'beforeSend': function() {
				if ( $('div.blockUI').length == 0 ) {
					$.blockUI({ message : '' });
				}
			}
		}).done(function(response) {
			if ( response.status == 200 ) {
				$('table#example2').dataTable().fnDestroy();
				$( ".gousers-ajax" ).html(response.html);
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

function reset_gousers( thiss ) {
	$form = $(thiss).closest('form');
	if ( $form.length ) {
		$form.trigger("reset");
		$form.find('select').trigger("change");
		filter_gousers();
	}
}

function filter_gofeeds() {
	if ( $('table#example2').length ) {
		$.ajax({
			'url': SITEURL + 'Gousers/filter_feed_search',
			'method': 'POST',
			'data': $('form#gofeeds-search').serialize(),
			'dataType': 'json',
			'beforeSend': function() {
				if ( $('div.blockUI').length == 0 ) {
					$.blockUI({ message : '' });
				}
			}
		}).done(function(response) {
			if ( response.status == 200 ) {
				$('table#example2').dataTable().fnDestroy();
				$( ".gofeeds-ajax" ).html(response.html);
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

function reset_gofeeds( thiss ) {
	$form = $(thiss).closest('form');
	if ( $form.length ) {
		$form.trigger("reset");
		$form.find('select').trigger("change");
		filter_gofeeds();
	}
}

function filter_godiary() {
	if ( $('table#example1').length ) {
		$.ajax({
			'url': SITEURL + 'Gousers/filter_diary_search',
			'method': 'POST',
			'data': $('form#godiary-search').serialize(),
			'dataType': 'json',
			'beforeSend': function() {
				if ( $('div.blockUI').length == 0 ) {
					$.blockUI({ message : '' });
				}
			}
		}).done(function(response) {
			if ( response.status == 200 ) {
				$('table#example1').dataTable().fnDestroy();
				$( ".godiary-ajax" ).html(response.html);
				if ( $("#example1").length ) {
					$datatable = $("#example1").DataTable({
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

function reset_godiary( thiss ) {
	$form = $(thiss).closest('form');
	if ( $form.length ) {
		$form.trigger("reset");
		$form.find('select').trigger("change");
		filter_godiary();
	}
}

function userDetails(userId = '') {
	if ( $.trim(userId) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'Gousers/user_details',
			dataType : 'JSON',
			data : { userId : $.trim(userId) },
			success : function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {
						$('.user-details').empty();
						$('.user-details').append(response.html);
						$('#modal-lg').modal('show');
					}
				} else if ( response.status == 400 ) {
					alert(response.alerts);
				}
			}
		});
	}
}

function likesDetails(diaryId = '', condition = '') {
	if ( $.trim(diaryId) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'Gousers/like_details',
			dataType : 'JSON',
			data : { diaryId : $.trim(diaryId), condition : $.trim(condition) },
			success : function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {
						$('.' + condition + '-list-details').html(response.html);
						$('#modal-lg').modal('show');
						if ( $("#liked-client").length ) {
							$datatable = $("#liked-client").DataTable({
								"responsive": true,
								"lengthChange": true,
								"autoWidth": false,
								"searching": true,
								"ordering": true,
							});
						}
					}
				} else if ( response.status == 400 ) {
					alert(response.alerts);
				}
			}
		});
	}
}

function commentsDetails(diaryId = '', condition = '') {
	if ( $.trim(diaryId) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'Gousers/comments_details',
			dataType : 'JSON',
			data : { diaryId : $.trim(diaryId), condition : $.trim(condition) },
			success : function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {
						$('.' + condition + '-list-details').html(response.html);
						$('#modal-lg').modal('show');
						if ( $("#commented-client").length ) {
							$datatable = $("#commented-client").DataTable({
								"responsive": true,
								"lengthChange": true,
								"autoWidth": false,
								"searching": true,
								"ordering": true,
							});
						}
					}
				} else if ( response.status == 400 ) {
					alert(response.alerts);
				}
			}
		});
	}
}

function shareDetails(diaryId = '', condition = '') {
	if ( $.trim(diaryId) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'Gousers/share_details',
			dataType : 'JSON',
			data : { diaryId : $.trim(diaryId), condition : $.trim(condition) },
			success : function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {
						$('.' + condition + '-list-details').html(response.html);
						$('#modal-lg').modal('show');
						if ( $("#shared-client").length ) {
							$datatable = $("#shared-client").DataTable({
								"responsive": true,
								"lengthChange": true,
								"autoWidth": false,
								"searching": true,
								"ordering": true,
							});
						}
					}
				} else if ( response.status == 400 ) {
					alert(response.alerts);
				}
			}
		});
	}
}

function saveDetails(diaryId = '', condition = '') {
	if ( $.trim(diaryId) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'Gousers/save_details',
			dataType : 'JSON',
			data : { diaryId : $.trim(diaryId), condition : $.trim(condition) },
			success : function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {
						$('.' + condition + '-list-details').html(response.html);
						$('#modal-lg').modal('show');
						if ( $("#saved-client").length ) {
							$datatable = $("#saved-client").DataTable({
								"responsive": true,
								"lengthChange": true,
								"autoWidth": false,
								"searching": true,
								"ordering": true,
							});
						}
					}
				} else if ( response.status == 400 ) {
					alert(response.alerts);
				}
			}
		});
	}
}

function viewDetails(diaryId = '', condition = '') {
	if ( $.trim(diaryId) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'Gousers/view_details',
			dataType : 'JSON',
			data : { diaryId : $.trim(diaryId), condition : $.trim(condition) },
			success : function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {
						$('.' + condition + '-list-details').html(response.html);
						$('#modal-lg').modal('show');
						if ( $("#viewed-client").length ) {
							$datatable = $("#viewed-client").DataTable({
								"responsive": true,
								"lengthChange": true,
								"autoWidth": false,
								"searching": true,
								"ordering": true,
							});
						}
					}
				} else if ( response.status == 400 ) {
					alert(response.alerts);
				}
			}
		});
	}
}

function imageDetails(diaryId = '', condition = '') {
	if ( $.trim(diaryId) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'Gousers/image_details',
			dataType : 'JSON',
			data : { diaryId : $.trim(diaryId), condition : $.trim(condition) },
			success : function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {						
						$('.' + condition + '-list-details').html(response.html);
						$('#modal-lg').modal('show');
					}
				} else if ( response.status == 400 ) {
					alert(response.alerts);
				}
			}
		});
	}
}

function coverDetails(diaryId = '', condition = '') {
	if ( $.trim(diaryId) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'Gousers/cover_image_details',
			dataType : 'JSON',
			data : { diaryId : $.trim(diaryId), condition : $.trim(condition) },
			success : function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {						
						$('.' + condition + '-list-details').html(response.html);
						$('#modal-lg').modal('show');
					}
				} else if ( response.status == 400 ) {
					alert(response.alerts);
				}
			}
		});
	}
}