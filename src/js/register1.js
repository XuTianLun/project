jQuery(function($){
			$('#_footer').load('footer.html');
		});
		
		jQuery(function($){
			 var oldusername = getCookie("username");
			 var oldpassword = getCookie("password");
             if(oldusername){
			 $('#username').val(oldusername);
			 }
             if(oldpassword){
             	$('#password').val(oldpassword);
             }
             $('form').submit(function(){
             	var username = $('#username').val();
				var pwd = $('.password').val();
				var istrue = true;
				//json文件模拟后台数据，与username.json中的数据相同，则可以登录
				$.ajax({
					type:"get",
					url:"/project/src/json/username.json",
					async:false,
					success:function(res){
						console.log(res);
						$.each(res, function(idx,item) {
							//判断数据是否相同
							if(item.username == username && item.pwd == pwd){
								
								    if($('#checkBox').prop('checked') == true){//判断复选框是否被勾选
				   
								    var d=new Date;
									d.setDate(d.getDate() + 10);
									setCookie("username",username,d,"/");
									setCookie("password",pwd,d,"/");
									istrue = false;
									}else{
								    var d=new Date;
//									d.setDate(d.getDate() + 1);
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
//				   
            });
		});