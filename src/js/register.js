jQuery(function($){
//			$('#_footer').load('footer.html');
		});
		jQuery(function($){
			 var oldusername = getCookie("username");
			 var oldpassword = getCookie("password");
             if(oldusername){
			 $('#mobile_phone').val(oldusername);
			 }
             if(oldpassword){
             	$('#password').val(oldpassword);
             }
			
		    var $register = $('#register');
		    var isfalse = false;//用于判断表单输入框是否全部正确
		    var isphone = true;//判断是手机注册还是邮箱注册
		    var arr =[];
		  
		    for(var i = 0;i < 4;i++){
		    	arr[i] = isfalse;
		    }
		    var arr1 = [];
		    for(var j = 0;j < 3;j++){
		    	arr1[j] = isfalse;
		    }
		    
		    //邮箱注册
		    $register.find('.re_method_now1').click(function(){
		    	$(this).css({"color":"orange"}).siblings().css({"color":"#fff"});
		    	$register.find('.re_con').css({"display":"none"});
		    	$register.find('.clear1').css({"display":"none"});
		    	$register.find('.clear_email').css({"display":"block"});
		    	$register.find('.re_con1').css({"display":"block"});
		    	$register.find('.clear2').css({"display":"none"});
		    	$register.find('.re_con2').css({"display":"none"});
		    });
		    //手机注册
		    $register.find('.re_method_now').click(function(){
		    	$(this).css({"color":"orange"}).siblings().css({"color":"#fff"});
		    	$register.find('.re_con').css({"display":"block"});
		    	$register.find('.clear1').css({"display":"block"});
		    	$register.find('.clear_email').css({"display":"none"});
		    	$register.find('.re_con1').css({"display":"none"});
		    	$register.find('.clear2').css({"display":"block"});
		    	$register.find('.re_con2').css({"display":"block"});
		    });
		    
		    //验证手机号码
		    $('#mobile_phone').blur(function(){
		    	var num = $(this).val();
		    	if(num!=""){
		    	var istrue = /^[1-3]\d{10}$/.test(num);
		    	if(istrue){
		    		$register.find('.clear1').find('.msg_tips').html("输入正确").css({"color":"green"});
		    		arr[0] = true;
		    		isphone = true;
           	  	}
           	  	else{
           	  		$register.find('.clear1').find('.msg_tips').html("手机号码不正确").css({"color":"red"});
		    		arr[0] = false;
           	  		
           	  	}
           	  }
		    });
		    //获取验证码
		    var code ="";
		    $('#get_phone_button').click(function(){
		    	code ="";
		    	for(var i = 0;i < 4;i++){
		    		code += parseInt(Math.random()*10);
		    	}
		    	alert('您的验证码为    '+code);
		    });
		    //验证验证码
		    $('#mobile_phone_code').blur(function(){
		    	var code1 = $('#mobile_phone_code').val();
		    	if(code1!=""){
		    	if(code1 != code){
		    		$register.find('.clear2').find('.msg_tips').html("验证码不正确").css({"color":"red"});
		    		arr[1] = false;
		    	}else{
		    		$register.find('.clear2').find('.msg_tips').html("验证码正确").css({"color":"green"});
		    		arr[1] = true;
		    	}
		    	}
		    });
		    
		    //检验邮箱
		    $('#email').blur(function(){
		    	var address = $(this).val();
		    	var istrue = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(address);
		    	if(istrue){
		    		$register.find('.clear_email').find('.msg_tips').html("邮箱格式正确").css({"color":"green"});
		    		arr1[0] = true;
		    		isphone = false;
		    	}else{
		    		$register.find('.clear_email').find('.msg_tips').html("邮箱格式不正确").css({"color":"red"});
		    		arr1[0] = false;
		    	}
		    });
		    //验证密码
		    $('#password').blur(function(){
		    	var pwd = $(this).val();
		    	if(pwd!=""){
           	  	var istrue = /\w{6,20}/gi.test(pwd);
           	  if(istrue){
           	  		$register.find('.clear3').find('.msg_tips').html("密码格式正确").css({"color":"green"});
           	  		arr[2] = true;
           	  		arr1[1] = true;
           	  	}
           	  	else{
           	  		$register.find('.clear3').find('.msg_tips').html("密码格式不正确").css({"color":"red"});
           	  		arr[2] = false;
           	  		arr1[1] = false;
           	  	}
           	 }
		    });
		    
		    //验证重复密码
		    $('#password_confirm').blur(function(){
		    	var pwd_confirm = $(this).val();
		    	var pwd = $('#password').val();
		    	if(pwd!=""){
		    	if(pwd == pwd_confirm){
		    		$register.find('.clear4').find('.msg_tips').html("密码确认成功").css({"color":"green"});
		    		arr[3] = true;
		    		arr1[2] = true;
		    	}else{
		    		$register.find('.clear4').find('.msg_tips').html("两次密码不一致").css({"color":"red"});
		    		arr[3] = false;
		    		arr1[2] = false;
		    	}
		       }
		    });
		    //注册,若可以注册，创建cookei
		    $('#register').submit(function(){
	        
	   
		    	//手机注册
		    	if(isphone == true){
		    	var username = $('#mobile_phone').val();
				var pwd = $('#password').val();
				var issubmit = false;
				
		    	for(var i = 0;i<arr.length;i++){
		    		if(arr[i] == false){
		    			$register.find('.clear').find('.msg_tips').html('无法注册，请正确填写信息').css({"color":"red"});
		    			setTimeout(function(){
		    				$register.find('.clear').find('.msg_tips').html("");
		    			},5000);
		    			return false;
		    		}
		    		issubmit = true;
		    	};
		    	if(issubmit == true){
		    		var d=new Date;
					d.setDate(d.getDate() + 10);
					setCookie("username",username,d,"/");
					setCookie("password",pwd,d,"/");
		    		}
		    }
		    	//邮箱注册
		    	if(isphone == false){
		    	var username = $('#email').val();
		    	var pwd = $('#password').val();
		    	var issubmit = false;
		    	for(var j = 0;j<arr1.length;j++){
		    		if(arr1[i] == false){
		    			$register.find('.clear').find('.msg_tips').html('无法注册，请正确填写信息').css({"color":"red"});
		    			setTimeout(function(){
		    				$register.find('.clear').find('.msg_tips').html("");
		    			},5000);
		    			return false;
		    		}
		    		issubmit = true;
		    	  }
		    	if(issubmit == true){
		    		var d=new Date;
					d.setDate(d.getDate() + 10);
					console.log(d);
					setCookie("username",username,d,"/");
					setCookie("password",pwd,d,"/");
		    		}
		    	}
		    });
		    
		});