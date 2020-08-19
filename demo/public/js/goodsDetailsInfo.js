$(document).ready(function(){
	console.log(sessionStorage.id);
	let goods =JSON.parse(localStorage.goods);
	let goodsData = goods.data;
	for (let i in goods.data) {
		if(goods.data[i].goodsId == sessionStorage.id){
			$("#goodsDetailItem1").text(goods.data[i].goodsName);
			$("#goodsDetailItem2").text(goods.data[i].crDate);
			$("#goodsDetailItem3").text(goods.data[i].datedTime);
			$("#goodsDetailItem4").text(goods.data[i].facLocation);
			$("#goodsDetailItem5").text(goods.data[i].price);
			$("#goodsDetailItem6").text(goods.data[i].purchasePrice);
			$("#goodsDetailItem7").text(goods.data[i].model);
			$("#goodsDetailItem8").text(goods.data[i].priceOff);
			$("#goodsDetailItem9").text(goods.data[i].comment);
			$("#goodsDetailItem10").text(goods.data[i].category);
			$("#goodsDetailItem11").text(goods.data[i].brand);
			$(".media-left img").attr("src",goods.data[i].goodsImg)
		}
	}
	$("#backBtn").click(function(){
		location.href = "goodsManage.html";
	})
})