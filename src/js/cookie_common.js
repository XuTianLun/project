
	$(function(){
		       //获取用户名与密码的cookies
				 var oldusername = getCookie("username");
			     var oldpassword = getCookie("password");
			     // console.log(oldusername);
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
			    // 获取商品信息cookies，显示在小购物袋中
	 		   var goods_message = getCookie("goods_message"); 
	 		  if(goods_message){
	 		   goods_message = JSON.parse(goods_message);
	 		  
			   var $goodcar = $('.goodcar');
			   var $goodnum = $goodcar.find('.good-sp').find('span');
			   var $goodcarlist = $goodcar.find('.goodcar_list');
			   console.log(goods_message);
			   console.log(77);
		       var count = 0;
					
								console.log(11);
	 				            $.each(goods_message, function(idx,item){
	 					   		
	 					   		 $goodcarlist.find('p').remove();//移除列表中的p标签
	 					   		 $goodcarlist.find('h3').remove();//移除列表的H3标签
	 					   		 $goodcarlist.find('input[type=button]').remove();//移除列表表中的button
	 					   		 $('<h3>').html('购物袋中的商品').css({"border-bottom":"1px solid #ccc","font-size":"14px","margin":"10px","padding-bottom":"10px"}).prependTo($goodcarlist);
	 			           	     console.log(item.goodid);
	 			           	     var $ul = $('<ul/>').attr({"goodid":item.goodid});
   			           	         var $li = $('<li/>').css({"position":"relative","padding-bottom":"10px"});
   			           	         //添加图片
	 			           	   	$('<img/>').attr("src",item.imgurl).css({"float":"left",width:50,height:50,"border":"1px solid #c1c1c1","margin-left":"10px"}).appendTo($li);    
	 			           	   	var $div = $('<div/>').css({"float":"left","width":"100px","margin-left":"10px"});
	 			           	   	$('<span/>').html(item.color).css({"display":"block","color":"#666","font-size":"12px"}).appendTo($div);
						        $('<span/>').html(item.goodname).addClass('addgood_span').css({"display":"block","color":"#666","font-size":"12px"}).appendTo($div);
							    $('<span/>').addClass('addgoodnum').html('&yen;'+(item.price-0).toFixed(2)+"&times;"+ '<span>' + item.goodnum + '<span/>').css({"display":"block","color":"orangered","font-size":"16px"}).appendTo($div);
   			           	        $div.appendTo($li);//div添加到li
   			           	        $li.appendTo($ul);   //li添加到ul，ul添加到商品列表
							    $ul.appendTo($goodcarlist);//将ul添加到商品列表
	 			           	     
	 			           	     	//添加删除按钮
	 			           	   	 var $btnClose = $("<span/>");
	 				             $btnClose.addClass("btn-close").html("&times;").appendTo($li);
	 			           	  		//删除按钮点击事件
	 				             $('.goodcar_list').find('ul').on('click','.btn-close',function(){
                                	 //删除cookies
	 				            	 // console.log($goodcarlist.find('ul').find('li').find('.btn-close').length);
	 			           	        var xu = $(this).closest('ul').index()-1;
					             	console.log(xu);
					             	$goodcarlist.find('ul').eq(xu).remove();
					             	var goods_message_get1 = getCookie("goods_message");
					             	 if(goods_message_get1){//cookies存在时
							 		goods_message_get1 = JSON.parse(goods_message_get1);//解析
							                           }
					             	goods_message_get1.splice(xu,1);
					             	var goods_message_get2 = JSON.stringify(goods_message_get1);
					 		        var d=new Date;
									d.setDate(d.getDate() + 10);
									setCookie("goods_message",goods_message_get2,d,"/");
									return;
	 				            });
   			           	         if(item.goodnum){
	 					   		 count = count + item.goodnum;//购物袋中的数量
	 					   		 }
   			           	        $goodnum.html(count).css({'color':'orangered'});
	 					   	}); 					   	
	 					   
	 					   	  var $input = $('<input/>').attr({'type':'button'}).val('去购物袋结算').addClass('jiesuan').appendTo($goodcarlist);//添加新的button标签
	 			           	  $input.click(function(){
	 			           	   open("goodscar_list.html");
	 			           	                       });
	 					  
				}
	  //删除按钮点击事件
		$('.goodcar_list').find('ul').find('.btn-close').click(function(){
   	        var goodid_get = $(this).closest('ul').attr("goodid");
   	        console.log(goodid_get);
   	        var count = 0;
            $(this).closest('ul').remove();//移除响应ul
         	var goods_message_get1 = getCookie("goods_message");//获取cookie
         	 if(goods_message_get1){//cookies存在时
	 		goods_message_get1 = JSON.parse(goods_message_get1);//解析
            for(var j = 0;j < goods_message_get1.length;j++){//遍历
	 			if(goodid_get == goods_message_get1[j].goodid){//找出删除的商品的id与cookie中相同id,
	 				console.log(j);
	 				goods_message_get1.splice(j,1);//然后删除那一项
	 				var goods_message_get2 = JSON.stringify(goods_message_get1);
	 		        var d=new Date;
					d.setDate(d.getDate() + 10);
					setCookie("goods_message",goods_message_get2,d,"/");
	 				var goods_message_get3 = getCookie("goods_message");//获取最新cookie
	 				if(goods_message_get3){//若存在
	 				goods_message_get3 = JSON.parse(goods_message_get3);//解析
	 				for(var i = 0;i<goods_message_get3.length;i++){
	 					 count += parseInt(goods_message_get3[i].goodnum);//小购物袋中显示的数量
	 					  $goodnum.html(count).css({'color':'orangered'});//每点击一次购物袋中数量变化
									}
				 				if(goods_message_get3.length == 0){//数组长度等于0
				 						$goodcarlist.find('h3').remove();//移除列表的H3标签
									  	$goodcarlist.find('p').remove();//移除列表的H3标签
									  	$goodcarlist.find('input[type=button]').remove();//移除列表表中的button
									    $('<p/>').html('目前还没有任何商品').appendTo($goodcarlist);
									    $('<p/>').html('赶紧去选择自己心爱的商品吧！').appendTo($goodcarlist);
								    	$goodnum.html("0").css({'color':'#000'});
				 				 }
 								}
 						}
	 			}
           }
        })	 				            	 
 		 
	 					  
	 			})
			