const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const app = express(); //执行express的全局函数，返回一个服务对象


app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

//静态资源文件的路径配置
app.use(express.static(__dirname + '/public', {index:'pages/login.html'}));


app.listen(8889);