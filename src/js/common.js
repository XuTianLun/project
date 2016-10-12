$(function(){
	
			//固定菜单滚动
		        var $pos1 = $('#pos1');
				var $pos2 = $('#pos2');
				var winHeight = $(window).outerHeight();
				$pos1.css({top:winHeight/5});
				$pos2.css({top:3*winHeight/5});
			        $(window).scroll(function(){
				var scrollTop = $(document).scrollTop();
				
				if(scrollTop > $pos1.offset().top){
					$pos1.stop().animate({top:scrollTop+winHeight/5});
					$pos2.stop().animate({top:scrollTop+3*winHeight/5});
				}else{
					$pos1.stop().animate({top:scrollTop+winHeight/5});
					$pos2.stop().animate({top:scrollTop+3*winHeight/5});
				}
				$pos2.find('li').last().click(function(){
					scrollTop = 0;
					$("html body").stop().animate({scrollTop:0});
					$pos1.stop().animate({top:scrollTop+winHeight/5});
					$pos2.stop().animate({top:scrollTop+3*winHeight/5});
                 })
			        });
			
			//购物袋
			var $goodcar = $('.goodcar');
			$goodcar.on('mouseenter',function(){
				
				$(this).css({"border-bottom":"1px solid #fff"});
				$('.goodcar_list').css({"display":"block"});
				$(this).find('.float').css({"display":"block"});
			}).on('mouseleave',function(){
				$(this).css({"border-bottom":"1px solid #c1c1c1"});
				$('.goodcar_list').css({"display":"none"});
				$(this).find('.float').css({"display":"none"});
			});
			
			//商品分类二级菜单
		     		$(".nav .list").on('mouseenter','#firstli',function(){
					$(this).parent().stop().next().show();
				}).on('mouseleave','#firstli',function(){
					
					$(this).parent().stop().next().fadeOut();
				})
				$(".nav .list1").find('li').on('mousemove',function(){
					$(this).addClass("bg").siblings().removeClass("bg");
				}).on('mouseenter',function(){
					$(this).parent().stop().show();
				}).on('mouseleave',function(){
					$(this).parent().stop().fadeOut();
				});
			
		});