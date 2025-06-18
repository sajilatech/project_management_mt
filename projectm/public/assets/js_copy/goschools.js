var $today = new Date(), $form;
$(document).ready(function() {
	if ( $('table.datatable').length ) {
		$('table.datatable').dataTable();
	}

	if ( $('select.selectpicker').length ) {
		$('select.selectpicker').selectpicker({
			liveSearch: true
		});
	}
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

function gotoschool(thiss, $target = '') {
	$this = $(thiss);
	$html = $(thiss).html();
	$fa = $(thiss).find('i');
	$class = $(thiss).find('i').attr('class');
	if ( $.trim($target) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'goschools/gotoschool',
			data: { target : $.trim($target) },
			dataType: 'json',
			beforeSend: function() {
				$fa.removeClass($class).addClass('fa fa-spinner fa-spin ml-2');
			},
			success: function(response) {
				if ( response.alerts ) {
					$.toast({
						hideAfter: 3000,
						heading: (response.status == 200) ? 'Success' : 'Error',
						text: response.alerts,
						showHideTransition: 'slide',
						position: 'bottom-center',
						icon: (response.status == 200) ? 'success' : 'error',
						stack: 1,
						beforeHide: function () {
							if ( response.newtab ) {
								window.open(response.newtab);
							} else if ( response.redirect ) {
								location.href = response.redirect;
							} else if ( response.replace ) {
								location.replace(response.replace);
							}
						},
					});
				} else if ( response.newtab ) {
					window.open(response.newtab);
				} else if ( response.redirect ) {
					location.href = response.redirect;
				} else if ( response.replace ) {
					location.replace(response.replace);
				}
			},
			complete: function() {
				$fa.removeClass('fa fa-spinner fa-spin ml-2').addClass($class);
			}
		});
	}
}

function status_school(thiss, $target = '') {
	$this = $(thiss);
	$html = $(thiss).html();
	if ( $.trim($target) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'goschools/status',
			data: { target : $.trim($target) },
			dataType: 'json',
			beforeSend: function() {
				$this.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
			},
			success: function(response) {
				if ( response.alerts ) {
					$.toast({
						hideAfter: 3000,
						heading: (response.status == 200) ? 'Success' : 'Error',
						text: response.alerts,
						showHideTransition: 'slide',
						position: 'bottom-center',
						icon: (response.status == 200) ? 'success' : 'error',
						stack: 1,
						beforeHide: function () {
							if ( response.redirect ) {
								location.href = response.redirect;
							} else if ( response.replace ) {
								location.replace(response.replace);
							}
						},
					});
				} else if ( response.redirect ) {
					location.href = response.redirect;
				} else if ( response.replace ) {
					location.replace(response.replace);
				} else if ( response.status == 300 ) {
					$html = response.text;
					$this.removeClass('btn-success btn-danger').addClass(response.class);
				}
			},
			complete: function() {
				$this.html($html);
			}
		});
	}
}

function status_category(thiss, $target = '') {
	$this = $(thiss);
	$html = $(thiss).html();
	if ( $.trim($target) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'goschools/category_status',
			data: { target : $.trim($target) },
			dataType: 'json',
			beforeSend: function() {
				$this.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
			},
			success: function(response) {
				if ( response.alerts ) {
					$.toast({
						hideAfter: 3000,
						heading: (response.status == 200) ? 'Success' : 'Error',
						text: response.alerts,
						showHideTransition: 'slide',
						position: 'bottom-center',
						icon: (response.status == 200) ? 'success' : 'error',
						stack: 1,
						beforeHide: function () {
							if ( response.redirect ) {
								location.href = response.redirect;
							} else if ( response.replace ) {
								location.replace(response.replace);
							}
						},
					});
				} else if ( response.redirect ) {
					location.href = response.redirect;
				} else if ( response.replace ) {
					location.replace(response.replace);
				} else if ( response.text ) {
					$html = response.text;
					$this.removeClass('btn-success btn-danger').addClass(response.class);
				}
			},
			complete: function() {
				$this.html($html);
			}
		});
	}
}

function delete_category(thiss, $target = '') {
	$this = $(thiss);
	$html = $(thiss).html();
	if ( $.trim($target) ) {
		$.confirm({
			title: 'Are you sure ?',
			titleClass: 'title-cfrm',
			content: "You won't be able to revert this.",
			buttons: {
				formSubmit: {
					text: 'Delete',
					btnClass: 'btn-red',
					action: function () {
						$.ajax({
							type: 'POST',
							url: SITEURL + 'goschools/category_delete',
							data: { target : $.trim($target) },
							dataType: 'json',
							beforeSend: function() {
								$this.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
							},
							success: function(response) {
								if ( response.alerts ) {
									$.toast({
										hideAfter: 3000,
										heading: (response.status == 200) ? 'Success' : 'Error',
										text: response.alerts,
										showHideTransition: 'slide',
										position: 'bottom-center',
										icon: (response.status == 200) ? 'success' : 'error',
										stack: 1,
										beforeHide: function () {
											if ( response.redirect ) {
												location.href = response.redirect;
											} else if ( response.replace ) {
												location.replace(response.replace);
											}
										},
									});
								} else if ( response.redirect ) {
									location.href = response.redirect;
								} else if ( response.replace ) {
									location.replace(response.replace);
								} else if ( response.text ) {
									$html = response.text;
									alert($html);
									$this.removeClass('btn-success btn-danger').addClass(response.class);
								}
							},
							complete: function() {
								$this.html($html);
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

function status_stream(thiss, $target = '') {
	$this = $(thiss);
	$html = $(thiss).html();
	if ( $.trim($target) ) {
		$.ajax({
			type: 'POST',
			url: SITEURL + 'goschools/stream_status',
			data: { target : $.trim($target) },
			dataType: 'json',
			beforeSend: function() {
				$this.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
			},
			success: function(response) {
				if ( response.alerts ) {
					$.toast({
						hideAfter: 3000,
						heading: (response.status == 200) ? 'Success' : 'Error',
						text: response.alerts,
						showHideTransition: 'slide',
						position: 'bottom-center',
						icon: (response.status == 200) ? 'success' : 'error',
						stack: 1,
						beforeHide: function () {
							if ( response.redirect ) {
								location.href = response.redirect;
							} else if ( response.replace ) {
								location.replace(response.replace);
							}
						},
					});
				} else if ( response.redirect ) {
					location.href = response.redirect;
				} else if ( response.replace ) {
					location.replace(response.replace);
				} else if ( response.text ) {
					$html = response.text;
					$this.removeClass('btn-success btn-danger').addClass(response.class);
				}
			},
			complete: function() {
				$this.html($html);
			}
		});
	}
}

function delete_stream(thiss, $target = '') {
	$this = $(thiss);
	$html = $(thiss).html();
	if ( $.trim($target) ) {
		$.confirm({
			title: 'Are you sure ?',
			titleClass: 'title-cfrm',
			content: "You won't be able to revert this.",
			buttons: {
				formSubmit: {
					text: 'Delete',
					btnClass: 'btn-red',
					action: function () {
						$.ajax({
							type: 'POST',
							url: SITEURL + 'goschools/stream_delete',
							data: { target : $.trim($target) },
							dataType: 'json',
							beforeSend: function() {
								$this.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
							},
							success: function(response) {
								if ( response.alerts ) {
									$.toast({
										hideAfter: 3000,
										heading: (response.status == 200) ? 'Success' : 'Error',
										text: response.alerts,
										showHideTransition: 'slide',
										position: 'bottom-center',
										icon: (response.status == 200) ? 'success' : 'error',
										stack: 1,
										beforeHide: function () {
											if ( response.redirect ) {
												location.href = response.redirect;
											} else if ( response.replace ) {
												location.replace(response.replace);
											}
										},
									});
								} else if ( response.redirect ) {
									location.href = response.redirect;
								} else if ( response.replace ) {
									location.replace(response.replace);
								} else if ( response.text ) {
									$html = response.text;
									alert($html);
									$this.removeClass('btn-success btn-danger').addClass(response.class);
								}
							},
							complete: function() {
								$this.html($html);
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

function school_requests(thiss, $target = '') {
	$this = $(thiss);
	$html = $(thiss).html();
	if ( $.trim($target) ) {
		$.confirm({
			title: $this.data('value') ? 'Are you sure you want to accept the request?' : 'Are you sure you want to decline the request?',
			titleClass: 'title-cfrm',
			content: '<form>' + '<div class="form-group">' + '<textarea type="text" class="form-control" placeholder="Type something you want to share here..." rows="5"></textarea>' + '</div>' + '</form>',
			buttons: {
				formSubmit: {
					text: 'Yes, proceed!',
					btnClass: 'btn-success',
					action: function () {
						$.ajax({
							type: 'POST',
							url: SITEURL + 'goschools/requests',
							data: { target : $.trim($target), value : $this.data('value'), note : this.$content.find('textarea').val() },
							dataType: 'json',
							beforeSend: function() {
								$this.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
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
												$this.closest('td').html(response.html);
											}
										},
										beforeHide: function () {
											if ( response.redirect ) {
												location.href = response.redirect;
											} else if ( response.replace ) {
												location.replace(response.replace);
											}
										}
									});
								} else if ( response.redirect ) {
									location.href = response.redirect;
								} else if ( response.replace ) {
									location.replace(response.replace);
								}
							},
							complete: function() {
								$this.html($html);
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