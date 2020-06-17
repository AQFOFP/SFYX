$(function() {

	//------------------------------content1部分样式变化---------------------------------------------------

	$("#ul3>li").mouseover(function() {
		$(this).css({
			"background": "#F90",
			"opacity": "0.5"
		})
	})
	$("#ul3>li").mouseout(function() {
		$(this).css({
			"background": "#979797",
			"opacity": "0.5"
		})
	})
	$("#ul4>li").mouseover(function() {
		var index = $(this).index() + 1;
		$(this).find(".box1").show();
		$(this).css({
			"background": "url(/static/img/bg" + index + ".png) no-repeat 5px center #fff"
		})
		$(this).find("p a").css({
			"color": "#669801"
		})
	})
	$("#ul4>li").mouseout(function() {
			var index = $(this).index() + 1;
			$(this).find(".box1").hide();
			$(this).css({
				"background": "url(/static/img/" + index + ".png) no-repeat 5px center #76AB25"
			})
			$(this).find("p a").css({
				"color": "#fff"
			})
		})
		//-------------------------------轮播图部分-----------------------------------------------------------
		//遍历, 添加li

		for(var i = 0; i < $('#ul2').children('li').length; i++) {
			// var obj = data[i];
			// var li = $("<li><img src=" + obj.img + " /></li>");
			// $("#ul2").append(li);
			var j = i + 1;
			var li2 = $("<li>" + j + "</li>")
			$("#ul3").append(li2);
		}
		var _list1 = $("#ul2")

		var _li1 = $("#ul2 li");
		var _li2 = $("#ul3 li");

		//复制第1张图, 并且添加到最后成为第5张图
		_li1.first().clone().appendTo(_list1);
		var size = $("#ul2 li").length;
		// console.log('ddddddddd'+size); //8
		//显示的图片下标
		var x = 0;
		_li2.eq(0).addClass("li_active").siblings().removeClass("li_active");
		//启动定时器, 开始自动轮播
		var timer = setInterval(function() {
			x++;
			move();
			//console.log(x);

		}, 3000);

		//move,移动
		function move() {

			//如果超出了左边的第一张图
			if(x < 0) {
				_list1.css("left", -(size - 1) * 600); //瞬间移动到第5张图的位置
				x = size - 2; //即将移动到第4张图
			}

			//如果超出了最后的图片
			if(x >= size) {
				_list1.css("left", 0); //瞬间移动到第1张图x=0的位置)
				x = 1; //即将移动到第2张图(x=1)
			}
			//移动到第i张图
			_list1.stop().animate({
				left: -x * 1230
			}, 500);
			//按钮的选中状态改变
			_li2.eq(x).removeClass().addClass("li_active").siblings().removeClass("li_active");
			//console.log(_li2)
			if(x == size - 1) {
				_li2.eq(0).removeClass().addClass("li_active").siblings().removeClass("li_active")
			}
		}
		//按钮的移入事件
		_li2.mouseenter(function() {
			var index = $(this).index();
			x = index;
			move();
		})
		$("#box4").hover(function() {
				//移入 mouseenter
				clearInterval(timer); //停止定时器, 停止自动轮播
			},
			function() {
				//移出, mouseleave
				clearInterval(timer);
				timer = setInterval(function() {
					x++;
					move();
				}, 2000);
			})


		//鼠标滑过状态改变
	$("#ul5").find("a").mouseenter(function() {
		$(this).parent().siblings().find(".box3").css("display", "block");
	});
	$("#ul5").find("a").mouseleave(function() {
			$(this).parent().siblings().find(".box3").css("display", "none");
		})
		//------------------------------content4部分样式变化---------------------------------------------------
	$(".c4_right").find("td").mouseover(function() {
		var index = $(this).parents(".content4").index();
		var color = $(".content4").eq(index).find("hr").css("border-bottom-color");
		$(this).css({
			"background": color
		});
		$(this).find("a").css({
			"color": "#fff"
		});
	})
	$(".c4_right").find("td").mouseout(function() {
		$(this).css({
			"background": "#fff"
		});
		$(this).find("a").css({
			"color": "#646464"
		});
	})
	$(".c4_right").find("img").mouseover(function() {
		var index = $(this).parents(".content4").index()
		var color = $(".content4").eq(index).find("hr").css("border-bottom-color");
		$(this).siblings(".ball").css({
			"background": color,
			"color": "#fff"
		});
	})
	$(".c4_right").find("img").mouseout(function() {
		$(this).siblings(".ball").css({
			"background": "#fff"
		});
	})
	$(".img1").mouseenter(function() {
		var div = $("<div class='opa' style='opacity:0.1;width:240px;height:50px;position:absolute;left:0;top:0;background:#FFF;z-index:3'></div>");
		$(this).parent().append(div);

	})
	$(".img1").parent().on("mouseleave", ".opa", function() {
			$(".opa").remove();
		})
		//------------------------------.content11部分样式变化---------------------------------------------------
	$("#span1").mouseenter(function() {
		$("#box3").css({
			"display": "block"
		})
	})
	$("#span1").mouseleave(function() {
		$("#box3").css({
			"display": "none"
		})
	})
})

$(function() {
	//--------------------------------商品获取部分----------------------------------------------------------
	//创建车
	var car = $("<div style='cursor:pointer;border-radius:4px;width:120px;height:25px;color:#fff;background: url(/static/img/white_car.png) no-repeat 20px center #76AB25;font-size:12px;line-height:25px;position:absolute;bottom:5px;left:30px;padding-left:50px'>加入购物车</div>")

	//添加车
	$("#content2").on("mouseenter", ".td", function() {
			$(this).append(car);
		})

	refreshCart()
	//--------------------取得你需要的参数id，然后修改maotai页面url-----------------------
	function refreshCart(){

		$.get('/cartdata/',{},function (msg) {

			$(".car ul").empty();  //清空原来的li
			if (msg.cartlist.length){

				var num=0;
				var weight = 0;

				for(var i = 0; i < msg.cartlist.length; i++) {
					var li = $("<li><dl>" +
								"<dt><img src=" + msg.cartlist[i].goodsImg + "/></dt>" +
								"<dd>" + msg.cartlist[i].goodsName + "<i><em>￥</em><em>" + msg.cartlist[i].goodsPrice + "</em>x" + msg.cartlist[i].num + "</i></dd>" +
								"<dd class='ddd1'>" + msg.cartlist[i].goodsWeight + "kg<i class='delete' goodsid='"+msg.cartlist[i].goodsId+"'>删除</i></dd>" +
								"</dl></li>");
					li.appendTo($(".car ul"));
					num+=parseInt(msg.cartlist[i].num);
					weight+=parseInt(msg.cartlist[i].goodsAllweight);
				}

				$("#allprice").html(msg.totalprice);
				$("#num1").html(num);
				$("#all_weight").html(weight);
				$(".no_empty").show();
				$(".empty_car").hide();
			}
			else {
				$(".no_empty").hide();
 				$(".empty_car").show();
			}

		})

	}

	//----------------------------------加入购物车部分-----------------------------------------
	//点击加入购物车
	$(car).click(function() {
			//将当前点击的商品加入购物车(使用cookie存储商品信息)
			var goodsId = $(this).parent().find(".goodsId").html(); //商品ID
			var num = $(this).parent().find("#text").val()? $(this).parent().find("#text").val(): 1; //商品数量

			$.post('/savecart/', {
						goodsId: goodsId,
						num:num,
						csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
					},
					function (msg) {
						refreshCart();
					}
			);


	})


	//----------------商品飞向购物车----同时------显示购物车中的商品------------------------------------

	$(car).click(function() {
		$(".no_empty").show();
		$(".empty_car").hide();

		//-----------------------商品飞--------------------------
		// 1>添加一个当前商品图片(用于实现动画效果)
		var goodsImg = $(this).parent().find(".goodsImg").attr("src");
		var $copyImg = $("<img src=" + goodsImg + " style='width:100px;height:100px;position:absolute;top:0;left:0;z-index:1000'/>")
		$copyImg.appendTo($(car).parent('td'))

		// 获取当前图片的初始位置
		var startPos = $copyImg.offset();
		// 动画效果
		// 获取购物车的位置
		var cartPos = $("#li5").offset();
		$copyImg.animate({
				left: cartPos.left - startPos.left,
				top: cartPos.top - startPos.top,
				width: 0,
				height: 0
			}, 1000, function() {
			// 删除用于动画的图片
			$copyImg.remove();
		});
	})
		
			
	//删除单个商品------------1、获取要删除商品对应的cookie数组里面对应对象的下标-------------
							//也就是要删除商品对应的购物车中li的下标-----------
	//-----------------------2、将该下标所对应的对象从数组中删除goodsList.splice(index,1)-----------
	//将.delete删除按钮的点击事件委托给.no_empty
	$(".no_empty").on("click", ".delete", function() {

			$.post( '/removecart/'+$(this).attr('goodsid')+'/',
					 {csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
					function (msg) {
						console.log(msg)
						refreshCart();
					}
				);
		})


	//结算
	$(".calculate").click(function() {
		location.href = "/cart/";
	})
})



//定时器部分
$(function(){
	function show_time(x){ 
    var time_start = new Date().getTime(); //设定当前时间
    var time_end =  new Date(x).getTime(); //设定目标时间
    // 计算时间差 
    var time_distance = time_end - time_start; 
    // 天
    var int_day = Math.floor(time_distance/86400000); 
    time_distance -= int_day * 86400000; 
    // 时
    var int_hour = Math.floor(time_distance/3600000);
    time_distance -= int_hour * 3600000; 
    // 分
    var int_minute = Math.floor(time_distance/60000);
    time_distance -= int_minute * 60000; 
    // 秒 
    var int_second = Math.floor(time_distance/1000); 
    // 时分秒为单数时、前面加零 
    if(int_day < 10){ 
        int_day = "0" + int_day; 
    } 
    if(int_hour < 10){ 
        int_hour = "0" + int_hour; 
    } 
    if(int_minute < 10){ 
        int_minute = "0" + int_minute; 
    } 
    if(int_second < 10){
        int_second = "0" + int_second; 
    } 
    // 显示时间 
    $(".time_d").html(int_day); 
    $(".time_h").html(int_hour); 
    $(".time_m").html(int_minute); 
    $(".time_s").html(int_second); 
} 

var str = '2019-11-01';

setInterval(function(){
	show_time(str);
	},1000)
})