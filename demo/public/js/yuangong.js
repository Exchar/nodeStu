/**
 * Created by VULCAN on 2020/8/4.
 */

localStorage.stuArr =JSON.stringify(yuanGong);
var yuanArr=JSON.parse(localStorage.stuArr);
//console.log(yuanArr);

var tbody=document.querySelector(' tbody');
var ulFen=document.getElementById('fenYeFu');
var pageData = [];
var currPageIndex = 1;
    initTable();
    function initTable(){
    getPageData(yuanArr,1,5); //默认获取第一页的数据

    render(pageData,1);////渲染分页页面数据

    getPage(yuanArr.length,5);//渲染分页，在页面打印出数据


        //let renderIdEx = renderId(10,yuanArr.length);
        //for (let i in yuanArr) {
        //    yuanArr[i].id = renderIdEx[i];
        //    localStorage.stuArr = JSON.stringify(yuanArr[i].id);
        //    console.log(yuanArr[i].id)
        //
        //}

}





    function render(yuanArr1,pageIndex){
    var trData='';
    for(var i=0;i<yuanArr1.length;i++){
        trData+="<tr>"+
        "<td>"+yuanArr1[i].id+"</td>"+
        "<td>"+yuanArr1[i].name+"</td>"+
        "<td>"+yuanArr1[i].pos+"</td>"+
        "<td>"+yuanArr1[i].sex+"</td>"+
        "<td>"+yuanArr1[i].tel+"</td>"+
        "<td>"+yuanArr1[i].adress+"</td>"+
        "<td>"+yuanArr1[i].date+"</td>"+
        "<td>"+yuanArr1[i].work+"</td>"+
         "<td><button class='delBtn btn btn-danger' data-index='"+((pageIndex-1)*5+i)+"'>删除</button><button class='xiuGai btn btn-warning' data-index='"+((pageIndex-1)*5+i)+"'>修改</button></td>"+"</tr>";

    }
    tbody.innerHTML=trData;

}

    function getPage(total,numPer){
        var pageNum=Math.ceil(total/numPer);
        var lis='';
        for(let i=1;i<=pageNum;i++){
            if(i==1){
                lis+='<li class="active">'+i+'</li>'
            }else{
                lis+='<li>'+i+'</li>'
            }
        }
        ulFen.innerHTML=lis;
    }

    function getPageData(arr,index,numPer){
        pageData=arr.slice((index-1)*numPer,index*numPer);

    }


//分页点击部分

    $(fenYeFu).on('click','li',function(){
        currPageIndex=Number($(this).html());
        getPageData(yuanArr,Number($(this).html()),5);
        render(pageData,Number($(this).html()));
        $(this).addClass('active').siblings('li').removeClass('active');
    });

//添加功能
    var shi='';
    var addBtn=$('#add');
    addBtn.click(function(){
        $('#tian').css({display:'block'});
        $('.modifyBg').css({display:'block'});


    });
    var dian=0;
    var tianjiaan=document.getElementById('tianjia');
    tianjiaan.onclick=function(){
        $('#tian').css({display:'none'});
        $('.modifyBg').css({display:'none'});
        var ids=$('#ids');
        var userName=$('#userName');
        var pos=$('#pos1');
        var sex= $('[name="sex"]:checked');
        var tel=$('#tel');
        var date=$('#date');
        var adress=$('#adress');
        shi=$('#date').val().split('-')[0];
        dian++;
        var shijianc=shiJian(shi);
        yuanArr.unshift({
            id:Number(yuanArr[yuanArr.length-1].id)+dian,
            name:userName.val(),
            pos:pos.val(),
            sex: sex.val() == '1' ? '男': '女',
            tel:tel.val(),
            adress:adress.val(),
            date:date.val(),
            work:shijianc
        });
        localStorage.stuArr =JSON.stringify(yuanArr);

        initTable();
    };

    $('#qu2').click(function(){

        $('#tian').css({display:'none'});
        $('.modifyBg').css({display:'none'});
    })



//时差计算
    function shiJian(shij){
        var day = new Date();

        console.log(day.getFullYear());
        var a=parseInt(day.getFullYear()-shij);
        if(shij==0){
            return a=0;
        }
        console.log(a);
        return a;
    }



//删除功能
    var btn=$('.delBtn');
    var zi='';
    $(tbody).on('click',btn,function(){
        var e = arguments[0] || window.event;
        var tag=e.target;
        console.log(tag);

        if(tag.innerText=='删除'){
            $('#shan').css({display:'block'});
            $('.modifyBg').css({display:'block'});
            console.log($(tag).data('index'));
            zi=$(tag).data('index');
            //yuanArr.splice($(tag).data('index'),1);
            //localStorage.stuArr =JSON.stringify(yuanArr);
            initTable();
        }else{

        }

});


$('#shancu').click(function(){
        if($('#shancu')){
            yuanArr.splice(zi,1);
            localStorage.stuArr =JSON.stringify(yuanArr);
            $('#shan').css({display:'none'});
            $('.modifyBg').css({display:'none'});
        }

    initTable();

    }

);
$('#qu').click(function() {
    $('#shan').css({display:'none'});
    $('.modifyBg').css({display:'none'});
});

//修改

var btn2=$('.xiuGai');
var taa;
var ids2=document.getElementById('ids2');
$(tbody).on('click',btn2,function() {
    var e = arguments[0] || window.event;
    var tag=e.target;
    console.log( tag);
    var trData='';
    if(tag.innerText=='修改'){
        $('#xiug').css({display:'block'});
        $('.modifyBg').css({display:'block'});

        trData+=yuanArr[$(tag).data('index')].id;
        console.log(trData);
        ids2.value=trData;
        taa=$(tag).data('index');

        $("#userName2").val(yuanArr[$(tag).data('index')].name);
        $("#dd").html(yuanArr[$(tag).data('index')].sex);
        $('#pos').val(yuanArr[$(tag).data('index')].pos);
        $('#tel2').val(yuanArr[$(tag).data('index')].tel);
        $('#adress2').val(yuanArr[$(tag).data('index')].adress);
        $('#date2').val(yuanArr[$(tag).data('index')].date);



        $('#xiugai').click(function(){

            var ids=$('#ids2');
            var userName= $("#userName2");
            var pos=$('#pos');
            var sex= $('[name="sex"]:checked');
            var tel=$('#tel2');
            var date=$('#date2');
            var adress=$('#adress2');
            //console.log($("#userName2").val());
            shi=$('#date2').val().split('-')[0];

            var shijianc=shiJian(shi);

            yuanArr[$(tag).data('index')].id=ids.val();
            yuanArr[$(tag).data('index')].name= userName.val();
            console.log(yuanArr[$(tag).data('index')]);
            yuanArr[$(tag).data('index')].pos= pos.val();
            yuanArr[$(tag).data('index')].sex= sex.val() == '1' ? '男' : '女';
            yuanArr[$(tag).data('index')].tel= tel.val();
            yuanArr[$(tag).data('index')].adress= adress.val();
            yuanArr[$(tag).data('index')].date= date.val();
            yuanArr[$(tag).data('index')].work= shijianc;

            localStorage.stuArr =JSON.stringify(yuanArr);

            $('#xiug').css({display:'none'});
            $('.modifyBg').css({display:'none'});
            //localStorage.stuArr =JSON.stringify(yuanGong);
            //var yuanArr=JSON.parse(localStorage.stuArr);
            var currData=yuanArr.slice(($(tag).data('index')-1)*5,$(tag).data('index')*5);


            //render(currData,currPageIndex);
            initTable();
        });

   }

    });

    $('#qu3').click(function(){

        $('#xiug').css({display:'none'});
        $('.modifyBg').css({display:'none'});
    });





//查询
    var  cha=$('#chaXun1');
    var cha1=$('#chaXun');
    cha1.click(function(){
        var e = arguments[0] || window.event;
        var tag=e.target;
        console.log( cha.val());
        var trData='';

        $('.modifyBg').css({display:'block'});
        $('#cha').css({display:'block'});
        for(var i=0;i<yuanArr.length;i++){
            if(yuanArr[i].id==cha.val()){




                trData+="<tr>"+
                "<td>ID："+yuanArr[i].id+"</td>"+"</tr>"+"<tr>"+
                "<td>姓名："+yuanArr[i].name+"</td>"+"</tr>"+"<tr>"+
                "<td>职位："+yuanArr[i].pos+"</td>"+"</tr>"+"<tr>"+
                "<td>性别："+yuanArr[i].sex+"</td>"+"</tr>"+"<tr>"+
                "<td>联系电话："+yuanArr[i].tel+"</td>"+"</tr>"+"<tr>"+
                "<td>住址："+yuanArr[i].adress+"</td>"+"</tr>"+"<tr>"+
                "<td>入职时间："+yuanArr[i].date+"</td>"+"</tr>"+"<tr>"+
                "<td>入职年份："+yuanArr[i].work+"</td>"+"</tr>"
            }



        }
        if(trData){
            $('#chax').html(trData);
        }else{
            $('#chax').html('<p style="line-height: 200px;text-align: center; font-size:2em;margin-left: 15px;">查无此人!<p>');
        }

    });

    $('#chaxunx').click(function(){
        $('.modifyBg').css({display:'none'});
        $('#cha').css({display:'none'});

    });

