//load

jQuery(function($) {
	$.ajax({
		type: "get",
		url: "/project/src/json/goodlist.json",
		async: true,
		dataType: 'json',
		success: function(res) {
			//						console.log(res);
			var $goodsright = $('.goods-right');
			var $smallpic = $('.smallpic');
			var $goodsleft = $('.goods-left');

			var good_id = getCookie("good_id"); //获取商品id cookie
			if(good_id) { //判断是否存在
				var $ul = $('<ul/>');
				var $ul1 = $('<ul/>');

				$.each(res, function(idx, item) {
					if(good_id == item.id) { //根据id加载不同的商品

						$goodsleft.find('.fdj').find('img').attr("src", item.imgurl); //设置大图片的路径
						//放大镜下方小图片的路径
						$.each(item.smallimgurl, function(idx, ele) {
							var $li = $('<li/>');
							$('<img/>').attr('src', ele.smallimgurl).appendTo($li);
							$li.appendTo($ul);
						});

						//右边商品信息简介
						var $li1 = $('<li/>').css({
							"padding-bottom": "10px",
							"border-bottom": "1px dashed #ccc"
						});
						$('<p/>').html(item.brand).css({
							"color": "#666",
							"font-size": "16px",
							"margin-top": "10px"
						}).appendTo($li1);
						$('<p/>').html(item.theme).css({
							"color": "#000",
							"font-size": "16px",
							"margin-top": "10px"
						}).appendTo($li1);
						$('<p/>').html("货号:" + item.id).css({
							"color": "#666",
							"font-size": "12px",
							"margin-top": "10px"
						}).appendTo($li1);

						var $li2 = $('<li/>').css({
							"padding-bottom": "10px",
							"position": "relative",
							"border-bottom": "1px dashed #ccc"
						});
						var price = (item.price - item.price * item.off).toFixed(2);
						var $p = $('<p/>').addClass('price').html('<span>&yen;' + price + '</span>').appendTo($li2);
						$('<span/>').addClass('huiyuan').html("红卡会员价").appendTo($p);
						$('<p/>').html('<del>专柜价:&yen;' + (item.price - 0).toFixed(2) + '</del>').css({
							"color": "#ccc",
							"font-size": "20px",
							"margin-top": "10px"
						}).appendTo($li2);
						$('<span/>').addClass('man').appendTo($li2);

						var $li3 = $('<li/>').css({
							"padding-bottom": "10px",
							"position": "relative",
							"border-bottom": "1px dashed #ccc"
						});
						var $p1 = $('<p/>').html('<span>色系<span/>').appendTo($li3).css({
							"margin-top": "10px",
							"padding-bottom": "20px"
						});
						$('<span/>').html(item.color).addClass('color').appendTo($p1);
						var $div = $('<div/>').html('<span>数量<span/>').appendTo($li3);
						$('<input/>').attr({
							'type': 'button',
							'value': '-'
						}).addClass('jian').appendTo($div);
						$('<input/>').attr({
							'type': 'text'
						}).val("1").addClass('txt1').appendTo($div);
						$('<input/>').attr({
							'type': 'button',
							'value': '+'
						}).addClass('jia').appendTo($div);

						var $li4 = $('<li/>').css({
							"padding-bottom": "10px",
							"position": "relative"
						});
						$('<p/>').html('发货门店：此货品将由第五大道奢侈品官网为您发货').css({
							"color": "#999",
							"font-size": "14px",
							"margin-top": "20px"
						}).appendTo($li4);
						$('<p/>').html('发货时效：预计15个工作日发货，延迟发货慢必赔').css({
							"color": "#999",
							"font-size": "14px",
							"margin-top": "15px"
						}).appendTo($li4);
						$('<p/>').html('温馨提示：本商品不支持货到付款，有质量问题7天退换货').css({
							"color": "#999",
							"font-size": "14px",
							"margin-top": "15px"
						}).appendTo($li4);
						$('<p/>').html('包邮政策：白金砖石顺丰包邮，注册用户用满99元免邮').css({
							"color": "#999",
							"font-size": "14px",
							"margin-top": "15px"
						}).appendTo($li4);
						$('<input/>').attr({
							'type': 'button',
							'value': '立即购买'
						}).addClass('mai').appendTo($li4);
						$('<input/>').attr({
							'type': 'button',
							'value': '加入购物袋'
						}).addClass('addgood').appendTo($li4);
						$li1.appendTo($ul1);
						$li2.appendTo($ul1);
						$li3.appendTo($ul1);
						$li4.appendTo($ul1);

					}

				});
				$ul.appendTo($smallpic);
				$ul1.appendTo($goodsright);

				//小图列表的点击事件
				$smallpic.on('click', 'li', function() {
					$goodsleft.find('.fdj').remove(); //移除放大镜的DIV
					var $fdj = $('<div/>').addClass('fdj'); //重新添加放大镜的div
					$('<img/>').attr({
						'id': 'bigimg',
						'src': $(this).find('img').attr('src')
					}).appendTo($fdj);
					$fdj.prependTo($goodsleft);
					$(this).find('img').css('border', '1px solid #FF8400').parent().siblings().find('img').css('border', '1px solid #c1c1c1');

					fdj(); //调用放大镜函数
				});
				//小图列表的左右移动
				var liwidth = $smallpic.find('li').width() + 10;
				var j = 0;
				$smallpic.parent().find(".left-sp").on('click', function() {
					j--;
					$smallpic.find('ul').animate({
						left: -j * liwidth
					});
				});
				$smallpic.parent().find(".right-sp").on('click', function() {
					j++;
					$smallpic.find('ul').animate({
						left: -j * liwidth
					});
				});
				//右边信息
				//商品数量
				var i = $goodsright.find('input[class=txt1]').val();
				$goodsright.find('input[class=jian]').on('click', function() {
					i--;
					$('input[class=txt1]').val(i);
				});
				$goodsright.find('input[class=jia]').on('click', function() {
					i++;
					$('input[class=txt1]').val(i);
				});

				//放大镜
				function fdj() {
					$goodsleft.find('.fdj').xzoom({
						position: 'right',
						width: 400,
						height: 400,
						backgroundcolor: "#FFCC00",
						opacity: 0.2,
						ratio: 2
					});
				}
				fdj();
				//购物车移动
				var $goodcar = $('.goodcar');
				$goodsright.find('ul').children('li').last().find('input[class=addgood]').click(function() {
					var $cruttenImg = $goodsleft.find('.fdj').find('img');
					var $copyImg = $cruttenImg.clone(); //复制原图
					var startPos = $cruttenImg.offset(); //获取原图坐标
					var startWidth = $cruttenImg.width(); //获取原图宽度
					//给复制图片添加一个样式
					$copyImg.css({
						position: "absolute",
						left: startPos.left,
						top: startPos.top,
						width: startWidth
					});
					//把复制的图片放到body中来
					$copyImg.appendTo("body");
					var $goodnum = $goodcar.find('.good-sp').find('span');
					//获取购物车的坐标
					var $goodpos = $goodcar.offset();
					//复制图片动画，移动到商品列表中
					$copyImg.stop().animate({
						left: $goodpos.left,
						top: $goodpos.top + $goodcar.outerHeight(),
						width: 0,
						heigth: 0
					}, 1000, function() {
						$copyImg.remove(); //移除复制的图片
						
						var _html = parseInt($goodnum.html()); //购物袋中的数量
						var $goodcarlist = $goodcar.find('.goodcar_list');
						$goodcarlist.find('p').remove(); //移除列表中的p标签
						$goodcarlist.find('h3').remove(); //移除列表的H3标签
						$goodcarlist.find('input[type=button]').remove(); //移除列表中的button
						//	 			               $goodcarlist.empty();
						//添加新的h3标签
						$('<h3>').html('购物袋中的商品').css({
							"border-bottom": "1px solid #ccc",
							"font-size": "14px",
							"margin": "10px",
							"padding-bottom": "10px"
						}).prependTo($goodcarlist);

						var nums = parseInt(i); //i为点击一次增加的数量 
					

						//获取商品信息cookies
						var goods_message_get = getCookie("goods_message");
						// console.log(goods_message_get);
						

						// 添加商品信息
						$.each(res, function(idx, item) {
							if(good_id == item.id){
								 
								if(goods_message_get){
							
							    goods_message_get = JSON.parse(goods_message_get);
								
								
								var istrue = true;//判断id是否相同
 		                     		for(var j = 0 ;j<goods_message_get.length;j++){

 		                     	if(goods_message_get[j].goodid == item.id){//id相同，改变相应的num值
 		                      	 	istrue = false;
 		                      	 	// console.log(11);
 		                      	 	goods_message_get[j].goodnum += parseInt(i);
 		                      	 	$goodcarlist.find('ul').eq(j).find('.addgoodnum').find('span').html(goods_message_get[j].goodnum);
 		                      	 	
 		                      	 	goods_message_get = JSON.stringify(goods_message_get);
 		                      	 	var d=new Date;
				                    d.setDate(d.getDate() + 10);
				                    setCookie("goods_message",goods_message_get,d,"/");
				                    }
 		                      }
 		                      // id不同，把整个商品信息以对象的形式添加到cookie数组中
 		                      if(istrue){
 									addelements();
	 		                      	goods_message_get.push({goodname:item.theme,goodid:item.id,imgurl:item.imgurl,price:item.price,color:item.color,goodnum:nums});
	 		                      	$goodcarlist.find('ul').eq(j).find('.addgoodnum').find('span').html(goods_message_get[j].goodnum);
	 		                      	goods_message_get = JSON.stringify(goods_message_get);
	 		                      	var d=new Date;
					                d.setDate(d.getDate() + 10);
					                setCookie("goods_message",goods_message_get,d,"/");
 		                      
								
							            }

								}else{

									addelements();
 									 //将商品信添加到数组
 									 var goods_message = []; //创建一个空数组，用于存储商品信息并存进Cookies
							    	 goods_message.push({goodname:item.theme,goodid:item.id,imgurl:item.imgurl,price:item.price,color:item.color,goodnum:nums});
                                     goods_message = JSON.stringify(goods_message);
								    //创建cookies,以数组形式存储商品信息
								    //cookie不存在，将数组存进一个新的cookie
							   		//json序列化
								    var d=new Date;
						            d.setDate(d.getDate() + 10);
						            setCookie("goods_message",goods_message,d,"/"); 
								}

							 	var $input = $('<input/>').attr({'type':'button'}).val('去购物袋结算').addClass('jiesuan').appendTo($goodcarlist);//添加新的button标签
	 			           	    $input.click(function(){
	 			           	   	  open("goodscar_list.html");
	 			           	   });
	 			           	   		 //删除按钮点击事件
								$('.goodcar_list').find('ul').find('.btn-close').click(function(){
	 			           	        var goodid_get = $(this).closest('ul').attr("goodid");
	 			           	        console.log(goodid_get);
	 			           	        var count = 0;
					                $(this).closest('ul').remove();//移除响应ul
					             	var goods_message_get1 = getCookie("goods_message");//获取cookie
					             	 if(goods_message_get1){//cookies存在时
							 		goods_message_get1 = JSON.parse(goods_message_get1);//解析
//							 	
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
	 				            //获取最新商品信息 cookies
	 				            var count = 0;
	 			           	    var goodsmessage1 = getCookie("goods_message");
	 			           	    if(goodsmessage1){
	 			           	    var goodsmessage1 = JSON.parse(goodsmessage1);
	 			           	    $.each(goodsmessage1, function(idx,ele) {
	 			           	    	count += parseInt(ele.goodnum);
	 			           	    	// console.log(count);
	 			           	     $goodnum.html(count).css({'color':'orangered'});//每点击一次购物袋中数量增加	
	 			           	    });
	 			           	    }else{
	 			           	     $goodnum.html(nums).css({'color':'orangered'});	
	 			           	    }	
								//封装生成元素(商品信息显示在校购物袋中)函数
								function addelements(){
								    var $ul = $('<ul/>').attr({"goodid":item.id});
									var $li = $('<li/>').css({
										"position": "relative",
										"padding-bottom": "10px"
									});
									//添加图片
									$('<img/>').attr("src", item.imgurl).css({
										"float": "left",
										width: 50,
										height: 50,
										"border": "1px solid #c1c1c1",
										"margin-left": "10px"
									}).appendTo($li);
									var $div = $('<div/>').css({
										"float": "left",
										"width": "100px",
										"margin-left": "10px"
									});
									$('<span/>').html(item.brand).css({
										"display": "block",
										"color": "#666",
										"font-size": "12px"
									}).appendTo($div);
									$('<span/>').html(item.theme).addClass('addgood_span').css({
										"display": "block",
										"color": "#666",
										"font-size": "12px"
									}).appendTo($div);
									$('<span/>').addClass('addgoodnum').html('&yen;' + (item.price - item.price * item.off).toFixed(2) + "&times;" + '<span>'+ parseInt(i) + '<span/>').css({
										"display": "block",
										"color": "orangered",
										"font-size": "16px"
									}).appendTo($div);
									 // 添加删除按钮
	 			           	   	 	var $btnClose = $("<span/>");
	 				             	$btnClose.addClass("btn-close").html("&times;").appendTo($li);
	 				             	
									$div.appendTo($li); //div添加到li
									$li.appendTo($ul); //li添加到ul，ul添加到商品列表
									$ul.appendTo($goodcarlist); //将ul添加到商品列表
														}
							}


						});

					});

				}); //购物车动画移动尾部

			}
		}
	});
});


//brand ajax加载
jQuery(function($) {
	$.ajax({
		type: "get",
		url: "/project/src/json/detail_brand.json",
		dataType: 'json',
		async: true,
		success: function(res) {
			console.log(res);
			var $brandleft = $('.brand_left');
			$.each(res.data, function(idx, item) {
				if(item.theme) {
					$('<h3/>').html(item.theme).addClass('brand_h3').appendTo($brandleft);
				}
				$('<img/>').attr({
					"src": item.imgurl
				}).appendTo($brandleft);
				$('<p/>').addClass('brand_p1').html(item.name).appendTo($brandleft);
				$('<p/>').addClass('brand_p2').html("RMB:" + (item.price - 0).toFixed(2)).appendTo($brandleft);
			});
		}
	});
});
//详细信息的隐藏于显示
jQuery(function($) {
	var $list = $('#list');
	var $move = $('.move');
	var movewidth = $move.width();
	$list.on('click', 'li', function() {
		console.log(1);
		var i = $(this).index();
		$(this).css({
			'color': 'orangered'
		}).siblings().css({
			'color': '#000'
		});
		//					$move.find('ul').css({left:-i*movewidth});
		$move.find('ul').find('li').eq(i).css({
			"display": "block"
		}).siblings().css("display", "none");
	})
});