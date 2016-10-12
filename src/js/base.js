//         封装三个方法
//           instanceof:判断是否属于某个类型
     //设置cookie
      function setCookie(name,value,expires,path,domain,secure){
//   	name=value
           var cookieText = name+"="+value;
           if(expires instanceof Date){
           	cookieText +=";expires="+expires;
           }
           if(path){
           	cookieText+=";path="+path;
           }
           if(domain){
           	cookieText +=";domain="+domain;
           }
           if(secure){
           	cookieText +=";secure";
           }
           document.cookie = cookieText;
           return document.cookie;
     }
      //   获取cookie
        function getCookie(name){
        	var cookie = document.cookie;
        	var arr = cookie.split("; ");  //;加空格，可视情况改变
        	for(var i=0; i<arr.length;i++)
        	{
        		var arr2 = arr[i].split("=");
        		if(arr2.length >=2){
        			if(arr2[0] == name){
        				return arr2[1];
        			}
        		}
        		
        	}
        	return "";
        }
        //删除cookie
        function removeCookie(name){
        	var d = new Date();
        	 document.cookie = name+"=;expires="+d;
        	return document.cookie;
        	
        }