$(document).ready(function() {
	var payRecords = JSON.parse(localStorage.parRecords);
	var payRecordsData = payRecords;
	var reper = JSON.parse(localStorage.reper);
	var employee = JSON.parse(localStorage.stuArr);
	var goods = JSON.parse(localStorage.goods);
	//初始显示的页
	var nowPageIn = 1;
	var onePageItem = 5;
	//初始显示的数量
	renderData(payRecordsData, nowPageIn, onePageItem);
	//把所有的渲染和添加事件写成一个函数
	function renderData(data, page, onePageItem) {
		renderPage(data, page, onePageItem);
		addGotoBtnEvent(data, onePageItem);
		renderTransSelect(data, onePageItem);
		addGotoSelectEvent(data, onePageItem);
	}

	//工具函数------------------------------------
	//渲染条目,根据页码和一页显示的数量
	function renderPriPage(allData, page, itemTotal) {
		//渲染之前清空
		$("tbody").empty();
		//console.log(allData.length, itemTotal)
		let totalPage = Math.ceil(allData.length / itemTotal);
		let startIndex = parseInt((page - 1) * itemTotal);
		
		//console.log(itemTotal,startIndex,allData,page)
		itemTotal = parseInt(itemTotal)
		if (page == totalPage && allData.length < totalPage * itemTotal) {
			var endIndex = parseInt(startIndex + parseInt(allData.length % itemTotal));
		} else {
			//console.log(page, totalPage, itemTotal)
			var endIndex = parseInt(startIndex + itemTotal);
		}
		//console.log(startIndex, endIndex)
		renderThePage(startIndex, endIndex, allData);
		//添加操作按钮的事件
		addDelBtnEvent();
		
	}
	//根据下标渲染指定条目
	function renderThePage(start, end, data) {
		 reper = JSON.parse(localStorage.reper);
		 employee = JSON.parse(localStorage.stuArr);
		goods = JSON.parse(localStorage.goods);
		//console.log(data)
		$("tbody").html("");
		let itemNode = document.createElement("tr");
		for (let i = start; i < end; i++) {
			
			let reperItem = {};
			let employeeItem = {};
			//获得库存信息
			for (let j = 0; j < reper.data.length; j++) {
				if (reper.data[j].repertoryId == data[i].repertoryId) {
					reperItem = reper.data[j];
				}
			}
			//获得商品信息
			for (let j = 0; j < goods.data.length; j++) {
				if (goods.data[j].goodsName == data[i].buy) {
					goodsItem = goods.data[j];
				}
			}
			//获得雇员信息
			for (let j = 0; j < employee.length; j++) {
				if (employee[j].id == data[i].cashierId) {
					employeeItem = employee[j];
				}
			}
			let price = data[i].goodsAmount * goodsItem.price;
			price = parseFloat(price);
			price = price.toFixed(2);
			//console.log(reperItem,goodsItem,employeeItem)
			let paydate = data[i].payDate;
			if(paydate.indexOf("T")>-1){
				paydate  = paydate.split("T");
				paydate = paydate.join(" ")
			}
			//console.log(paydate)
			let priHtml =
				'<td>' + data[i].payId + '</td><td>' + (i + 1) + '</td><td>' + data[i].buy + '</td><td>' + data[i].customer +'</td><td>' + goodsItem.price + '</td><td>' + data[i].goodsAmount + '</td><td>' + price + '</td><td>' + (price * (goodsItem.priceOff)).toFixed(2) + '</td><td>' + paydate + '</td><td>' +employeeItem.name + '</td><td>' + reperItem.comment +'</td><td class="payRecordsAction"><span class="btn btn-danger delBtn">删除</span></td>';
			$(itemNode).html(priHtml);
			let cloneNode = $(itemNode).clone();
			
			//console.log(data[i])
			$("tbody").append(cloneNode);
		}
	}
	//渲染跳转按钮
	function renderPageBtn(allData, nowPage, itemTotal) {
		$(".pageGotoBtn").remove();
		let pageNode = '<li class="pageGotoBtn"><a href="#">2</a></li>';
		let totalPage = Math.ceil(allData.length / itemTotal);
		for (let i = 0; i < totalPage; i++) {
			let cloneNode = $(pageNode).clone();
			cloneNode.find("a").text(i + 1);
			cloneNode.insertBefore("#pageNext");
		}
		$(".pagination").children().removeClass("active");
		$($(".pagination").children()[nowPage]).addClass("active");
	}
	//一次性渲染页面和按钮
	function renderPage(allData, nowPage, itemTotal) {
		renderPriPage(allData, nowPage, itemTotal);
		renderPageBtn(allData, nowPage, itemTotal);

	}
	//给页面按钮添加点击事件，跳转的指定页
	function addGotoBtnEvent(allData, itemCount) {
		//添加事件之前清空原来的事件
		$(".pagination").off();
		$(".pagination").on("click", "li", function() {
			if (this.className == "pageGotoBtn") {
				//console.log(this)
				let pageBtnValue = parseInt($(this).text());
				//console.log(pageBtnValue)
				renderPriPage(allData, pageBtnValue, itemCount);
				renderPageBtn(allData, pageBtnValue, itemCount);
				nowPageIn = parseInt($(this).text());
				//console.log(nowPageIn)
			}
			//上一页按钮
			else if ($(this).attr("id") == "pagePrevious") {
				let pageCount = Math.ceil(allData.length / itemCount);
				if (nowPageIn > 1 && nowPageIn < pageCount + 1) {
					nowPageIn -= 1;
					renderPage(allData, nowPageIn, itemCount);
					addGotoBtnEvent(allData, itemCount);
					console.log(nowPageIn)
				}
			}
			//下一页按钮
			else if ($(this).attr("id") == "pageNext") {
				let pageCount = Math.ceil(allData.length / itemCount);
				if (nowPageIn > 0 && nowPageIn < pageCount) {
					nowPageIn += 1;
					console.log(nowPageIn)
					renderPage(allData, nowPageIn, itemCount);
					addGotoBtnEvent(allData, itemCount);
				}
			}
		})
	}
	//下拉选择页面跳转
	function renderTransSelect(allData, itemCount) {
		//渲染之前清空所有的数目
		$("#gotoSelection").empty();
		let pageCount = Math.ceil(allData.length / itemCount);
		for (let i = 0; i < pageCount; i++) {
			let nodeHt = '<option value="' + (i + 1) + '">' + (i + 1) + '</option>';
			$(nodeHt).appendTo("#gotoSelection");
		}
	}
	//添加直接跳转的事件
	function addGotoSelectEvent(allData, itemCount) {
		$('select[name=pageSelect]').change(function() {
			console.log($(this).val());
			renderPage(allData, $(this).val(), itemCount);
		})
	}
	//--------------------几个跳转页面的事件------------------------
	//选择下拉框后，设置每一页显示数据的数量
	$('select[name=showPageSelect]').change(function() {
		onePageItem = $(this).val();
		let pageCount = Math.ceil(payRecordsData.length / onePageItem);
		if (pageCount < nowPageIn) {
			nowPageIn = 1;
		}
		renderData(payRecordsData, nowPageIn, onePageItem);
	})
	//输入值点击跳转页面
	$("#gotoPageConfirm").click(function() {
		if ($(this).prev().val() > 0 && $(this).prev().val() < Math.ceil(payRecordsData.length / onePageItem) + 1) {
			let page = $(this).prev().val();
			renderPage(payRecordsData, page, onePageItem)
		} else {
			$(this).prev().val() = 0;
		}


	})
	//控制输入框的值，大于页数值变为页数值，小于1就是1
	$("#gotoPageInput").change(function() {
		if ($(this).val() < 1) {
			$(this).val("1");
		} else if ($(this).val() > Math.ceil(payRecords.length / onePageItem)) {
			$(this).val(Math.ceil(payRecords.length / onePageItem));
		}
	})



	//-------------------添加消费记录（增）-------------------
	//动态获取当前的收银员和商品信息
	$("#addpayRecordsItem").click(function(){
		//添加选择信息
		let cashier = [];
		let yuanGong = JSON.parse(localStorage.stuArr);
		//取得收银员信息
		for (let i = 0; i < yuanGong.length; i++) {
			if (yuanGong[i].pos == "收银员") {
				cashier.push(yuanGong[i]);
			}
		}
		let node = document.createElement("option");
		$("#cashierSelect").html("")
		for (let i = 0; i < cashier.length; i++) {
			let cloneNode = node.cloneNode();
			$(cloneNode).val(cashier[i].id);
			$(cloneNode).text("收银员姓名："+cashier[i].name+ " 编号# "+cashier[i].id)
			//console.log(cloneNode);
			$("#cashierSelect").append($(cloneNode));
		}
		$("#goodsNameSelect").html("")
		let goodsNode = document.createElement("option");
		let goods = JSON.parse(localStorage.goods);
		for (let i = 0; i <goods.data.length; i++) {
			let cloneNode = node.cloneNode();
			$(cloneNode).val(goods.data[i].goodsName+"#"+goods.data[i].goodsId)
			$(cloneNode).text(goods.data[i].goodsName+" 型号:"+goods.data[i].model+" 编号# "+goods.data[i].goodsId)
			//console.log(cloneNode);
			$("#goodsNameSelect").append($(cloneNode));
		}
	})
	$("#addpayRecordsModal .modal-body input").blur(function() {
		$("#addpayRecordsItemTishi>p").hide("fast");
	})
	//获取确定按钮
	$("#addpayRecordsItemConfirm").click(function() {
		let dataArr = [];
		let text = $("#addpayRecordsModal .modal-body input,#addpayRecordsModal .modal-body select");
		//console.log(text)
		let textItemLength = text.length;
		var isConfirm = true;
		for (let i = 0; i < textItemLength; i++) {
			var val = text.eq(i).val();
			console.log(val)
			if (val == "" && (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 )) {
				$("#addpayRecordsItemTishi>p").show("fast");
				$("#addpayRecordsItemTishi>p").text($("#addpayRecordsModal .modal-body span").eq(i).text() + "不能为空");
				isConfirm = false;
				break;
			} else {
				if (val == "") {
					val = "未录入";
				}
				dataArr.push(val);
				$("#addpayRecordsItemTishi>p").text("");
			}

		}
		//console.log(isConfirm)
		//判断输入数据无误之后添加到本地数据
		function goConfirm(isConfirm) {
			//console.log(isConfirm, payRecords)
			if (isConfirm) {
				var tempData = {};
				tempData.customer = dataArr[0];
				//验证电话号码
				let telRep = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
				if(dataArr[1].match(telRep)){
					tempData.tel = dataArr[1];
				}else{
					$("#addpayRecordsItemTishi>p").show("fast");
					$("#addpayRecordsItemTishi>p").text("电话号码格式不正确");
					isConfirm = false;
					return false;
				}
				tempData.buy = dataArr[2];
				
				let buy = dataArr[2].split("#")[0];
				tempData.buy  = buy;
				tempData.goodsAmount = dataArr[3];
				tempData.payDate = dataArr[5];
				tempData.payId = String(parseInt(payRecords[payRecords.length - 1].payId) + 1);
				console.log(dataArr)
				tempData.cashierId = dataArr[4];
				//console.log(tempData)
				//插入外键的id
				//获得库存信息
				//取得收银员的信息
				// let node = document.createElement("option");
				// for (let i = 0; i < cashier.length; i++) {
				// 	let cloneNode = node.cloneNode();
				// 	console.log(cloneNode);
				// 	$("#cashierSelect").append($(cashierOptionClone));
				// }
				//console.log(parRecords)
				//取得库存id
				let reper = JSON.parse(localStorage.reper)
				for (let i = 0; i < reper.data.length; i++) {
					if (tempData.buy == reper.data[i].goodsName) {
						tempData.repertoryId = reper.data[i].repertoryId;
					}
				}
				//取得商品id

				//console.log(parRecords)
				let goods = JSON.parse(localStorage.goods)
				for (let i = 0; i < goods.data.length; i++) {
					if (tempData.buy == goods.data[i].goodsName) {
						tempData.goodsId = goods.data[i].goodsId;
					}
				}
				//工具函数
				function randomGet(arr) {
					let num = parseInt(Math.random() * (arr.length));
					return arr[num];
				}
				console.log(tempData);


				//无误之后返回数据
				return tempData;


			}
		}
		var temp = goConfirm(isConfirm);
		if (temp) {
			console.log(temp)
			payRecords.unshift(temp);
			//console.log(payRecords.data);
			localStorage.setItem("parRecords", JSON.stringify(payRecords))
			//console.log(JSON.parse(localStorage.payRecords))
			//数据插入完成后清空模态框里面所有的值
			$("#addpayRecordsModal .modal-body input,#addpayRecordsModal .modal-body select").val("");
			$("#imgShow>img").attr("src", "");
			$("#addpayRecordsItemTishi>p").text("");
			//添加完成后重新渲染页面，默认跳转到第一页
			
			payRecords = JSON.parse(localStorage.parRecords);
			payRecordsData = payRecords;
			renderData(payRecordsData, 1, onePageItem)
			$(".modal-body input").val("")
			//渲染完成之后关闭模态框
			$("#addpayRecordsModal").modal("hide");

		}

	})
	
	//关闭后清空数据
	$("#closeAdd").click(function(){
		$(".modal-body input").val("")
			})
	//-------------删除商品条目(删)------------
	//写成函数，方便重新调用，获取删除按钮
	function addDelBtnEvent() {
		//执行之前清空所有的点击事件
		$(".delBtn").off();
		$(".delBtn").click(function() {
			//console.log($(this).parent().parent().find("td:first-child").text());
			let id = $(this).parent().parent().find("td:first-child").text();
			//根据id的值删除数据里面的
			for (let i = 0; i < payRecords.length; i++) {
				if (payRecords[i].payId == id) {
					payRecords.splice(i, 1);
					break;
				}
			}
			//重新存入
			console.log(111)
			localStorage.setItem("parRecords", JSON.stringify(payRecords));
			payRecordsData = payRecords;
			$(this).parent().parent().remove();
			//删除后判断当前页有没有数据,没有就退回上一页
			//如果是第一页
			if ($("tbody").children().length == 0 && nowPageIn == 1) {

			} else if ($("tbody").children().length == 0) {
				nowPageIn -= 1;
				renderData(payRecords, nowPageIn, onePageItem)
			} else {
				renderData(payRecords, nowPageIn, onePageItem)
			}


		})
	}
	//查询功能
	$("#search")[0].oninput = function() {
		let val = $(this).val();
		console.log(val)
		if (val) {
			let tempArr = [];
			let nowpayRecords = JSON.parse(localStorage.parRecords);
			for (let i = 0; i < nowpayRecords.length; i++) {
				let paydate = nowpayRecords[i].payDate;
				if(paydate.indexOf("T")>-1){
					paydate  = paydate.split("T");
					paydate = paydate.join(" ")
				}
				let date = (paydate).split(" ")[0];
				//console.log(date,val)
				date = addLing(date);
				val = addLing(val);
				if (date==val) {
					//console.log(name, val);
					//console.log(nowpayRecords[i])
					tempArr.push(nowpayRecords[i]);
				}
			}
			console.log(tempArr)
			if(tempArr.length>0){
				$("#dateTishi").hide("fast")
				nowPageIn = 1;
				renderData(tempArr, nowPageIn, onePageItem)
			}else{
				$("#dateTishi").show("fast")
				$("#dateTishi").text("没有该日期的数据")
			}
			
			
			//addSearchBtnEvent();
		} else {
			//什么都不输入的时候显示原始数据
			$(this).val("");
			renderData(payRecords, nowPageIn, onePageItem)
			//清空哦提示信息
			$("#otherAction div").remove();
		}

	}
//调整日期格式
function addLing(str){
	let nowdate = str.split("-");
	//console.log(nowdate);
	
	if(Number(nowdate[1])<10){
		nowdate[1] = Number(nowdate[1]);
		nowdate[1] = "0"+nowdate[1];
	}
	if(Number(nowdate[2])<10){
		nowdate[2] = Number(nowdate[2]);
		nowdate[2] = "0"+nowdate[2];
	}
	return nowdate.join("-");
}
	
	

});
