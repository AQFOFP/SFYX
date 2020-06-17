$(function(){
	//top部分-------------------------------------------------------

	$("#ee").mouseover(function(){
		$(this).find("img").attr("src","/static/img/up1.png");
		$(this).find("#address").css({"display":"block","cursor":"pointer"});
	})
	$("#ee").mouseout(function(){
		$(this).find("img").attr("src","/static/img/up.png");
		$(this).find("#address").css("display","none");
	})
	$("#address").find("li").click(function(){
		$("#ee").find("i").html($(this).html());
	})
	$("#address").find("span").click(function(){
		$("#ee").find("i").html($(this).html());
	})
	$(".li1").mouseover(function(){
		$(this).css({"background":"#fff",});
		$(this).find("img").attr("src","/static/img/up1.png");
		$(this).find("ul").css("display","block");
	})
	$(".li1").mouseout(function(){
		$(this).css({"background":"none","border":"none",});
		$(this).find("img").attr("src","/static/img/up.png");
		$(this).find("ul").css("display","none");
	})
	$("#li4").mouseover(function(){
		$(this).css({"background":" url(/static/img/up2.png) no-repeat","background-position":"bottom"});
		$(this).find("#img1").attr("src","/static/img/green_small_phone.png");
		$(this).find("#box").css("display","block");
	})
	$("#li4").mouseout(function(){
		
		$(this).css({"background":"none","border":"none",});
		$(this).find("#img1").attr("src","/static/img/smallphone.png");
		$(this).find("#box").css("display","none");
	})
	//top1部分-------------------------------------------------------
	setInterval(function(){
		$("#pic").find("img").toggle()
	},500)
	$("#header>span").mouseover(function(){
		$(this).find(".car").css({"display":"block"})
		$(this).css({"border-bottom":"none"})
	})
	$("#header>span").mouseout(function(){
		$(this).find(".car").css({"display":"none"})
		$(this).css({"border-bottom":"1px solid silver"})
	})
	//fast部分-------------------------------------------------------
	$("#li5").mouseover(function(){
		$(this).css("background","url(/static/img/bgcar0.png ) no-repeat center center #a9a9a9")
		$(this).find("#car2").css({"display":"block","right":"50px","bottom":"0","background":"#fff","border-top":"1px solid silver" ,"font-size":"12px","color":"#979797"})
		$(this).find("#car2").find("p").css("margin","0");
	})
	$("#li5").mouseout(function(){
		$(this).css("background"," url(/static/img/car0.png) no-repeat center center #f8f8f8")
		$(this).find("#car2").css({"display":"none"});
	})
	$("#li6").mouseover(function(){
		$(this).css("background","url(/static/img/bgfoot.png) no-repeat center center #a9a9a9");
		$(this).find("#box2").css({"display":"block"})
	})
	$("#li6").mouseout(function(){
		$(this).css("background"," url(/static/img/foot.png) no-repeat center center #f8f8f8");
		$(this).find("#box2").css({"display":"none"})
	})
	$("#li7").mouseover(function(){
		$(this).css("background","url(/static/img/bgbig_phone.png) no-repeat center center #a9a9a9")
		$(this).find("#box1").css({"display":"block"})
	})
	$("#li7").mouseout(function(){
		$(this).css("background"," url(/static/img/bigphone.png) no-repeat center center #f8f8f8")
		$(this).find("#box1").css({"display":"none"})
	})
	$("#li8").mouseover(function(){
		$(this).css("background","url(/static/img/bgtop.png)  no-repeat center center #a9a9a9")
	})
	$("#li8").mouseout(function(){
		$(this).css("background"," url(/static/img/top.png) no-repeat center center #f8f8f8")
	})
})
//当滚动条的位置处于距顶部100像素以下时，跳转按钮出现，否则消失 
$(function () { 
	$(window).scroll(function(){ 
	if ($(window).scrollTop()>100){ 
	$("#li8").fadeIn(1500); 
	} 
	else 
	{ 
	$("#li8").fadeOut(1500); 
	} 
	}); 
	//当点击跳转链接后，回到页面顶部位置 
	$("#li8").click(function(){ 
	$('body,html').animate({scrollTop:0},1000); 
	return false; 
	}) 
})