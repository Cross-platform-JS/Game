const db=require("../config/db")
let fs = require('fs')
let multer = require('multer')
let upload = multer({dest: './public/uploads/'}).single('file')
module.exports = function(app, passport) {
	//主界面
	app.get('/', function(req, res) {
		res.render('index');
	});
	//登陆界面
	app.get('/login', function(req, res) {
		res.render('login', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile',
            failureRedirect : '/login',
            failureFlash : true
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 30;
            } else {
              req.session.cookie.expires = false;
            }
		res.redirect('/');
	    });
	//注册界面
	app.get('/signup', function(req, res) {
		res.render('signup', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));


	app.post('/editUserImg', upload, isLoggedIn, function(req, res){
		if (req.file.length === 0) {  //判断一下文件是否存在
			res.render("error", {message: "上传文件不能为空！"});
			return
		} else {
			let file = req.file;
			console.log(file);
			fs.renameSync('./public/uploads/' + file.filename, './public/uploads/' + file.originalname);//这里修改文件名字
			// 设置响应类型及编码
			res.set({
				'content-type': 'application/json; charset=utf-8'
		 });
		 console.log(req.user);
		//  console.log(req.body);
			console.log(req.user.username);
			const name = req.user.username;
			// console.log(req.body.user);
			// const name = req.body.user;
			// let {user_id} = req.query;
			// console.log(user_id);
			let imgUrl = 'http://localhost:3000/uploads/'+file.originalname;
			// let sql = 'update users set imgurl=? where id=?';
			// let sqlArr = [imgUrl,user_id];
			db.query("UPDATE users SET imgurl = '"+imgUrl+"' WHERE username = '"+name+"'",[])

		}
	})

	//用户信息界面
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user
		});
	});
	//登出请求
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	//注销请求
	app.get('/cancel', isLoggedIn, function(req, res) {
		const name = req.user.username;
		// console.log(name)
		// console.log(req.user)
		// console.log(req.user.username)
		db.query("DELETE FROM users WHERE username = '"+name+"'",[])
		req.logout();
		res.redirect('/');
	});

	// // 修改密码

	// app.get('/change', isLoggedIn, function(req, res) {
	// 	const name = req.user.username;
	// 	const password = req.user.password;
	// 	// console.log(name)
	// 	// console.log(req.user)
	// 	// console.log(req.user.username)
	// 	db.query("UPDATE users SET password = '"+imgUrl+"' WHERE username = '"+name+"'",[])
	// 	req.logout();
	// 	res.redirect('/');
	// });



	//游戏界面
	app.get('/game', isLoggedIn, function(req, res) {
		res.render('game', {
			user : req.user
		});
	});
	//排行榜
	app.get('/RankingList', isLoggedIn, function(req, res) {
		db.query("SELECT id,username,score,imgurl FROM users order by score DESC",[],function(results,fields){
			console.log(results);
			res.render('rankinglist',{
				user1: results[0],
				user2: results[1],
				user3: results[2],
				user4: results[3],
				user5: results[4],
				user6: results[5],
				user7: results[6],
				user8: results[7],
				user9: results[8],
				user10: results[9]
			});
		})
	});

	app.post('/RankingList', isLoggedIn,function(req,res){
		// console.log(req.body);
		// console.log(req.body.user);
		const score= req.body.score;
		const name = req.body.user;
		db.query("SELECT score FROM users where username='"+name+"'",[],function(results,fields){
			const old_score = results[0].score;
			if(old_score<score||old_score==null){
				db.update("UPDATE users SET score = "+score+" WHERE username = '"+name+"'",[])
				console.log("分数更新成功");
			}
		})
	}
	);
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}
