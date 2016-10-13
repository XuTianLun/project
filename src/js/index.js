jQuery(function($){
	 var oldusername = getCookie("username");
			     var oldpassword = getCookie("password");
			     console.log(oldusername);
			    if(oldusername){
			    	
			    	$('#username').html('欢迎您,'+oldusername).attr({"href":"#"});
			    	$('.last').html('退出').attr({"href":"#"});
			    	
			    	$('.last').click(function(){
			     	$('#username').html('登录').attr({"href":"html/register1.html"});
			    	$('.last').remove();
			    	$('<a/>').html('注册').addClass('last').attr({"href":"html/register.html"}).insertAfter($('#username'));
//			    	removeCookie("username");
//			    	removeCookie("password");
			    	
			     });
			    
			    }
			    //获取商品信息cookies
	 		   var goods_message = getCookie("goods_message"); 
	 		  if(goods_message){
	 		   var goods_message = JSON.parse(goods_message);
	 		  }
			   var $goodcar = $('.goodcar');
			   var $goodnum = $goodcar.find('.good-sp').find('span');
			   var $goodcarlist = $goodcar.find('.goodcar_list');
			   console.log(goods_message);
		       var count = 0;
					if(goods_message){
	 				            $.each(goods_message, function(idx,item){
	 					   		
	 					   		 $goodcarlist.find('p').remove();//移除列表中的p标签
	 					   		 $goodcarlist.find('h3').remove();//移除列表的H3标签
	 					   		 $goodcarlist.find('input[type=button]').remove();//移除列表表中的button
	 					   		 $('<h3>').html('购物袋中的商品').css({"border-bottom":"1px solid #ccc","font-size":"14px","margin":"10px","padding-bottom":"10px"}).prependTo($goodcarlist);
	 			           	     if(item.goodname){
	 			           	     var $ul = $('<ul/>');
   			           	         var $li = $('<li/>').css({"position":"relative","padding-bottom":"10px"});
   			           	         //添加图片
	 			           	   	$('<img/>').attr("src",item.imgurl).css({"float":"left",width:50,height:50,"border":"1px solid #c1c1c1","margin-left":"10px"}).appendTo($li);    
	 			           	   	var $div = $('<div/>').css({"float":"left","width":"100px","margin-left":"10px"});
	 			           	   	$('<span/>').html(item.color).css({"display":"block","color":"#666","font-size":"12px"}).appendTo($div);
						        $('<span/>').html(item.goodname).addClass('addgood_span').css({"display":"block","color":"#666","font-size":"12px"}).appendTo($div);
							    $('<span/>').html('&yen;'+(item.price-0).toFixed(2)+"&times;"+item.goodnum).css({"display":"block","color":"orangered","font-size":"16px"}).appendTo($div);
   			           	        $div.appendTo($li);//div添加到li
   			           	        $li.appendTo($ul);   //li添加到ul，ul添加到商品列表
							    $ul.appendTo($goodcarlist);//将ul添加到商品列表
	 			           	     }
	 			           	     	//添加删除按钮
	 			           	   	 var $btnClose = $("<span/>");
	 				             $btnClose.addClass("btn-close").html("&times;").appendTo($li);
	 			           	     $btnClose.click(function(){
	 					         var _html = $goodnum.html();
	 					         _html = 0;
	 					        var goodsmessage = getCookie("goods_message");
	 					        var d=new Date;
	 					        setCookie("goods_message",goods_message,d,"/");
//					             removeCookie("goods_message");
	 					         	$goodcarlist.empty();//移除列表的所有子元素
	 					         	$('<p/>').html('目前还没有任何商品').appendTo($goodcarlist);
	 					         	$('<p/>').html('赶紧去选择自己心爱的商品吧！').appendTo($goodcarlist);
	 					         	$goodnum.html("0").css({'color':'#000'});
	 				             });
   			           	         if(item.goodnum){
	 					   		 count = count + item.goodnum;//购物袋中的数量
	 					   		 }
   			           	        $goodnum.html(count).css({'color':'orangered'});
	 					   	});
//	 					   	
	 					   
	 					   	  var $input = $('<input/>').attr({'type':'button'}).val('去购物袋结算').addClass('jiesuan').appendTo($goodcarlist);//添加新的button标签
	 			           	  $input.click(function(){
	 			           	   open("http://localhost:3000/project/src/html/goodscar_list.html");
	 			           	                            });
	 					  }else{
	 					  	console.log(11);
	 					  	$goodcarlist.find('h3').remove();//移除列表的H3标签
	 					  	$goodcarlist.find('p').remove();//移除列表的H3标签
	 					    $('<p/>').html('目前还没有任何商品').appendTo($goodcarlist);
	 					    $('<p/>').html('赶紧去选择自己心爱的商品吧！').appendTo($goodcarlist);
	 					  
	 					    	 $goodnum.html("0").css({'color':'#000'});
	 					    
	 					   
					      }
})
//轮播插件
jQuery(function($){
				$.ajax({
					type:"get",
					url:"/project/src/json/lbtImg.json",
					dataType:'json',
					async:true,
					success : function(res){
//                      console.log(res);
//                      console.log(typeof res);
						var $lbt = $('.lbt');
						var $ul = $('<ul/>');
						
						$.each(res,function(idx,item){
							var $li = $('<li/>');
							$('<img/>').attr("src",item.imgurl).appendTo($li);
							$li.appendTo($ul);
						})
						$ul.appendTo($lbt);
					
						//调用轮播图插件函数
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
					url:"/project/src/json/pinpai.json",
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
							//图片进出时高度改变
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
					url:"/project/src/json/hotstore.json",
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
                        	//图片进出时透明度改变
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
				
				//商城同款ajax加载
				$.ajax({
					type:"get",
					url:"/project/src/json/the_same.json",
					dataType:'json',
					async:true,
					success : function(res){
						var $the_same_page1 = $('.the_same_page1');
						var $the_same_page2 = $('.the_same_page2');
						var $the_same_page3 = $('.the_same_page3');
						$.each(res, function(idx,item) {
							if(item.page == 1){
								var $leftdiv = $('<div/>').addClass('the_same_page_left').appendTo($the_same_page1);
								$('<img/>').attr({'src':item.leftimgurl}).appendTo($leftdiv);
								$.each(item.rightimgurl, function(idx,ele) {
									var $rightdiv = $('<div/>').addClass('the_same_page_right').appendTo($the_same_page1);
								     $('<img/>').attr({'src':ele.small}).appendTo($rightdiv);
								});
								
							}
							if(item.page == 2){
								var $leftdiv = $('<div/>').addClass('the_same_page_left').appendTo($the_same_page2);
								$('<img/>').attr({'src':item.leftimgurl}).appendTo($leftdiv);
								$.each(item.rightimgurl, function(idx,ele) {
									var $rightdiv = $('<div/>').addClass('the_same_page_right').appendTo($the_same_page2);
								     $('<img/>').attr({'src':ele.small}).appendTo($rightdiv);
								});
								
							}
							if(item.page == 3){
								var $leftdiv = $('<div/>').addClass('the_same_page_left').appendTo($the_same_page3);
								$('<img/>').attr({'src':item.leftimgurl}).appendTo($leftdiv);
								$.each(item.rightimgurl, function(idx,ele) {
									var $rightdiv = $('<div/>').addClass('the_same_page_right').appendTo($the_same_page3);
								     $('<img/>').attr({'src':ele.small}).appendTo($rightdiv);
								});
								
							}
						});
						//商品同款点击动画
						var $the_same_move = $('.the_same_move');
						var liwidth = $the_same_page1.outerWidth();
						
						$the_same_move.on('click','li',function(){
							var i = $(this).index();
							$(this).addClass('bg').siblings().removeClass();
							$('.the_same_div').find('.the_same_pic').stop().animate({left:-i*liwidth},300);
						})
					}
				});
				
			
		});
          