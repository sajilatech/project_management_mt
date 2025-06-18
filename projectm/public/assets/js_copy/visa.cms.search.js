var $form;
var $popup;
var $countries;
var segments = $(location).attr('href').split("/");
$(document).ready(function() {
	if ( $.inArray("add", segments) !== -1 ) {}
	
	filter_table();
	$(".selectpicker").selectpicker();
	$(".selectfilter").selectpicker().on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		filter_table();
	});
});

function filter_table() {
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
				{ "data": "keyword" },
				{ "data": "country" },
				{ "data": "updated" },
				{ "data": "status" },
				{ "data": "action" }
			],
			"createdRow": function( row, data, dataIndex ) {
				// $(row).addClass(data.background);
			}
		});
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
						if ( response.redirect ) {
							window.location.replace(response.redirect);
						} else {
							filter_table();
						}
					}
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

function change_priority(target = '', value = '') {
	if ( $.trim(target) && $.isNumeric(value) ) {
		$.post(SITEURL + 'visa_cms_search/priority', { target : $.trim(target), value : $.trim(value) }, function(result) {});
	}
}

function delete_row(target = '') {
	if ( $.trim(target) ) {
		if ( confirm("Are you sure you want to delete ?") ) {
			$.ajax({
				type: 'POST',
				url: SITEURL + 'visa_cms_search/remove',
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
									filter_table();
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

function change_status(target, value) {
	if ( $.trim(target) && $.trim(value) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'visa_cms_search/status',
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
			url: SITEURL + 'visa_cms_search/add',
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
					$popup.find('div.modal-body').html(response.html).ready(function() {
						$('.selectpicker').selectpicker('refresh');
						$('.datatable-contents').dataTable();
						$('.datatable-country').dataTable();
						$('.datatable').dataTable();
						$(".textarea").wysihtml5();
						assigncountry();
						countrypicker();
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
			url: SITEURL + 'visa_cms_search/edit',
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
					$popup.find('div.modal-body').html(response.html).ready(function() {
						$('.selectpicker').selectpicker('refresh');
						$('.datatable-contents').dataTable();
						$('.datatable-country').dataTable();
						$('.datatable').dataTable();
						$(".textarea").wysihtml5();
						assigncountry();
						countrypicker();
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
				$popup.modal('show');
				$.unblockUI();
			}
		});
	}
}

function countrypicker() {
	$(".countrypicker").selectpicker().ajaxSelectPicker({
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

function plus_one($target = '') {
    if ( $('div.'+ $target).length ) {
		if ( $target == 'more-informations' ) {
			$key = Number($('div.'+ $target).find('ul.nav-tabs li').length);
			$row = Number($('div.'+ $target).find('ul.nav-tabs li').length) + 1;
			$('div.'+ $target).find('li.active').removeClass('active');
			$('div.'+ $target).find('ul.nav-tabs').append(
				'<li class="active" id="information_'+ $row +'_link"><a href="#information_'+ $row +'" data-toggle="tab" aria-expanded="true">Information '+ $row +'</a></li>'
			);
			
			$('div.'+ $target).find('div.tab-pane.active').removeClass('active');
			$('div.'+ $target).find('div.tab-content').append(
				'<div class="tab-pane active" id="information_'+ $row +'">' +
					'<div class="form-group">' +
						'<div class="row">' +
							'<div class="col-md-7">' +
								'<label for="information-'+ $row +'-title" class="col-form-label">Title</label>' +
								'<input type="text" name="informations['+ $key +'][title]" id="information-'+ $row +'-title" class="form-control" placeholder="Give a title" />' +
							'</div>' +
							'<div class="col-md-5">' +
								'<label for="information-'+ $row +'-image" class="col-form-label">Image</label>' +
								'<input type="file" name="information_image['+ $key +']" id="information-'+ $row +'-image" class="form-control" />' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="information-'+ $row +'-description" class="col-form-label">Description</label>' +
						'<textarea name="informations['+ $key +'][description]" id="information-'+ $row +'-description" class="form-control textarea-'+ $row +'" placeholder="Give a description"></textarea>' +
					'</div>' +
				'</div>'
			).ready(function () {
				$(".textarea-"+ $row).wysihtml5();
			});
		} else if ( $target == 'more-hovers' ) {
			$key = Number($('div.'+ $target).find('ul.nav-tabs li').length);
			$row = Number($('div.'+ $target).find('ul.nav-tabs li').length) + 1;
			$('div.'+ $target).find('li.active').removeClass('active');
			$('div.'+ $target).find('ul.nav-tabs').append(
				'<li class="active" id="hover_'+ $row +'_link"><a href="#hover_'+ $row +'" data-toggle="tab" aria-expanded="true">Hover '+ $row +'</a></li>'
			);
			
			$('div.'+ $target).find('div.tab-pane.active').removeClass('active');
			$('div.'+ $target).find('div.tab-content').append(
				'<div class="tab-pane active" id="hover_'+ $row +'">' +
					'<div class="form-group">' +
						'<div class="row">' +
							'<div class="col-md-7">' +
								'<label for="hover-'+ $row +'-title" class="col-form-label">Title</label>' +
								'<input type="text" name="hovers['+ $key +'][title]" id="hover-'+ $row +'-title" class="form-control" placeholder="Give a title" />' +
							'</div>' +
							'<div class="col-md-5">' +
								'<label for="hover-'+ $row +'-image" class="col-form-label">Image</label>' +
								'<input type="file" name="hover_image['+ $key +']" id="hover-'+ $row +'-image" class="form-control" />' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="hover-'+ $row +'-description" class="col-form-label">Description</label>' +
						'<textarea name="hovers['+ $key +'][description]" id="hover-'+ $row +'-description" class="form-control" placeholder="Give a description" rows="3"></textarea>' +
					'</div>' +
				'</div>'
			);
		}
	}
}

function drop_one($target = '') {
    if ( $('div.'+ $target).length ) {
		if ( $target == 'more-informations' ) {
			$row = Number($('div.'+ $target).find('ul.nav-tabs li').length);
			if ( $row > 1 ) {
				$('div.'+ $target).find('li.active').removeClass('active');
				$('div.'+ $target).find('div.tab-pane.active').removeClass('active');
				
				$('div.'+ $target).find('div#information_'+ $row).remove();
				$('div.'+ $target).find('li#information_'+ $row + '_link').remove();
				$('div.'+ $target).find('div#information_'+ ($row - 1)).addClass('active');
				$('div.'+ $target).find('li#information_'+ ($row - 1) + '_link').addClass('active');
			}
		} else if ( $target == 'more-hovers' ) {
			$row = Number($('div.'+ $target).find('ul.nav-tabs li').length);
			if ( $row > 1 ) {
				$('div.'+ $target).find('li.active').removeClass('active');
				$('div.'+ $target).find('div.tab-pane.active').removeClass('active');
				
				$('div.'+ $target).find('div#hover_'+ $row).remove();
				$('div.'+ $target).find('li#hover_'+ $row + '_link').remove();
				$('div.'+ $target).find('div#hover_'+ ($row - 1)).addClass('active');
				$('div.'+ $target).find('li#hover_'+ ($row - 1) + '_link').addClass('active');
			}
		}
	}
}

function preview($src = '') {
	$target = $('#img-preview');
	$target.find('img').attr('src', '');
	if ( $.trim($src) ) {
		$target.find('img').attr('src', $src);
		$target.modal('show');
	}
}

function assigncountry($selected = false) {
	$("select.assigncountry").selectpicker().ajaxSelectPicker({
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
		},
		preserveSelected: $selected
	}).on('shown.bs.select', function (e) {
		$('span#search-country-error').text('');
	}).on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		$text = $.trim($("option:selected", this).text());
		$value = $.trim($("option:selected", this).val());
		$table = $('table#manage-country');
		if ( $table.length && $value ) {
				
			$row = Number($table.find('tbody tr[id]').length);
			if ( !$table.find('tr#row-' + $value).length ) {
				$append = '<tr id="row-'+ $value +'">' +
							'<td><input type="hidden" name="countries['+ $row +'][country]" class="form-control" value="' + $value + '" placeholder="Give a value" readonly />' + $text + '</td>' +
							'<td><input type="text" name="countries['+ $row +'][priority]" class="form-control" value="' + $row + '" placeholder="Give a value" /></td>' +
							'<td><a type="button" class="btn btn-danger btn-sm" onclick="remove_crow('+ $value +')">Remove</a></td>' +
						'</tr>';
						
				// reset value after selected
				$(".assigncountry").selectpicker('val', '');
				$(".assigncountry").selectpicker('refresh');
					
				if ( $('table.datatable-country').length ) {
					$('table.datatable-country').DataTable().destroy();
					$('table.datatable-country').find('tbody').append($append);
					$('table.datatable-country').DataTable().draw();
				} else {
					$table.find('tbody').append($append);
				}
			} else {
				$('span#search-country-error').text('Already added to the list');
			}
		}
	});
}

function refresh() {
    window.location.reload();
}