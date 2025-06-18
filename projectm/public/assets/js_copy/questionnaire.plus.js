var $form, $countries;
var $popup, $popupp, $popuppp;
$(document).ready(function() {
	
	$(".notepad").wysihtml5();
	$('table#filter-list').dataTable();
	$(".selectpicker").selectpicker();
	$(".selectfilter").selectpicker().on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		filter_questionnaire_plus();
	});
	
	$("body").on('change', 'select.selectfilter', function (e) { var $select = $(this);
		$form = $('form#filter-form');
		if ( $.inArray($.trim($select.attr('name')), ['filter_visa','filter_type']) !== -1 ) {
			$.ajax({
				type: 'POST',
				url: SITEURL + 'questionnaire_plus/autoload',
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
						$form.find('select[name=filter_type]').val('').html(response.options);
						$('.selectfilter').selectpicker('refresh');
					} else if ( $.trim($select.attr('name')) == 'filter_type' ) {
						$form.find('select[name=filter_country]').val('').html(response.countries);
						$form.find('select[name=filter_subtype]').val('').html(response.options);
						$('.selectfilter').selectpicker('refresh');
					} else if ( $.trim($select.attr('name')) == 'filter_subtype' ) {
						$form.find('select[name=filter_country]').val('').html(response.countries);
						$('.selectfilter').selectpicker('refresh');
					}
				},
				complete: function() {
					$.unblockUI();
				}
			});
		}
	});
	
	$("body").on('change', 'select.selectpicker', function (e) { var $select = $(this);
		if ( $.inArray($.trim($select.attr('name')), ['bp_question','bp_answer','bp_sub_question','bp_sub_answer']) !== -1 ) {
			$.ajax({
				type: 'POST',
				url: SITEURL + 'questionnaire_plus/autoload',
				data: { target : $.trim($select.attr('name')), value : $.trim($select.val()) },
				dataType: 'json',
				beforeSend: function() { $.blockUI({ message : '' });
					if ( $.trim($select.attr('name')) == 'bp_question' ) {
						$('select[name=bp_answer]').val('').html('');
					} else if ( $.trim($select.attr('name')) == 'bp_answer' ) {
						$('select[name=bp_sub_question]').val('').html('');
						$('select[name=bp_sub_answer]').val('').html('');
					} else if ( $.trim($select.attr('name')) == 'bp_sub_question' ) {
						$('select[name=bp_sub_answer]').val('').html('');
					}
				},
				success: function(response) {
					if ( $.trim($select.attr('name')) == 'bp_question' ) {
						$('select[name=bp_answer]').val('').html(response.answers);
						$('select[name=bp_sub_question]').html(response.sub_questions);
						$('select[name=bp_sub_question] option:first').prop('selected', true);
						$('select[name=bp_sub_answer]').html(response.sub_answers);
						$('select[name=bp_sub_answer] option:first').prop('selected', true);
						$('.selectpicker').selectpicker('refresh');
					} else if ( $.trim($select.attr('name')) == 'bp_answer' && $.trim(response.sub_questions) ) {
						$('select[name=bp_sub_question]').html(response.sub_questions);
						$('select[name=bp_sub_question] option:first').prop('selected', true);
						$('select[name=bp_sub_answer]').html(response.sub_answers);
						$('select[name=bp_sub_answer] option:first').prop('selected', true);
						$('.selectpicker').selectpicker('refresh');
					} else if ( $.trim($select.attr('name')) == 'bp_sub_question' && $.trim(response.sub_answers) ) {
						$('select[name=bp_sub_answer]').html(response.sub_answers);
						$('select[name=bp_sub_answer] option:first').prop('selected', true);
						$('.selectpicker').selectpicker('refresh');
					}
				},
				complete: function() {
					$.unblockUI();
				}
			});
		}
	});
	
	$('body').on('click', 'a.qoq-plus', function() {
		
		$rel = $.trim($(this).data('rel'));
		$key = $.trim($(this).data('key'));
		$row = $.trim($(this).data('row'));
		$input = $(this).closest('span').siblings("input");
		$textarea = $("textarea#" + $rel + "-title");
		if ( $input.length ) {
			if ( $.trim($input.val()) ) {
				$.ajax({
					type: 'GET',
					url: SITEURL + 'questionnaire_plus/qoq',
					data: { row : $.trim($row), key : $.trim($key), question : $.trim($textarea.val()), answer : $.trim($input.val()) },
					dataType: 'json',
					beforeSend: function() {
						$.blockUI({ message : '' });
						$popup = $('#popup-add-qoq');
					},
					success: function(response) {
						if ( response.status == 200 ) {
							$popup.find('div.modal-header h4').html('Q. ' + $.trim($textarea.val()));
							$popup.find('div.modal-body').html(response.html);
							$popup.modal('show');
						}
					},
					complete: function() {
						$.unblockUI();
					}
				});
			} else {
				$input.focus(); 
			}
		}
	});
});

function filter_questionnaire_plus() {
	$.ajax({
		'url': SITEURL + 'questionnaire_plus/filter',
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
				{ "data": "question" },
				{ "data": "answer" },
				{ "data": "updated" },
				{ "data": "status" },
				{ "data": "actions" }
			]
		});
		$.unblockUI();
	});
}

$('form').submit(function(event){
	
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
						// filter_questionnaire_plus();
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
			url: SITEURL + 'questionnaire_plus/status',
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

function delete_row(target = '') {
	if ( $.trim(target) ) {
		if ( confirm("Are you sure you want to delete ?") ) {
			$.ajax({
				type: 'POST',
				url: SITEURL + 'questionnaire_plus/remove',
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

function popup_add(target = '') {
	$form = $('#add-form');
	if ( $.trim(target) ) {
		$.ajax({
			type: 'GET',
			url: SITEURL + 'questionnaire_plus/add',
			data: { target : $.trim(target) },
			dataType: 'json',
			beforeSend: function() {
				$popup = '';
				$.blockUI({ message : '' });
				$('#popup-add').find('div.modal-body').html('');
			},
			success: function(response) {
				if ( response.status == 200 ) {
					$popup = $('#popup-add');
					$popup.find('div.modal-body').html(response.html);
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

function popup_edit(target = '') {
	$form = $('#edit-form');
	if ( $.trim(target) ) {
		$.ajax({
			type: 'GET',
			url: SITEURL + 'questionnaire_plus/edit',
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

function question_minus_qoq(target = '') {
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
													'<div class="input-group">' +
														'<input type="text" name="bq_question_option['+ $row +'][]" id="'+ target +'-'+ $assign +'-option-1" class="form-control" placeholder="Enter an option" required />' +
														'<span class="input-group-btn"><a type="button" class="btn btn-success qoq-plus" data-rel="'+ target +'-'+ $assign +'" data-key="'+ $row +'" data-row=""><i class="fa fa-plus-circle" aria-hidden="true"></i></a></span>' +
													'</div>' +
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

function question_plus_qoq(target = '', $key = '', $answer = '') {
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
													'<input type="text" name="bq_question_priority['+ $key +']['+ $answer +'][]" id="'+ target +'-'+ $assign +'-priority" class="form-control" value="'+ $assign +'" placeholder="Priority" />' +
												'</div>' +
												'<div class="form-group">' +
													'<a class="btn btn-warning btn-flat btn-block" onclick="popup_notepad(\''+ target +'-'+ $assign +'-notes\')"><i class="fa fa-info-circle" aria-hidden="true"></i> Note</a>' +
													'<input type="hidden" name="bq_question_notes['+ $key +']['+ $answer +'][]" id="'+ target +'-'+ $assign +'-notes" class="form-control" placeholder="Notes" />' +
												'</div>' +
											'</td>' +
											'<td>' +
												'<div class="form-group">' +
													'<textarea name="bq_question_title['+ $key +']['+ $answer +'][]" id="'+ target +'-'+ $assign +'-title" class="form-control" placeholder="Enter the question" rows="3" required></textarea>' +
												'</div>' +
											'</td>' +
											'<td id="'+ target +'-'+ $assign +'-options">' +
												'<div class="form-group">' +
													'<input type="text" name="bq_question_option['+ $key +']['+ $answer +']['+ $row +'][]" id="'+ target +'-'+ $assign +'-option-1" class="form-control" placeholder="Enter an option" required />' +
												'</div>' +
											'</td>' +
											'<td id="'+ target +'-'+ $assign +'-points">' +
												'<div class="form-group">' +
													'<input type="text" name="bq_question_point['+ $key +']['+ $answer +']['+ $row +'][]" id="'+ target +'-'+ $assign +'-point-1" class="form-control" placeholder="0.0" required />' +
												'</div>' +
											'</td>' +
											'<td>' +
												'<div class="form-group button-group">' +
													'<button type="button" class="btn btn-default text-green" onclick="question_option_plus_qoq('+ $option +', '+ $key +', \''+ $answer +'\')"><i class="fa fa-plus-circle" aria-hidden="true">&nbsp;</i> Add Option</button>' +
													'<button type="button" class="btn btn-default text-red" onclick="question_option_minus_qoq('+ $option +', '+ $key +', \''+ $answer +'\')"><i class="fa fa-minus-circle" aria-hidden="true">&nbsp;</i> Remove Option</button>' +
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

function question_option_minus_qoq(target = '') {
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
													'<div class="input-group">' +
														'<input type="text" name="bq_question_option['+ key +'][]" id="'+ target +'-option-'+ $assign +'" class="form-control" placeholder="Enter an option" required />' +
														'<span class="input-group-btn"><a type="button" class="btn btn-success qoq-plus" data-rel="'+ target +'" data-key="'+ key +'" data-row="'+ row +'"><i class="fa fa-plus-circle" aria-hidden="true"></i></a></span>' +
													'</div>' +
												'</div>');
			$('td#' + target +'-points').append('<div class="form-group" id="'+ target +'-point-'+ $assign +'">' +
													'<input type="text" name="bq_question_point['+ key +'][]" id="'+ target +'-point-'+ $assign +'" class="form-control" placeholder="0.0" required />' +
												'</div>');
		}
	}
}

function question_option_plus_qoq(target = '', row = '', $key = '', $answer = '') {
	if ( $.trim(target) ) {
		row = $.trim(row);
		target = $.trim(target);
		var value = $.trim($('tr#' + target).attr('rel'));
		if ( $.isNumeric(value) ) {
			var $assign = (Number(value) + 1);
			$('tr#' + target).attr('rel', $assign);
			$('td#' + target +'-options').append('<div class="form-group" id="'+ target +'-option-'+ $assign +'">' +
													'<input type="text" name="bq_question_option['+ $key +']['+ $answer +']['+ row +'][]" id="'+ target +'-option-'+ $assign +'" class="form-control" placeholder="Enter an option" required />' +
												'</div>');
			$('td#' + target +'-points').append('<div class="form-group" id="'+ target +'-point-'+ $assign +'">' +
													'<input type="text" name="bq_question_point['+ $key +']['+ $answer +']['+ row +'][]" id="'+ target +'-point-'+ $assign +'" class="form-control" placeholder="0.0" required />' +
												'</div>');
		}
	}
}

function question_clear_qoq($row = '', $key = '', $answer = '') {
	if ( $.trim($key) && $.trim($answer) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'questionnaire_plus/qclear',
			data: { row : $.trim($row), key : $.trim($key), answer : $.trim($answer) },
			dataType: 'json',
			beforeSend: function() {
				$.blockUI({ message : '' });
			},
			success: function(response) {
				if ( response.status == 200 ) {
					$('#popup-add-qoq').modal('hide');
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

function hyphener(str = '') {
	return str.replace(/\W+/g, '_').replace(/\_$/, '').toLowerCase();
}

function dismiss_modal($target = '') {
	if ( $.trim($target) && $('#' + $.trim($target)).length ) {
		$('#' + $.trim($target)).modal('hide');
	}
}

function brief_info($target = '') {
	$popup = $('#popup-notepad');
	if ( $.trim($target) ) {
		if ( $popup.length ) {
			$.ajax({
				type: 'GET',
				url: SITEURL + 'questionnaire_plus/note',
				data: { target : $.trim($target), row : $.trim($('input#note-row').val()) },
				dataType: 'json',
				beforeSend: function() {
					$.blockUI({ message : '' });
				},
				success: function(response) {
					if ( response.status == 200 ) {
						$popup.find('div.modal-body').html(response.html).ready(function () {
							if ( $popup.find(".notepad").length ) { $(".notepad").wysihtml5(); }
							$popup.modal('show');
						});
					} else if ( response.status == 404 && response.errors ) {
						if ( $popup ) {
						$popup.animate({ scrollBottom: 0 }); }
						$.each(response.errors, function (i, errors) {
							$.each(errors, function (field, error) {
								$popup.find("span#" + field.replace(/[[\]]/g,'') + "-error").text(error);
								$popup.find("span#" + field.replace(/[[\]]/g,'') + "-error").closest("li").removeClass('hide');
							});
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
    location.reload();
}