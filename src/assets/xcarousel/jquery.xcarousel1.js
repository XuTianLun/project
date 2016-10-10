;(function($){
	$.fn.xcarousel = function(options){
		//插件默认参数
		var defaults = {
		    width:500,
			height:300,
			page:true,//是否显示页码
			autoPlay:true,//是否自动轮播
			type:'x',//动画类型：水平滚动x, 垂直滚动y, 渐现效果fade
			buttons:true,//是否显示前后按钮
			speed:3000,//轮播图速度	
		};
		
		//扩展默认值
		var opt = $.extend({}, defaults, options);
		
		//考虑this多个的情况
		//这里的this表示实例
		this.each(function(){
			//这里的this表示每一个dom节点
			var $self = $(this);
			//轮播图外框
			var $ul = $('ul',$self);//等价于this.find('li');
			$ul.find('img').css({width:opt.width,height:opt.height});
			var firstImg = $ul.find('img').eq(0);
			var imgHeight,imgWidth;
			
			//初始化
			var _html = $ul.html();
			$ul.html(_html+_html);
			var index = 0;
			var len = $ul.children().length;
			
			var $page;
			init();
			
			// 定时器：每个3s切换一张图片
			if(opt.autoPlay){
				var timer;

				// 鼠标移入移出
				$self.on('mouseenter',function(){
					clearInterval(timer);
				}).on('mouseleave',function(){
					timer = setInterval(function(){
						index++;
						showPic();
					},opt.speed);
				}).trigger('mouseleave');

				// 模拟事件（手动触发一个事件）
				}
			//初始化
			function init(){
				// 生成页码
				if(opt.page){
					$page = $('<div/>').addClass('page');
					for(var i=1;i<=len/2;i++){
						var $span = $('<span/>');
						if(i==1){
							$span.addClass('active');
						}
						$span.appendTo($page);
					}
					$page.appendTo($self);
					// 点击页码切换	
					$page.on('click','span',function(){
						index = $(this).index();
						showPic();
					});
				}
				// 设置样式
				$self.addClass('xcarousel').css({
					height:opt.height,
					width:opt.width
				});
				$ul.css({height:opt.height});
				
				// 水平移动，需要设置ul的宽度
				if(opt.type === 'x'){
					$ul.addClass('type-x').css({width:opt.width*len});
				}else if(opt.type === 'fade'){
					$ul.addClass('type-fade').children().css({opacity:0}).eq(index).css({opacity:1});
				}
				
				// 左右按钮
				if(opt.buttons){
					$('<div/>').html('&gt;').addClass('next').appendTo($self);
					$('<div/>').html('&lt;').addClass('previous').appendTo($self);
					$self.on('click','.next',function(){
						index++;
						showPic();
					}).on('click','.previous',function(){
						index--;
						showPic();
					});
				}
				
			}
			// 图片展示效果
			function showPic(){
				
				if(index>=len/2+1){
                 
					index = 1;
					if(opt.type === 'x'){				
					$ul.css({left:0});
					}else if(opt.type === 'y'){
						$ul.css({top:0});
					}else if(opt.type === 'fade'){
		       $ul.children().eq(0).css({opacity:1}).siblings('li').css({opacity:0});				
					}
				}else if(index<0){
					index = len/2 - 1;
				}

				// console.log(imgHeight,index)
				if(opt.type === 'x'){
					$ul.animate({left:-opt.width*index});
				}else if(opt.type === 'y'){
					$ul.animate({top:-opt.height*index});
				}else if(opt.type === 'fade'){
					$ul.children().eq(index).animate({opacity:1}).siblings('li').animate({opacity:0});
				}
				// 页码高亮效果
				if(opt.page) {
					$page.children().removeClass().eq(index).addClass('active');
					
					if(index == len/2){
					$page.children().removeClass().eq(0).addClass('active');	
					}
				  }		
				}
			
			
			
		})
		
		//返回this，以便使用链式调用
		return this;
	}
})(jQuery);
