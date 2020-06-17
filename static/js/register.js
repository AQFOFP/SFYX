$(function(){
	$('input').focus(function () {
		$('#errmsg').html('')
	})
    //--------------------------手机号码部分验证---------------------------
	var reg1=/^[1][358][0-9]{9}$/g;
	$("input").eq(1).focus(function(){
		$(this).css("background","none");
		$(this).siblings("em").eq(0).show();
		$(this).siblings("em").eq(0).html("请输入您的手机号码");
		$(this).css("border-color","#76AB25")
		$(this).siblings("em").eq(0).css("color","#979797")
	});
	$("input").eq(1).blur(function(){
		if($(this).val().match(reg1)){
			$(this).css("background","url(/static/img/right.png) no-repeat right center");
			$(this).siblings("em").eq(0).hide();
			$(this).css("border-color","silver")
		}else{
			$(this).siblings("em").eq(0).html("请输入正确的手机号码")
			$(this).siblings("em").eq(0).css("color","red")
			$(this).css("border-color","red")
		}
	})
	  //--------------------------登录密码部分验证---------------------------
	var reg2 = /^\w{6,20}$/g;
	$("input").eq(2).focus(function(){
		$(this).css("background","none");
		$(this).siblings("em").eq(1).show();
		$(this).siblings("em").eq(1).html("6-20位字符，可以使用数字字母下划线。不建议使用纯数字和字母组合");
		$(this).css("border-color","#76AB25")
		$(this).siblings("em").eq(1).css("color","#979797")
	});
	$("input").eq(2).blur(function(){
		if($(this).val().match(reg2)){
			$(this).css("background","url(/static/img/right.png) no-repeat right center");
			$(this).siblings("em").eq(1).hide();
			$(this).css("border-color","silver")
			if($(this).val().length>=6&&$(this).val().length<10){
				$("#person li").eq(0).siblings("li").css("background","silver");
				$("#person li").eq(0).css("background","red");
				$("input").eq(1).siblings("em").eq(1).show();
				$("input").eq(1).siblings("em").eq(1).html("密码太简单，建议使用数字、字母、下划线组合");
				
				
			}else if($(this).val().length>=10&&$(this).val().length<15){
				$("#person li").eq(1).siblings("li").css("background","silver");
				$("#person li").eq(1).css("background","yellow");
				
				$("input").eq(1).siblings("em").eq(1).show();
				$("input").eq(1).siblings("em").eq(1).html("密码太简单，建议使用数字、字母、下划线组合");
			}else if($(this).val().length>=15&&$(this).val().length<20){
				$("#person li").eq(2).siblings("li").css("background","silver");
				$("#person li").eq(2).css("background","green");
			}
			
		}else{
			$(this).siblings("em").eq(1).html("密码只能为6-20位字母数字下划线组合")
			$(this).siblings("em").eq(1).css("color","red")
			$(this).css("border-color","red")
		}
	})
    //--------------------------密码确认部分验证---------------------------
	$("input").eq(3).focus(function(){
		$(this).css("background","none");
		$(this).siblings("em").eq(2).show();
		$(this).siblings("em").eq(2).html("请再次输入密码");
		$(this).css("border-color","#76AB25")
		$(this).siblings("em").eq(2).css("color","#979797")
	});
	$("input").eq(3).blur(function(){
		if($(this).val()==$("input").eq(2).val()&&$(this).val().length!=0){
			$(this).css("background","url(/static/img/right.png) no-repeat right center");
			$(this).siblings("em").eq(2).hide();
			$(this).css("border-color","silver")
		}else{
			$(this).siblings("em").eq(2).html("两次输入密码不一致")
			$(this).siblings("em").eq(2).css("color","red")
			$(this).css("border-color","red")
		}
	})
	 //--------------------------验证码部分验证---------------------------
	  //加载生成验证码方法  
	  	$.idcode.setCode();
	 $("input").eq(4).focus(function(){
 
		$(this).siblings("em").eq(3).show();
		$(this).siblings("em").eq(3).html("请输入验证码");
		$(this).css("border-color","#76AB25")
		$(this).siblings("em").eq(3).css("color","#979797")
	});
	$("input").eq(4).blur(function(){
		var IsBy = $.idcode.validateCode()  //调用返回值，返回值结果为true或者false
		if(IsBy){
			$(this).css("border-color","silver")
			$(this).siblings("em").eq(3).html("验证码输入正确");
		}else{
			$(this).siblings("em").eq(3).html("验证码输入不正确");
			$(this).siblings("em").eq(3).css("color","red")
			$(this).css("border-color","red")
		}
	})
	//--------------------------注册并保存到cookie(person部分)---------------------------
	//如果已经存在该用户, 不能注册
				//不存在则注册, 保存到cookie
				
	$(".butn").eq(0).click(function()
		{
			if(
				$("#person em").eq(0).html().length!=0&&
				$("#person em").eq(1).html().length!=0&&
				$("#person em").eq(2).html().length!=0&&
				$("#person em").eq(3).html().length!=0&&
				$("#person em").eq(0).html()!="请输入正确的手机号码"&&
				$("#person em").eq(1).html()!="密码只能为6-20位字母数字下划线组合"&&
				$("#person em").eq(2).html()!="两次输入密码不一致"&&
				$("#person em").eq(3).html()!="验证码输入不正确"
			)
			{
				var username= $('#username').val()
				var password= $('#password').val()
				var password2= $('#repassword').val()
				$.ajax({
					type:'POST',
					url:'/register/',
					data:{'username':username, 'password':password, 'password2':password2},
					headers:{'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()},
					success:function (msg) {
						if (msg.code == -1){
							$('#errmsg').html(msg.status)
						}
						else{
							alert("注册成功")
							location.href='/index/'
						}

					}
				})

				// 	//注册(cookie存储)
				// var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
				// //先判断是否存在该用户
				// for (var i=0; i<users.length; i++) {
				// 	if ( users[i].name == $("input").eq(0).val() ) {
				// 		alert("用户名已存在! 不能注册相同的用户");
				// 		return;
				// 	}
				// }
				// //注册用户
				// var user = {
				// 	name:$("input").eq(0).val(),
				// 	pwd: $("input").eq(1).val()
				// }
				// users.push(user);
				// $.cookie("users", JSON.stringify(users), {expires:22, path:"/"});
				// console.log( $.cookie("users") );
				// if(confirm("您已注册成功！账号为"+$("input").eq(0).val()+"，快去登录吧")){
				// 	location='../html/login.html';
				// }
			}
			else{
				alert("请输入正确信息！");
				return false
			}
	})
				
})
$(function(){
//---------------------------切换显示-----------------------------------------------
	$("#span1").click(function(){
		$("#enterprise").hide();
		$("#span2").removeClass().addClass("active2")
		$("#person").show();
		$("#span1").removeClass().addClass("active1")
	})
	$("#span2").click(function(){
		$("#person").hide();
		$("#span1").removeClass().addClass("active2")
		$("#enterprise").show();
		$("#span2").removeClass().addClass("active1")

	})
})
//--------------------------enterprise部分-----------------------------------
$(function(){
//--------------------------账户信息部分验证-----------------------------------
	$("#enterprise input").eq(0).focus(function(){
		$(this).css("background","none");
		$(this).parent().siblings("dd").show();
		$(this).parent().siblings("dd").html("请输入4-20位中、英文、数字、中划线和下划线")
		$(this).parent().siblings("dd").css("color","#646464")
		$(this).css("border","1px solid #669801");
	
	})

	var reg5=/^[0-9]*$/g
	$("#enterprise input").eq(0).blur(function(){
		if($(this).val().match(reg5)){
			$(this).parent().siblings("dd").html("用户名不能全部为数字")
			$(this).parent().siblings("dd").css("color","red")
			$(this).css("border","1px solid red");
		}else if($(this).val().length<4||$(this).val().length>20){
			$(this).parent().siblings("dd").html("用户名长度不得小于4大于20个字符")
			$(this).parent().siblings("dd").css("color","red")
			$(this).css("border","1px solid red");
		}else{
			$(this).css("background","url(../img/right.png) no-repeat right center");
			$(this).parent().siblings("dd").hide();
			$(this).css("border","1px solid silver");
		}
	})
})
 //--------------------------登录密码部分验证---------------------------
	$(function(){
		$("#enterprise input").eq(1).focus(function(){
		$(this).css("background","none");
		$(this).parent().siblings("dd").show();
		$(this).parent().siblings("dd").css("color","#646464")
		$(this).parent().siblings("dd").html("6-20位字符，可以使用数字字母下划线。不建议使用纯数字和字母组合");
		$(this).css("border","1px solid #669801");
	});
	var reg2 = /^\w{6,20}$/g;
	$("#enterprise input").eq(1).blur(function(){
		if($(this).val().match(reg2)){
			$(this).css("background","url(../img/right.png) no-repeat right center");
			$(this).parent().siblings("dd").hide();
			$(this).css("border-color","silver")
		}else{
			$(this).parent().siblings("dd").html("密码只能为6-20位字母数字下划线组合")
			$(this).parent().siblings("dd").css("color","red")
			$(this).css("border-color","red")
		}
	})
	})
	//--------------------------确认密码部分验证---------------------------
	$(function(){
		$("#enterprise input").eq(2).focus(function(){
		$(this).css("background","none");
		$(this).parent().siblings("dd").show();
		$(this).parent().siblings("dd").css("color","#646464");
		$(this).parent().siblings("dd").html("请再次输入密码");
		$(this).css("border","1px solid #669801");
	});
	$("#enterprise input").eq(2).blur(function(){
		if($(this).val()==$("#enterprise input").eq(1).val()&&$(this).val().length!=0){
			$(this).css("background","url(../img/right.png) no-repeat right center");
			$(this).parent().siblings("dd").hide();
			$(this).css("border-color","silver")
		}else{
			$(this).parent().siblings("dd").html("两次密码输入不一致");
			$(this).parent().siblings("dd").css("color","red");
			$(this).css("border-color","red");
		}
	})
	})
	$(function(){
		//--------------------------联系人姓名部分验证-----------------------------------
$("#enterprise input").eq(3).focus(function(){
	$(this).css("background","none");
	$(this).parent().siblings("dd").show();
	$(this).parent().siblings("dd").html("4-20位字符，可由中英文构成")
	$(this).parent().siblings("dd").css("color","#646464")
	$(this).css("border","1px solid #669801");
	
})
var reg5=/^[0-9]*$/g
$("#enterprise input").eq(3).blur(function(){
	if($(this).val().match(reg5)){
		$(this).parent().siblings("dd").html("用户名不能全部为数字")
		$(this).parent().siblings("dd").css("color","red")
		$(this).css("border","1px solid red");
	}else if($(this).val().length<4||$(this).val().length>20){
		$(this).parent().siblings("dd").html("用户名长度不得小于4大于20个字符")
		$(this).parent().siblings("dd").css("color","red")
		$(this).css("border","1px solid red");
	}else{
		$(this).css("background","url(../img/right.png) no-repeat right center");
		$(this).parent().siblings("dd").hide();
		$(this).css("border","1px solid silver");
	}
})
	})

//--------------------------固定电话信息部分验证-----------------------------------
$(function(){
	$("#enterprise input").eq(4).focus(function(){
	$(this).css("background","none");
	$(this).parent().siblings("dd").show();
	$(this).parent().siblings("dd").html("请填写联系人常用固定电话，如010-873424242")
	$(this).parent().siblings("dd").css("color","#646464")
	$(this).css("border","1px solid #669801");
	
})
var reg4=/^[\d]{3,4}-[\d]{7,9}$/g
$("#enterprise input").eq(4).blur(function(){
	if($(this).val().match(reg4)){
		$(this).css("background","url(../img/right.png) no-repeat right center");
		$(this).parent().siblings("dd").hide();
		$(this).css("border","1px solid silver");
	}else{
		$(this).parent().siblings("dd").html("公司电话错误")
		$(this).parent().siblings("dd").css("color","red")
		$(this).css("border","1px solid red");
	}
})
})
//--------------------------手机号码部分验证-----------------------------------
var reg11=/^[1][358][0-9]{9}$/g;
$(function(){
	$("#enterprise input").eq(5).focus(function(){
	$(this).css("background","none");
	$(this).parent().siblings("dd").show();
	$(this).parent().siblings("dd").html("请输入联系人手机号码")
	$(this).parent().siblings("dd").css("color","#646464")
	$(this).css("border","1px solid #669801");
	
})
$("#enterprise input").eq(5).blur(function(){
	if($(this).val().match(reg11)){
		$(this).css("background","url(../img/right.png) no-repeat right center");
		$(this).parent().siblings("dd").hide();
		$(this).css("border","1px solid silver");
	}else{
		$(this).parent().siblings("dd").html("公司手机号码错误")
		$(this).parent().siblings("dd").css("color","red")
		$(this).css("border","1px solid red");
	}
})
})
//--------------------------手机号码部分验证-----------------------------------
var reg1=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g;
$(function(){
	$("#enterprise input").eq(6).focus(function(){
	$(this).css("background","none");
	$(this).parent().siblings("dd").show();
	$(this).parent().siblings("dd").html("请输入联系人常用邮箱")
	$(this).parent().siblings("dd").css("color","#646464")
	$(this).css("border","1px solid #669801");
	
})
$("#enterprise input").eq(6).blur(function(){
	if($(this).val().match(reg1)){
		$(this).css("background","url(../img/right.png) no-repeat right center");
		$(this).parent().siblings("dd").hide();
		$(this).css("border","1px solid silver");
	}else{
		$(this).parent().siblings("dd").html("公司邮箱错误")
		$(this).parent().siblings("dd").css("color","red")
		$(this).css("border","1px solid red");
	}
})
})
//--------------------------公司名称部分验证-----------------------------------
var reg7= /^\w{4,20}$/g;
$(function(){
	$("#enterprise input").eq(7).focus(function(){
	$(this).css("background","none");
	$(this).parent().siblings("dd").show();
	$(this).parent().siblings("dd").html("请填写工商局注册全称，4-20个字符")
	$(this).parent().siblings("dd").css("color","#646464")
	$(this).css("border","1px solid #669801");
	
})
$("#enterprise input").eq(7).blur(function(){
	if($(this).val().match(reg7)){
		$(this).css("background","url(../img/right.png) no-repeat right center");
		$(this).parent().siblings("dd").hide();
		$(this).css("border","1px solid silver");
	}else{
		$(this).parent().siblings("dd").html("公司名称错误")
		$(this).parent().siblings("dd").css("color","red")
		$(this).css("border","1px solid red");
	}
})
})
//--------------------------公司地址部分验证-----------------------------------
var reg8= /^\w+$/g;
$(function(){
	$("#enterprise input").eq(8).focus(function(){
	$(this).css("background","none");
	$(this).parent().siblings(".ddd").show();
	$(this).parent().siblings(".ddd").html("请填写公司经营地址")
	$(this).parent().siblings(".ddd").css("color","#646464")
	$(this).css("border","1px solid #669801");
	
})
$("#enterprise input").eq(8).blur(function(){
	if($(this).val().match(reg8)){
		$(this).css("background","url(../img/right.png) no-repeat right center");
		$(this).parent().siblings(".ddd").hide();
		$(this).css("border","1px solid silver");
	}else{
		$(this).parent().siblings(".ddd").html("公司地址错误")
		$(this).parent().siblings(".ddd").css("color","red")
		$(this).css("border","1px solid red");
	}
})
})
//--------------------------公司网址部分验证-----------------------------------
var reg9=/^(?:http(?:s|):\/\/|)(?:(?:\w*?)\.|)(?:\w*?)\.(?:\w{2,4})(?:\?.*|\/.*|)$/g;
$(function(){
	$("#enterprise input").eq(15).focus(function(){
	$(this).css("background","none");
	$(this).parent().siblings(".ddd").show();
	$(this).parent().siblings(".ddd").html("如 http://www.sfbest.com/");
	$(this).parent().siblings(".ddd").css("color","#646464")
	$(this).css("border","1px solid #669801");
	
})
$("#enterprise input").eq(15).blur(function(){
	if($(this).val().match(reg9)){
		$(this).css("background","url(../img/right.png) no-repeat right center");
		$(this).parent().siblings(".ddd").hide();
		$(this).css("border","1px solid silver");
	}else{
		$(this).parent().siblings(".ddd").html("公司网址格式不正确，应如: http://www.sfbest.com/")
		$(this).parent().siblings(".ddd").css("color","red")
		$(this).css("border","1px solid red");
	}
})
})
$(function(){
	//-------------------------------验证码提示部分----------------------------------------
	$.idcode.setCode();
 $("#enterprise input").eq(16).focus(function(){
 		
		$(this).siblings("#ee2").show();
		$(this).siblings("#ee2").html("请输入验证码");
		$(this).css("border-color","#76AB25")
		$(this).siblings("#ee2").css("color","#979797")
	});
	 $("#enterprise input").eq(16).blur(function(){
	 
		//var xx = $.idcode.validateCode()  //调用返回值，返回值结果为true或者false
		if(1){
			$(this).css("border-color","silver")
			$(this).siblings("#ee2").html("验证码输入正确");
		}else{
			$(this).siblings("#ee2").html("验证码输入不正确");
			$(this).siblings("#ee2").css("color","red")
			$(this).css("border-color","red")
		}
	})
})


$(function(){
//--------------------------注册并保存到cookie(person部分)---------------------------
	//如果已经存在该用户, 不能注册
				//不存在则注册, 保存到cookie
			
				
				$(".butn").eq(1).click(function(){
					if($(".ddd").eq(0).html().length!=0&&
					$(".ddd").eq(1).html().length!=0&&
					$(".ddd").eq(2).html().length!=0&&
					$(".ddd").eq(3).html().length!=0&&
					$(".ddd").eq(4).html().length!=0&&
					$(".ddd").eq(5).html().length!=0&&
					$(".ddd").eq(6).html().length!=0&&
					$(".ddd").eq(7).html().length!=0&&
					$(".ddd").eq(8).html().length!=0&&
					$(".ddd").eq(9).html().length!=0&&
					$(".ddd").eq(0).html()!="用户名不能全部为数字"&&
					$(".ddd").eq(0).html()!="用户名长度不得小于4大于20个字符"&&
					$(".ddd").eq(1).html()!="密码只能为6-20位字母数字下划线组合"&&
					$(".ddd").eq(2).html()!="两次密码输入不一致"&&
					$(".ddd").eq(3).html()!="用户名不能全部为数字"&&
					$(".ddd").eq(3).html()!="用户名长度不得小于4大于20个字符"&&
					$(".ddd").eq(4).html()!="公司电话错误"&&
					$(".ddd").eq(5).html()!="公司手机号码错误"&&
					$(".ddd").eq(6).html()!="公司邮箱错误"&&
					$(".ddd").eq(7).html()!="公司名称错误"&&
					$(".ddd").eq(8).html()!="公司地址错误"&&
					$(".ddd").eq(9).html()!="公司网址格式不正确，应如: http://www.sfbest.com/"&&
					$("#ee2").html().length!=0&&
					$(".ddd").eq(0).html()!="验证码输入不正确"
					){
						//注册(cookie存储)
					var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
					//先判断是否存在该用户
					for (var i=0; i<users.length; i++) {
						if ( users[i].name == $("#enterprise input").eq(0).val() ) {
							alert("用户名已存在! 不能注册相同的用户");
							return;
						}
					}
					//注册用户
					var user = {
						name:$("input").eq(0).val(),
						pwd: $("input").eq(1).val()
					}
					users.push(user); 
					$.cookie("users", JSON.stringify(users), {expires:22, path:"/"});
					console.log( $.cookie("users") );
					if(confirm("您已注册成功！账号为"+$("input").eq(0).val()+"，快去登录吧")){
						location='../html/login.html';
					}
					}else{
						alert("请输入正确信息！")
					}
				})

})













