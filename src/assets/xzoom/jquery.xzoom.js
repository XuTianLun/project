;(function($){
	$.fn.xzoom = function(options){
		//插件默认参数
		var defaults = {
			width:300,
			height:300,
			gap:30,
			backgroundcolor:"#c1c1c1",
			opacity:0.3,
			position:'right'
		};
		
		//扩展默认值
		var opt = $.extend({},defaults,options);
		
		//防止多个jQuery对象
		this.each(function(){
			var $self = $(this);
			
			//全局变量
			var $big,//大图外框
			    $bigImg,//大图
			    $min,//小图
			    ratio;//大图与小图的比例
			
			var $smallImg = $('img',$self);
			
			var bigUrl = $smallImg.attr('data-big') || $smallImg.attr('src');
			
			//执行初始化操作
			$smallImg.load(function(){
				init();
				
			})
			
			//鼠标移入事件
			$self.on('mouseenter',function(){
				//把放大镜写入$self
				$min.css({
					width:opt.width/ratio,
					height:opt.height/ratio,
					background:opt.backgroundcolor,
					opacity:opt.opacity,
				}).appendTo($self);
				
				//把大盒子默认在小图的起始位置
				$big.css({left:$min.position().left+$smallImg.offset().left+$min.outerWidth()/1.5,
					top:$min.position().top+$smallImg.offset().top+$min.outerHeight()/2,
					width:0,
					height:0});
				//把大图div添加到页面
				$big.appendTo('body');
                var pos = {
                	left:$smallImg.offset().left+$smallImg.outerWidth() + opt.gap,
                    top:$smallImg.offset().top,
                    width:opt.width,
                    height:opt.height
                }
                if(opt.position == 'bottom'){
                	pos.left=$smallImg.offset().left;
                    pos.top=$smallImg.offset().top+$smallImg.outerHeight() + opt.gap;
                }else if(opt.position == 'left'){
                	pos.left = $smallImg.offset().left - $big.outerWidth() - opt.gap;
                }else if(opt.position == 'top'){
                	pos.top = $smallImg.offset().top - $big.outerHeight() - opt.gap;
                }
                $big.stop().animate(pos);
                
			}).on('mouseleave',function(){
				
				$big.stop().animate({left:$min.position().left+$smallImg.offset().left+$min.outerWidth()/2,
					top:$min.position().top+$smallImg.offset().top+$min.outerHeight()/2,
					width:0,
					height:0},function(){
						$big.remove();
					});
				
				$min.remove();
			}).on('mousemove',function(e){
				//设置$min的位置
				//pageX = clientX + scrollLeft
				//pageY = clientY + scrollTop
				var top = e.pageY - $smallImg.offset().top - $min.outerHeight()/2;
				var left = e.pageX - $smallImg.offset().left - $min.outerWidth()/2;
				
				if(top<0){
					top = 0;
				}else if(top > $smallImg.outerHeight() - $min.outerHeight()){
					top = $smallImg.outerHeight() - $min.outerHeight();
				}
				if(left<0){
					left = 0;
				}else if(left > $smallImg.outerWidth() - $min.outerWidth()){
					left = $smallImg.outerWidth() - $min.outerWidth();
				}
				
				$min.css({
					left:left,
					top:top
				});
				//移动大图
				
				$bigImg.css({
					top:-top*ratio,
					left:-left*ratio
				});
			})
			
			//初始化
			function init(){
				//添加全局类名xzoom
				
				$self.addClass('xzoom').width($smallImg.outerWidth());
			
				//创建大盒子
				$big = $('<div/>').addClass('xzoom-big').css({width:opt.width,height:opt.height});
				//创建大图
				$bigImg = $('<img/>').attr({src:bigUrl});
				
				//把大图写入页面
				$big.append($bigImg).appendTo('body');
				$bigImg.load(function(){
					ratio = $bigImg.outerWidth()/$smallImg.outerWidth();
					$big.remove();//大图加载完成后移除大盒子
				});
				//创建放大镜
                $min = $('<span/>').addClass('xzoom-min');
  
				//把大盒子默认显示在小图的起始位置
				$big.css({left:$min.position().left,top:$min.position().top});
				

			}
		})
			//返回this，以便链式调用
		return this;
	}
})(jQuery);
