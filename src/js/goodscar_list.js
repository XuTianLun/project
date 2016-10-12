jQuery(function($){
	$.ajax({
		type:"get",
		url:"/project/src/json/goodlist.json",
		async:true,
		success : function(res){
			console.log(res);
			var $list_div = $('.goodcar_list_end').find('.list_div');
			var goods_message_get = getCookie("goods_message");
			 if(goods_message_get){//cookies存在时
			 	var goods_message_get = JSON.parse(goods_message_get);//解析
			 	console.log(goods_message_get);
	         $.each(res, function(idx,item) {
	  	             for(var i = 0;i<goods_message_get.length;i++){//当cookie所存的id与json的id相等时
	  	             	
	  	             	if(goods_message_get[i].goodid == item.id){
	  	             	
	  	             		var $ul = $('<ul/>').addClass('good_ul');
	  	             		var $li1 = $('<li/>').appendTo($ul);
	  	             		$('<input/>').prop({'type':'checkbox','checked':'ture'}).appendTo($li1);
	  	             		var $li2 = $('<li/>').appendTo($ul);
	  	             		$('<img/>').attr('src',goods_message_get[i].imgurl).addClass('goodimg').appendTo($li2);
	  	             		var $li3 = $('<li/>').html(goods_message_get[i].goodname).addClass('good_li3').appendTo($ul);
	  	             		var $li4 = $('<li/>').html(goods_message_get[i].color).addClass('good_li4').appendTo($ul);
	  	             		var $li5 = $('<li/>').html('&yen;'+goods_message_get[i].price).addClass('good_li5').appendTo($ul);
	  	             		var $li6 = $('<li/>').addClass('good_li6').appendTo($ul);
	  	             	    $('<span/>').html('-').addClass('jian').appendTo($li6);
	  	             		$('<span/>').html(goods_message_get[i].goodnum).addClass('txt').appendTo($li6);
	  	             		$('<span/>').html('+').addClass('jia').appendTo($li6);
	  	             		var $li7 = $('<li/>').html(goods_message_get[i].price* goods_message_get[i].goodnum).addClass('good_li7').appendTo($ul);
	  	             		var $li8 = $('<li/>').addClass('good_li6').appendTo($ul);
	  	             		$('<a/>').html('删除').addClass('good_a').appendTo($li8);
	  	             		$('<a/>').html('移入收藏夹').addClass('good_b').appendTo($li8);
	  	             		$ul.appendTo($list_div);
	  	             	}
	  	             }
	  	             
	               
	         });
	           var $paylength = $list_div.find('.good_ul').find('.good_li7');
	          //总额
	          function paytotal(){
	           var $paytotal = $('.settlement').find('.total').find('.good_total');
	                  var totalnum = 0;
	                  for(var i = 0;i<$paylength.length;i++){
	                  	
	                  	totalnum +=($paylength.eq(i).html()-0);
	                  }
	            $paytotal.html('&yen;'+totalnum).css({"color":"orangered","font-size":"24px","position":"absolute","top":"-8px"});
	          }
	          paytotal();
	          //件数
	            var $check_number = $list_div.find('.good_ul').find('input[type=checkbox]');
	            var count = 0;
	            console.log($check_number.length);
	            for(var j = 0;j<$check_number.length;j++){
	            	
	            	if($check_number.eq(j).prop("checked") == true){
	            		console.log(11);
	            		count += 1;
	            	}
	            }
	             $('.settlement').find('.there').find('.good_bumber').html(count).css({"color":"orangered"});;
	            //点击减少数量
	             var $goodul = $list_div.find('.good_ul');
	             
	             $goodul.on('click','.jian',function(){
	             	
	             	var i = $(this).closest('ul').index()-1;
	             	
	             	var unit_price = $list_div.find('.good_ul').eq(i).find('.good_li7').html();
	             	var num = $list_div.find('.good_ul').eq(i).find('.txt').html();
	             	num1 = num - 0 - 1;
	             	if(num1 == 0){
	             		num1 = 1;
	             	}
//	             	console.log(num);
	             	$list_div.find('.good_ul').eq(i).find('.txt').html(num1);
	             	$list_div.find('.good_ul').eq(i).find('.good_li7').html((unit_price/num)*num1);
	             	paytotal();
	             });
	             //点击添加数量
	             $goodul.on('click','.jia',function(){
	             	var i = $(this).closest('ul').index()-1;
	             	var unit_price = $list_div.find('.good_ul').eq(i).find('.good_li7').html();
	             	var num = $list_div.find('.good_ul').eq(i).find('.txt').html();
	             	num1 = num-0+ 1;
	             	console.log(num);
	             	$list_div.find('.good_ul').eq(i).find('.txt').html(num1);
	             	$list_div.find('.good_ul').eq(i).find('.good_li7').html((unit_price/num)*num1);
	             	paytotal();
	             });
	             
	             //点击删除
	             $goodul.on('click','.good_a',function(){
	             	var i = $(this).closest('ul').index()-1;
	             	$list_div.find('.good_ul').eq(i).remove();
	             	goods_message_get.splice(0,1);
	             	console.log(goods_message_get.length);
	             	if(goods_message_get.length == 0){
	             		var d = new Date();
	             		goods_message_get = JSON.stringify(goods_message_get);
	             		setCookie("goods_message",goods_message_get,d,"/");
	             	}else{
	             		goods_message_get = JSON.stringify(goods_message_get);
	 		            var d=new Date;
					    d.setDate(d.getDate() + 10);
					    setCookie("goods_message",goods_message_get,d,"/");
	             	}
	             })
	             //清空购物车
	             var $clearAll = $('.settlement').find('.clear').find('a');
	             $clearAll.click(function(){
	             	$list_div.find('.good_ul').remove();
	             	var d=new Date;
	             	goods_message_get = JSON.stringify(goods_message_get);
					setCookie("goods_message",goods_message_get,d,"/");
	             })
	        }
	         
		}
	});
	 
})
