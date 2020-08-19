$(document).ready(function () {
    var payInfo = JSON.parse(localStorage.parRecords);
    var payInfo2 = JSON.parse(localStorage.parRecords);
    // for(let i = 0;i<payInfo.length;i++){
    // 	console.log(payInfo[i])
    // }
    //console.log(payInfo);
    //找到重复的用户,取得消费信息
    var goods = JSON.parse(localStorage.goods);
    //console.log(arr)
    for (let i = 0; i <= payInfo.length - 1; i++) {

        for (let j = i + 1; j < payInfo.length; j++) {
            //console.log(arr[i].customer,arr[j].customer)
            if (payInfo[i].customer == payInfo[j].customer) {
                payInfo[j] = {};
            }
        }
    }
    //console.log(arr)
   let newArr = [];
    for (let i = 0; i < payInfo.length; i++) {
        //console.log(arr[i])
        if (payInfo[i].customer) {
            newArr.push(payInfo[i]);
        }
    }
    console.log(newArr)

    //遍历用户，找到当天的消费
    console.log(payInfo2)
    for (let i = 0; i < newArr.length; i++) {
        console.log(newArr[i])
        //遍历所有的消费记录
        let customerInfo = [];
        for (let j = 0; j < payInfo.length; j++) {
            if (payInfo2[j].customer == newArr[i].customer && payInfo2[j].payDate == newArr[i].payDate) {
                //得到该用户同一时间支付的商品
                customerInfo.push(payInfo2[j]);
            }
        }
        console.log(customerInfo)
        //遍历的时候追加第一轮的节点
        // console.log(customerInfo);
        //取得这个用户的这次的所有消费
        var pays = "";
        var nowGoods = "";
        var total = 0;
        for (let m = 0; m < customerInfo.length; m++) {
            for (let n = 0; n < goods.data.length; n++) {
                if (customerInfo[m].goodsId == goods.data[n].goodsId) {
                    nowGoods = goods.data[n];
                }
            }

            pays += "<p>" + customerInfo[m].buy + "*" + customerInfo[m].goodsAmount + " ￥" + (customerInfo[m].goodsAmount * nowGoods.price * nowGoods.priceOff).toFixed(2) + "</p>";
            total += parseFloat((customerInfo[m].goodsAmount * nowGoods.price * nowGoods.priceOff).toFixed(2));
        }
        pays += "<p class='total'>总计" + total.toFixed(2) + "</p>";
        let cust = newArr[i].customer;
        let len = "";
        for (let k = 0; k < cust.length-1; k++) { 
            len += "*";
        }
        let cu = cust.charAt(0) + len;
        let htmlNode =
            '<li>消费者:' + cu + '  <span class="time">消费时间' + customerInfo[0].payDate + '</span></li><hr/>' +
            '<li>' + pays + '</li><hr/>' +
            '<li class="stars">' +
            '<span>点亮小红星哦:</span>' +
            '<span class="glyphicon glyphicon-star"></span>' +
            '<span class="glyphicon glyphicon-star"></span>' +
            '<span class="glyphicon glyphicon-star"></span>' +
            '<span class="glyphicon glyphicon-star"></span>' +
            '<span class="glyphicon glyphicon-star"></span>' +
            '</li><li>欢迎下次光临~~~</li>';
        let node = document.createElement("ul");
       
        node.classList.add("items");
        node.classList.add("active");
        node.innerHTML = htmlNode;
        $(".main").append($(node));
    }



    $("ul.items").mouseover(function () { 
        $(this).css("transform", "scale(1.1)");
        $(this).css("box-shadow", "0px 0px 20px 4px lightgrey");
        $(this).mouseout(function () { 
            $(this).css("transform", "");
            $(this).css("box-shadow", "");
        })
    })
})