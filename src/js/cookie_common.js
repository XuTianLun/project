
	$(function(){
		
	
				 var oldusername = getCookie("username");
			     var oldpassword = getCookie("password");
			     console.log(oldusername);
			    if(oldusername){
			    	
			    	$('#username').html('欢迎您,'+oldusername).attr({"href":"#"});
			    	$('.last').html('退出').attr({"href":"#"});
			    	
			    	$('.last').click(function(){
			     	$('#username').html('登录').attr({"href":"register1.html"});
			    	$('.last').remove();
			    	$('<a/>').html('注册').addClass('last').attr({"href":"register.html"}).insertAfter($('#username'));
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
			