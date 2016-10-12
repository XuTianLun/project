jQuery(function($){
	$.ajax({
		type:"get",
		url:"/data/goodlist.json",
		async:true,
		success : function(res){
			console.log(res);
			var goods_message_get = getCookie("goods_message");
			 if(goods_message_get){//cookies存在时
			 	var goods_message_get = JSON.parse(goods_message_get);//解析
			 	console.log(goods_message_get);
	         $.each(res, function(idx,item) {
	  	             for(var i = 0;i<goods_message_get.length;i++){//当cookie所存的id与json的id相等时
	  	             	
	  	             	if(goods_message_get[i].goodid == item.id){
	  	             		var $ul = $('<ul/>').addClass('good_ul');
	  	             		var $li = $('<li/>').appendTo($ul);
	  	             		var $li2 = $('<li/>').html(goods_message_get[i].goodname).addClass('good_li').appendTo($ul);
	  	             		
	  	             	}
	  	             }
	  	             
	               
	         });
	        }
	         
		}
	});
	 
})
