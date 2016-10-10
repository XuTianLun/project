jQuery(function($){
	
				 var oldusername = getCookie("username");
			     var oldpassword = getCookie("password");
			     console.log(oldusername);
			    if(oldusername){
			    	
			    	$('#username').html('欢迎您,'+oldusername).attr({"href":"#"});
			    	$('.last').html('退出').attr({"href":"#"});
			    	
			    	$('.last').click(function(){
			     	$('#username').html('登录').attr({"href":"http://localhost:3000/project/src/html/register1.html"});
			    	$('.last').remove();
			    	$('<a/>').html('注册').addClass('last').attr({"href":"http://localhost:3000/project/src/html/register.html"}).insertAfter($('#username'));
//			    	removeCookie("username");
			    	removeCookie("password");
			    	
			     });
			    
			    }
			    
			   var goodnumber = getCookie("goodnums"); 
			   var $goodcar = $('.goodcar');
			   var $goodnum = $goodcar.find('.good-sp').find('span');
			   var $goodcarlist = $goodcar.find('.goodcar_list');
			   
					if(goodnumber){
						$goodcarlist.find('p').remove();//移除列表中的p标签
						$goodnum.html(goodnumber).css({'color':'orangered'});
						if(goodnumber == 0){
	 					         	$goodcarlist.find('h3').remove();//移除列表的H3标签
	 					         	$('<p/>').html('目前还没有任何商品').appendTo($goodcarlist);
	 					         	$('<p/>').html('赶紧去选择自己心爱的商品吧！').appendTo($goodcarlist);
	 					         	 $goodnum.html(goodnumber).css({'color':'#000'});
	 					   }
						$.ajax({
					type:"get",
					url:"/data/detail.json",
					async:true,
					dataType:"json",
					success : function(res){
						
						 $.each(res,function(idx,item){
						 	//添加商品信息
						 		if(item.theme){
						
	 			           	   	 //获取购物袋中商品的数量
	 			           	   var _html = $goodnum.html();
						       //添加新的h3标签
						       $goodcarlist.find('p').remove();//移除列表中的p标签
	 			               $goodcarlist.find('h3').remove();//移除列表的H3标签
	 			               $goodcarlist.find('input[type=button]').remove();//移除列表表中的button
	 			               $('<h3>').html('购物袋中的商品').css({"border-bottom":"1px solid #ccc","font-size":"14px","margin":"10px","padding-bottom":"10px"}).prependTo($goodcarlist);
	 			           	   var $ul = $('<ul/>');
	 			           	   var $li = $('<li/>').css({"position":"relative","padding-bottom":"10px"});
	 			           	    
	 			           	   	//添加图片
	 			           	   	$('<img/>').attr("src",item.bigimgurl).css({"float":"left",width:50,height:50,"border":"1px solid #c1c1c1","margin-left":"10px"}).appendTo($li);
	 			           
	 			           	   	var $div = $('<div/>').css({"float":"left","width":"100px","margin-left":"10px"});
	 			           	   	 $('<span/>').html(item.brand).css({"display":"block","color":"#666","font-size":"12px"}).appendTo($div);
						        $('<span/>').html(item.theme).addClass('addgood_span').css({"display":"block","color":"#666","font-size":"12px"}).appendTo($div);
							    $('<span/>').html('&yen;'+(item.price-item.price*item.off).toFixed(2)+"&times;"+goodnumber).css({"display":"block","color":"orangered","font-size":"16px"}).appendTo($div);
				
							    $div.appendTo($li);//div添加到li
	 			           	   	
	 			           	   	
	 			           	   	//添加删除按钮
	 			           	   	 var $btnClose = $("<span/>");
	 				             $btnClose.addClass("btn-close").html("&times;").appendTo($li);
	 				              $btnClose.click(function(){
	 					         $(this).closest("ul").remove();//移除ul
	 					         var _html = $goodnum.html();
	 					         _html = 0;
	 					         //创建cookies 商品数量
	 			           	   var d=new Date;
					           d.setDate(d.getDate() + 10);
					           setCookie("goodnums",_html,d,"/");
					           var cookiesnum = getCookie("goodnums");
	 					         $goodnum.html(cookiesnum).css({'color':'orangered'});//更改购物袋商品的数量，减1
	 					         if(cookiesnum == 0){
	 					         	$goodcarlist.find('h3').remove();//移除列表的H3标签
	 					         	$('<p/>').html('目前还没有任何商品').appendTo($goodcarlist);
	 					         	$('<p/>').html('赶紧去选择自己心爱的商品吧！').appendTo($goodcarlist);
	 					         	$goodcarlist.find('input[type=button]').remove();//移除列表中的button
	 					         	$goodnum.html(cookiesnum).css({'color':'#000'});
	 					         	 
	 					         }
	 				             });
	 				             
	 				          
	 				             $li.appendTo($ul);   //li添加到ul，ul添加到商品列表
							   $ul.appendTo($goodcarlist);//将ul添加到商品列表
	 			           	   var $input = $('<input/>').attr({'type':'button'}).val('去购物袋结算').addClass('jiesuan').appendTo($goodcarlist);//添加新的button标签
	 			           	                $input.click(function(){
	 			           	   	             open("http://localhost:3000/project/src/html/goodscar_list.html");
	 			           	                                       });
	 			           	 
	 				      }
						
						});
						
					
					}
					});
					
					}
			});