//id产生器，第一个值表示要产生的数的位数，第二个值表示要产生的个数，返回一个数组
//如renderId(10,20)，会返回一个随机数+下标的数组成的数组，总数为20个，左边的数完全一致
function renderId(th, count) {
	let newArr = [];
	for (let i = 0; i < th; i++) {
		newArr.push("0");
	}
	newArr = "1" + newArr.join("");
	let newNum = parseInt(newArr);
	let maxNum = parseInt(newArr + "0");
	//该函数产生一个随机数+1的字符串，用于得到第一个id的值
	//返回的是第二个值的个数的数组
	let reNum = parseInt(Math.random() * (maxNum - newNum) + newNum);
	let tempArr = [];
	for (var i = 0; i < count; i++) {
		tempArr.push("" + reNum + (i + 1));
	}
	return [tempArr, reNum];
}

//存入商品的初始条目
localStorage.goods = JSON.stringify({
	updateTime: "2020-8-4 16:00",
	manager: "admin",
	data: [{
		goodsId: "",
		goodsName: "得力(deli)笔记本",
		crDate: "2020-1-5",
		datedTime: "---",
		facLocation: "四川成都",
		price: 35,
		purchasePrice: 26,
		model: "80张/本",
		priceOff: 0.6,
		comment: "古语系列学生胶套本套装 软抄本记事本日记本笔记本子文具用品",
		category: "日用文具",
		goodsImg: "https://img14.360buyimg.com/n1/s360x360_jfs/t1/42287/6/316/202695/5cc1772aEf016d740/c9904f1bb2c8d19d.jpg",
		brand: "得力(deli)"
	}, {
		goodsId: "",
		goodsName: "小米全面屏电视",
		crDate: "2020-5-5",
		datedTime: "---",
		facLocation: "中国大陆",
		price: 1599,
		purchasePrice: 1399,
		model: "55英寸，16kg",
		priceOff: 0.1,
		comment: "E55X 4K超高清 HDR 内置小爱 2GB+8GB 教育电视 AI人工智能网络平板电视 L55M5-EX",
		category: "电子产品",
		goodsImg: "https://img10.360buyimg.com/n1/jfs/t1/117388/12/13709/135183/5f242f55E8ee77445/d25dcca3a77ff00d.jpg",
		brand: "小米(XIAOMI)"

	}, {
		goodsId: "",
		goodsName: "荣耀智慧屏X1",
		crDate: "2019-1-5",
		datedTime: "---",
		facLocation: "中国大陆",
		price: 2199,
		purchasePrice: 2000,
		model: "55英寸",
		priceOff: 0.2,
		comment: "LOK-350 2G+16G 8K解码开关机无广告远场语音4K超清人工智能液晶教育电视全面屏",
		category: "数码电子",
		goodsImg: "https://img30.360buyimg.com/n1/jfs/t1/148674/2/3166/116682/5f113efeEa813637a/2ae69fb59a7a93a3.jpg",
		brand: "华为(HUAWEI)"

	}, {
		goodsId: "",
		goodsName: "帆布休闲鞋",
		crDate: "2020-3-28",
		datedTime: "---",
		facLocation: "中国大陆",
		price: 399,
		purchasePrice: 368,
		model: "35码-45码",
		priceOff: 0.8,
		comment: "新款男女同款情侣拼色帆布休闲鞋 SMASH 374754 黑色-白-02 42",
		category: "鞋",
		goodsImg: "https://img10.360buyimg.com/n1/jfs/t1/116240/38/14289/123060/5f2cc752Edefc279e/03da0cbebb40e078.jpg",
		brand: "PUMA(彪马)"

	}, {
		goodsId: "",
		goodsName: "私人订制西服",
		crDate: "2020-4-5",
		datedTime: "---",
		facLocation: "英国",
		price: 6900,
		purchasePrice: 5900,
		model: "80张/本",
		priceOff: 0.1,
		comment: "进口维达莱羊毛面料 商务西装订制西服套装定做高端男士套装休闲正装 预计15-20工作日发货 满6000元上门量体订制-需要在高铁可到地区",
		category: "衣装",
		goodsImg: "https://img12.360buyimg.com/n1/s350x449_jfs/t4315/314/3760574574/297506/f49c89d3/58e84f1bN74874a81.jpg!cc_350x449.jpg",
		brand: "铜鼎服饰"

	}, {
		goodsId: "",
		goodsName: "奔富（Penfolds)红葡萄酒",
		crDate: "2018-1-5",
		datedTime: "---",
		facLocation: "澳大利亚",
		price: 498,
		purchasePrice: 450,
		model: "1.34kg，750ml",
		priceOff: 0,
		comment: "Bin389赤霞珠设拉子红葡萄酒 750ml单瓶装 澳大利亚原瓶进口红酒",
		category: "酒",
		goodsImg: "https://img10.360buyimg.com/n1/jfs/t1/69133/17/5550/446106/5d3ac380Ed10bda14/eae52491289f4569.jpg",
		brand: "奔富（Penfolds）"

	}, {
		goodsId: "",
		goodsName: "奔富（Penfolds)红葡萄酒",
		crDate: "2019-1-5",
		datedTime: "2020-11-5",
		facLocation: "澳大利亚",
		price: 998,
		purchasePrice: 889,
		model: "1.34kg，750ml",
		priceOff: 0,
		comment: "Bin350赤霞珠设拉子红葡萄酒 750ml单瓶装 澳大利亚原瓶进口红酒",
		category: "酒",
		goodsImg: "https://img11.360buyimg.com/n1/s150x150_jfs/t1/99774/24/2261/95538/5dcd1181E00c2cf69/c2bcec762a6c42a7.jpg",
		brand: "奔富（Penfolds）"

	}, {
		goodsId: "",
		goodsName: "奔富（Penfolds)红葡萄酒",
		crDate: "2012-1-5",
		datedTime: "2021-5-14",
		facLocation: "澳大利亚",
		price: 2999,
		purchasePrice: 450,
		model: "1.34kg，750ml",
		priceOff: 0,
		comment: "Bin450赤霞珠设拉子红葡萄酒 750ml单瓶装 澳大利亚原瓶进口红酒",
		category: "酒",
		goodsImg: "https://img13.360buyimg.com/n1/s150x150_jfs/t1/63470/25/1795/137648/5d01ad78Ebd27db92/d035428e6552e6c8.jpg",
		brand: "奔富（Penfolds）"
	}, {
		goodsId: "",
		goodsName: "蓝月亮洗衣液",
		crDate: "2020-7-12",
		datedTime: "2021-9-15",
		facLocation: "广州",
		price: 25,
		purchasePrice: 20,
		model: "1kg/瓶",
		priceOff: 0.1,
		comment: "深层洁净洗衣液（薰衣草",
		category: "日用品",
		goodsImg: "https://img11.360buyimg.com/n1/jfs/t1/128181/14/8152/127528/5f21471bE6f9d0ee4/ac161217bbc1d835.jpg",
		brand: "得力(deli)"

	}, {
		goodsId: "",
		goodsName: "清扬洗发水",
		crDate: "2020-8-5",
		datedTime: "2021-5-9",
		facLocation: "合肥",
		price: 99.90,
		purchasePrice: 89.99,
		model: "1.98kg",
		priceOff: 0.1,
		comment: "男士去屑洗发水套装 活力运动薄荷型720gx2送活力运动薄荷100gx2(新老包装随机发)(氨基酸洗发)",
		category: "洗护用品",
		goodsImg: "https://img11.360buyimg.com/n1/s150x150_jfs/t17668/337/1112282384/633880/b44dd720/5abc703bNca43ba8d.jpg",
		brand: "得力(deli)"

	}, {
		goodsId: "",
		goodsName: "得力(deli)笔记本",
		crDate: "2020-1-5",
		datedTime: "---",
		facLocation: "四川成都",
		price: 35,
		purchasePrice: 26,
		model: "80张/本",
		priceOff: 0.6,
		comment: "古语系列学生胶套本套装 软抄本记事本日记本笔记本子文具用品",
		category: "日用文具",
		goodsImg: "https://img14.360buyimg.com/n1/s360x360_jfs/t1/42287/6/316/202695/5cc1772aEf016d740/c9904f1bb2c8d19d.jpg",
		brand: "得力(deli)"

	}, {
		goodsId: "",
		goodsName: "书籍-如何成为一个有绝活的人",
		crDate: "2020-7-28",
		datedTime: "---",
		facLocation: "电子工业出版社",
		price: 37.8,
		purchasePrice: 35,
		model: "版次1，开本16开",
		priceOff: 0.6,
		comment: "自慢：如何成为一个有绝活的人1——菜鸟的成长笔记",
		category: "书籍",
		goodsImg: "https://img11.360buyimg.com/n1/jfs/t30406/353/885358477/188340/7153b3/5c00a51cN9a71f840.jpg",
		brand: "电子工业出版社"

	}, {
		goodsId: "",
		goodsName: "得力(deli)书籍",
		crDate: "2020-1-5",
		datedTime: "---",
		facLocation: "安徽",
		price: 89,
		purchasePrice: 26,
		model: "80张/本",
		priceOff: 0.6,
		comment: "古语系列学生胶套本套装 软抄本记事本日记本笔记本子文具用品",
		category: "日用文具",
		goodsImg: "https://img14.360buyimg.com/n1/s360x360_jfs/t1/42287/6/316/202695/5cc1772aEf016d740/c9904f1bb2c8d19d.jpg",
		brand: "得力(deli)"

	}, {
		goodsId: "",
		goodsName: "得力(deli)双面胶",
		crDate: "2020-1-5",
		datedTime: "---",
		facLocation: "四川成都",
		price: 5,
		purchasePrice: 26,
		model: "2kg",
		priceOff: 0.6,
		comment: "古语系列学生胶套本套装 软抄本记事本日记本笔记本子文具用品",
		category: "日用文具",
		goodsImg: "https://img14.360buyimg.com/n1/s360x360_jfs/t1/42287/6/316/202695/5cc1772aEf016d740/c9904f1bb2c8d19d.jpg",
		brand: "得力(deli)"

	}, {
		goodsId: "",
		goodsName: "得力(deli)胶棒",
		crDate: "2015-1-5",
		datedTime: "---",
		facLocation: "四川成都",
		price: 35,
		purchasePrice: 26,
		model: "50卷",
		priceOff: 0.6,
		comment: "古语系列学生胶套本套装 软抄本记事本日记本笔记本子文具用品",
		category: "日用文具",
		goodsImg: "https://img14.360buyimg.com/n1/s360x360_jfs/t1/42287/6/316/202695/5cc1772aEf016d740/c9904f1bb2c8d19d.jpg",
		brand: "得力(deli)"

	}, {
		goodsId: "",
		goodsName: "得力(deli)订书机",
		crDate: "2020-1-5",
		datedTime: "---",
		facLocation: "四川成都",
		price: 99,
		purchasePrice: 26,
		model: "80张/本",
		priceOff: 0.6,
		comment: "古语系列学生胶套本套装 软抄本记事本日记本笔记本子文具用品",
		category: "日用文具",
		goodsImg: "https://img14.360buyimg.com/n1/s360x360_jfs/t1/42287/6/316/202695/5cc1772aEf016d740/c9904f1bb2c8d19d.jpg",
		brand: "得力(deli)"

	}, {
		goodsId: "",
		goodsName: "得力(deli)打印机",
		crDate: "2020-1-5",
		datedTime: "---",
		facLocation: "四川成都",
		price: 36,
		purchasePrice: 26,
		model: "80张/本",
		priceOff: 0.6,
		comment: "古语系列学生胶套本套装 软抄本记事本日记本笔记本子文具用品",
		category: "日用文具",
		goodsImg: "https://img14.360buyimg.com/n1/s360x360_jfs/t1/42287/6/316/202695/5cc1772aEf016d740/c9904f1bb2c8d19d.jpg",
		brand: "得力(deli)"

	}, {
		goodsId: "",
		goodsName: "得力(deli)转笔刀",
		crDate: "2020-1-5",
		datedTime: "---",
		facLocation: "四川成都",
		price: 35,
		purchasePrice: 26,
		model: "80张/本",
		priceOff: 0.6,
		comment: "古语系列学生胶套本套装 软抄本记事本日记本笔记本子文具用品",
		category: "日用文具",
		goodsImg: "https://img14.360buyimg.com/n1/s360x360_jfs/t1/42287/6/316/202695/5cc1772aEf016d740/c9904f1bb2c8d19d.jpg",
		brand: "得力(deli)"

	}, {
		goodsId: "",
		goodsName: "得力(deli)笔记本",
		crDate: "2020-1-5",
		datedTime: "---",
		facLocation: "四川成都",
		price: 35,
		purchasePrice: 26,
		model: "80张/本",
		priceOff: 0.6,
		comment: "古语系列学生胶套本套装 软抄本记事本日记本笔记本子文具用品",
		category: "日用文具",
		goodsImg: "https://img14.360buyimg.com/n1/s360x360_jfs/t1/42287/6/316/202695/5cc1772aEf016d740/c9904f1bb2c8d19d.jpg",
		brand: "得力(deli)"

	}, {
		goodsId: "",
		goodsName: "得力(deli)笔记本",
		crDate: "2020-1-5",
		datedTime: "---",
		facLocation: "四川成都",
		price: 35,
		purchasePrice: 26,
		model: "80张/本",
		priceOff: 0.6,
		comment: "古语系列学生胶套本套装 软抄本记事本日记本笔记本子文具用品",
		category: "日用文具",
		goodsImg: "https://img14.360buyimg.com/n1/s360x360_jfs/t1/42287/6/316/202695/5cc1772aEf016d740/c9904f1bb2c8d19d.jpg",
		brand: "得力(deli)"

	}, {
		goodsId: "",
		goodsName: "得力(deli)笔记本",
		crDate: "2020-1-5",
		datedTime: "---",
		facLocation: "四川成都",
		price: 99,
		purchasePrice: 58,
		model: "1000张/本",
		priceOff: 0.2,
		comment: "古语系列学生胶套本套装 软抄本记事本日记本笔记本子文具用品",
		category: "日用文具",
		goodsImg: "https://img14.360buyimg.com/n1/s360x360_jfs/t1/42287/6/316/202695/5cc1772aEf016d740/c9904f1bb2c8d19d.jpg",
		brand: "得力(deli)"
	}]
})
let goods = JSON.parse(localStorage.goods);
//产生id，根据当前数据的数量
let renderIdEx = renderId(10, goods.data.length);
//赋予每条数据的id值
for (let i in goods.data) {
	goods.data[i].goodsId = renderIdEx[0][i];
}
//添加id后重新存入
localStorage.goods = JSON.stringify(goods);
//console.log(localStorage.goods);



//--------------------其他数据----------------
//--------------------其他数据----------------
var yuanGong = [{
		id: '',
		name: '唐甜宝',
		pos: '收银员',
		sex: '女',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	},
	{
		id: '',
		name: '龙战天',
		pos: '收银员',
		sex: '男',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	},
	{
		id: '',
		name: '王博',
		pos: '收银员',
		sex: '男',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	},
	{
		id: '',
		name: '龙霸天',
		pos: '普通员工',
		sex: '男',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '2'
	},
	{
		id: '',
		name: '龙傲天',
		pos: '普通员工',
		sex: '男',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	},
	{
		id: '',
		name: '叶良霸',
		pos: '普通员工',
		sex: '男',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	},
	{
		id: '',
		name: '叶霸辰',
		pos: '普通员工',
		sex: '男',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '3'
	},
	{
		id: '',
		name: '霸良辰',
		pos: '普通员工',
		sex: '男',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	},
	{
		id: '',
		name: '叶良博',
		pos: '普通员工',
		sex: '女',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	},
	{
		id: '',
		name: '叶博辰',
		pos: '普通员工',
		sex: '女',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	},
	{
		id: '',
		name: '博良辰',
		pos: '普通员工',
		sex: '男',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	},
	{
		id: '',
		name: '叶良王',
		pos: '普通员工',
		sex: '男',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '2'
	},
	{
		id: '',
		name: '唐王宝',
		pos: '普通员工',
		sex: '女',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	},
	{
		id: '',
		name: '王甜宝',
		pos: '普通员工',
		sex: '男',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	},
	{
		id: '',
		name: '唐甜王',
		pos: '普通员工',
		sex: '女',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '3'
	},
	{
		id: '',
		name: '唐甜龙',
		pos: '普通员工',
		sex: '女',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	},
	{
		id: '',
		name: '龙甜宝',
		pos: '分店长',
		sex: '女',
		tel: '13345659565',
		adress: '四川成都市金牛区',
		date: '2017-08-03',
		work: '1'
	}
];
let renderIdEx4 = renderId(10, yuanGong.length);
for (let i in yuanGong) {
	yuanGong[i].id = renderIdEx4[0][i];
	//console.log(yuanGong[i].id)
}
localStorage.stuArr = JSON.stringify(yuanGong);


//-------------------------------预先存的一部分账户信息---------
//1-超级管理员，2-管理员，3-员工（只有消费记录）
var userAccount = {
	createUser: "admin",
	data: [{
		level: 1,
		nickName: "谢凯伦",
		userName: "19993696",
		password: "123456",
		manageId: "",
		userImg: "./img/tou1.png",
		role: "superAdmin"
	}, {
		level: 2,
		nickName: "舒述军",
		userName: "19991234",
		password: "123456",
		manageId: "",
		userImg: "./img/tou2.png",
		role: "admin"

	}, {
		level: 2,
		nickName: "隔壁老王",
		userName: "19995678",
		password: "123456",
		manageId: "",
		userImg: "./img/tou3.png",
		role: "admin"
	}, {
		level: 3,
		nickName: "老王",
		userName: "19994567",
		password: "123456",
		manageId: "",
		userImg: "./img/tou4.png",
		role: "employee"
	}, {
		level: 3,
		nickName: "唐天保",
		userName: "199978910",
		password: "123456",
		manageId: "",
		userImg: "./img/tou5.png",
		role: "employee"
	}]
}
//产生id，根据当前数据的数量
let renderIdEx2 = renderId(10, goods.data.length);
//赋予每条数据的id值
for (let i in userAccount.data) {
	userAccount.data[i].manageId = renderIdEx2[0][i];
}
//添加id后重新存入
localStorage.userAccount = JSON.stringify(userAccount);
//console.log(JSON.parse(localStorage.userAccount));


//库存管理
localStorage.reper = JSON.stringify({
	manager: 2,
	data: [{
			repertoryId: '',
			goodsName: '可口可乐',
			amount: 100,
			purchasePrice: 5.8,
			price: 7,
			repertoryAmount: 700,
			manufacturer: '杭州中萃食品有限公司(浙江)',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '娇兰修护复原蜜',
			amount: 50,
			purchasePrice: 719,
			price: 800,
			repertoryAmount: 500,
			manufacturer: '法国',
			comment: '畅销'
		},
		{
			repertoryId: '',
			goodsName: '宝丽黑BA抗糖化口服液 ',
			amount: 100,
			purchasePrice: 469,
			price: 499,
			repertoryAmount: 400,
			manufacturer: '日本',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '苏打饼干 ',
			amount: 100,
			purchasePrice: 8,
			price: 9.9,
			repertoryAmount: 1000,
			manufacturer: '福建省漳州市',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '每日坚果亚麻籽谷物燕麦片',
			amount: 1000,
			purchasePrice: 48,
			price: 58,
			repertoryAmount: 2000,
			manufacturer: '韶关市曲江区瑞丰粮油食品有限公司',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '猫粮',
			amount: 60,
			purchasePrice: 88,
			price: 100,
			repertoryAmount: 100,
			manufacturer: '广州白云宝洞食品厂',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: 'U型便携按摩颈枕',
			amount: 300,
			purchasePrice: 80,
			price: 98,
			repertoryAmount: 700,
			manufacturer: '杭州服饰有限公司(浙江)',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '氨基酸洗护发蓬蓬瓶',
			amount: 200,
			purchasePrice: 68,
			price: 50,
			repertoryAmount: 700,
			manufacturer: '杭州洗护有限公司(浙江)',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '三味演义冻干方便面 ',
			amount: 300,
			purchasePrice: 4.8,
			price: 6,
			repertoryAmount: 1000,
			manufacturer: '阳春市顺隆粮食加工厂',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '麻辣方便火锅',
			amount: 600,
			purchasePrice: 20,
			price: 29,
			repertoryAmount: 1500,
			manufacturer: '汕头经济特区新星食品工业有限公司',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '有机绿豆',
			amount: 900,
			purchasePrice: 20,
			price: 28,
			repertoryAmount: 1700,
			manufacturer: '传美洪涛食品有限公司',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '益生菌粉固体饮料',
			amount: 900,
			purchasePrice: 12,
			price: 18,
			repertoryAmount: 1600,
			manufacturer: '杭州中萃食品有限公司(浙江)',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '可口可乐',
			amount: 100,
			purchasePrice: 5.8,
			price: 7,
			repertoryAmount: 700,
			manufacturer: '杭州中萃食品有限公司(浙江)',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '娇兰修护复原蜜',
			amount: 50,
			purchasePrice: 719,
			price: 800,
			repertoryAmount: 500,
			manufacturer: '法国',
			comment: '畅销'
		},
		{
			repertoryId: '',
			goodsName: '宝丽黑BA抗糖化口服液 ',
			amount: 100,
			purchasePrice: 469,
			price: 499,
			repertoryAmount: 400,
			manufacturer: '日本',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '苏打饼干 ',
			amount: 100,
			purchasePrice: 8,
			price: 9.9,
			repertoryAmount: 1000,
			manufacturer: '福建省漳州市',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '每日坚果亚麻籽谷物燕麦片',
			amount: 1000,
			purchasePrice: 48,
			price: 58,
			repertoryAmount: 2000,
			manufacturer: '韶关市曲江区瑞丰粮油食品有限公司',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '猫粮',
			amount: 60,
			purchasePrice: 88,
			price: 100,
			repertoryAmount: 100,
			manufacturer: '广州白云宝洞食品厂',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: 'U型便携按摩颈枕',
			amount: 300,
			purchasePrice: 80,
			price: 98,
			repertoryAmount: 700,
			manufacturer: '杭州服饰有限公司(浙江)',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '氨基酸洗护发蓬蓬瓶',
			amount: 200,
			purchasePrice: 68,
			price: 50,
			repertoryAmount: 700,
			manufacturer: '杭州洗护有限公司(浙江)',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '三味演义冻干方便面 ',
			amount: 300,
			purchasePrice: 4.8,
			price: 6,
			repertoryAmount: 1000,
			manufacturer: '阳春市顺隆粮食加工厂',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '麻辣方便火锅',
			amount: 600,
			purchasePrice: 20,
			price: 29,
			repertoryAmount: 1500,
			manufacturer: '汕头经济特区新星食品工业有限公司',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '有机绿豆',
			amount: 900,
			purchasePrice: 20,
			price: 28,
			repertoryAmount: 1700,
			manufacturer: '传美洪涛食品有限公司',
			comment: '热销'
		},
		{
			repertoryId: '',
			goodsName: '益生菌粉固体饮料',
			amount: 900,
			purchasePrice: 12,
			price: 18,
			repertoryAmount: 1600,
			manufacturer: '杭州中萃食品有限公司(浙江)',
			comment: '热销'
		},
		//这里是新加的
		{
			repertoryId: '',
			goodsName: '清扬洗发水',
			amount: 150,
			purchasePrice: 59,
			price: 800,
			repertoryAmount: 100,
			manufacturer: '大陆',
			comment: '畅销'
		}, {
			repertoryId: '',
			goodsName: '书籍-如何成为一个有绝活的人',
			amount: 300,
			purchasePrice: 59,
			price: 99,
			repertoryAmount: 200,
			manufacturer: '法国',
			comment: '畅销'
		}, {
			repertoryId: '',
			goodsName: '荣耀智慧屏X1',
			amount: 100,
			purchasePrice: 719,
			price: 800,
			repertoryAmount: 500,
			manufacturer: '法国',
			comment: '畅销'
		}, {
			repertoryId: '',
			goodsName: '得力(deli)双面胶',
			amount: 600,
			purchasePrice: 9,
			price: 12,
			repertoryAmount: 700,
			manufacturer: '法国',
			comment: '畅销'
		}, {
			repertoryId: '',
			goodsName: '清扬洗发水',
			amount: 500,
			purchasePrice: 25,
			price: 30,
			repertoryAmount: 600,
			manufacturer: '法国',
			comment: '畅销'
		}, {
			repertoryId: '',
			goodsName: '蓝月亮洗衣液',
			amount: 200,
			purchasePrice: 69,
			price: 99,
			repertoryAmount: 300,
			manufacturer: '法国',
			comment: '畅销'
		}, {
			repertoryId: '',
			goodsName: '私人订制西服',
			amount: 300,
			purchasePrice: 25,
			price: 56,
			repertoryAmount: 200,
			manufacturer: '法国',
			comment: '畅销'
		}, {
			repertoryId: '',
			goodsName: '奔富（Penfolds)红葡萄酒',
			amount: 200,
			purchasePrice: 59,
			price: 129,
			repertoryAmount: 500,
			manufacturer: '法国',
			comment: '畅销'
		}, {
			repertoryId: '',
			goodsName: '小米全面屏电视',
			amount: 200,
			purchasePrice: 59,
			price: 129,
			repertoryAmount: 500,
			manufacturer: '法国',
			comment: '畅销'
		}, {
			repertoryId: '',
			goodsName: '帆布休闲鞋',
			amount: 200,
			purchasePrice: 59,
			price: 129,
			repertoryAmount: 500,
			manufacturer: '法国',
			comment: '畅销'
		}, {
			repertoryId: '',
			goodsName: '得力(deli)笔记本',
			amount: 200,
			purchasePrice: 59,
			price: 129,
			repertoryAmount: 500,
			manufacturer: '法国',
			comment: '畅销'
		}
	]
})
//存id
let reper = JSON.parse(localStorage.reper);
let renderIdEx1 = renderId(10, reper.data.length);
for (let i in reper.data) {
	reper.data[i].repertoryId = renderIdEx1[0][i];
}
//console.log(reper)
localStorage.reper = JSON.stringify(reper);





//--------------------供应商----------------
var supplier = [{
		id: "",
		manufacture: '娃哈哈',
		contacts: '谢凯伦',
		phone: '13698524712',
		address: '成都市',
		bank: '中国工商银行',
		bankNum: '6221220965871155526'
	},
	{
		id: "",
		manufacture: '可口可乐',
		contacts: '张璋',
		phone: '13697524474',
		address: '连云港',
		bank: '中国工商银行',
		bankNum: '6221220965871155526'
	},
	{
		id: "",
		manufacture: '得力',
		contacts: '刘华',
		phone: '13524561852',
		address: '吉林市',
		bank: '中国建设银行',
		bankNum: '6221220965871155526'
	},
	{
		id: "",
		manufacture: '康师傅',
		contacts: '王封',
		phone: '15098528416',
		address: '天津市',
		bank: '中国建设银行',
		bankNum: '6221220965871155526'
	},
	{
		id: "",
		manufacture: '百事可乐',
		contacts: '李大年',
		phone: '15098529845',
		address: '重庆市',
		bank: '中国工商银行',
		bankNum: '6221220965871155526'
	},
	{
		id: "",
		manufacture: '三只松鼠',
		contacts: '刘志丰',
		phone: '13952524542',
		address: '长沙市',
		bank: '中国人民银行',
		bankNum: '6221220965871155526'
	},
	{
		id: "",
		manufacture: '达利园',
		contacts: '张广田',
		phone: '13182524764',
		address: '上海市',
		bank: '中国工商银行',
		bankNum: '6221220965871155526'
	},
	{
		id: "",
		manufacture: '蒙牛',
		contacts: '田秦',
		phone: '13982524781',
		address: '苏州市',
		bank: '中国人民银行',
		bankNum: '6221220965871155526'
	},
	{
		id: "",
		manufacture: '伊利',
		contacts: '钱起',
		phone: '13148524252',
		address: '苏州市',
		bank: '中国工商银行',
		bankNum: '6221220965871155526'
	},
	{
		id: "",
		manufacture: '真彩',
		contacts: '赵五',
		phone: '13148524742',
		address: '苏州市',
		bank: '中国工商银行',
		bankNum: '6221220965871155514'
	}
];
localStorage.setItem('key', JSON.stringify(supplier));

let renderIdEx3 = renderId(10, supplier.length);
for (let i in supplier) {
	supplier[i].id = renderIdEx3[0][i];
}
localStorage.supplier = JSON.stringify(supplier);
//console.log(supplier)



//------------------消费者消费记录---------------
var parRecords = [{
	customer: "王博",
	buy: "书籍-如何成为一个有绝活的人",
	goodsAmount: 1,
	payId: "",
	cashierId: "",
	repertoryId: "",
	goodsId: "",
	payDate: "2020-5-5 16:30",
	tel: 18281868192
}, {
	customer: "舒述军",
	buy: "得力(deli)笔记本",
	goodsAmount: 10,
	payId: "",
	cashierId: "",
	repertoryId: "",
	goodsId: "",
	payDate: "2020-5-5 16:20",
	tel: 14568792568
}, {
	customer: "谢凯伦",
	buy: "小米全面屏电视",
	goodsAmount: 1,
	payId: "",
	cashierId: "",
	repertoryId: "",
	goodsId: "",
	payDate: "2020-5-5 16:30",
	tel: 18955869856
}, {
	customer: "王博",
	buy: "帆布休闲鞋",
	goodsAmount: 20,
	payId: "",
	cashierId: "",
	repertoryId: "",
	goodsId: "",
	payDate: "2020-5-5 16:30",
	tel: 15402350458
}, {
	customer: "郑愉心",
	buy: "荣耀智慧屏X1",
	goodsAmount: 20,
	payId: "",
	cashierId: "",
	repertoryId: "",
	goodsId: "",
	payDate: "2020-5-5 16:30",
	tel: 14523547859
}, {
	customer: "王博",
	buy: "得力(deli)双面胶",
	goodsAmount: 2,
	payId: "",
	cashierId: "",
	repertoryId: "",
	goodsId: "",
	payDate: "2020-5-5 16:30",
	tel: 15236578952
}, {
	customer: "王博",
	buy: "清扬洗发水",
	goodsAmount: 20,
	payId: "",
	cashierId: "",
	repertoryId: "",
	goodsId: "",
	payDate: "2020-5-5 16:30",
	tel: 12478569527
}, {
	customer: "王博",
	buy: "蓝月亮洗衣液",
	goodsAmount: 20,
	payId: "",
	cashierId: "",
	repertoryId: "",
	goodsId: "",
	payDate: "2020-5-5 16:30",
	tel: 12456982567
}, {
	customer: "王博",
	buy: "私人订制西服",
	goodsAmount: 1,
	payId: "",
	cashierId: "",
	repertoryId: "",
	goodsId: "",
	payDate: "2020-5-5 16:30"
}, {
	customer: "谢凯伦",
	buy: "奔富（Penfolds)红葡萄酒",
	tel: 12546985269,
	goodsAmount: 5,
	payId: "",
	cashierId: "",
	repertoryId: "",
	goodsId: "",
	payDate: "2020-5-5 16:30",
	tel: 12548967895
}, {
	customer: "王博",
	buy: "清扬洗发水",
	goodsAmount: 20,
	payId: "",
	cashierId: "",
	repertoryId: "",
	goodsId: "",
	payDate: "2020-5-5 16:30",
	tel: 12478569527
}, {
	customer: "王博",
	buy: "清扬洗发水",
	goodsAmount: 20,
	payId: "",
	cashierId: "",
	repertoryId: "",
	goodsId: "",
	payDate: "2020-5-5 16:30",
	tel: 12478569527
}, ];

//取得收银员的信息
let cashier = [];
for (let i = 0; i < yuanGong.length; i++) {
	if (yuanGong[i].pos == "收银员") {
		cashier.push(yuanGong[i]);
	}
}
for (let i = 0; i < parRecords.length; i++) {
	parRecords[i].cashierId = randomGet(cashier).id;
}
//console.log(parRecords)
//取得库存id
let reperto = [];
for (let i = 0; i < reper.data.length; i++) {
	for (let j = 0; j < parRecords.length; j++) {
		if (parRecords[j].buy == reper.data[i].goodsName) {
			parRecords[j].repertoryId = reper.data[i].repertoryId;
		}
	}
}
//取得商品id

//console.log(parRecords)
for (let i = 0; i < goods.data.length; i++) {
	for (let j = 0; j < parRecords.length; j++) {
		if (parRecords[j].buy == goods.data[i].goodsName) {
			parRecords[j].goodsId = goods.data[i].goodsId;
		}
	}
}
//console.log(parRecords)
//生成消费记录id
let renderIdEx5 = renderId(10, parRecords.length);
for (let i in supplier) {
	parRecords[i].payId = renderIdEx5[0][i];
}
localStorage.parRecords = JSON.stringify(parRecords);
//console.log(parRecords);
//工具函数
//从一个数组中随机取一个
function randomGet(arr) {
	let num = parseInt(Math.random() * (arr.length));
	return arr[num];
}
//console.log(parRecords)