$(function(){

	// 全选状态
	function show(){

        var flag = true
        $('.choose').each(function () {
             if(!$(this).prop("checked")){
                 flag = false;
                 return 0
             }
        })


        if(flag){
            $('#chooseall').prop('checked', true)
        }
        else{
            $('#chooseall').prop('checked', false)
        }

    }


    //全选状态修改
    $('#chooseall').click(function(){


		var selected = $(this).prop('checked') ? '1' : '0'

		if (parseInt(selected)){

			$('.choose').each(function () {
				 if(!$(this).prop("checked")){
						$(this).trigger('click')
				 }
        	})
		}
		else {
			$('.choose').each(function () {
				 if($(this).prop("checked")){
						$(this).trigger('click')
				 }
        	})
		}

    });


    //购物车商品获取
	refreshCart();
	function refreshCart(){
		$.get('/cartdata/',{},function (msg) {

			$("tbody").empty();  //清空原来的li
			if (msg.cartlist.length){
				var weight = 0;
				for(var i = 0; i < msg.cartlist.length; i++) {

					checked = parseInt(msg.cartlist[i].selected)?'checked':' ';
					var tr = $("<tr>" +
						"<td><input type='checkbox' "+checked+" class='choose'/></td>" +
						"<td><img src=" + msg.cartlist[i].goodsImg + "/><p>" + msg.cartlist[i].goodsName + msg.cartlist[i].goodsWeight + "kg</p></td>" +
						"<td class='pro'><i>￥</i><span class='price' style='width:50px;text-align:left'>" + msg.cartlist[i].goodsPrice + "</span></td>" +
						"<td><span>" + msg.cartlist[i].goodsPrivilege + "</span></td>" +
						"<td><input type='button' value='-' style='margin-left:60px' class='but_subtract'><input type='text' readonly class='show' value=" + msg.cartlist[i].num + "><input type='button' value='+' style='margin-right:60px' class='but_add'></td>" +
						"<td><span>" + msg.cartlist[i].goodsAllweight + "kg</span></td>" +
						"<td class='pro'><i >￥</i><span style='color:#F30;width:50px;text-align:left' class='xiaoji'>" + msg.cartlist[i].goodsAllprice + "</span></td>" +
						"<td><span>现货</span></td><td><i class='del' goodsid='" + msg.cartlist[i].goodsId + "'> 删除</i></td></tr>");
					tr.appendTo($(".context table"));

					if (parseInt(msg.cartlist[i].selected)){
						weight+=parseInt(msg.cartlist[i].goodsAllweight);
					}

				}

				$('#all_weight').html(weight)
				$('#allprice').html(msg.totalprice)
				$("#context1").show();
				$("#context2").hide();
				show();
			}
			else {
					$("#context1").hide();
					$("#context2").show();
			}
		})
	}
	

	//----------------清空购物车------------------------------------------------

	$("#deleteall").click(function(){

		flag = confirm('确认清空购物车?')
		if(flag){
			$.get('/emptycart/',{},function (msg) {
				if (msg.code == 1){
					$("#context1").hide();
					$("#context2").show();
				}
			})
		}


	})


	
	//---------------单个商品删除-----------------------------------------------
	//事件委托
	$("tbody").on("mouseenter", ".del", function(){
		$(this).css("cursor","pointer");
		$(this).css("text-decoration","underline");
	});

	$("tbody").on("click", ".del", function(){
		$.post( '/removecart/'+$(this).attr('goodsid')+'/',
				{csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
				function (msg) {
					refreshCart();
				}
			);
	})

	//---------------单个商品收藏-----------------------------------------------
	/*$("tbody").on("mouseenter", ".like", function(){
		$(this).css("cursor","pointer");
	})
	$("tbody").on("click", ".like", function(){
		var like=$(this).parent().parent().find("p").html();
		alert(like+"商品收藏成功")
	})*/

	//---------------增加减少选中产品的数量-,价格 ，重量-----cookie中也要改变-----------------------------------------
	$("tbody").on("click", ".but_add", function(){
		var x=parseInt($(this).siblings(".show").val())+1;
		if(x>99){
			x=99;
		}
		$(this).siblings(".show").val(x);

		$.post( '/cartaction/',
				{
					goodsId:$(this).parent().parent().find('.del').attr('goodsid'),
					num: $(this).siblings(".show").val(),
					selected:  $(this).parent().parent().find('.choose').prop('checked')?'1':'0',
					csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
				},
				function (msg) {
					refreshCart();
				}
		);
			
	})


	$("tbody").on("click", ".but_subtract", function(){
		var x=parseInt($(this).siblings(".show").val())-1;

			//判断是否为0
		if(x==0){
			x=1;
		}

		$(this).siblings(".show").val(x);

		$.post( '/cartaction/',
				{
					goodsId: $(this).parent().parent().find('.del').attr('goodsid'),
					num: $(this).siblings(".show").val(),
					selected:$(this).parent().parent().find('.choose').prop('checked')?'1':'0',
					csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
				},
				function (msg) {
					refreshCart();
				}
		);
		
	})


	//---------------返回购物------------------------------
	$(".shop").click(function(){
		location='/index/';
	})

	//---------------删除选中产品-------------（1个或多个，需要遍历，使用for或each）----------------------------------
	//-------------------删除商品------删除cookie-----------------------------
	//--------------把复选框的选中事件委托给tbody-----------------------------
	$("tbody").on("click", ".choose", function(){
		$.post( '/cartaction/',
				{
					goodsId: $(this).parent().parent().find('.del').attr('goodsid'),
					num: $(this).parent().parent().find('.show').val(),
					selected:$(this).prop('checked')?'1':'0',
					csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
				},
				function (msg) {
					refreshCart();
				}
		);
	})
	

	//删除选中的商品
	$("#deletesome").click(function(){
		flag = confirm('确认删除选中的商品吗？')
		if (flag){
			$('.choose').each(function () {
				 if($(this).prop("checked")){
						$(this).parent().parent().find('.del').trigger('click')
				 }
        	})
		}

	})


	//--------------------结算按钮-----------------------------------
	$(".pay").mouseenter(function(){
		$(this).css("cursor","pointer")
	})

	$(".pay").click(function(){
		var tr = $("#context1 tbody").children("tr").length;
		var isTrue=false;
		for(var i=0;i<tr;i++){
			if($(".choose").eq(i).prop("checked")){
					isTrue=true;
					break;
				}
			}

		if(isTrue){
			location.href = '/order/'
			// alert("您选的商品总价格为￥"+$("#allprice").html()+"，总重量为"+$("#all_weight")+"kg，请支付")
		}else{
			alert("请勾选您要购买的商品！")
		}
		
	})/**/
})
