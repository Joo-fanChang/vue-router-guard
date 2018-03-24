const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');
const fs = require('fs');
const koaBody = require('koa-body');
const util = require('changzhn-util');

let users = []; // 存储用户信息

app.use(koaBody());

app.use(async (ctx, next) => {
	if (ctx.path == '/login') {
		next();
		return;
	}

	let Authorization = ctx.request.headers.authorization;
	let pk = ctx.cookies.get('pk');
	let flag = check(Authorization, pk);

	console.log('Authorization: ' + Authorization);

	if (!flag) {
		ctx.status = 401;
		return;
	}
	next();
});

let check = (Authorization, pk) => {
	let flag = false;
	users.forEach(item => {
		if (item.pk_info == pk) {
			flag = item.Authorization == Authorization && Date.now() - item.startTime < item.expires_in;
		}
	});
	return flag;
};

let test = ctx => {
	ctx.body = 'test';
};

const login = ctx => {
	let one = ctx.request.body;
	one.token = util.uuid();
	one.expires_in = 7200;
	one.startTime = Date.now();
	one.pk_info = util.uuid();
	users.push(one);
	ctx.cookies.set('pk', one.pk_info);
	ctx.body = { status: 1, token: one.token, expires_in: 7200, startTime: one.startTime };
};

app.use(route.post('/login', login));
app.use(route.get('/test', test));

app.listen(3000);
