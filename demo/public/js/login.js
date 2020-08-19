window.onload = function() {
	//(document.cookie);
	//直接判断有没有cookie
	if (document.cookie) {
		let cook = document.cookie.split("=");
		//console.log(cook);
		let user = cook[1];
		let pwd = cook[3];
		$("#username").val(user);
		$("#password").val(pwd);
		$("#ok").addClass("active");
	} else {
		$("#username").val("");
		$("#password").val("");
	}
	//禁用浏览器的前进功能
	var user = "";
	setTimeout(function() {
		var loginMain = document.getElementsByClassName("loginMain")[0];
		var zhe = document.getElementsByClassName("zhe")[0];
		loginMain.style.top = 0;
		zhe.style.opacity = 1;
	}, 500);
	var userIsCorrect = false,
		pwdIsCorrect = false;
	//获取本地数据
	var userData = JSON.parse(localStorage.userAccount);
	//console.log(userData);
	//实时监听用户名输入框和密码输入框,错误提示
	$("#username")[0].oninput = function() {
		$(".tishi").hide("fast");
		let val = $(this).val();
		let reg = /^\d[\d]{3,12}/;
		let reg1 = /\d/g;
		let reg2 = /^\D/g;
		if (val) {
			for (let i = 0; i < userData.data.length; i++) {
				//console.log(val.match(reg))
				if (val.match(reg)) {
					//可能存在该用户
					//console.log(val.match(reg).input,val.match(reg)[0])
					if (val.match(reg).input > val.match(reg)[0]) {
						$(".errorInfo1").text("用户名为3-12位纯数字");
						$(".errorInfo1").show("fast");
						$(".errorInfo1").css("color", "red")
					} else {
						$(".errorInfo1").hide("fast");
					}
					//console.log(userData.data[i].userName.match(reg));
					//console.log("19996963".match("/[0-9]{3,12}/g"));
				} else if(val.match(reg2) || (val.match(reg1)).length<val.length){
					$(".errorInfo1").text("用户名必须为纯数字");
					$(".errorInfo1").show("fast");
				}else{
					$(".errorInfo1").text("用户名为3-12位纯数字")
					$(".errorInfo1").show("fast");
					$(".errorInfo1").css("color", "red")
				}
			}
		} else {
			$(".errorInfo1").hide();
		}
	}


	//验证密码
	$("#password")[0].oninput = function() {
		$(".tishi").hide("fast");
		let val = this.value;
		if (val) {
			if (val.length < 4) {
				$(".errorInfo2").text("密码长度不小于4位");
				$(".errorInfo2").show("slow");
			} else if (val.length > 8) {
				$(".errorInfo2").text("密码长度不大于8位");
				$(".errorInfo2").show("slow");
			} else {
				$(".errorInfo2").hide("slow");
			}
		} else {
			$(".errorInfo2").hide("fast");
		}
	}

	//点击登录按钮验证
	$("#loginConfirm").click(function(e) {
		e.preventDefault();
		$(".errorInfo1,.errorInfo2,.tishi").hide();
		let inputUser = $("#username").val();
		let inputPwd = $("#password").val();
		let userExist = false;
		//验证记住密码
		let isSec = $("#ok").css("display") == "none";
		//console.logconsole.log(isSec);
		if (inputUser && inputPwd) {
			for (let i = 0; i < userData.data.length; i++) {
				if (inputUser == userData.data[i].userName && inputPwd == userData.data[i].password) {
					userExist = true;
					//直接跳转到index页面并传递id值
					//选中记住密码时
					if (!isSec) {
						document.cookie = "nowUser=" + inputUser + "=nowPwd=" + inputPwd + "=manageId=" + userData.data[i].manageId;
					} 
					//console.log(userData.data[i].manageId)
					location.href = "../index.html" + "#" + userData.data[i].manageId;
				}
			}
			if (!userExist) {
				$(".tishi").text("用户名或密码错误");
				$(".tishi").show("fast");
			} else {
				$(".tishi").hide("fast");
			}
		} else {
			$(".tishi").text("用户名和密码不能为空");
			$(".tishi").show("fast");
		}





	})

	//记住密码
	$(".okOut").click(function() {
		$("#ok").toggle("active");
	})
	
	//当失去焦点的时候清空哦所有的提示
	
}
