window.onload = function () {
    var tablebody = document.getElementById('tablebody');
    var pageBox = document.getElementsByClassName('pagination')[0]
    let reper = JSON.parse(localStorage.reper);
    var pageData = [];
    var page = 1;
    searchgoods();
    initTable();
    function initTable() {
        getPageData(reper.data, page, 5)
        render(pageData)
        getPage(reper.data.length, 5)
        clickPage(reper.data)
        tianjia()
        shanchu()
        aniu(page)
        xiugai()
        pages()
        pageChange()
        searchnum()
    }
    function render(reper) {
        var trData = '';
        tablebody.innerHTML = '';
        for (var i = 0; i < reper.length; i++) {
            trData += '<tr data-id=' + '"' + reper[i].repertoryId + '">' +
                '<td>' + reper[i].goodsName + '</td>' +
                '<td>' + reper[i].amount + '</td>' +
                '<td>' + reper[i].purchasePrice + '</td>' +
                '<td>' + reper[i].price + '</td>' +
                '<td>' + reper[i].repertoryAmount + '</td>' +
                '<td>' + reper[i].manufacturer + '</td>' +
                '<td>' + reper[i].comment + '</td>' +
                '<td><span class="btn btn-warning editBtn" data-toggle="modal" data-target="#myModal1">修改</span><span class="btn btn-danger delBtn">删除</span></td>' +
                '</tr>'
        }
        tablebody.innerHTML = trData;
    }
    function getPage(total, numPerPage) {
        var pageNum = Math.ceil(total / numPerPage);
        var lis = '<li id="pagePrevious"><a href="#" aria-label="Previous"><span aria-hidden="true">上一页</span></a></li>'
        for (var i = 1; i < pageNum + 1; i++) {
            if (i == 1) {
                lis += '<li class="pageGotoBtn active"><a href="#">' + i + '</a></li>';
            } else {
                lis += '<li class="pageGotoBtn"><a href="#">' + i + '</a></li>';
            }
        }
        lis += '<li id="pageNext"><a href="#" aria-label="Next"><span aria-hidden="true">下一页</span></a></li>'
        pageBox.innerHTML = lis;
    }
    function aniu(page) {
        $('.pagination li').removeClass('active')
        $('.pagination li').eq(page).addClass('active')
    }

    function getPageData(reper, index, numPerPage) {
        //console.log(reper)
        var p=Math.ceil(reper.length/numPerPage)
        console.log(p,reper,index)
        if(reper.length<numPerPage*p&&index==p){
             console.log(pageData)
            pageData=reper.slice((index - 1) * numPerPage, reper.length)
        }else{
            pageData = reper.slice((index - 1) * numPerPage, index * numPerPage)
        }
       
       
    }
    //点击页面
    function clickPage(data) {
        $('.pagination').off()
        $('.pagination').on('click', 'li', function () {
            if ($(this).attr('id') == 'pagePrevious' && page > 1) {
                page -= 1;
                getPageData(data, page, 5);
                render(pageData);
                aniu(page);
                xiugai()
            } else if ($(this).attr('id') == 'pageNext' && page < Math.ceil(data.length / 5)) {
                page += 1;
                getPageData(data, page, 5);
                render(pageData);
                aniu(page)
                xiugai()
            } else if ($(this).attr('class') == 'pageGotoBtn') {
                page = Number($(this).text());
                getPageData(data, page, 5);
                render(pageData);
                aniu(page)
                xiugai()
            }
            searchnum();
        })

    }
    function pages() {
        $('.sure').click(function () {
            var yeshu = $('#gotoPageBtn').val();
            getPageData(reper.data, yeshu, 5);
            render(pageData);
            aniu(yeshu);
            xiugai();
        })
    }
    function pageChange() {
        $('#gotoPageBtn').change(function () {
            if ($('#gotoPageBtn').val() < 1) {
                $('#gotoPageBtn').val("1");
            } else if ($('#gotoPageBtn').val() > Math.ceil(reper.data.length / 5)) {
                $('#gotoPageBtn').val(Math.ceil(reper.data.length / 5));
            }
        })
    }
    //添加
    function tianjia() {
        $('.save').off();
        $('.save').click(function () {
            var goodsName = $('#goodsName');
            var amount = $('#amount');
            var purchasePrice = $('#purchasePrice');
            var price = $('#price');
            var repertoryAmount = $('#repertoryAmount');
            var manufacturer = $('#manufacturer');
            var comment = $('#comment');
            reper.data.unshift({
                repertoryId: Number(reper.data[reper.data.length - 1].repertoryId) + 1,
                goodsName: goodsName.val(),
                amount: amount.val(),
                purchasePrice: purchasePrice.val(),
                price: price.val(),
                repertoryAmount: repertoryAmount.val(),
                manufacturer: manufacturer.val(),
                comment: comment.val()
            })
            localStorage.reper = JSON.stringify(reper);
            initTable();
            $('#myModal').modal('hide');
        })
        shanchu();
    }
    //删除
    function shanchu() {
        $(tablebody).off();
        $(tablebody).on('click', '.delBtn', function () {
            for (let i = 0; i < reper.data.length; i++) {
                if (reper.data[i].repertoryId == $(this).parent().parent().data('id')) {
                    reper.data.splice(i, 1);
                }
            }
            $(this).parent().parent().remove();
            localStorage.reper = JSON.stringify(reper);
            initTable();
        })
    }
    //修改
    function xiugai() {
        $('.editBtn').off();
        $('.editBtn').click(function () {
            for (let i = 0; i < reper.data.length; i++) {
                if (reper.data[i].repertoryId == $(this).parent().parent().data('id')) {
                    console.log($(this).parent().parent().data('id'))
                    let id = $(this).parent().parent().data('id');
                    $('#goodsName1').val(reper.data[i].goodsName);
                    $('#amount1').val(reper.data[i].amount)
                    $('#purchasePrice1').val(reper.data[i].purchasePrice)
                    $('#price1').val(reper.data[i].price)
                    $('#repertoryAmount1').val(reper.data[i].repertoryAmount)
                    $('#manufacturer1').val(reper.data[i].manufacturer)
                    $('#comment1').val(reper.data[i].comment)
                    $('.saveEdit').click(function () {
                        for (let i = 0; i < reper.data.length; i++) {
                            if (reper.data[i].repertoryId == id) {
                                reper.data[i].goodsName = $('#goodsName1').val();
                                reper.data[i].amount = $('#amount1').val();
                                reper.data[i].purchasePrice = $('#purchasePrice1').val();
                                reper.data[i].price = $('#price1').val();
                                reper.data[i].repertoryAmount = $('#repertoryAmount1').val();
                                reper.data[i].manufacturer = $('#manufacturer1').val();
                                reper.data[i].comment = $('#comment1').val();
                            }
                        }
                        localStorage.reper = JSON.stringify(reper);
                        initTable();
                        $('#myModal1').modal('hide');
                    })
                }
            }

        })
    }
    //搜索
    function searchnum() {
        $('#searchnum').click(function () {
            if ($('#searchnum').val() == 0) {
                //console.log($('#searchnum').val())
                searchgoods();
            } else if ($('#searchnum').val() == 1) {
                searchfactory();
            } else if ($('#searchnum').val() == 2) {
                searchRepertoryAmount()
            } else if ($('#searchnum').val() == 3) {
                searchPurchasePrice();
            }
        })
    }
    function searchgoods() {
        $('#searchGoodsItem').off();
        $('#searchGoodsItem').click(function () {
            var sea = [];
            var searchId = document.getElementById('search')
            var searchVal = $('#search').val();
            if (searchVal != '') {
                for (let i = 0; i < reper.data.length; i++) {
                    if (reper.data[i].goodsName.indexOf(searchVal) > -1) {
                        sea.push(reper.data[i]);
                    }
                }
                page=1;
                getPage(sea.length, 5)
                getPageData(sea, page, 5)
                clickPage(sea);
                render(pageData);
                xiugai();
                shanchu();
                if (sea.length == 0) {
                    tablebody.innerHTML = '<tr><td colspan="8">没有找到该商品</td></tr>';
                }
            }
            searchId.oninput = function () {
                var searchVal = $('#search').val();
                if (searchVal == '') {
                    initTable();
                }
            }
            
        })
    }
    function searchfactory() {
        $('#searchGoodsItem').off();
        $('#searchGoodsItem').click(function () {
            var sea = [];
            var searchId = document.getElementById('search')
            var searchVal = $('#search').val();
            if (searchVal != '') {
                for (let i = 0; i < reper.data.length; i++) {
                    if (reper.data[i].manufacturer.indexOf(searchVal) > -1) {
                        sea.push(reper.data[i]);
                    }
                }
                page=1;
                getPage(sea.length, 5)
                getPageData(sea, page, 5)
                clickPage(sea);
                render(pageData);
                xiugai();
                shanchu();
                if (sea.length == 0) {
                    tablebody.innerHTML = '<tr><td colspan="8">没有找到该商品</td></tr>';
                }
            }
            searchId.oninput = function () {
                var searchVal = $('#search').val();
                if (searchVal == '') {
                    initTable();
                }
            }
            
        })
    }
    function searchRepertoryAmount() {
        $('#searchGoodsItem').off();
        $('#searchGoodsItem').click(function () {
            var sea = [];
            var searchId = document.getElementById('search')
            var searchVal = $('#search').val();
            if (searchVal != '') {
                for (let i = 0; i < reper.data.length; i++) {
                    if (reper.data[i].repertoryAmount >= Number(searchVal)) {
                        sea.push(reper.data[i]);
                    }
                }
                page=1;
                getPage(sea.length, 5)
                getPageData(sea, page, 5)
                clickPage(sea);
                render(pageData); 
                xiugai();
                shanchu();
                if (sea.length == 0) {
                    tablebody.innerHTML = '<tr><td colspan="8">没有找到该商品</td></tr>';
                }
            }
            searchId.oninput = function () {
                var searchVal = $('#search').val();
                if (searchVal == '') {
                    initTable();
                }
            }
           
        })
    }
    function searchPurchasePrice() {
        $('#searchGoodsItem').off();
        $('#searchGoodsItem').click(function () {
            var sea = [];
            var searchId = document.getElementById('search')
            var searchVal = $('#search').val();
            if (searchVal != '') {
                for (let i = 0; i < reper.data.length; i++) {
                    if (reper.data[i].purchasePrice >= parseFloat(searchVal)) {
                        console.log(reper.data[i].purchasePrice, searchVal)
                        sea.push(reper.data[i]);
                    }
                }
                console.log(sea)
                page=1;
                getPage(sea.length, 5)
                getPageData(sea, page, 5)
                clickPage(sea);
                render(pageData);
                xiugai();
                shanchu();
                if (sea.length == 0) {
                    tablebody.innerHTML = '<tr><td colspan="8">没有找到该商品</td></tr>';
                }
            }
            searchId.oninput = function () {
                var searchVal = $('#search').val();
                if (searchVal == '') {
                    initTable();
                }
            }
           
        })
    }
}
