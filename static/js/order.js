$(function () {

        pay()
        // 点击支付
        function pay(){
            $('.pay').click(function () {
                // 将订单id提交后台， 后台根据订单id获取订单信息（订单编号，订单金额等）
                $.post("/pay/"+$(this).siblings('input').val()+"/",
                    function (data) {
                        console.log(data);
                        let re_url = data.re_url;
                        location.href = re_url;
                });

            });
        }



        $('#statu').change(function () {
            $.get('/orderdata/'+$(this).val()+'/',function (msg) {
                if(msg.code == 1){
                    $('tbody').empty()
                    for (var i=0; i < msg.data.length; i++){
                        var tr = ' <tr>' +
                                '<td><a href="#">'+msg.data[i].order_code+'</a></td>' +
                                '<td>'+msg.data[i].total_count+'</td>' +
                                '<td>￥'+msg.data[i].total_amount+'</td>';


                        if (msg.data[i].status == 1){
                              tr = tr +'<td>未支付</td>'+
                                       '<td><div class="pay" style="color: red; background: yellow; margin: 10px; cursor: pointer">支付</div><input type="text" hidden id="orderid" value="'+msg.data[i].order_code+'"></td>' +
                                  '</tr>'
                        }
                        else{
                            tr = tr +'<td>未发货</td>'+
                                       '<td><div  style="color: red; background: yellow; margin: 10px; cursor: pointer">查看</div></td>' +
                                  '</tr>'
                        }

                        tr = $(tr)
                        tr.appendTo('#context1 tbody')
                        pay()
                    }
                }


            })
        })




});
