$('body').on('click', 'button.slider-addmore', function() {
	if ( $(this).val() > 0 ) {
		
		
		var item = $(this).val();
		//alert(item); die;
			var html = '<div id="slider-tab-'+item+'">' +
			              '<div class="col-md-6 form-group">' +
			            '<label class="col-md-4 control-label">Title<sup>*</sup></label>' +						
						'<div class="col-md-8">' +
						'<input type="text" name="stitle[]" class="form-control" placeholder="Enter Title"  data-validation="required" />' +						
						             '</div>' +
						               '</div>' +
																			
										'<div class="col-md-12 form-group">' +
											'<label class="col-md-2 control-label">Description <sup>*</sup></label>' +
											'<div class="col-md-10">' +
												'<textarea name="sDesc[]" class="textarea'+item+'" data-validation="required" placeholder="Place some text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +												
											'</div>' +
										'</div>' +
										'<div class="col-md-6 form-group">' +
											'<label class="col-md-4 control-label">Slider Image[1440 X 718]</label>' +										
											'<div class="col-md-8">' +
												'<input type="file" name="userfile3[]" data-validation-allowing="jpg, jpeg, png, gif">' +
											'</div>' +
										'</div>' +
										'<div class="col-md-6 form-group">' +
											'<label class="col-md-4 control-label">activate it?</label>' +										
											'<div class="col-md-8">' +
												'<input type="checkbox" name="isactive[]" value="1">' +
											'</div>' +
										'</div>' +
										'<div class="clearfix"></div>';
		$('div.slider-append').append(html);
		$(".textarea"+item).wysihtml5();
		$(this).val(parseInt(item) + 1);
		$('button.slider-dropone').val(parseInt(item) + 1);
	}
});
$('body').on('click', 'button.slider-dropone', function() {
	if ( $(this).val() > 0 ) {
		var item = parseInt($(this).val()) - 1;
		$('div#slider-tab-'+item).remove();
		if ( item > 0 ) {
			$(this).val(item);
			$('button.slider-addmore').val(item);
		}
	}
});

$('body').on('click', 'button.add-addmore', function() {
	if ( $(this).val() > 0 ) {
		
		
		var item = $(this).val();
		//alert(item); die;
			var html = '<div id="add-tab-'+item+'">' +
			              
										'<div class="col-md-6 form-group">' +
											'<label class="col-md-4 control-label">Title <sup>*</sup></label>' +
										'<div class="col-md-8">' +
												'<input type="text" name="title[]" class="form-control" placeholder="Enter Title" data-validation="required" >' +												
											'</div>' +
											'</div>' +										
										'<div class="col-md-12 form-group">' +
											'<label class="col-md-2 control-label">Description <sup>*</sup></label>' +
											'<div class="col-md-10">' +
												'<textarea name="Desc[]" data-validation="required" placeholder="Place some text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +												
											'</div>' +
										'</div>';
		$('div.add-append').append(html);
		
		$(this).val(parseInt(item) + 1);
		$('button.add-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.add-dropone', function() {
	if ( $(this).val() > 0 ) {
		var item = parseInt($(this).val()) - 1;
		$('div#add-tab-'+item).remove();
		if ( item > 0 ) {
			$(this).val(item);
			$('button.add-addmore').val(item);
		}
	}
});

$('body').on('click', 'button.visa-addmore', function() {
	if ( $(this).val() > 0 ) {
		
		
		var item = $(this).val();
		//alert(item); die;
			var html = '<div id="visa-tab-'+item+'">' +
			              
										'<div class="col-md-6 form-group">' +
											'<label class="col-md-4 control-label">Title <sup>*</sup></label>' +
										'<div class="col-md-8">' +
												'<input type="text" name="title[]" class="form-control" placeholder="Enter Title" data-validation="required" >' +												
											'</div>' +
											'</div>' +										
										'<div class="col-md-12 form-group">' +
											'<label class="col-md-2 control-label">Description <sup>*</sup></label>' +
											'<div class="col-md-10">' +
												'<textarea name="Desc[]" data-validation="required" placeholder="Place some text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +												
											'</div>' +
										'</div>' +
										'<div class="col-md-6 form-group">' +
											'<label class="col-md-4 control-label">Image[1440 X 718]</label>' +										
											'<div class="col-md-8">' +
												'<input type="file" name="userfile3[]" data-validation-allowing="jpg, jpeg, png, gif">' +
											'</div>' +
										'</div>' ;
		$('div.visa-append').append(html);
		
		$(this).val(parseInt(item) + 1);
		$('button.visa-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.visa-dropone', function() {
	if ( $(this).val() > 0 ) {
		var item = parseInt($(this).val()) - 1;
		$('div#visa-tab-'+item).remove();
		if ( item > 0 ) {
			$(this).val(item);
			$('button.visa-addmore').val(item);
		}
	}
});

$('body').on('click', 'button.price-addmore', function() {
	if ( $(this).val() > 0 ) {
		
		
		var item = $(this).val();
		//alert(item); die;
			var html = '<div id="price-tab-'+item+'">' +			              
										'<div class="col-md-6 form-group">' +
											'<label class="col-md-4 control-label">Price <sup>*</sup></label>' +
										'<div class="col-md-8">' +
												'<input type="number" name="price[]" class="form-control" placeholder="Enter Price" data-validation="required" >' +												
											'</div>' +
											'</div>' +										
										'<div class="col-md-12 form-group">' +
											'<label class="col-md-2 control-label">Description <sup>*</sup></label>' +
											'<div class="col-md-10">' +
												'<textarea name="Desc[]" data-validation="required" placeholder="Place some text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +												
											'</div>' +
										'</div>';
		$('div.price-append').append(html);
		
		$(this).val(parseInt(item) + 1);
		$('button.price-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.price-dropone', function() {
	if ( $(this).val() > 0 ) {
		var item = parseInt($(this).val()) - 1;
		$('div#price-tab-'+item).remove();
		if ( item > 0 ) {
			$(this).val(item);
			$('button.price-addmore').val(item);
		}
	}
});