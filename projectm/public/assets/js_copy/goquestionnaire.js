var $form, $countries, $popup;
$(document).ready(function() {
	if ( $('table.datatable').length ) {
		$('table.datatable').dataTable();
	}
	
	if ( $('select.selectfilter').length ) {
		$("select.selectfilter").selectpicker();
	}
	
	if ( $('select.selectpicker').length ) {
		$("select.selectpicker").selectpicker();
	}
	
	$('body').on('change', 'select[name^="filter_type"],select[name^="type"]', function(event) {
		$form = $(this).closest('form');
		$filter = $form.find('select[name="filter_type"]').length ? 1 : 0;
		$.post( SITEURL + 'goquestionnaire/subtypes', { type: $.trim($(this).val()), filter: $filter }, function(response) {
			if ( $form.find('select[name="subtype"]').length ) {
				$form.find('select[name^="subtype"]').html(response.html).val('');
				$('select.selectpicker').selectpicker('refresh');
			} else if ( $form.find('select[name^="filter_subtype"]').length ) {
				$form.find('select[name^="filter_subtype"]').html(response.html).val('');
				$('select.selectfilter').selectpicker('refresh');
			}
		}, "json");
	});
	
	$('body').on('change', 'select[name^="filter_subtype"],select[name^="subtype"]', function(event) {
		$form = $(this).closest('form');
		$filter = $form.find('select[name="filter_subtype"]').length ? 1 : 0;
		$.post( SITEURL + 'goquestionnaire/countries', { subtype: $.trim($(this).val()), filter: $filter }, function(response) {
			if ( $form.find('select[name="country"]').length ) {
				$form.find('select[name^="country"]').html(response.html).val('');
				$('select.selectpicker').selectpicker('refresh');
			} else if ( $form.find('select[name^="filter_country"]').length ) {
				$form.find('select[name^="filter_country"]').html(response.html).val('');
				$('select.selectfilter').selectpicker('refresh');
			}
		}, "json");
	});
	
	/* $('body').on('change', 'select[name^="filter_category"],select[name^="category"]', function(event) {
		$form = $(this).closest('form');
		$filter = $form.find('select[name^="filter_category"]').length ? 1 : 0;
		$.post( SITEURL + 'goquestionnaire/streams', { category: $.trim($(this).val()), filter: $filter }, function(response) {
			if ( $form.find('select[name^="stream"]').length ) {
				$form.find('select[name^="stream"]').html(response.html).val('');
				$('select.selectpicker').selectpicker('refresh');
			} else if ( $form.find('select[name^="filter_stream"]').length ) {
				$form.find('select[name^="filter_stream"]').html(response.html).val('');
				$('select.selectfilter').selectpicker('refresh');
			}
		}, "json");
	}); */
});

$(function () {
	$('[data-toggle="tooltip"]').tooltip();
});

function filter_questionnaire() {
	$.ajax({
		'url': SITEURL + 'goquestionnaire/filter',
		'method': 'POST',
		'data': $('form#filter-form').serialize(),
		'dataType': 'json',
		'beforeSend': function() {
			if ( $('div.blockUI').length == 0 ) {
				$.blockUI({ message : '' });
			}
		}
	}).done( function(data) {
		$('table.datatable').dataTable().fnDestroy();
		$('table.datatable').dataTable({
			"ordering": true,
			"aaData": data,
			"columns": [
				{ "data": "key" },
				{ "data": "visa" },
				{ "data": "type" },
				{ "data": "subtype" },
				{ "data": "country" },
				{ "data": "marital" },
				{ "data": "questions" },
				{ "data": "actions" }
			]
		});
		$.unblockUI();
	});
}

$('body').on('submit', 'form.ajax', function(event) {
	
	event.preventDefault();
	
	var $form = $(this);
	var $formData = new FormData($(this)[0]);
	var $btn = $form.find("button[type=submit]");
	var $html = $btn.html();
	
	$.ajax({
		type: 'POST',
		url: $.trim($(this).attr('action')),
		data: $formData,
		dataType: 'json',
		contentType: false,
		processData: false,
		beforeSend: function() {
			$form.find("span.form-errors").text("");
			$("ul.errors-list").find("li").removeClass('hide').addClass('hide');
			$btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
		},
		success: function(response) {
			if ( response.alerts ) {
				$.toast({
					hideAfter: (response.status == 200) ? 3000 : 5000,
					heading: (response.status == 200) ? 'Success' : 'Error',
					text: response.alerts,
					showHideTransition: 'slide',
					position: 'bottom-center',
					icon: (response.status == 200) ? 'success' : 'error',
					stack: 1,
					beforeShow: function () {
						if ( response.status == 200 ) {
							if ( $popup ) {
								$popup.modal('hide');
							}
							
							$form.trigger("reset");
						}
					},
					beforeHide: function () {
						if ( response.redirect ) {
							location.replace(response.redirect);
						}
					}
				});
			} else if ( response.errors ) {
				if ( $popup ) {
					$popup.animate({ scrollBottom: 0 });
				}
				
				$.each(response.errors, function (i, errors) {
					$.each(errors, function (field, error) {
						$form.find("span#" + field.replace(/[[\]]/g,'') + "-error").text(error);
						$form.find("span#" + field.replace(/[[\]]/g,'') + "-error").closest("li").removeClass('hide');
					});
				});
			}
		},
		complete: function() {
			$btn.html($html);
		}
	});
});

$('body').on('submit', 'form.ajax-filter', function(event) {
	
	event.preventDefault();
	
	var $form = $(this);
	var $formData = new FormData($(this)[0]);
	var $btn = $form.find("button[type=submit]");
	var $html = $btn.html();
	
	$.ajax({
		type: 'POST',
		url: $.trim($(this).attr('action')),
		data: $formData,
		dataType: 'json',
		contentType: false,
		processData: false,
		beforeSend: function() {
			$btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
		},
		success: function(response) {
			$('table.datatable').dataTable().fnDestroy();
			$('table.datatable').dataTable({
				"aaData": response,
				"columns": [
					{ "data": "key" },
					{ "data": "type" },
					{ "data": "subtype" },
					{ "data": "country" },
					{ "data": "category" },
					/* { "data": "stream" }, */
					{ "data": "question" },
					{ "data": "updated_at" },
					{ "data": "status" },
					{ "data": "actions" }
				]
			});
		},
		complete: function() {
			$btn.html($html);
		}
	});
});

function change_status(thiss, target = '') {
	$this = $(thiss);
	$html = $(thiss).html();
	if ( $.trim(target) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'goquestionnaire/status',
			data: { target : $.trim(target) },
			dataType: 'json',
			beforeSend: function() {
				$this.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
			},
			success: function(response) {
				if ( response.status == 200 ) {
					$this.removeClass('btn-success btn-danger').addClass(response.class);
					$html = response.html;
				}
			},
			complete: function() {
				$this.html($html);
			}
		});
	}
}

function delete_row(thiss, target = '') {
	if ( $.trim(target) ) {
		if ( confirm("Are you sure you want to delete ?") ) {
			$.ajax({
				type: 'POST',
				url: SITEURL + 'goquestionnaire/remove',
				data: { target : $.trim(target) },
				dataType: 'json',
				beforeSend: function() {
					$.blockUI({ message : '' });
				},
				success: function(response) {
					$.toast({
						hideAfter: (response.status == 200) ? 3000 : 5000,
						heading: (response.status == 200) ? 'Success' : 'Error',
						text: response.alerts,
						showHideTransition: 'slide',
						position: 'bottom-center',
						icon: (response.status == 200) ? 'success' : 'error',
						stack: 1,
						beforeHide: function () {
							if ( response.redirect ) {
								location.replace(response.redirect);
							}
						}
					});
				},
				complete: function() {
					$.unblockUI();
				}
			});
		}
	}
}

function change_priority(thiss) {
	$value = $(thiss).val();
	$target = $(thiss).data('row');
	if ( $.trim($target) && $.isNumeric($value) ) {
		$.post(SITEURL + 'goquestionnaire/priority', { target : $.trim($target), value : $.trim($value) }, function(result) {});
	}
}

function question_minus(target = '') {
	if ( $.trim(target) ) {
		target = $.trim(target);
		var value = $.trim($('tbody#' + target).attr('rel'));
		if ( $.isNumeric(value) && value > 1 ) {
			$('tr#'+ target +'-'+ value).remove();
			var $assign = (Number(value) - 1);
			$('tbody#' + target).attr('rel', $assign);
		} else {
			$('tbody#' + target).attr('rel', 1);
		}
	}
}

function question_plus(target = '') {
	if ( $.trim(target) ) {
		target = $.trim(target);
		var value = $.trim($('tbody#' + target).attr('rel'));
		if ( $.isNumeric(value) ) {
			var $assign = (Number(value) + 1);
			var $row = (Number($assign) - 1);
			var $option = "'"+ target +"-"+ $assign +"','"+$row+"'";
			$('tbody#' + target).attr('rel', $assign);
			$('tbody#' + target).append('<tr id="'+ target +'-'+ $assign +'" rel="1">' +
											'<td>' +
												'<div class="form-group">' +
													'<input type="text" name="question_priority[]" id="'+ target +'-'+ $assign +'-priority" class="form-control" value="'+ $assign +'" placeholder="Priority" />' +
												'</div>' +
												'<div class="form-group">' +
													'<a class="btn btn-warning btn-flat btn-block" onclick="popup_notepad(\''+ target +'-'+ $assign +'-notes\')"><i class="fa fa-info-circle" aria-hidden="true"></i> Note</a>' +
													'<input type="hidden" name="question_notes[]" id="'+ target +'-'+ $assign +'-notes" class="form-control" placeholder="Notes" />' +
												'</div>' +
											'</td>' +
											'<td>' +
												'<div class="form-group">' +
													'<textarea name="question_title[]" id="'+ target +'-'+ $assign +'-title" class="form-control" placeholder="Enter the question" rows="3" required></textarea>' +
												'</div>' +
											'</td>' +
											'<td id="'+ target +'-'+ $assign +'-options">' +
												'<div class="form-group">' +
													'<input type="text" name="question_option['+ $row +'][]" id="'+ target +'-'+ $assign +'-option-1" class="form-control" placeholder="Enter an option" required />' +
												'</div>' +
											'</td>' +
											'<td id="'+ target +'-'+ $assign +'-points">' +
												'<div class="form-group">' +
													'<input type="text" name="question_point['+ $row +'][]" id="'+ target +'-'+ $assign +'-point-1" class="form-control" placeholder="0.0" required />' +
												'</div>' +
											'</td>' +
											'<td>' +
												'<div class="form-group button-group">' +
													'<button type="button" class="btn btn-default text-green" onclick="question_option_plus('+ $option +')"><i class="fa fa-plus-circle" aria-hidden="true">&nbsp;</i> Add Option</button>' +
													'<button type="button" class="btn btn-default text-red" onclick="question_option_minus('+ $option +')"><i class="fa fa-minus-circle" aria-hidden="true">&nbsp;</i> Remove Option</button>' +
												'</div>' +
											'</td>' +
										'</tr>');
		}
	}
}

function question_option_minus(target = '') {
	if ( $.trim(target) ) {
		target = $.trim(target);
		var value = $.trim($('tr#' + target).attr('rel'));
		if ( $.isNumeric(value) && value > 1 ) {
			$('div#' + target +'-option-' + value).remove();
			$('div#' + target +'-point-' + value).remove();
			var $assign = (Number(value) - 1);
			$('tr#' + target).attr('rel', $assign);
		} else {
			$('tr#' + target).attr('rel', 1);
		}
	}
}

function question_option_plus(target = '', key = '', row = '') {
	if ( $.trim(target) ) {
		key = $.trim(key);
		target = $.trim(target);
		var value = $.trim($('tr#' + target).attr('rel'));
		if ( $.isNumeric(value) ) {
			var $assign = (Number(value) + 1);
			$('tr#' + target).attr('rel', $assign);
			$('td#' + target +'-options').append('<div class="form-group" id="'+ target +'-option-'+ $assign +'">' +
													'<input type="text" name="question_option['+ key +'][]" id="'+ target +'-option-'+ $assign +'" class="form-control" placeholder="Enter an option" required />' +
												'</div>');
			$('td#' + target +'-points').append('<div class="form-group" id="'+ target +'-point-'+ $assign +'">' +
													'<input type="text" name="question_point['+ key +'][]" id="'+ target +'-point-'+ $assign +'" class="form-control" placeholder="0.0" required />' +
												'</div>');
		}
	}
}

function copy_questionnaire($target = '', $country = '') {
	$popupp = $('#popup-copy');
	if ( $popupp.length ) {
		if ( $.trim($target) ) {
			$.post(SITEURL + 'goquestionnaire/autocountry', { target : $.trim($target) }).done(function(data) {
				$popupp.find('input[name=target]').val($.trim($target));
				$popupp.find('select[name=country]').html($.trim(data));
				$('.selectpicker').selectpicker('refresh');
				$popupp.modal('show');
			});
		}
	}
}

function hyphener(str = '') {
	return str.replace(/\W+/g, '_').replace(/\_$/, '').toLowerCase();
}

function dismiss_modal($target = '') {
	if ( $.trim($target) && $('#' + $.trim($target)).length ) {
		$('#' + $.trim($target)).modal('hide');
	}
}

function popup_notepad($target = '') {
	$popupp = $('#popup-notepad');
	if ( $popupp.length ) {
		if ( $.trim($target) ) {
			$element = $('input#' + $.trim($target));
			$popupp.find('textarea#notepad').empty().val($.trim($element.val()));
			$popupp.find('button[id=apply]').data('rel', $.trim($target));
			$popupp.modal('show');
		}
	}
}

function apply_notepad($target = '') {
	$popupp = $('#popup-notepad');
	if ( $popupp.length ) {
		if ( $target ) {
			$element = $($target);
			$notes = $.trim($popupp.find('textarea').val());
			$('input#' + $element.data('rel')).val($notes);
			$popupp.find('button[id=apply]').data('rel', '');
			$popupp.modal('hide');
		}
	}
}

function refresh() {
    window.location.reload();
}