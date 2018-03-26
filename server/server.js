const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');
const fs = require('fs');
const koaBody = require('koa-body');
const util = require('changzhn-util');
const {read, write} = require('./io.js');

app.use(koaBody());

// 过滤器
let filter = async (ctx, next) => {
	let Authorization = ctx.request.headers.authorization;
	let pk = ctx.cookies.get('pk');

	console.log('Authorization: ' + Authorization);

	let flag = await check(Authorization, pk);
	if (!flag) {
		ctx.response.status = 401;
		ctx.body = { status: 0, msg: '没有权限' };
		return;
	}
	next();
};

// 检查是否存在
let check = async (Authorization, pk) => {
	let flag = false;
	let users = await read();
	users.forEach(item => {
		if (item.pk_info == pk) {
			flag = item.token == Authorization && Date.now() - item.startTime < item.expires_in * 1000;
		}
	});
	return flag;
};

// 生成token
let genarateToken = () => {
	return {
		token: util.uuid(),
		expires_in: 10 ,
		startTime: Date.now()
	};
};

let login = async ctx => {
	let data = ctx.request.body;

	let {username, password} = data;
	let users = await read();
	let isMatch = false;
	let tokenInfo = null;
	let matchPk = '';
	try {
		if (users instanceof Array && users.length) {
			users = users.map(item => {
				if (item.username == username && item.password == password) {
					isMatch = true;
					tokenInfo = genarateToken();
					matchPk = item.pk_info;
					return Object.assign(item, tokenInfo);
				}
				return item;
			});
			if (isMatch) {
				ctx.cookies.set('pk', matchPk);
				ctx.body = Object.assign({ status: 1 }, tokenInfo);
				write(users, () => {
					console.log('登录成功，写入状态成功');
				});

			} else {
				ctx.body = { status: 0, msg: '用户名或者密码错误' };
			}
		}
	} catch(e) {
		console.log(e);

	}

};

let test = ctx => {
	console.log('test');
	ctx.body = 'test';
};

let publicHandler = ctx => {
	ctx.body = {status: 1, msg: 'public'};
};

let adminHandler = ctx => {
	ctx.body = {status: 1, msg: 'admin'};
};

app.use(route.get('/public', publicHandler));
app.use(route.post('/login', login));

// app.use(route.get('/*', filter));
// app.use(route.post('/*', filter));
app.use(filter);

app.use(route.get('/admin', adminHandler));
app.use(route.get('/test', test));
app.use(route.post('/test', test));

app.listen(3000);
