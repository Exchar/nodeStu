var pageData = [];
var tableBody = document.querySelector('tbody');
var pageBox = document.querySelector('#pageBox');
// var supplierArr=JSON.parse(localStorage.supplierArr);
function getPageData(arr,index,numPerPage){
    pageData = arr.slice((index-1)*numPerPage, index * numPerPage);
}
function getPage(total,numPerPage){//
    var pageNum = Math.ceil(total/numPerPage);
    var lis='';
    for(let i=1;i<=pageNum;i++){
        if(i === 1){
            lis += '<li class="active">'+i+'</li>'
        }else{
            lis += '<li>'+i+'</li>'
        }
    }
    pageBox.innerHTML = lis;
}
function init(datas) {
    tableBody.innerHTML=null;
    for (let k=0;k<datas.length;k++) {
        var tr=document.createElement('tr');
        $.each(datas[k],function (i,val) {
            var td=document.createElement('td');
            td.innerHTML=val;
            tr.appendChild(td);
        })
        tr.innerHTML=""+tr.innerHTML+"<td><span class=\"btn btn-warning\">修改</span>"+"<span class=\"btn btn-danger marginLeft\">删除</span></td>";
        tableBody.innerHTML+=tr.innerHTML;
    }
}
function render(){
    init(pageData);
}
function initTable(){//进入页面的初始状态，初始化表格
    var supplierArr=JSON.parse(localStorage.getItem('supplier'));
    //默认获取第一页的数据
    getPageData(supplierArr,1,5);
    //       渲染分页
    getPage(supplierArr.length,5);
    //       渲染页面数据
    render(pageData);
}
//分页点击部分
$(pageBox).on('click','li',function(){
    var supplierArr=JSON.parse(localStorage.getItem('supplier'));
    getPageData(supplierArr,Number($(this).html()),5);
    render(pageData);
    $(this).addClass('active').siblings('li').removeClass('active');
});
initTable();
//修改模态框
var deletes=document.querySelector('.deletes');
var modifyBg=document.querySelector('.modifyBg');
var modify=document.querySelector('.modify');
var tr=document.getElementsByTagName('tr');
var xiuGai=document.querySelector('tbody');
var input=document.querySelectorAll('.modify input');
var b=document.querySelector('#b');
var y=document.querySelector('#yes');
var n=document.querySelector('#no');
xiuGai.onclick=function () {
    var e=arguments[0] || window.event;
    var target=e.target || e.srcElement;
    var modifyNo=document.querySelector('#modifyNo');
    var supplier=JSON.parse(localStorage.getItem('supplier'));
    var nums = target.parentNode.parentNode.children[0].innerText;
    var select=document.querySelector('.modifyShow select');
    for (let i=0;i<supplier.length;i++) {
        if (supplier[i].id===nums) {
            nums=i;
            break;
        }
    }
    if (target.className==='btn btn-warning') {
        modifyBg.style.display='block';
        modify.style.display='block';
        input[0].value=supplier[nums].id;
        input[1].value=supplier[nums].manufacture;
        input[2].value=supplier[nums].contacts;
        input[3].value=supplier[nums].phone;
        input[4].value=supplier[nums].address;
        select.value=supplier[nums].bank;
        input[5].value=supplier[nums].bankNum;
        b.onclick=function (){
            // var suppliers=JSON.parse(localStorage.supplierArr);
            supplier[nums].manufacture=input[1].value;
            supplier[nums].contacts=input[2].value;
            supplier[nums].phone=input[3].value;
            supplier[nums].address=input[4].value;
            supplier[nums].bank=select.value;
            supplier[nums].bankNum=input[5].value;
            localStorage.setItem('supplier',JSON.stringify(supplier));
            initTable();
            modifyBg.style.display='none';
            modify.style.display='none';
        }
        modifyNo.onclick=function () {
            modifyBg.style.display='none';
            modify.style.display='none';
        }
    }
    //删除
    if (target.className==='btn btn-danger marginLeft') {
        deletes.style.display='block';
        modifyBg.style.display='block';
        var nums = target.parentNode.parentNode.children[0].innerText;
        for (let i=0;i<supplier.length;i++) {
            if (supplier[i].id===nums) {
                nums=i;
                break;
            }
        }
        y.onclick=function () {
            nums=Number(nums);
            supplier.splice(nums,1);
            // console.log(supplier);
            // for (var i=nums-1;i<supplier.length;i++) {
            //     supplier[i].id=i+1;
            // }
            localStorage.setItem('supplier',JSON.stringify(supplier));
            initTable();
            deletes.style.display='none';
            modifyBg.style.display='none';
        }
        n.onclick=function () {
            deletes.style.display='none';
            modifyBg.style.display='none';
        }
    }
}
//增加
var addSupplierItem=document.querySelector('#addSupplierItem');
addSupplierItem.onclick=function () {
    var add=document.querySelector('.add');
    var addInput=document.querySelectorAll('.add input');
    var a=document.querySelector('#a');
    var addNo=document.querySelector('#addNo')
    add.style.display='block';
    modifyBg.style.display='block';
    var supplier=JSON.parse(localStorage.getItem('supplier'));
    var len=supplier.length;
    addInput[0].value=String(Number(supplier[len-1].id)+1);
    addNo.onclick=function () {
        showBlue();
        add.style.display='none';
        modifyBg.style.display='none';
    }
    a.onclick=function () {
        var addObj={};
        addObj.id=addInput[0].value;
        addObj.manufacture=addInput[1].value;
        addObj.contacts=addInput[2].value;
        addObj.phone=addInput[3].value;
        addObj.address=addInput[4].value;
        addObj.bank=$('.addShow select').val();
        addObj.bankNum=addInput[5].value;
        supplier.push(addObj);
        localStorage.setItem('supplier',JSON.stringify(supplier));
        for (var i=0;i<addInput.length-2;i++) {
            addInput[i].value=null;
        }
        showBlue();
        initTable();
        add.style.display='none';
        modifyBg.style.display='none';
    }
}
//查询
var searchGoodsItem=document.querySelector('#searchGoodsItem');
searchGoodsItem.onclick=function () {
    var queryYes=document.querySelector('#queryYes');
    let supplier=JSON.parse(localStorage.getItem('supplier'));
    var query=document.querySelector('.query');
    var queryDiv=document.querySelectorAll('.query div');
    let search=document.querySelector('#search');
    let searchVal=search.value;
    query.style.display='block';
    modifyBg.style.display='block';
    var count=0;
    for (var i=0;i<supplier.length;i++) {
        if (supplier[i].manufacture===searchVal) {
            queryDiv[1].innerHTML='编号:'+supplier[i].id+'';
            queryDiv[2].innerHTML='生产商名:'+supplier[i].manufacture+'';
            queryDiv[3].innerHTML='联系人:'+supplier[i].contacts+'';
            queryDiv[4].innerHTML='联系电话:'+supplier[i].phone+'';
            queryDiv[5].innerHTML='地址:'+supplier[i].address+'';
            queryDiv[6].innerHTML='开户行:'+supplier[i].bank+'';
            queryDiv[7].innerHTML='银行卡号:'+supplier[i].bankNum+'';
            queryYes.onclick=function () {
                for (var j=1;j<queryDiv.length-1;j++) {
                    queryDiv[j].innerHTML=null;
                }
                query.style.display='none';
                modifyBg.style.display='none';
            }
            break;
        }
        else {
            count++;
            if (count===supplier.length) {
                $('.queryShow').css('height','120px');
                queryDiv[1].innerHTML='您输入的生产商名不存在';
                queryYes.onclick=function () {
                    query.style.display='none';
                    modifyBg.style.display='none';
                }
            }
        }
    }
}
//手机号码验证
function checkPhone(){
    if(!(/^1[3456789]\d{9}$/.test($("#phone").val()))){
        $("#phone").next().next().html('您输入的手机号不正确');
        $("#phone").next().attr('src','../img/wrong.png');
        $("#phone").next().next().css("color","rgb(229,31,31)");
        // $('#a').css("background","rgb(192,192,192)");
        return false;
    }
    else {
        $("#phone").next().next().html('您输入的手机号符合规范！');
        $("#phone").next().attr('src','../img/right.png');
        $("#phone").next().next().css("color","rgb(140,210,50)");
        return true;
    }
}
//姓名验证
function checkName() {
    let reg = /^[\u4e00-\u9fa5]{2,6}$/;
    let name = $("#name").val();
    if (!reg.test(name) || name=='') {
        $("#name").next().next().html('您输入姓名不符合规范');
        $("#name").next().attr('src','../img/wrong.png');
        $("#name").next().next().css("color","rgb(229,31,31)");
        return false;
    }else{
        $("#name").next().next().html('您输入姓名符合规范');
        $("#name").next().attr('src','../img/right.png');
        $("#name").next().next().css("color","rgb(140,210,50)");
        return true;
    }
}
//生产商名验证
function checkManufacture() {
    if ($("#manufacture").val()==='') {
        $("#manufacture").next().next().html('生产商名不能为空');
        $("#manufacture").next().attr('src','../img/wrong.png');
        $("#manufacture").next().next().css("color","rgb(229,31,31)");
        return false;
    }
    else {
        $("#manufacture").next().next().html('生产商名符合规范');
        $("#manufacture").next().attr('src','../img/right.png');
        $("#manufacture").next().next().css("color","rgb(140,210,50)");
        return true;
    }
}
//地址验证
function checkAddress() {
    if ($("#address").val()==='') {
        $("#address").next().next().html('地址不能为空');
        $("#address").next().attr('src','../img/wrong.png');
        $("#address").next().next().css("color","rgb(229,31,31)");
        return false;
    }
    else {
        $("#address").next().next().html('地址符合规范');
        $("#address").next().attr('src','../img/right.png');
        $("#address").next().next().css("color","rgb(140,210,50)");
        return true;
    }
}
//银行卡号验证
function checkBankNum() {
    let reg = /^(\d{16}|\d{19})$/;
    let num = Number($("#bankNum").val());
    if (!reg.test(num) || num==='') {
        $("#bankNum").next().next().html('银行卡号输入不规范');
        $("#bankNum").next().attr('src','../img/wrong.png');
        $("#bankNum").next().next().css("color","rgb(229,31,31)");
        return false;
    }
    else {
        $("#bankNum").next().next().html('银行卡号符合规范');
        $("#bankNum").next().attr('src','../img/right.png');
        $("#bankNum").next().next().css("color","rgb(140,210,50)");
        return true;
    }
}
function showBlue() {
    $("#phone").next().next().html('请输入11位手机号码');
    $("#phone").next().attr('src','../img/mess.png');
    $("#phone").next().next().css("color","rgb(105,190,235)");
    $("#address").next().next().html('请输入不为空的地址');
    $("#address").next().attr('src','../img/mess.png');
    $("#address").next().next().css("color","rgb(105,190,235)");
    $("#name").next().next().html('请输入2~6位中文字符');
    $("#name").next().attr('src','../img/mess.png');
    $("#name").next().next().css("color","rgb(105,190,235)");
    $("#manufacture").next().next().html('请输入不为空的商家名');
    $("#manufacture").next().attr('src','../img/mess.png');
    $("#manufacture").next().next().css("color","rgb(105,190,235)");
    $("#bankNum").next().next().html('请输入16位或19位的银行卡号');
    $("#bankNum").next().attr('src','../img/mess.png');
    $("#bankNum").next().next().css("color","rgb(105,190,235)");
}