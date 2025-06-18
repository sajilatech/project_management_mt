var $countries;
$(document).ready(function() {
	managecountry();
	$('.datatable-country').dataTable();
	$('select.countrypicker').selectpicker('destroy');
	$("select.countrypicker").selectpicker().ajaxSelectPicker({
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
});

function managecountry($selected = false) {
	if ( $("select.managecountry").length ) {
		$('select.managecountry').selectpicker('destroy');
		$("select.managecountry").selectpicker().ajaxSelectPicker({
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
					$(".managecountry").selectpicker('val', '');
					$(".managecountry").selectpicker('refresh');
						
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
}

function remove_crow($target = '') {
	if ( $('table#manage-country').find('tbody tr#row-' + $target).length ) {
		if ( $('table.datatable-country').length ) {
			$datatable = $('table.datatable-country').DataTable();
			$datatable.row($('tr#row-' + $target)).remove().draw();
		} else {
			$('table#manage-country').find('tr#row-' + $target).remove();
		}
	}
}