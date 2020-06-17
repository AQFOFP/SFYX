//-----------------------------去注册---------------------------------
$(function(){
	$("#to_register").mouseenter(function(){
	$(this).css("cursor","pointer")
})
$("#to_register").click(function(){
	location='/register';
})
})

//-----------------------------切换部分-------------------------------
$(function(){
		$("li").click(function(){
			$(this).css("border-bottom","none")
			$(this).siblings().css("border-bottom","1px solid silver")
			var index = $(this).index();
			$(".box").eq(index).siblings(".box").hide();
			$(".box").eq(index).show();
		})
})
//-----------------------------用户名和密码部分----------------------
//-----------------------------验证码校验-------------------------------
$(function(){
	$.idcode.setCode();

	//判断是否存在该用户(匹配用户名和密码是否都一致)
	$(".btn").click(function(){

		var index = $(this).index(".btn");
		var IsBy = $.idcode.validateCode(index)  //调用返回值，返回值结果为true或者false
		if (IsBy){
			var phone = $('.name').val()
			var password = $('.pwd').val()
			$.ajax({
				type:'POST',
				async: true,
				url:'/login/',
				data:{'phone':phone, 'password':password},
				headers: {'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()},
				success:function (msg) {
					console.log(typeof msg)
					console.log(typeof msg.code)
					if (msg.code==-1){
						$('.errmsg').html(msg.status)
					}
					else {
						location.href='/index/'
					}
				}
			})
			return false
		}
		else{
			$(".Txtidcode").eq(index).siblings(".wrong").show();
			return false
		}
		
	})

	$('input').focus(function () {
		$('.errmsg').html('')
	})

})
