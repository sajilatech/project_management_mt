var UiHelper = function(element, options) {
    this.resultArray = [];
};

UiHelper.prototype = ({
    _getRating : function(ratingNo) {

        var rating = Math.floor(ratingNo);
        switch (rating) {
            case 1:
                return '<i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
                break;
            case 2:
                return '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
                break;
            case 3:
                return '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
                break;
            case 4:
                return '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
                break;
            case 5:
                return '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i>';
                break;
            case 6:
			default:
                return '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
                break;
        }
    },
    _getAmenitiesList1 : function (total, partLength, array) {
        var resultArray = [];
        for (var i = 0; i <= partLength; i++) {
            resultArray.push("<li>"+array[i].AmenityName+"</li>");
        }
        return resultArray;
    },
    _getAmenitiesList2 : function (total, partLength, array) {
        var resultArray = [];
        for (var i = partLength; i < total; i++) {
            resultArray.push("<li>"+array[i].AmenityName+"</li>");
        }
        return resultArray;
    },
    _getCarouselOl : function (count,array) {
        var resultArray = [];
        for (var i = 0; i < count; i++) {
            if (i == 0) {
                resultArray.push('<li data-target="#carousel-example-generic" data-slide-to="' + i + '" class="active"></li>');
            } else {
                resultArray.push('<li data-target="#carousel-example-generic" data-slide-to="' + i + '" class=""></li>');
            }
        }
        return resultArray;
    },
    _getCarouselInner: function (count,array) {
        var resultArray = [];
        for (var i = 0; i < count; i++) {
			if (i == 0) {
				resultArray.push('<div class="item active srle"><img src="'+array[i].BigUrl+'" alt="" data-slide-to="' + i + '" class="img-responsive"></div>');
			} else {
				resultArray.push('<div class="item srle"><img src="'+array[i].BigUrl+'" alt="" data-slide-to="' + i + '" class="img-responsive"></div>');
			}
        }
        return resultArray;
    },
    _getCarouselThub : function (count,array) {
        var resultArray = [];
        for (var i = 0; i < count; i++) {
			resultArray.push( '<li data-target="#carousel-example-generic" data-slide-to="' + i + '"><img src="'+array[i].ThumbnailUrl+'" alt=""></li>');
		}
        return resultArray;
    },
    _getRoomRate : function (name, array) {
        var count = Object.keys(array).length;
        var resultArray = [];
        for (var i = 0; i < count; i++) {

            resultArray.push('<ul><li><input type="radio" name="">'+array[i].RoomRates[0].RoomCategory+'</li><li> <span class="havailable">[Available]</span><br> <a href="">Cancellation Policy </a></li><li>'+name+'<span>à¤° '+array[i].RoomRates[0].RoomRate+'/night</span> <a href="">Fare Breakup</a> </li><li><a class="btn book-btn" href="">Book</a></li></ul>');
        }
        return resultArray;
    },
    _getAdditionalRooms : function (rooms) {
        //var rooms = parseInt(this.value);
        var html = '';
        if ((rooms > 5) || (rooms < 1)) {
            rooms = 1;
        }
        if (rooms > 1) {
            for (var i = 1; i < rooms; i++) {
                html += '<div class="col-md-4"><div class="form-group room-label"><label>Room '+(i+1)+'</label></div></div><div class="col-md-4"><div class="form-group"><label>Adults</label><select class="form-control" name="hotel_adults_room_'+(i+1)+'" id="hotel_adults_room_'+(i+1)+'"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div></div><div class="col-md-4"><div class="form-group"><label>Children</label><select class="form-control hotel_children" name="hotel_children_room_'+(i+1)+'" id="hotel_children_room_'+(i+1)+'"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div></div>';
            }
        }
        return html;
    },
    _getChildrenAge : function (thi) {
        var roomName  = $(thi).attr("name");
        var arr = roomName.split('_');
        var roomId = arr[3];
        console.log(roomId);
        var count = thi.value;
        var htm = '';
        for (var i = 1 ; i <= count; i++) {
            htm += '<div class="col-md-2 temp_age"><div class="form-group"><label>Age of children '+i+'</label><select name="hotel_children_age_'+roomId+'[]" id="hotel_children_age_'+roomId+'_'+(i)+'" class="form-control"><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option></select></div></div>';
        }

        return htm;
    }
});