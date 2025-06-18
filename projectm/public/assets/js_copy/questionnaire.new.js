var $form, $countries;
var $popup, $popupp, $popuppp;
$(document).ready(function() {
	
	$('table#filter-list').dataTable();
	$(".selectpicker").selectpicker();
	
	/* $(".selectfilter").selectpicker().on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		filter_questionnaire();
	}); */
	
	$("body").on('change', 'select.selectfilter', function (e) { var $select = $(this);
		$form = $('form#filter-form');
		if ( $.inArray($.trim($select.attr('name')), ['filter_visa','filter_type','filter_subtype','filter_country','filter_status']) !== -1 ) {
			$.ajax({
				type: 'POST',
				url: SITEURL + 'questionnaire_new/autoload',
				data: { target : $.trim($select.attr('name')), value : $.trim($select.val()) },
				dataType: 'json',
				beforeSend: function() { $.blockUI({ message : '' });
					if ( $.trim($select.attr('name')) == 'filter_visa' ) {
						$form.find('select[name=filter_type], select[name=filter_subtype], select[name=filter_country]').val('').html('');
						$form.find('select[name=filter_status]').val('');
					} else if ( $.trim($select.attr('name')) == 'filter_type' ) {
						$form.find('select[name=filter_subtype]').val('').html('');
					}
				},
				success: function(response) {
					if ( $.trim($select.attr('name')) == 'filter_visa' ) {
						$form.find('select[name=filter_country]').val('').html(response.countries);
						$form.find('select[name=filter_subtype]').val('').html(response.subtypes);
						$form.find('select[name=filter_type]').val('').html(response.types);
						$('.selectfilter').selectpicker('refresh');
					} else if ( $.trim($select.attr('name')) == 'filter_type' ) {
						$form.find('select[name=filter_country]').val('').html(response.countries);
						$form.find('select[name=filter_subtype]').val('').html(response.types);
						$('.selectfilter').selectpicker('refresh');
					} else if ( $.trim($select.attr('name')) == 'filter_subtype' ) {
						$form.find('select[name=filter_country]').val('').html(response.countries);
						$('.selectfilter').selectpicker('refresh');
					}
				},
				complete: function() {
					filter_questionnaire();
					$.unblockUI();
				}
			});
		}
	});
	
	$("body").on('change', 'select.selectpicker', function (e) { var $select = $(this);
		if ( $.inArray($.trim($select.attr('name')), ['bq_visa','bq_type','bq_subtype','bq_country','bq_marital_status','bq_parent']) !== -1 ) {
			
			$.ajax({
				type: 'POST',
				url: SITEURL + 'questionnaire_new/autoload',
				data: { target : $.trim($select.attr('name')), value : $.trim($select.val()), collective : $.trim(qchecker()) },
				dataType: 'json',
				beforeSend: function() { $.blockUI({ message : '' });
					if ( $.trim($select.attr('name')) == 'bq_visa' ) {
						$('select[name=bq_type], select[name=bq_subtype], select[name=bq_country], select[name=bq_parent], select[name=bq_option]').val('').html('');
						$('sup#type-required, sup#subtype-required').removeClass('hide').addClass('hide');
						$('select[name=bq_type], select[name=bq_subtype]').removeAttr('required');
					} else if ( $.trim($select.attr('name')) == 'bq_type' ) {
						$('select[name=bq_subtype], select[name=bq_country], select[name=bq_parent], select[name=bq_option]').val('').html('');
						$('sup#subtype-required').removeClass('hide').addClass('hide');
						$('select[name=bq_subtype]').removeAttr('required');
					} else if ( $.trim($select.attr('name')) == 'bq_subtype' ) {
						$('select[name=bq_country], select[name=bq_parent], select[name=bq_option]').val('').html('');
					} else if ( $.trim($select.attr('name')) == 'bq_country' ) {
						$('select[name=bq_parent], select[name=bq_option]').val('').html('');
					}  else if ( $.trim($select.attr('name')) == 'bq_marital_status' ) {
						$('select[name=bq_parent], select[name=bq_option]').val('').html('');
					} else if ( $.trim($select.attr('name')) == 'bq_parent' ) {
						$('select[name=bq_option]').val('').html('');
					}
				},
				success: function(response) {
					if ( $.trim($select.attr('name')) == 'bq_visa' ) {
						if ( response.required ) {
							$('select[name=bq_type]').removeAttr('required').attr('required','required');
							$('sup#type-required').removeClass('hide');
						}
						
						$('select[name=bq_country]').val('').html(response.countries);
						$('select[name=bq_type]').val('').html(response.types);
						$('select[name=bq_parent]').html(response.questions);
						$('select[name=bq_parent] option:first').prop('selected', true);
						$('select[name=bq_option]').html(response.options);
						$('select[name=bq_option] option:first').prop('selected', true);
						$('.selectpicker').selectpicker('refresh');
					} else if ( $.trim($select.attr('name')) == 'bq_type' ) {
						if ( response.required ) {
							$('select[name=bq_subtype]').removeAttr('required').attr('required','required');
							$('sup#subtype-required').removeClass('hide');
						}
						
						$('select[name=bq_country]').val('').html(response.countries);
						$('select[name=bq_subtype]').val('').html(response.types);
						$('select[name=bq_parent]').html(response.questions);
						$('select[name=bq_parent] option:first').prop('selected', true);
						$('select[name=bq_option]').html(response.options);
						$('select[name=bq_option] option:first').prop('selected', true);
						$('.selectpicker').selectpicker('refresh');
					} else if ( $.trim($select.attr('name')) == 'bq_subtype' ) {
						$('select[name=bq_country]').val('').html(response.countries);
						$('select[name=bq_parent]').html(response.questions);
						$('select[name=bq_parent] option:first').prop('selected', true);
						$('select[name=bq_option]').html(response.options);
						$('select[name=bq_option] option:first').prop('selected', true);
						
						$('.selectpicker').selectpicker('refresh');
					} else if ( $.trim($select.attr('name')) == 'bq_country' ) {
						$('select[name=bq_parent]').html(response.questions);
						$('select[name=bq_parent] option:first').prop('selected', true);
						$('select[name=bq_option]').html(response.options);
						$('select[name=bq_option] option:first').prop('selected', true);
						$('.selectpicker').selectpicker('refresh');
					} else if ( $.trim($select.attr('name')) == 'bq_marital_status' ) {
						$('select[name=bq_parent]').html(response.questions);
						$('select[name=bq_parent] option:first').prop('selected', true);
						$('select[name=bq_option]').html(response.options);
						$('select[name=bq_option] option:first').prop('selected', true);
						$('.selectpicker').selectpicker('refresh');
					} else if ( $.trim($select.attr('name')) == 'bq_parent' ) {
						$('select[name=bq_option]').html(response.options);
						$('select[name=bq_option] option:first').prop('selected', true);
						$('.selectpicker').selectpicker('refresh');
					}
				},
				complete: function() {
					$.unblockUI();
				}
			});
		}
	});
	
	$("select.copycountry").selectpicker().ajaxSelectPicker({
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
			var i, l = data.length, array = [];
			var $current = $.trim($("select.copycountry").data('not'));
			if (l) {
				for (i = 0; i < l; i++) {
					if ( $.trim(data[i].id) != $current ) {
						array.push(
							$.extend(true, data[i], {
								text: data[i].title,
								value: data[i].id
							})
						);
					}
				}
			}
			
			return array;
		}
	});
});

function qchecker() {
	$result = [];
	if ( $('select.qchecker').length ) {
		$('select.qchecker').each(function(i) {
			$result.push($(this).val());
		});
	}
	
	return $result.toString();
}

function filter_questionnaire() {
	$.ajax({
		'url': SITEURL + 'questionnaire_new/filter',
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

$('form').submit(function(event) {
	
	event.preventDefault();
	
	$form = $(this);
	$formID = $form.attr('id'); 
	var formData = new FormData(document.getElementById($formID));

	var $btn = $form.find("button[type=submit]");
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
						if ( $popup ) {
						$popup.modal('hide'); }
						$('form#'+$formID).trigger("reset");
					},
					beforeHide: function () {
						// filter_questionnaire();
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

function change_status(target, value) {
	if ( $.trim(target) && $.trim(value) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'questionnaire_new/status',
			data: { target : $.trim(target), value : $.trim(value) },
			dataType: 'json',
			beforeSend: function() {
				$.blockUI({ message : '' });
			},
			success: function(response) {
				if ( response.status == 200 ) {
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

function change_priority(thiss) {
	$value = $(thiss).val();
	$target = $(thiss).data('row');
	if ( $.trim($target) && $.isNumeric($value) ) {
		$.post(SITEURL + 'questionnaire_new/priority', { target : $.trim($target), value : $.trim($value) }, function(result) {});
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
													'<input type="text" name="bq_question_priority[]" id="'+ target +'-'+ $assign +'-priority" class="form-control" value="'+ $assign +'" placeholder="Priority" />' +
												'</div>' +
												'<div class="form-group">' +
													'<a class="btn btn-warning btn-flat btn-block" onclick="popup_notepad(\''+ target +'-'+ $assign +'-notes\')"><i class="fa fa-info-circle" aria-hidden="true"></i> Note</a>' +
													'<input type="hidden" name="bq_question_notes[]" id="'+ target +'-'+ $assign +'-notes" class="form-control" placeholder="Notes" />' +
												'</div>' +
											'</td>' +
											'<td>' +
												'<div class="form-group">' +
													'<textarea name="bq_question_title[]" id="'+ target +'-'+ $assign +'-title" class="form-control" placeholder="Enter the question" rows="3" required></textarea>' +
												'</div>' +
											'</td>' +
											'<td id="'+ target +'-'+ $assign +'-options">' +
												'<div class="form-group">' +
													'<input type="text" name="bq_question_option['+ $row +'][]" id="'+ target +'-'+ $assign +'-option-1" class="form-control" placeholder="Enter an option" required />' +
												'</div>' +
											'</td>' +
											'<td id="'+ target +'-'+ $assign +'-points">' +
												'<div class="form-group">' +
													'<input type="text" name="bq_question_point['+ $row +'][]" id="'+ target +'-'+ $assign +'-point-1" class="form-control" placeholder="0.0" required />' +
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
													'<input type="text" name="bq_question_option['+ key +'][]" id="'+ target +'-option-'+ $assign +'" class="form-control" placeholder="Enter an option" required />' +
												'</div>');
			$('td#' + target +'-points').append('<div class="form-group" id="'+ target +'-point-'+ $assign +'">' +
													'<input type="text" name="bq_question_point['+ key +'][]" id="'+ target +'-point-'+ $assign +'" class="form-control" placeholder="0.0" required />' +
												'</div>');
		}
	}
}

function delete_row(target = '') {
	if ( $.trim(target) ) {
		if ( confirm("Are you sure you want to delete ?") ) {
			$.ajax({
				type: 'POST',
				url: SITEURL + 'questionnaire_new/remove',
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
									refresh();
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

function copy_questionnaire($target = '', $country = '') {
	$popupp = $('#popup-copy');
	if ( $popupp.length ) {
		if ( $.trim($target) ) {
			$.post(SITEURL + 'questionnaire_new/autocountry', { target : $.trim($target) }).done(function(data) {
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