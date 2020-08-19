$(document).ready(function() {
	let goods = JSON.parse(localStorage.goods);
	let goodsData = goods.data;
	//初始显示的页
	var nowPageIn = 1;
	var onePageItem = 5;
	//初始显示的数量
	renderData(goodsData, nowPageIn, onePageItem);
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
		//console.log(allData.length,itemTotal)
		let totalPage = Math.ceil(allData.length / itemTotal);
		let startIndex = parseInt((page - 1) * itemTotal);
		//console.log(itemTotal,startIndex,allData,page)
		itemTotal = parseInt(itemTotal)
		if (page == totalPage && allData.length < totalPage * itemTotal) {
			var endIndex = parseInt(startIndex + parseInt(allData.length % itemTotal));
		} else {
			//console.log(page,totalPage,itemTotal)
			var endIndex = parseInt(startIndex + itemTotal);
		}
		//console.log(startIndex, endIndex)
		renderThePage(startIndex, endIndex, allData);
		//添加操作按钮的事件
		addDelBtnEvent();
		addModifyBtnEvent();
		addDetailsBtnEvent();
		//给所有的修改按钮添加自定义属性
		$(".modifyBtn").attr("data-toggle", "modal");
		$(".modifyBtn").attr("data-target", "#modifyGoodsModal");
	}
	//根据下标渲染指定条目
	function renderThePage(start, end, data) {
		let itemNode = document.createElement("tr");
		for (let i = start; i < end; i++) {
			let priHtml =
				'<td>' + data[i].goodsId + '</td><td>' + (i + 1) + '</td><td>' + data[i].goodsName + '</td><td>' + data[i].crDate +
				'</td><td>' + data[i].datedTime + '</td><td>' + data[i].facLocation + '</td><td>' + data[i].price + '</td><td>' +
				data[i].model + '</td><td>' + data[i].priceOff +
				'</td><td class="goodsAction"><span class="btn btn-success detailBtn">详情</span><span class="btn btn-warning modifyBtn">修改</span><span class="btn btn-danger delBtn">删除</span></td>';
			$(itemNode).html(priHtml);
			let cloneNode = $(itemNode).clone();
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
				renderPriPage(goodsData, pageBtnValue, itemCount);
				renderPageBtn(goodsData, pageBtnValue, itemCount);
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
			//console.log($(this).val());
			renderPage(allData, $(this).val(), itemCount);
		})
	}
	//--------------------几个跳转页面的事件------------------------
	//选择下拉框后，设置每一页显示数据的数量
	$('select[name=showPageSelect]').change(function() {
		onePageItem = $(this).val();
		let pageCount = Math.ceil(goodsData.length / onePageItem);
		if (pageCount < nowPageIn) {
			nowPageIn = 1;
		}
		renderData(goodsData, nowPageIn, onePageItem);
	})
	//输入值点击跳转页面
	$("#gotoPageConfirm").click(function() {
		if ($(this).prev().val() > 0 && $(this).prev().val() < Math.ceil(goodsData.length / onePageItem) + 1) {
			let page = $(this).prev().val();
			renderPage(goodsData, page, onePageItem)
		} else {
			$(this).prev().val() = 0;
		}


	})
	//控制输入框的值，大于页数值变为页数值，小于1就是1
	$("#gotoPageInput").change(function() {
		if ($(this).val() < 1) {
			$(this).val("1");
		} else if ($(this).val() > Math.ceil(goodsData.length / onePageItem)) {
			$(this).val(Math.ceil(goodsData.length / onePageItem));
		}
	})



	//-------------------添加商品条目（增）-------------------
	//获取确定按钮
	$("#addGoodsItemConfirm").click(function() {
		let dataArr = [];
		let text = $("#addGoodsModal .modal-body input");
		let textItemLength = $("#addGoodsModal .modal-body input").length;
		let isConfirm = true;
		let imgType = ["jpg", "png", "gif", "jpeg"];

		var imgUrl = "";
		for (let i = 0; i < textItemLength; i++) {
			var val = text.eq(i).val();
			if (val == "" && (i == 0 || i == 1 || i == 2 || i == 4 || i == 9 || i == 11)) {
				$("#addGoodsItemTishi>p").text($("#addGoodsModal .modal-body span").eq(i).text() + "不能为空");
				isConfirm = false;
				dataArr.push(val);
				break;
			} else if (i == 11) {
				//图片上传 
				$("#addGoodsItemTishi>p").text("");
				val = text.eq(i).val();
				let val2 = val.split(".");
				if (imgType.indexOf(val2[val2.length - 1].toLowerCase()) > -1) {
					$("#addGoodsItemTishi>p").text("");
					let reader = new FileReader();
					reader.readAsDataURL($("#addGoodsModal .modal-body input:eq(11)")[0].files[0]);
					reader.onloadend = function(e) {
						let res = e.target.result;
						imgUrl = res;
						goConfirm(imgUrl);
						//让图片显示出来
					}
				} else {
					$("#addGoodsItemTishi>p").text("图片格式不正确");
				}
			} else {
				if (val == "") {
					val = "---";
				}
				dataArr.push(val);
				$("#addGoodsItemTishi>p").text("");
			}

		}

		//判断输入数据无误之后添加到本地数据
		function goConfirm(imgUrl) {
			if (isConfirm) {
				var tempData = {};
				tempData.goodsName = dataArr[0];
				tempData.brand = dataArr[1];
				tempData.crDate = dataArr[2];
				tempData.datedTime = dataArr[3];
				tempData.price = dataArr[4];
				tempData.priceOff = dataArr[5];
				tempData.purchasePrice = dataArr[6];
				tempData.category = dataArr[7];
				tempData.facLocation = dataArr[8];
				tempData.model = dataArr[9];
				tempData.comment = dataArr[10];
				tempData.goodsId = parseInt(goods.data[goods.data.length - 1].goodsId) + 1;
				tempData.goodsImg = imgUrl;
				console.log(imgUrl)
				goods.data.unshift(tempData);
				console.log(goods.data);
				localStorage.setItem("goods", JSON.stringify(goods))
				console.log(JSON.parse(localStorage.goods))
				//数据插入完成后清空模态框里面所有的值
				$("#addGoodsModal .modal-body input").val("");
				$("#imgShow>img").attr("src", "");
				$("#addGoodsItemTishi>p").text("");
				//添加完成后重新渲染页面，默认跳转到第一页
				goodsData = goods.data;
				renderData(goodsData, 1, onePageItem)

				//渲染完成之后关闭模态框
				$("#addGoodsModal").modal("hide");
			}
		}



	})
	//实时显示上传图片
	$("input[type=file]").change(function() {
		if ($(this).val() != "") {
			let reader = new FileReader();
			reader.readAsDataURL(this.files[0]);
			reader.onloadend = function(e) {
				//让图片显示出来

				let res = e.target.result;
				$("#imgShow>img").attr("src", res);
				$("#modifyImgShow>img").attr("src", res);
			}
		} else {
			$("#imgShow>img").attr("src", "");
		}

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
			for (let i = 0; i < goods.data.length; i++) {
				if (goods.data[i].goodsId == id) {
					goods.data.splice(i, 1);
					break;
				}
			}
			//重新存入
			console.log(111)
			localStorage.setItem("goods", JSON.stringify(goods));
			goodsData = goods.data;
			$(this).parent().parent().remove();
			//删除后判断当前页有没有数据,没有就退回上一页
			//如果是第一页
			if ($("tbody").children().length == 0 && nowPageIn == 1) {

			} else if ($("tbody").children().length == 0) {
				nowPageIn -= 1;
				renderPage(goodsData, nowPageIn, onePageItem)
			} else {
				renderPage(goodsData, nowPageIn, onePageItem)
			}


		})
	}
	//----修改数据----------使用模态框
	function addModifyBtnEvent() {
		//执行之前清空所有的点击事件
		$(".modifyBtn").off();
		$("#modifyGoodsModal #modifyImgShow>img").attr("src", "");
		$(".modifyBtn").click(function() {
			let nowData = [];
			//console.log($(this).parent().parent().find("td:first-child").text());
			let id = $(this).parent().parent().find("td:first-child").text();
			//根据id的值取得数据
			for (let i = 0; i < goods.data.length; i++) {
				if (goods.data[i].goodsId == id) {
					nowData = goods.data[i];
					//console.log(goods.data[0])
					//取得模态框里面的值
					let jqInputNode = $("#modifyGoodsModal .modal-body input");
					jqInputNode.eq(0).val(nowData.goodsName);
					jqInputNode.eq(1).val(nowData.brand);
					jqInputNode.eq(2).val(nowData.crDate);
					jqInputNode.eq(3).val(nowData.datedTime);
					jqInputNode.eq(4).val(nowData.price);
					jqInputNode.eq(5).val(nowData.priceOff);
					jqInputNode.eq(6).val(nowData.purchasePrice);
					jqInputNode.eq(7).val(nowData.category);
					jqInputNode.eq(8).val(nowData.facLocation);
					jqInputNode.eq(9).val(nowData.model);
					jqInputNode.eq(10).val(nowData.comment);
					$("#modifyGoodsModal #modifyImgShow>img").attr("src", nowData.goodsImg);
					//点击确定按钮
					$("#modifyGoodsItemConfirm").click(function() {
						//获取当前的id
						goods.data[i].goodsName = jqInputNode.eq(0).val();
						goods.data[i].brand = jqInputNode.eq(1).val();
						goods.data[i].crDate = jqInputNode.eq(2).val();
						goods.data[i].datedTime = jqInputNode.eq(3).val();
						goods.data[i].price = jqInputNode.eq(4).val();
						goods.data[i].priceOff = jqInputNode.eq(5).val();
						goods.data[i].purchasePrice = jqInputNode.eq(6).val();
						goods.data[i].category = jqInputNode.eq(7).val();
						goods.data[i].facLocation = jqInputNode.eq(8).val();
						goods.data[i].model = jqInputNode.eq(9).val();
						goods.data[i].comment = jqInputNode.eq(10).val();
						let reader = new FileReader();
						console.log($("#modifyGoodsModal .modal-body input:eq(11)"))
						if ($("#modifyGoodsModal .modal-body input:eq(11)").val()) {
							reader.readAsDataURL($("#modifyGoodsModal .modal-body input:eq(11)")[0].files[0]);

							reader.onloadend = function(e) {
								goods.data[i].goodsImg = e.target.result;
								//让图片显示出来
							}
						}
						//渲染数据
						renderPage(goods.data, nowPageIn, onePageItem)
						$("#modifyGoodsModal").modal("hide");
						localStorage.goods = goods;
					})
					break;
				}
			}


		});
	}
	//详情跳转
	function addDetailsBtnEvent() {
		$(".datailBtn").off();
		$(".detailBtn").click(function() {
			let id = $(this).parent().parent().find("td:first-child").text();
			//console.log(id);
			sessionStorage.setItem("id", id);
			location.href = "goodsDetailsInfo.html";
		})

	}
	//查询功能
	$("#search")[0].oninput = function() {
		let val = $(this).val();
		console.log(val)
		if (val) {
			let tempArr = [];
			let nowGoods = JSON.parse(localStorage.goods);
			for (let i = 0; i < nowGoods.data.length; i++) {
				let name = nowGoods.data[i].goodsName;
				if (name.indexOf(val)>-1) {
					//console.log(name,val)
					tempArr.push(nowGoods.data[i]);
				}
			}
			searchInputTips(tempArr.length, tempArr);
			addSearchBtnEvent();
		} else {
			//什么都不输入的时候显示原始数据
			$(this).val("");
			renderData(goods.data,nowPageIn,onePageItem)
			//清空哦提示信息
			$("#otherAction div").remove();
		}

	}
	//输入文本下方显示提示，并且能点击直接跳转
	function searchInputTips(count, data) {
		//console.log("得力文具".indexOf("得力"))
		//进入之前清空之前的节点
		$("#otherAction div").remove();
		let newNode = document.createElement("div");
		newNode.classList.add("searchTips");
		newNode.classList.add("side-in");
		let top = 50;
		if(count>10){
			//最多显示10个提示
			count = 10;
		}
		for (let i = 0; i < count; i++) {
			top += 30;
			let node = newNode.cloneNode();
			node.style.top = top + "px";
			node.dataset.exist = true;
			//name.replace()
			node.innerText = data[i].goodsName + " " + data[i].model;
			$("#otherAction").append($(node));
		}
		//给提示添加点击事件
		//先清空提示按钮的所有事件再添加
		$(".searchTips").off();
		$(".searchTips").click(function(){
			let val = $(this).text().split(" ")[0];
			//将输入框显示当前点击的文本
			$("#search").val($(this).text());
			let nowGoods = JSON.parse(localStorage.goods);
			for(let i = 0;i<nowGoods.data.length;i++){
				if(val==nowGoods.data[i].goodsName){
					//console.log(nowPageIn,onePageItem,nowGoods.data[i])
					
					renderPage([nowGoods.data[i]],1,onePageItem);
				}
			}
			//点击之后清空提示
			$("#otherAction div").remove();
			
		})

	}
	
	
	//点击搜索按钮开始搜索
	function addSearchBtnEvent(){
		$("#searchGoodsItem").off();
		var myEv = $("#searchGoodsItem").click(function(){
			let tempArr = [];
			let val = $("#search").val().split(" ")[0];
			for(let i = 0;i<goods.data.length;i++){
				if(goods.data[i].goodsName.indexOf(val)>-1){
					tempArr.push(goods.data[i]);
				}
			}
			nowPageIn = 1;
			$("#otherAction div").remove();
			renderData(tempArr,nowPageIn,onePageItem)
		})
		
		
	}


});
