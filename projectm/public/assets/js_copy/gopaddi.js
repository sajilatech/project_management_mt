var $today = new Date(), $form;
$(document).ready(function() {
	if ( $('table.datatable').length ) {
		$('table.datatable').dataTable();
	}
	
	if ( $('table#table-goeasy').length ) {
		$('table#table-goeasy').dataTable({
			paging: false,
			searching: false
		});
	}

	if ( $('select.select2').length ) {
		$('select.select2').select2();
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
    /* if ( $.trim(user_id) == '1' ) {
    	chartDeployment(year, 'bar');
    	chartDeployment(year, 'area');
    	detailsBarChartDeployment(year, 'feed');
    	detailsBarChartDeployment(year, 'diary');
    } */
});

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
			$btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
		},
		success: function(response) {
			if ( response.errors ) {
				$.each(response.errors, function (i, errors) {
					$.each(errors, function (field, error) {
						$form.find("span#" + field.replace(/[[\]]/g,'') + "-error").text(error);
					});
				});
			} else if ( response.alerts ) {
				$.toast({
					hideAfter: 3000,
					heading: (response.status == 200) ? 'Success' : 'Error',
					text: response.alerts,
					showHideTransition: 'slide',
					position: 'bottom-center',
					icon: (response.status == 200) ? 'success' : 'error',
					stack: 1,
					beforeShow: function () {
						if ( response.status == 200 ) {
							$form.trigger("reset");
						}
					},
					beforeHide: function () {
						if ( response.redirect ) {
							location.replace(response.redirect);
						}
					},
				});
			}
		},
		complete: function() {
			$btn.html($html);
		}
	});
});

function add_more_goeasy(thiss) {
	$table = $('table');
	if ( $table.length ) {
		$btn = $(thiss);
		$html = $(thiss).html();
		$target = Number($table.find('tbody tr').length) + 1;
		if ( $target ) {
			$.ajax({
				type: 'POST',
				url: SITEURL + 'Gopaddi/goeasy_loader',
				data: { target : $target, page : 'settings' },
				dataType: 'json',
				beforeSend: function() {
					$btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
				},
				success: function(response) {
					if ( response ) {
						$table.find('tbody').append(response);
					}
				},
				complete: function() {
					$btn.html($html);
				}
			});
		}
	}
}

function status_goeasy(thiss) {
	$table = $('table');
	$form = $(thiss).closest('form');
	if ( $table.length ) {
		$btn = $(thiss);
		$html = $(thiss).html();
		$key = $(thiss).parents('tr').find('input[name="key[]"]').val();
		if ( $.trim($key) ) {
			$.ajax({
				type: 'POST',
				url: SITEURL + 'Gopaddi/goeasy_settings_alter',
				data: { target : $.trim($key), method : 'status', value : $.trim($(thiss).val()) },
				dataType: 'json',
				beforeSend: function() {
					$btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
				},
				success: function(response) {
					if ( response.status == 200 ) {
						$(thiss).html(response.text);
						$(thiss).removeClass('btn-success btn-warning').addClass('btn-' + response.class);
						$value = ($.trim($(thiss).val()) == 1) ? 0 : 1;
						$(thiss).val($value);
					}
				},
				complete: function(response) {
					if ( response.status != 200 ) {
						$btn.html($html);
					}
				}
			});
		}
	}
}

function delete_goeasy(thiss) {
	$table = $('table');
	$form = $(thiss).closest('form');
	if ( $table.length ) {
		$btn = $(thiss);
		$html = $(thiss).html();
		$row = $(thiss).parents('tr').data('key');
		if ( $row > 1 ) {
			$key = $(thiss).parents('tr').find('input[name="key[]"]').val();
			if ( $.trim($key) ) {
				$.ajax({
					type: 'POST',
					url: SITEURL + 'Gopaddi/goeasy_settings_alter',
					data: { target : $.trim($key), method : 'delete' },
					dataType: 'json',
					beforeSend: function() {
						$btn.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
					},
					success: function(response) {
						if ( response.status == 200 ) {
							$(thiss).parents('tr').remove();
							indexing();
						}
					},
					complete: function() {
						$btn.html($html);
					}
				});
			} else {
				$(thiss).parents('tr').remove();
				indexing();
			}
		}
	}
}

function indexing() {
	$table = $('table');
	if ( $table.length ) {
		$('table > tbody  > tr').each(function(index, tr) {
			$(this).attr('data-key', (index + 1));
			$(this).find('label.row-index').html((index + 1));
		});
	}
}

function chartDeployment(year = '', chart = '') {
	var totalFeeds = [] , totalDiary = [];
	$.ajax({
		type: 'POST',
		url: SITEURL + 'Gopaddi/barCharts',
		data: { year : $.trim(year) },
		dataType: 'json',
		success : function (response) {
			if ( $.trim(chart) == 'bar' ) {
				if ( $.trim(response) ) {
					feedDiaryBarChart(response.totalFeedCount, response.totalDiaryCount);
				}
			}
			if ( $.trim(chart) == 'area' ) {
				if ( $.trim(response) ) {
					feedDiaryAreaChart(response.totalFeedCount, response.totalDiaryCount);
				}
			}			
		}
	});
}

function detailsBarChartDeployment(year = '', statusType = '') {
	var target = '';
	var likesCount = [], shareCount = [], savedCount = [], viewedCount = [], commentedCount = [];
	$.ajax({
		type: 'POST',
		url: SITEURL + 'Gopaddi/detailed_bar_chart',
		data: { target : $.trim(year), statusType : $.trim(statusType) },
		dataType: 'json',
		success : function (response) {
			if ( response.status == 200 ) {
				barChartDetails(statusType, response.likesCount, response.shareCount, response.savedCount, response.viewedCount, response.commentedCount);
			}
		}
	});
}

$('body').on('change', 'select#year-list', function() {
	var chart = '';
	var year = $('#year-list').find(":selected").text();
	if ( $.trim(year) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'Gopaddi/changeBarChart',
			data: { year : $.trim(year), chart : 'bar' },
			dataType: 'json',      
			success:function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {
						$(".feed-diary-barchart").html(response.html);
						chartDeployment(response.year, 'bar');
					}
				}
			}
		});
	}
});

$('body').on('change', 'select#year-list-area', function() {
	var year = $('#year-list-area').find(":selected").text();
	if ( $.trim(year) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'Gopaddi/changeBarChart',
			data: { year : $.trim(year), chart : 'area' },
			dataType: 'json',      
			success:function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {
						$(".feed-diary-areachart").html(response.html);
						chartDeployment(response.year, 'area');
					}
				}
			}
		});
	}
});

$('body').on('change', 'select#feed-details-year-list', function() {
	var year = $('#feed-details-year-list').find(":selected").text();
	if ( $.trim(year) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'Gopaddi/changeDetailsBarChart',
			data: { year : $.trim(year), statusType : "feed"  },
			dataType: 'json',      
			success:function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {
						$(".feed-details-barchart").html(response.html);
						detailsBarChartDeployment(response.year, 'feed');
					}
				}
			}
		});
	}
});
$('body').on('change', 'select#diary-details-year-list', function() {
	var year = $('#diary-details-year-list').find(":selected").text();
	if ( $.trim(year) ) {
		$.ajax({
			type : 'POST',
			url : SITEURL + 'Gopaddi/changeDetailsBarChart',
			data: { year : $.trim(year), statusType : "diary"  },
			dataType: 'json',      
			success:function(response) {
				if ( response.status == 200 ) {
					if ( response.html ) {
						$(".diary-details-barchart").html(response.html);
						detailsBarChartDeployment(response.year, 'diary');
					}
				}
			}
		});
	}
});

function barChartDetails(status = '', likesCount = [], shareCount = [], savedCount = [], viewedCount = [], commentedCount = []) {
	if ( $('#' + status + '-details-chart').length ) {
		var detailsChartCanvas = $('#' + status + '-details-chart').get(0).getContext("2d");
		var detailChart = new Chart(detailsChartCanvas);
		
		var barDetailChartData = {
			labels: ['Jan','Feb','Mar','Apr','May','June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			datasets: [
				{
					label: "Likes",
					fillColor: "rgba(219, 10, 91, 1)",
					strokeColor: "rgba(219, 10, 92, 1.9)",
					pointColor: "rgba(210, 214, 222, 1)",
					pointStrokeColor: "#c1c7d1",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: likesCount
				},
				{
					label: "Shares",
					fillColor: "rgba(60,141,188,0.9)",
					strokeColor: "rgba(60,141,188,0.8)",
					pointColor: "#3b8bba",
					pointStrokeColor: "rgba(60,141,188,1)",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(60,141,188,1)",
					data: shareCount
				},
				{
					label: "Saved",
					fillColor: "rgba(255, 240, 0, 1)",
					strokeColor: "rgba(255, 240, 1, 1.8)",
					pointColor: "rgba(210, 214, 222, 1)",
					pointStrokeColor: "#c1c7d1",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: savedCount
				},
				{
					label: "Views",
					fillColor: "rgba(60,141,188,0.9)",
					strokeColor: "rgba(60,141,188,0.8)",
					pointColor: "#3b8bba",
					pointStrokeColor: "rgba(60,141,188,1)",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(60,141,188,1)",
					data: viewedCount
				},
				{
					label: "Comments",
					fillColor: "rgba(249, 191, 59, 1)",
					strokeColor: "rgba(249, 191, 60, 1.8)",
					pointColor: "rgba(210, 214, 222, 1)",
					pointStrokeColor: "#c1c7d1",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: commentedCount
				}
			]
		};

		barDetailChartData.datasets[1].fillColor = "#00a65a";
		barDetailChartData.datasets[1].strokeColor = "#00a65a";
		barDetailChartData.datasets[1].pointColor = "#00a65a";

		var barChartOptions = {
			//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
			scaleBeginAtZero: true,
			//Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines: true,
			//String - Colour of the grid lines
			scaleGridLineColor: "rgba(0,0,0,.05)",
			//Number - Width of the grid lines
			scaleGridLineWidth: 1,
			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,
			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,
			//Boolean - If there is a stroke on each bar
			barShowStroke: true,
			//Number - Pixel width of the bar stroke
			barStrokeWidth: 2,
			//Number - Spacing between each of the X value sets
			barValueSpacing: 5,
			//Number - Spacing between data sets within X values
			barDatasetSpacing: 1,
			//String - A legend template
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
			//Boolean - whether to make the chart responsive
			responsive: true,
			maintainAspectRatio: true
		};

		barChartOptions.datasetFill = false;
		detailChart.Bar(barDetailChartData, barChartOptions);
	}
}

function feedDiaryBarChart(totalFeedCount = [], totalDiaryCount = []) {	
	if ( $('#diary-feeds-chart').length ) {
		var diaryFeedChartCanvas = $("#diary-feeds-chart").get(0).getContext("2d");
		var diaryFeedChart = new Chart(diaryFeedChartCanvas);
		
		var barChartData = {
			labels: ['Jan','Feb','Mar','Apr','May','June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			datasets: [
				{
					label: "Feed Count",
					fillColor: "rgba(210, 214, 222, 1)",
					strokeColor: "rgba(210, 214, 222, 1)",
					pointColor: "rgba(210, 214, 222, 1)",
					pointStrokeColor: "#c1c7d1",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: totalFeedCount
				},
				{
					label: "Diary Count",
					fillColor: "rgba(60,141,188,0.9)",
					strokeColor: "rgba(60,141,188,0.8)",
					pointColor: "#3b8bba",
					pointStrokeColor: "rgba(60,141,188,1)",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(60,141,188,1)",
					data: totalDiaryCount
				}
			]
		};

		barChartData.datasets[1].fillColor = "#00a65a";
		barChartData.datasets[1].strokeColor = "#00a65a";
		barChartData.datasets[1].pointColor = "#00a65a";

		var barChartOptions = {
			//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
			scaleBeginAtZero: true,
			//Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines: true,
			//String - Colour of the grid lines
			scaleGridLineColor: "rgba(0,0,0,.05)",
			//Number - Width of the grid lines
			scaleGridLineWidth: 1,
			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,
			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,
			//Boolean - If there is a stroke on each bar
			barShowStroke: true,
			//Number - Pixel width of the bar stroke
			barStrokeWidth: 2,
			//Number - Spacing between each of the X value sets
			barValueSpacing: 5,
			//Number - Spacing between data sets within X values
			barDatasetSpacing: 1,
			//String - A legend template
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
			//Boolean - whether to make the chart responsive
			responsive: true,
			maintainAspectRatio: true
		};

		barChartOptions.datasetFill = false;
		diaryFeedChart.Bar(barChartData, barChartOptions);
	}
}

function feedDiaryAreaChart(totalFeedCount = [], totalDiaryCount = []) {	
	if ( $('#diary-feeds-area-chart').length ) {
		var diaryFeedAreaChartCanvas = $("#diary-feeds-area-chart").get(0).getContext("2d");
		var diaryFeedAreaChart = new Chart(diaryFeedAreaChartCanvas);
		
		var areaChartData = {
			labels: ['Jan','Feb','Mar','Apr','May','June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			datasets: [
				{
					label: "Feed Count",
					fillColor: "rgba(210, 214, 222, 1)",
					strokeColor: "rgba(210, 214, 222, 1)",
					pointColor: "rgba(210, 214, 222, 1)",
					pointStrokeColor: "#c1c7d1",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: totalFeedCount
				},
				{
					label: "Diary Count",
					fillColor: "rgba(60,141,188,0.9)",
					strokeColor: "rgba(60,141,188,0.8)",
					pointColor: "#3b8bba",
					pointStrokeColor: "rgba(60,141,188,1)",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(60,141,188,1)",
					data: totalDiaryCount
				}
			]
		};

		var areaChartOptions = {
			//Boolean - If we should show the scale at all
			showScale: true,
			//Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines: false,
			//String - Colour of the grid lines
			scaleGridLineColor: "rgba(0,0,0,.05)",
			//Number - Width of the grid lines
			scaleGridLineWidth: 1,
			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,
			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,
			//Boolean - Whether the line is curved between points
			bezierCurve: true,
			//Number - Tension of the bezier curve between points
			bezierCurveTension: 0.3,
			//Boolean - Whether to show a dot for each point
			pointDot: false,
			//Number - Radius of each point dot in pixels
			pointDotRadius: 4,
			//Number - Pixel width of point dot stroke
			pointDotStrokeWidth: 1,
			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius: 20,
			//Boolean - Whether to show a stroke for datasets
			datasetStroke: true,
			//Number - Pixel width of dataset stroke
			datasetStrokeWidth: 2,
			//Boolean - Whether to fill the dataset with a color
			datasetFill: true,
			//String - A legend template
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
			//Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
			maintainAspectRatio: true,
			//Boolean - whether to make the chart responsive to window resizing
			responsive: true
		};

		//Create the line chart
    	diaryFeedAreaChart.Line(areaChartData, areaChartOptions);
	}
}

function account_verification(requestId = '', requestStatus = '') {
	if ( $.trim(requestId) && $.trim(requestStatus) ) {
		$.confirm({
			title: 'Are you sure you want to change the status?',
			titleClass: 'title-cfrm',
			content: '<form>' + '<div class="form-group">' + '<textarea type="text" class="form-control" placeholder="Type something here you want to share with the customer" rows="5"></textarea>' + '</div>' + '</form>',
			buttons: {
				formSubmit: {
					text: 'Proceed',
					btnClass: 'btn-blue',
					action: function () {
						var message = this.$content.find('textarea').val();
						$.ajax({							
							type: 'POST',
							url: SITEURL + 'Gopaddi/account_verification',
							data: { requestId : $.trim(requestId), requestStatus : $.trim(requestStatus), message : $.trim(message) },
							dataType: 'json',
							beforeSend: function() {
								$.blockUI({ message : '' });
							},
							success: function(response) {
								if ( response.status = 200 ) {
									$('.verify-requests-'+requestId).html(response.changeButton);
								}
							},
							complete: function() {
								$.unblockUI();
							}
						});
					}
				},
				cancel: function () {}
			},
			theme: 'material',
			animation: 'bottom',
			columnClass: 'medium',
			onContentReady: function () {
				var jc = this;
				this.$content.find('form').on('submit', function (e) {
					e.preventDefault();
					jc.$$formSubmit.trigger('click');
				});
			}
		});
	}
}

function admin_verification(clientId = '', requestStatus = '') {
	if ( $.trim(clientId) && $.trim(requestStatus) ) {
		$.confirm({
			title: 'Are you sure you want to change the status?',
			titleClass: 'title-cfrm',
			content: '',
			buttons: {
				formSubmit: {
					text: 'Proceed',
					btnClass: 'btn-blue',
					action: function () {
						var message = this.$content.find('textarea').val();
						$.ajax({							
							type: 'POST',
							url: SITEURL + 'Gopaddi/admin_direct_verification',
							data: { clientId : $.trim(clientId), requestStatus : $.trim(requestStatus) },
							dataType: 'json',
							beforeSend: function() {
								$.blockUI({ message : '' });
							},
							success: function(response) {
								if ( response.status = 200 ) {
									$('.admin-verify-'+clientId).html(response.changeButton);
								}
							},
							complete: function() {
								$.unblockUI();
							}
						});
					}
				},
				cancel: function () {}
			},
			theme: 'material',
			animation: 'bottom',
			columnClass: 'medium',
			onContentReady: function () {
				var jc = this;
				this.$content.find('form').on('submit', function (e) {
					e.preventDefault();
					jc.$$formSubmit.trigger('click');
				});
			}
		});
	}
}