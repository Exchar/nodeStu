
$("document").ready(function() {
	var nowAccount = [];
	if (location.href.split("#").length == 1) {
		$("body").empty();
		let num = 4;
		setInterval(function () {
			$("body").html("<h2 class='text-center' style='margin-top:200px;color:black'>请重新登录：" + "倒计时:" + num + "<h2/>");
			num -= 1;
			if (num == 0) {
				window.open("pages/login.html", "_self");
			}
		}, 1000);
	}
	var account = JSON.parse(localStorage.userAccount);
	//--------------------------处理登录传递过来的数据------------------------------------------
		
	//接收登录页数据
	//console.log(location.href.split("#"))
	if (location.href.split("#").length > 1) {
		let user = location.href.split("#")[1];
		localStorage.nowUser = user;
		for (let i = 0; i < account.data.length; i++) {
			//console.log(account.data[i].manageId,user)
			if (account.data[i].manageId ==user) {
				//console.log(111)
				nowAccount = account.data[i];
			}
		}
	}else if(location.href.split("#").length==1 || !localStorage.nowUser) {
		$("body").empty();
		let num = 4;
		setInterval(function() {
			$("body").html("<h2 class='text-center' style='margin-top:200px;color:black'>请重新登录："+"倒计时:"+num+"<h2/>");
			num -= 1;
			if (num == 0) {
				window.open("pages/login.html", "_self");
			}
		}, 1000)
		return;
	}else if(localStorage.nowUser){
		let user = localStorage.nowUser;
		for (let i = 0; i < account.data.length; i++) {
			//console.log(account.data[i].manageId,user)
			if (account.data[i].manageId ==user) {
				nowAccount = account.data[i];
			}
		}
	}



	//根据用户等级显示
	//console.log(nowAccount)
	switch (nowAccount.level) {
		case 3:
			//高等级用户,个人中心
			$("#staffManage,#goodsInfoManage,#supplierManage,#reperManage,#userManage").remove();
			break;
		case 2:
			//管理员,个人中心
			$("#staffManage,#userManage").remove();
			break;
		case 1:
			//超级管理员
			
			break;
	}

	//点击即可展开
	$("#leftMain>li>a").click(function() {
		//有子节点才展开
		//console.log(111);
		if (this.children.length > 0) {
			//打开状态点击关闭
			if (parseInt($(this).next().css("height")) > 0) {
				$("#leftMain>li>a").next().removeClass("openOrClose");
				$("#leftMain>li>a>span").removeClass("glyphicon-minus");
				$("#leftMain>li>a>span").addClass("glyphicon-plus");
				$(this).next().css("height", "0");
			} else {
				$("#leftMain>li>a>span").removeClass("glyphicon-minus");
				$("#leftMain>li>a>span").addClass("glyphicon-plus");
				$(this).find("span").addClass("glyphicon-minus");
				$("#leftMain>li>a").next().css("height", 0);

				$(this).next().css("height", $(this).next().children().length * 42);

			}
		}
	})

	//设置下面的图表展示
	//第一个图表
	var myChart1 = echarts.init(document.getElementById("showArt").children[0]);
	// 指定图表的配置项和数据
	var option = {
		title: {
			text: '员工满意度调查'
		},
		tooltip: {},
		legend: {
			data: ['满意度']
		},
		xAxis: {
			data: ["非常满意", "比较满意", "基本满意", "不太满意", "不满意", "不在乎"]
		},
		yAxis: {},
		series: [{
			name: '满意度',
			type: 'bar',
			data: [5, 20, 36, 30, 10, 10]
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart1.setOption(option);
	//第二个图表
	echarts.init(document.getElementById('showArt').children[1]).setOption({
		title: {
			text: "疫情情况分析"
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b}: {c}例 ({d}%)' //提示框显示内容的格式【{a}:系列名/{b}:数据名/{c}:数据值/{d}:百分比】
		},
		legend: {
			orient: 'horizontal', //图例方向【'horizontal'\'vertical'】
			left: 'center',
			top: '10%',
			data: ['美国', '意大利', '西班牙', '德国', '法国', '伊朗', '英国', '瑞士', '比利时', '荷兰', '土耳其', '韩国']
		},
		series: [{
			name: '新冠疫情数据图',
			type: 'pie',
			radius: ['0%', '40%'], //范围0-100
			center: ['50%', '50%'],
			label: {
				show: false,
				position: 'outside' //标签的位置【inside/outside/inner/center】
			},
			emphasis: {
				label: {
					show: true,
					fontSize: '30',
					fontWeight: 'bold'
				}
			},
			label: {
				show: true
			},
			data: [{
					value: 160020,
					name: '美国'
				},
				{
					value: 101739,
					name: '意大利'
				},
				{
					value: 85195,
					name: '西班牙'
				},
				{
					value: 66885,
					name: '德国'
				},
				{
					value: 44550,
					name: '法国'
				},
				{
					value: 41495,
					name: '伊朗'
				},
				{
					value: 22141,
					name: '英国'
				},
				{
					value: 15760,
					name: '瑞士'
				},
				{
					value: 11899,
					name: '比利时'
				},
				{
					value: 11750,
					name: '荷兰'
				},
				{
					value: 10827,
					name: '土耳其'
				},
				{
					value: 9786,
					name: '法国'
				},
			]
		}, ]
	});




	//----------------------------------------其他的-----------------------
	//商品管理页面
	gotoPage($("#goodsManage")[0]);
	gotoPage($("#goodsList")[0]);
	gotoPage($("#reperManage")[0]);
	gotoPage($("#personInfoManage")[0]);
	gotoPage($("#payRecordsManage")[0]);
	gotoPage($("#supplierManage")[0]);
	gotoPage($("#staffManage")[0]);
	gotoPage($("#evaluteShow")[0]);
	function gotoPage(node) {
		$(node).off();
		$(node).click(function() {
			$("iframe").show();
			$("iframe").html("");
			let allNode = $("#rightMain").children().slice(3);
			allNode.remove();
			$("#rightMain").children().eq(2).css({
				width: "100%",
				height: "88%",
				border: "none"
			})
		})
	}
	//点击直接跳转首页
	$("#index").click(function() {
		location.href = "index.html#"+localStorage.nowUser;
	})

	//用户头像
	//console.log(nowAccount)
	$(".personTou").children().attr("src",nowAccount.userImg);
	//console.log(nowAccount.nickName)
	$("#personText").text(nowAccount.nickName,nowAccount.userImg);
	$("#leftMain>li").click(function(e){
		if(e.target.nodeName=="A"){
			//console.log(111)
			let val = $(e.target).text();
			//console.log(val);
			$("#linkInfo").text("/"+val);
			
		}
	})
	
	
	//注销用户按钮
	$("#zhuxiao").click(function(){
		localStorage.removeItem("nowUser");
		location.href= "./pages/login.html";
	})
})
