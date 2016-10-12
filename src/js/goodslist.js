jQuery(function($){
//	            $('#_head').load('head.html');
//				$('#_head').load('head.html .header',function(){
//					var oldusername = getCookie("username");
//			     var oldpassword = getCookie("password");
//			     console.log(oldusername);
//			    if(oldusername){
//			    	
//			    	$('#username').html('欢迎您,'+oldusername).attr({"href":"#"});
//			    	$('.last').html('退出').attr({"href":"#"});
//			    	
//			    	$('.last').click(function(){
//			     	$('#username').html('登录').attr({"href":"http://localhost:3000/project/src/html/register1.html"});
//			    	$('.last').remove();
//			    	$('<a/>').html('注册').addClass('last').attr({"href":"http://localhost:3000/project/src/html/register.html"}).insertAfter($('#username'));
////			    	removeCookie("username");
//			    	removeCookie("password");
//			    	
//			     });
//			    
//			    }
//				});
//              $("#_logo").load('head.html .logoer',function(){
//              	//购物袋
//			var $goodcar = $('.goodcar');
//			$goodcar.on('mouseenter',function(){
//				
//				$(this).css({"border-bottom":"1px solid #fff"});
//				$('.goodcar_list').css({"display":"block"});
//				$(this).find('.float').css({"display":"block"});
//			}).on('mouseleave',function(){
//				$(this).css({"border-bottom":"1px solid #c1c1c1"});
//				$('.goodcar_list').css({"display":"none"});
//				$(this).find('.float').css({"display":"none"});
//			});
//              });
//              $('#_nav').load('head.html .nav',function(){
//              	//商品分类二级菜单
//		     		$(".nav .list").on('mouseenter','#firstli',function(){
//					$(this).parent().stop().next().show();
//				}).on('mouseleave','#firstli',function(){
//					
//					$(this).parent().stop().next().fadeOut();
//				})
//				$(".nav .list1").find('li').on('mousemove',function(){
//					$(this).addClass("bg").siblings().removeClass("bg");
//				}).on('mouseenter',function(){
//					$(this).parent().stop().show();
//				}).on('mouseleave',function(){
//					$(this).parent().stop().fadeOut();
//				});
//              });
//              
//				$('#_footer').load('footer.html');
//				
//			    $('#_pos').load('pos.html',function(){
//			    	var $pos1 = $('#pos1');
//				var $pos2 = $('#pos2');
//				var winHeight = $(window).outerHeight();
//				$pos1.css({top:winHeight/5});
//				$pos2.css({top:3*winHeight/5});
//			        $(window).scroll(function(){
//				var scrollTop = $(document).scrollTop();
//				
//				if(scrollTop > $pos1.offset().top){
//					$pos1.stop().animate({top:scrollTop+winHeight/5});
//					$pos2.stop().animate({top:scrollTop+3*winHeight/5});
//				}else{
//					$pos1.stop().animate({top:scrollTop+winHeight/5});
//					$pos2.stop().animate({top:scrollTop+3*winHeight/5});
//				}
//				$pos2.find('li').last().click(function(){
//					scrollTop = 0;
//					$("html body").stop().animate({scrollTop:0});
//					$pos1.stop().animate({top:scrollTop+winHeight/5});
//					$pos2.stop().animate({top:scrollTop+3*winHeight/5});
//               })
//			        });
//			    });
		});
		
$(function(){
	
	var $list_good = $('.list_good');
	var i = 0;
	$.ajaxSetup({
		type:"get",
		url:"/data/goodlist.json",
		dataType:'json',
		async:true,
		success : function(res){
			console.log(res);
			$.each(res, function(idx,item){
				if(i == 0){
				if(item.page == 1){
					 var $div = $('<div/>').addClass('list_div');
					 var $a = $('<a/>').appendTo($div);
		   			$('<img/>').attr('src',item.imgurl).addClass('pic').appendTo($a);
		   			$a.click(function(){
		   				open("http://localhost:3000/project/src/html/Detail.html");
		   			})
		   			$('<p/>').html(item.brand).addClass('list_p').appendTo($div);
		   			$('<h3/>').html(item.theme).addClass('list_h3').appendTo($div);
		   			$('<p/>').addClass('price').html( '<span>&yen;' + item.price + '</span>').appendTo($div);
		   			$('<p/>').html('<del>&yen;'+item.price_off + '</del>').css({"color":"#ccc","font-size":"12px","margin-top":"10px","text-align":"center"}).appendTo($div);
		   			$div.appendTo($list_good);
				}
				}
				if(i == 1){
				if(item.page == 2){
					 var $div = $('<div/>').addClass('list_div');
					 var $a = $('<a/>').appendTo($div);
		   			$('<img/>').attr('src',item.imgurl).addClass('pic').appendTo($a);
		   			$a.click(function(){
		   				open("http://localhost:3000/project/src/html/Detail.html");
		   			})
		   			$('<p/>').html(item.brand).addClass('list_p').appendTo($div);
		   			$('<h3/>').html(item.theme).addClass('list_h3').appendTo($div);
		   			$('<p/>').addClass('price').html( '<span>&yen;' + item.price + '</span>').appendTo($div);
		   			$('<p/>').html('<del>&yen;'+item.price_off + '</del>').css({"color":"#ccc","font-size":"12px","margin-top":"10px","text-align":"center"}).appendTo($div);
		   			$div.appendTo($list_good);
				}
				}
				if(i == 2){
				if(item.page == 3){
					 var $div = $('<div/>').addClass('list_div');
					  var $a = $('<a/>').appendTo($div);
		   			$('<img/>').attr('src',item.imgurl).addClass('pic').appendTo($a);
		   			$a.click(function(){
		   				open("http://localhost:3000/project/src/html/Detail.html");
		   			})
		   			$('<p/>').html(item.brand).addClass('list_p').appendTo($div);
		   			$('<h3/>').html(item.theme).addClass('list_h3').appendTo($div);
		   			$('<p/>').addClass('price').html( '<span>&yen;' + item.price + '</span>').appendTo($div);
		   			$('<p/>').html('<del>&yen;'+item.price_off + '</del>').css({"color":"#ccc","font-size":"12px","margin-top":"10px","text-align":"center"}).appendTo($div);
		   			$div.appendTo($list_good);
				}
				}
				if(i == 3){
				if(item.page == 4){
					 var $div = $('<div/>').addClass('list_div');
					  var $a = $('<a/>').appendTo($div);
		   			$('<img/>').attr('src',item.imgurl).addClass('pic').appendTo($a);
		   			$a.click(function(){
		   				open("http://localhost:3000/project/src/html/Detail.html");
		   			})
		   			$('<p/>').html(item.brand).addClass('list_p').appendTo($div);
		   			$('<h3/>').html(item.theme).addClass('list_h3').appendTo($div);
		   			$('<p/>').addClass('price').html( '<span>&yen;' + item.price + '</span>').appendTo($div);
		   			$('<p/>').html('<del>&yen;'+item.price_off + '</del>').css({"color":"#ccc","font-size":"12px","margin-top":"10px","text-align":"center"}).appendTo($div);
		   			$div.appendTo($list_good);
				}
				}
				
			});
		}
	});
	$.ajax();
	$(window).on('scroll',function(){
				// 获取滚动条滚动过的距离
				var scrollTop = $(window).scrollTop();
				// 当差不多滚动到底部是加载更多内容
				if(scrollTop >= $(document).height() - $(window).height() - 500  && i < 4){
					i++;
					console.log(i);
					$.ajax();
				}
	});
	
	
	$('.list_li').on('click','li',function(){
		$(this).find('a').addClass("first_a").parent().siblings().find('a').removeClass("first_a");
		i = $(this).index();
		$list_good.empty();
		
		$.ajax();
	})
                   
})