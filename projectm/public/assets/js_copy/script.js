$(function () {
	$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
		checkboxClass: 'icheckbox_minimal-blue',
		radioClass: 'iradio_minimal-blue'
	});
});

$('body').on('click', 'button.hover-addmore', function () {
	if ($(this).val() > 0) {
		var item = $(this).val();
		//alert(item); die;
		var html = '<div id="hover-tab-' + item + '">' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Title<sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<input type="text" name="htitle[]" class="form-control" placeholder="Enter Title"  data-validation="required" />' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Tag Line <sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<input type="text" name="hTag[]" class="form-control" placeholder="Enter Title" data-validation="required" />' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Description <sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<textarea name="hDesc[]" class="textarea' + item + '" data-validation="required" placeholder="Place some text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">hover Image</label>' +
			'<div class="col-md-8">' +
			'<input type="file" name="userfile3[]" data-validation-allowing="jpg, jpeg, png, gif">' +
			'</div>' +
			'</div>' +
			'<div class="clearfix"></div>';
		$('div.hover-append').append(html);
		$(".textarea" + item).wysihtml5();
		$(this).val(parseInt(item) + 1);
		$('button.hover-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.hover-dropone', function () {
	if ($(this).val() > 0) {
		var item = parseInt($(this).val()) - 1;
		$('div#hover-tab-' + item).remove();
		if (item > 0) {
			$(this).val(item);
			$('button.hover-addmore').val(item);
		}
	}
});

$('body').on('click', 'button.add-addmore', function () {
	if ($(this).val() > 0) {
		var item = $(this).val();
		//alert(item); die;
		var html = '<div id="add-tab-' + item + '">' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Title<sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<input type="text" name="atitle[]" class="form-control" placeholder="Enter Title"  data-validation="required" />' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Tag Line <sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<input type="text" name="aTag[]" class="form-control" placeholder="Enter Title" data-validation="required" />' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Description <sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<textarea name="aDesc[]" class="textarea' + item + '" data-validation="required" placeholder="Place some text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Image</label>' +
			'<div class="col-md-8">' +
			'<input type="file" name="userfile4[]" data-validation-allowing="jpg, jpeg, png, gif">' +
			'</div>' +
			'</div>' +
			'<div class="clearfix"></div>';
		$('div.add-append').append(html);
		$(".textarea" + item).wysihtml5();
		$(this).val(parseInt(item) + 1);
		$('button.add-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.add-dropone', function () {
	if ($(this).val() > 0) {
		var item = parseInt($(this).val()) - 1;
		$('div#add-tab-' + item).remove();
		if (item > 0) {
			$(this).val(item);
			$('button.add-addmore').val(item);
		}
	}
});

$('body').on('click', 'button.slider-addmore', function () {
	if ($(this).val() > 0) {
		var item = $(this).val();
		//alert(item); die;
		var html = '<div id="slider-tab-' + item + '">' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Title<sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<input type="text" name="stitle[]" class="form-control" placeholder="Enter Title"  data-validation="required" />' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Tag Line <sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<input type="text" name="sTag[]" class="form-control" placeholder="Enter Title" data-validation="required" />' +
			'</div>' +
			'</div>' +
			'<div class="col-md-12 form-group">' +
			'<label class="col-md-2 control-label">Description <sup>*</sup></label>' +
			'<div class="col-md-10">' +
			'<textarea name="sDesc[]" class="textarea' + item + '" data-validation="required" placeholder="Place some text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Image</label>' +
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
		$(".textarea" + item).wysihtml5();
		$(this).val(parseInt(item) + 1);
		$('button.slider-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.slider-dropone', function () {
	if ($(this).val() > 0) {
		var item = parseInt($(this).val()) - 1;
		$('div#slider-tab-' + item).remove();
		if (item > 0) {
			$(this).val(item);
			$('button.slider-addmore').val(item);
		}
	}
});

$('body').on('click', 'button.adv-addmore', function () {
	if ($(this).val() > 0) {
		var item = $(this).val();
		//alert(item); die;
		var html = '<div id="adv-tab-' + item + '">' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Title<sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<input type="text" name="title[]" class="form-control" placeholder="Enter Title"  data-validation="required" />' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Tag Line <sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<input type="text" name="Tag[]" class="form-control" placeholder="Enter Title" data-validation="required" />' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Image</label>' +
			'<div class="col-md-8">' +
			'<input type="file" name="userfile3[]" data-validation-allowing="jpg, jpeg, png, gif">' +
			'</div>' +
			'</div>' +
			'<div class="clearfix"></div>';
		$('div.adv-append').append(html);
		$(this).val(parseInt(item) + 1);
		$('button.adv-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.adv-dropone', function () {
	if ($(this).val() > 0) {
		var item = parseInt($(this).val()) - 1;
		$('div#adv-tab-' + item).remove();
		if (item > 0) {
			$(this).val(item);
			$('button.adv-addmore').val(item);
		}
	}
});

$('body').on('click', 'button.feed-addmore', function () {
	if ($(this).val() > 0) {
		var item = $(this).val();
		//alert(item); die;
		var html = '<div id="feed-tab-' + item + '">' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Title<sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<input type="text" name="user[]" class="form-control" placeholder="Enter Title"  data-validation="required" />' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Feedback <sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<textarea name="feed[]" data-validation="required" placeholder="Place some text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +
			'</div>' +
			'</div>' +
			'<div class="clearfix"></div>';
		$('div.feed-append').append(html);
		$(this).val(parseInt(item) + 1);
		$('button.feed-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.feed-dropone', function () {
	if ($(this).val() > 0) {
		var item = parseInt($(this).val()) - 1;
		$('div#feed-tab-' + item).remove();
		if (item > 0) {
			$(this).val(item);
			$('button.feed-addmore').val(item);
		}
	}
});

$('body').on('click', 'button.pop-addmore', function () {
	if ($(this).val() > 0) {
		var item = $(this).val();
		//alert(item); die;
		var html = '<div id="pop-tab-' + item + '">' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Feedback <sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<textarea name="desc[]" data-validation="required" placeholder="Place some text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Image</label>' +
			'<div class="col-md-8">' +
			'<input type="file" name="userfile12[]" data-validation-allowing="jpg, jpeg, png, gif">' +
			'</div>' +
			'</div>' +
			'<div class="clearfix"></div>';
		$('div.pop-append').append(html);

		$(this).val(parseInt(item) + 1);
		$('button.pop-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.pop-dropone', function () {
	if ($(this).val() > 0) {
		var item = parseInt($(this).val()) - 1;
		$('div#pop-tab-' + item).remove();
		if (item > 0) {
			$(this).val(item);
			$('button.pop-addmore').val(item);
		}
	}
});

$('body').on('click', 'button.tour-addmore', function () {
	if ($(this).val() > 0) {
		var item = $(this).val();
		//alert(item); die;
		var html = '<div id="tour-tab-' + item + '">' +
			'<div class="col-md-12 form-group">' +
			'<label class="col-md-2 control-label">Description<sup>*</sup></label>' +
			'<div class="col-md-10">' +
			'<textarea name="inDesc[]"  class="textarea' + item + '" data-validation="required" placeholder="Place some text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Image</label>' +
			'<div class="col-md-8">' +
			'<input type="file" name="userfile3[]" data-validation-allowing="jpg, jpeg, png, gif">' +
			'</div>' +
			'</div>' +
			'<div class="clearfix"></div>';
		$('div.tour-append').append(html);
		$(".textarea" + item).wysihtml5();
		$(this).val(parseInt(item) + 1);
		$('button.tour-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.tour-dropone', function () {
	if ($(this).val() > 0) {
		var item = parseInt($(this).val()) - 1;
		$('div#tour-tab-' + item).remove();
		if (item > 0) {
			$(this).val(item);
			$('button.tour-addmore').val(item);
		}
	}
});

$('body').on('click', 'button.service-addmore', function () {
	if ($(this).val() > 0) {
		var item = $(this).val();
		//alert(item); die;
		var html = '<div id="service-tab-' + item + '">' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Title<sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<input type="text" name="stitle[]" class="form-control" placeholder="Enter Title"  data-validation="required" />' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Description<sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<textarea name="sDesc[]"  class="textarea' + item + '" data-validation="required" placeholder="Place some text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +
			'</div>' +
			'</div>' +
			'<div class="col-md-6 form-group">' +
			'<label class="col-md-4 control-label">Image[64 X 64]</label>' +
			'<div class="col-md-8">' +
			'<input type="file" name="userfile3[]" data-validation-allowing="jpg, jpeg, png, gif">' +
			'</div>' +
			'</div>' +
			'<div class="clearfix"></div>';
		$('div.service-append').append(html);
		$(".textarea" + item).wysihtml5();
		$(this).val(parseInt(item) + 1);
		$('button.service-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.service-dropone', function () {
	if ($(this).val() > 0) {
		var item = parseInt($(this).val()) - 1;
		$('div#service-tab-' + item).remove();
		if (item > 0) {
			$(this).val(item);
			$('button.service-addmore').val(item);
		}
	}
});

$('body').on('click', 'button.faq-addmore', function () {
	if ($(this).val() > 0) {
		var item = $(this).val();
		//alert(item); die;
		var html = '<div id="faq-tab-' + item + '">' +
			'<label class="col-md-4 control-label">What is Included<sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<textarea name="question[]"   data-validation="required" placeholder="Enter text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +
			'</div>' +
			'</div>' +
			'<div class="clearfix"></div>';
		$('div.faq-append').append(html);
		$(this).val(parseInt(item) + 1);
		$('button.faq-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.faq-dropone', function () {
	if ($(this).val() > 0) {
		var item = parseInt($(this).val()) - 1;
		$('div#faq-tab-' + item).remove();
		if (item > 0) {
			$(this).val(item);
			$('button.faq-addmore').val(item);
		}
	}
});

$('body').on('click', 'button.ninclude-addmore', function () {
	if ($(this).val() > 0) {
		var item = $(this).val();
		//alert(item); die;
		var html = '<div id="ninclude-tab-' + item + '">' +
			'<label class="col-md-4 control-label">What is not Included<sup>*</sup></label>' +
			'<div class="col-md-8">' +
			'<textarea name="ninclude[]"   data-validation="required" placeholder="Enter text here" style="width: 100%; height: 100px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>' +
			'</div>' +
			'</div>' +
			'<div class="clearfix"></div>';
		$('div.ninclude-append').append(html);
		$(this).val(parseInt(item) + 1);
		$('button.ninclude-dropone').val(parseInt(item) + 1);
	}
});

$('body').on('click', 'button.ninclude-dropone', function () {
	if ($(this).val() > 0) {
		var item = parseInt($(this).val()) - 1;
		$('div#ninclude-tab-' + item).remove();
		if (item > 0) {
			$(this).val(item);
			$('button.ninclude-addmore').val(item);
		}
	}
});

$('body').on('change', 'input[name="fDisplay[]"]', function () {
	$values = $('input[name="fDisplay[]"]:checked').map(function() { return $.trim(this.value); }).get();
	if ( $.inArray("gobusiness", $values) !== -1 ) {
		$('div#feed-category').removeClass('hide');
		$('div#feed-category').find('input[type=checkbox]').attr('data-validation', 'required');
	} else {
		$('div#feed-category').removeClass('hide').addClass('hide');
		$('div#feed-category').find('input[type=checkbox]').attr('checked', false);
		$('div#feed-category').find('input[type=checkbox]').removeAttr('data-validation');
	}
});