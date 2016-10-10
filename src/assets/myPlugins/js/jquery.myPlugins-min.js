;(function($) {$.fn.extend({myCarouselImg: function(options) {var defaults = {_width: 810,_height: 320,isShowPage: true,autoPlay: false,playType: 'left',
isShowBtn: true,playSpeed: 3000,isStopPlay: true};var opt = $.extend({}, defaults, options);this.each(function(){var $self = $(this);
var $ul = $("ul", $self);$ul.append($ul.html());var _index = 0;var len = $ul.children().length;var $page;init();if(opt.autoPlay) {
var timer;if(opt.isStopPlay) {$self.on('mouseenter', function() {clearInterval(timer);}).on('mouseleave', function() {timer = setInterval(function() {
_index++;startSwitch();}, opt.playSpeed);}).trigger('mouseleave');} else if(!opt.isStopPlay) {timer = setInterval(function() {
_index++;startSwitch();}, opt.playSpeed);}}function init(){$self.addClass('myCarouselImg').css({height: opt._height,width: opt._width
});$ul.css({height: opt._height,width: opt._width});$ul.find("li").css({height: opt._height,width: opt._width});$ul.find("img").css({
height: opt._height,width: opt._width});if(opt.playType == "left") {$ul.addClass("type-left").css({width: opt._width * len});
} else if(opt.playType == "top") {$ul.css({height: opt._height * len});} else if(opt.playType == "fade") {$ul.addClass("type-fade").children().css({
opacity: 0}).eq(_index).css({opacity: 1});}if(opt.isShowPage) {$page = $('<div/>').addClass('page');for(var i = 1; i <= len / 2; i++) {
var $span = $('<span/>');if(i == 1) {$span.addClass('active');}$span.appendTo($page);}$page.appendTo($self);$page.css("margin-left", -$page.outerWidth() / 2); //页码居中设置
if(opt.clickOrover == "click") {$page.on('click', 'span', function(){_index = $(this).index();startSwitch();});} else if(opt.clickOrover = "over") {
$page.on('mouseenter', 'span', function() {_index = $(this).index();startSwitch()});}}if(opt.isShowBtn) {$('<div/>').html('&gt;').addClass('next').appendTo($self);
$('<div/>').html('&lt;').addClass('prev').appendTo($self);$self.on('click', '.next', function() {_index++;startSwitch();}).on('click', '.prev', function() {
_index--;startSwitch();});}}function startSwitch(){if(_index > len / 2){_index = 1;$ul.css({left: 0,top: 0});} else if(_index < 0) {_index = len / 2 - 1;
if(opt.playType == 'left') {$ul.css({left: -len / 2 * opt._width});} else if(opt.playType == 'top') {$ul.css({top: -len / 2 * opt._height
});}}if(opt.playType === 'left') {$ul.stop().animate({left: -opt._width * _index});} else if(opt.playType === 'top') {$ul.stop().animate({
top: -opt._height * _index});} else if(opt.playType === 'fade') {$ul.children().eq(_index).stop().animate({opacity: 1}).siblings('li').stop().animate({
opacity: 0});}if(opt.isShowPage) {$page.children().removeClass().eq(_index).addClass('active');}if(_index == len / 2) {$page.children().removeClass().eq(0).addClass('active');
}}});return this;},

myZoomImg: function(options){var defaults={_width: 300,	_height: 300,gap: 30,_position: "right",bgColor: "yellow"};var opt = $.extend({}, defaults, options);
this.each(function() {var $self = $(this);var $bigDiv,$bigImg,$minZoom,ratio;var $smallImg = $("img", $self);$smallImg.css({
width: opt._width});var bigUrl = $smallImg.attr('data-big') || $smallImg.attr('src');$smallImg.load(function() {init();});$self.on("mouseenter", function() {
$bigDiv.appendTo('body');$minZoom.css({width: opt._width / ratio,height: opt._height / ratio,background: opt.bgColor});	$minZoom.appendTo($self);
}).on("mouseleave", function() {$bigDiv.remove();$minZoom.remove();}).on("mousemove", function(e) {var top = e.pageY - $smallImg.offset().top - $minZoom.outerHeight() / 2;
var left = e.pageX - $smallImg.offset().left - $minZoom.outerWidth() / 2;if(left < 0) {	left = 0;	} else if(left > $smallImg.outerWidth() - $minZoom.outerWidth()) {
left = $smallImg.outerWidth() - $minZoom.outerWidth();	}if(top < 0) {top = 0;} else if(top > $smallImg.outerHeight() - $minZoom.outerHeight()) {
top = $smallImg.outerHeight() - $minZoom.outerHeight();	}	$minZoom.css({top: top,	left: left	});	$bigImg.css({top: -top * ratio,
left: -left * ratio});});function init() {$self.addClass("myZoomImg").css({	width: opt._width,	height: $smallImg.outerHeight()
});$bigDiv = $('<div/>').addClass('myZoomImg-big');$bigDiv.css({width: opt._width,	height: opt._height});$bigImg = $('<img/>').attr({
src: bigUrl});$bigDiv.append($bigImg).appendTo('body');$bigImg.load(function() {ratio = $bigImg.outerWidth() / $smallImg.outerWidth();
$bigDiv.remove();});var pos = {	left: $smallImg.offset().left + $smallImg.outerWidth() + opt.gap,	top: $smallImg.offset().top}
if(opt._position == 'bottom'){pos.left = $smallImg.offset().left;	pos.top = $smallImg.offset().top + $smallImg.outerHeight() + opt.gap;} else if(opt._position == 'left') {pos.left = $smallImg.offset().left - $big.outerWidth() - opt.gap;}$bigDiv.css(pos);$minZoom = $('<span/>').addClass('myZoomImg-min');}});return this;}});
})(jQuery);