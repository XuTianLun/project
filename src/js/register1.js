jQuery(function($){
			$('#_footer').load('footer.html');
		});
		
		jQuery(function($){
			 var oldusername = getCookie("username");
//			 var oldpassword = getCookie("password");
             if(oldusername){
			 $('#username').val(oldusername);
			 }
             
             $('#register').submit(function(){
             	
             	var username = $('#username').val();
				var pwd = $('.password').val();
				var istrue = true;
				$.ajax({
					type:"get",
					url:"/project/src/json/username.json",
					async:false,
					success:function(res){
						console.log(res);
						$.each(res, function(idx,item) {
							if(item.username == username && item.pwd == pwd){
								
								    if($('#checkBox').prop('checked') == true){
				   
								    var d=new Date;
									d.setDate(d.getDate() + 10);
									setCookie("username",username,d,"/");
									setCookie("password",pwd,d,"/");
									istrue = false;
									}else{
								    var d=new Date;
									d.setDate(d.getDate() + 1);
									setCookie("username",username,d,"/");
									setCookie("password",pwd,d,"/");
									istrue = false;
									}
							}
						});
					}
				});
				if(istrue){
					$('#register').find('.clear').html('用户名或密码有误').css({"color":"red"});
					setTimeout(function(){
									$('#register').find('.clear').html("");
								},5000);
					return false;
				}
				   
             })
		});