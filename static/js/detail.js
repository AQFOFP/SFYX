
$(function(){
	//----------------获取参数-----------------------------

		//jquery
	  $.getUrlParam = function (name) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	   var r = window.location.search.substr(1).match(reg);
	   if (r != null) return unescape(r[2]); return null;
	  }
		var id = $.getUrlParam('id');

	//------------从json中获取数据-----------------------------------------------

	//---------------加购物车部分-------加cookie------------加车--------------------
	refreshCart()
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
	 	$('#go_car').click(function() {
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

	//---------------增加减少选中产品的数量-,价格 ，重量-----cookie中也要改变-----------------------------------------
	$("#btn1").click(function(){
		var x=parseInt($(this).siblings("#text").val())+1;
		if(x>99){
			x=99;
		}
		$(this).siblings("#text").val(x);
			
	})

	$("#btn2").click(function(){
		var x=parseInt($(this).siblings("#text").val())-1;

		if(x<1){
			x=0;
		}else{
			$(this).siblings("#text").val(x);
		}
	})


//----------------商品飞向购物车----同时------显示购物车中的商品------------------------------------
	$("#go_car").click(function() {
			$(".no_empty").show();
			$(".empty_car").hide();

			//-----------------------商品飞--------------------------
			// 1>添加一个当前商品图片(用于实现动画效果)
			var goodsImg = $(this).parents().find(".goodsImg").attr("src");
			var $copyImg = $("<img src=" + goodsImg + " style='width:100px;height:100px;position:absolute;top:0;left:0;z-index:1000'/>")
			$copyImg.appendTo($('#smallImg'))

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

			refreshCart();
	
		})

})
//-------------------点击按钮图片移动部分-------------------------------------

$(function(){
	$("#a_up").mouseenter(function(){
		$(this).css({"cursor":"pointer"})
	
	})

	$("#a_up").click(function(){
		var x=parseInt($(this).siblings("#box9").css("top")) ;
		console.log(x)
		x -=50;
		$(this).siblings(".uu").css("top",x)
	})
	$("#a_down").mouseenter(function(){
		$(this).css({"cursor":"pointer"})
	})

	$("#a_down").click(function(){

	})

	$('#to_pay').click(function () {

		$('#go_car').trigger('click')
		location.href='/order/'
		$('#to_pay').off('click')
		setTimeout(function(){
                $('#to_pay').on('click')
                },3000);
	})
})


//---------------点击图片显示部分--------------------------------------------
$(function(){
	$(".uu").on("mouseenter",".lii",function(){

		$(this).css({"cursor":"pointer","border":"1px solid #680170"})
		$(this).siblings().css({"border":"none"})
		var imgaddr = $(this).children('img').attr('src').replace('thumb', 'middle')
		$("#smallImg").css("background","url("+imgaddr+") no-repeat")

		var bigmgaddr = $(this).children('img').attr('src').replace('thumb', 'original')
		$("#bigImg").attr("src", bigmgaddr)

	})

	$(".uu").on("mouseleave",".lii",function(){
		$(this).css({"cursor":"pointer","border":"1px solid #680170"})
		$(this).siblings().css({"border":"none"})
	})
})
//--------------放大镜部分-----------------------------------------------
$(function(){
				
				var _smallImg = $("#smallImg"); //小图
				var _smallArea = $("#smallArea"); //小区域
				var _bigImg = $("#bigImg"); //大图
				var _bigArea = $("#bigArea"); //大区域
				
				//width() == innerWidth() == outerWidth()
				//计算小区域_smallArea的宽高
				//_smallImg.width / _bigImg.width = _smallArea.width / _bigArea.width
				//_smallArea.width = _smallImg.width / _bigImg.width * _bigArea.width
				_smallArea.width( _smallImg.width()/_bigImg.width() * _bigArea.width() );
				_smallArea.height( _smallImg.height()/_bigImg.height() * _bigArea.height() );
				
				
				//放大系数(放大倍数)
				var scale = _bigImg.width() / _smallImg.width();
				//鼠标移动
				_smallImg.mousemove(function(e){
					
					_smallArea.show(); //显示小区域
					_bigArea.show(); //显示大区域
					
					//移动小区域, 跟随鼠标移动
					var x = e.pageX - _smallImg.offset().left - _smallArea.width()/2;
					var y = e.pageY - _smallImg.offset().top - _smallArea.height()/2;
					
					//判断x不超出左边界,也不超出右边界
					if (x < 0) {
						x = 0;
					}
					else if (x > _smallImg.width() - _smallArea.width()) {
						x = _smallImg.width() - _smallArea.width();
					}
					
					//判断y不超出上边界,也不超出下边界
					if (y < 0) {
						y = 0;
					}
					else if (y > _smallImg.height() - _smallArea.height()) {
						y = _smallImg.height() - _smallArea.height();
					}
					
					_smallArea.css({left: x, top: y});
					
					//移动大图
					_bigImg.css({left: -x*scale, top: -y*scale});
									
				})
				
				//鼠标移出
				_smallImg.mouseleave(function(){
					_smallArea.hide(); //隐藏小区域
					_bigArea.hide(); //隐藏大区域
				})
				
			})



//-------------轮播图部分--------------------------------------
$(function(){
				
				//
				var _list1 = $("#list");
				var _list2 = $("#list2");
				var _li1 = $("#list li");
				var _li2 = $("#list2 li");
				
				//复制第1张图, 并且添加到最后成为第5张图
				_li1.first().clone().appendTo(_list1);
				var size = $("#list li").length;
				
				//显示的图片下标
				var i = 0;
				
				//启动定时器, 开始自动轮播
				var timer = setInterval(function(){
					i++;
					move();
				}, 2000);
				
				//move,移动
				function move() {
					
					//如果超出了左边的第一张图
					if (i < 0) {
						_list1.css("left", -(size-1)*780); //瞬间移动到第5张图的位置
						i = size-2; //即将移动到第4张图
					}
					
					//如果超出了最后的图片
					if (i >= size ) {
						_list1.css("left", 0); //瞬间移动到第1张图(i=0的位置)
						i = 1; //即将移动到第2张图(i=1)
					}
					//移动到第i张图
					_list1.stop().animate({left: -i*780},500);
					
//					//按钮的选中状态改变
//					_li2.eq(i).find("img").attr("src","img1/lunbo1"+parseInt(i+1)+".png")
//					//_li2.eq(i).siblings().find("img").attr("src","img1/lunbo01"+parseInt(i+1)+".png")
//
//					if (i == size-1) {
//						_li2.eq(0).find("img").attr("src","img1/lunbo1"+parseInt(i+1)+".png");
//						
//					}
				}		
				//按钮的移入事件
				_li2.mouseenter(function(){
					var index = $(this).index();
					i = index;
					move();
					//clearInterval(timer)
				})
//				_li2.mouseout(function(){
//					timer = setInterval(function(){
//						i++;
//						move();
//					}, 2000);
//				})
				$("#lunbo_2 #box").hover(function(){ 
					//移入 mouseenter
					clearInterval(timer); //停止定时器, 停止自动轮播
				}, 
				function(){
					//移出, mouseleave
					clearInterval(timer); 
					timer = setInterval(function(){
						i++;
						move();
					}, 2000);
				})
				
			})



//---------------吸顶部分-----------------------------------
$(function(){
				
				var _box2Top = $("#h3").offset().top;
				$(window).scroll(function(){
					var _scrollTop = $(document).scrollTop();
					//判断box2的top和_scrollTop的大小
					//吸顶
					if (_scrollTop >= _box2Top) {
						$("#h3").css({"position":"fixed", top:0}); 
					}
					//还原
					else {
						$("#h3").css("position", "static");
					}
				})
		})

