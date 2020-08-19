$(document).ready(function(){
	let now = JSON.parse(localStorage.nowUser);
	let account = JSON.parse(localStorage.userAccount);
	var nowAccount = [];
	for(let i= 0;i<account.data.length;i++){
		if(now==account.data[i].manageId){
			nowAccount = account.data[i];
		}
	}
	//console.log(nowAccount);
	let userImg = "."+nowAccount.userImg;
	//console.log(userImg)
	$("#personTou img").attr("src",userImg)
	$("#nickName").val(nowAccount.nickName);
	$("#account").text(nowAccount.userName);
	$("#password").val(nowAccount.password);

	//点击修改即可修改
	$("#updateNickName,#updatepwd").click(function () { 
		
		$(this)[0].previousSibling.removeAttribute("readonly");
		$(this)[0].previousSibling.classList.remove("password");
		$(this)[0].previousSibling.classList.remove("nickName");
		$(this)[0].previousSibling.focus();
		$("#subBtn span").show("fast");
		console.log($(this)[0].previousSibling);
		$("#subBtn span").click(function () { 
			let nickname = $("#nickName").val();
			let pwd = $("#password").val();
			//console.log(nowAccount.manageId)
			for (let i = 0; i < account.data.length; i++) {
				if (now == account.data[i].manageId) {
					account.data[i].nickName = nickname;
					//console.log(nickname)
					account.data[i].password = pwd;
					//console.log(pwd)
					localStorage.userAccount = JSON.stringify(account);
					//console.log(account,nowAccount)
					localStorage.nowUser = account.data[i].manageId;
					$("#tishi").text("修改成功！");
					$("#tishi").show("fast");
					setTimeout(function () { 
						location.href = "../index.html"+"#"+localStorage.nowUser;
					},1000)

					break;
				}
			}
		})
	})

	$(".back>span").click(function () { 
		location.href = "../index.html" + "#"+localStorage.nowUser;
	})

	
})