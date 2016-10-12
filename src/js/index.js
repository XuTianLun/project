jQuery(function($){
		     	//加载头部
//		     	$('#_head').load('html/head.html .header',function(){
//		     		//cookie 登录名 
//		     		var oldusername = getCookie("username");
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
//			    }
////			    //cookie 购物袋
//		     	});
		     	//加载导航栏
//		     	$('#_nav').load('html/head.html .nav',function(){
//		     		//商品分类二级菜单
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
//				})
//		     });  	
		     	
		     });
//轮播插件
jQuery(function($){
				$.ajax({
					type:"get",
					url:"/data/lbtImg.json",
					dataType:'json',
					async:true,
					success : function(res){
                        console.log(res);
                        console.log(typeof res);
						var $lbt = $('.lbt');
						var $ul = $('<ul/>');
						
						$.each(res,function(idx,item){
							var $li = $('<li/>');
							$('<img/>').attr("src",item.imgurl).appendTo($li);
							$li.appendTo($ul);
						})
						$ul.appendTo($lbt);
					
						
			$lbt.myCarouselImg({
				_width:1000,
				_height:500,
				isShowPage:true,//是否显示页码
				autoPlay:true,//是否自动轮播
				playType:'left',//动画类型：水平滚动left, 垂直滚动top, 渐现效果fade
				isShowBtn:true,//是否显示前后按钮
				playSpeed:2000,//轮播图速度
				isStopPlay:true, //鼠标进入是否停止定时	
				clickOrover:'click'
			});
//			$('.lbt').xcarousel({
//           		width:1000,
//           		height:500,
//           		speed:2000,
//           		type:'x'
//           	});
					}
				});
				
				
				//推荐品牌图片ajax加载
				$.ajax({
					type:"get",
					url:"/data/pinpai.json",
					dataType:'json',
					async:true,
					success : function(res){
						var $brand_foot = $('.brand_foot');
						$.each(res, function(idx,item) {
							var $div = $('<div/>').css({"position":"relative","float":"left",width:249,height:330});
							var $img = $('<img/>').attr("src",item.imgurl);
							var $samlldiv = $('<div/>').css({"position":"absolute","background":"#fff",bottom:0,left:40,width:150,height:60});
							var $samllimg = $('<img/>').attr("src",item.smallimgurl).css({width:150,height:60});
							
							$img.appendTo($div);
							$samllimg.appendTo($samlldiv);
							$samlldiv.appendTo($div);
							$div.appendTo($brand_foot);
							
							$div.on('mouseenter',function(){
							$(this).children('div').stop().animate({height:120},300);
							$(this).children().find('img').stop().animate({height:120},300);
						   }).on('mouseleave',function(){
						     $(this).children('div').stop().animate({height:60},300);
							 $(this).children().find('img').stop().animate({height:60},300);
						     });
						});
						
					}
				});
				
				//热门store ajax加载
			
				var $hotstore = $('.hotstore_foot');
				$.ajax({
					type:"get",
					url:"/data/hotstore.json",
					dataType:'json',
					async:true,
					success : function(res){
                        $.each(res, function(idx,item) {
                        	var $div = $('<div/>').css({"position":"relative","float":"left",width:150,height:80,margin:6,"border":"1px solid #ccc"});
                        	var $img = $('<img/>').attr("src",item.imgurl).css({"position":"absolute",width:150,height:80,opacity:1});
                        	var $p = $('<p/>').html(item.name).css({"position":"absolute",width:150,height:80,opacity:0});
                        	$img.appendTo($div);
                        	$p.appendTo($div);
                        	$div.appendTo($hotstore);
                        	
                        	$div.on('mouseenter',function(){
                        		$(this).css({"border":"1px solid #000"});
                        		$(this).children('img').stop().animate({opacity:0});
                        		$(this).children('p').stop().animate({opacity:1});
                        	}).on('mouseleave',function(){
                        		$(this).css({"border":"1px solid #ccc"});
                        		$(this).children('img').stop().animate({opacity:1});
                        		$(this).children('p').stop().animate({opacity:0});
                        	});
                        });
					}
				});
			
		});
          