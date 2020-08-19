$(document).ready(function () {
	let goods = JSON.parse(localStorage.goods);
	let goodsData = goods.data;
	let node = '<div class="media"><div class="media-left"> <a href = "#" >' +
		'<img class = "media-object" src = " "alt = "商品详情图" >' +
		'</a> </div> <div class = "media-body"> ' +
		'<h4 class="media-heading">商品详情</h4>' +
		'<p><span>商品名：</span><span class="goodsDetailItem1"></span></p>' +
		'<p><span>品牌：</span><span class="goodsDetailItem11"></span></p> ' +
		'<p><span>生产日期</span>：<span class="goodsDetailItem2"></span></p>' +
		'<p><span>保质期：</span><span class="goodsDetailItem3"></span></p>' +
		'<p><span>产地：</span><span class="goodsDetailItem4"></span></p>' +
		'<p><span>售价：</span><span class="goodsDetailItem5"></span></p>' +
		'<p><span>采购价：</span><span class="goodsDetailItem6"></span></p>' +
		'<p><span>型号：</span><span class="goodsDetailItem7"></span></p>' +
		'<p><span>折扣：</span><span class="goodsDetailItem8"></span></p> ' +
		'<p><span>商品描述：</span><span class="goodsDetailItem9"></span></p>' +
		'<p><span>分类：</span><span class="goodsDetailItem10"></span></p> ' +
		'<p><span>当前售价：</span><span class="goodsDetailItem12"></span></p>' +
		'</div></div>';

	for (let i = 0; i < goodsData.length; i++) {
		let newNode = $(node).clone();
		$(newNode).find(".goodsDetailItem1").text(goods.data[i].goodsName);
		$(newNode).find(".goodsDetailItem2").text(goods.data[i].crDate);
		$(newNode).find(".goodsDetailItem3").text(goods.data[i].datedTime);
		$(newNode).find(".goodsDetailItem4").text(goods.data[i].facLocation);
		$(newNode).find(".goodsDetailItem5").text("￥" + goods.data[i].price);
		$(newNode).find(".goodsDetailItem6").text("￥" + goods.data[i].purchasePrice);
		$(newNode).find(".goodsDetailItem7").text(goods.data[i].model);
		$(newNode).find(".goodsDetailItem8").text(goods.data[i].priceOff);
		$(newNode).find(".goodsDetailItem9").text(goods.data[i].comment);
		$(newNode).find(".goodsDetailItem10").text(goods.data[i].category);
		$(newNode).find(".goodsDetailItem11").text(goods.data[i].brand);
		$(newNode).find(".goodsDetailItem12").text("￥" + (goods.data[i].price * (1 - goods.data[i].priceOff)).toFixed(2));
		$(newNode).find("img")[0].src = goods.data[i].goodsImg;
		//console.log($(newNode).find("img")[0])
		$("body").append($(newNode));
	}
	setTimeout(function () {
		//$(".media").css("position", "fixed");
		document.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		let scrHei = window.screen.availHeight;
		let mediaHei = 382;
		let priTop = 0;
		let count = Math.ceil(scrHei / mediaHei);
		for (let i = 0; i < count; i++) {
			$(".media").eq(i).css("top", priTop + "px");
			$(".media").eq(i).css("z-index", 1);
			priTop += mediaHei;
		}
		document.onscroll = function (e) {

			let scrollT = document.body.scrollTop || document.documentElement.scrollTop;
			//console.log(scrollT);
			//console.log(window.screen.availHeight);
			let co = Math.ceil(scrollT / mediaHei) + count;
			//console.log(co);
			for (let i = count; i < co; i++) {
				//console.log($("div.media").eq(i).css("top"))
				if ($(".media").eq(i).css("top") == "7602px") {
					$(".media").eq(i).css("top", priTop + "px");
					$(".media").eq(i).css("z-index", 1);
					priTop += mediaHei;
				}
			}
			//console.log(offsetT)
			//计算初始能显示几个

		}
	}, 100)
	$("body").css("height", goodsData.length * 362 + "px")
})