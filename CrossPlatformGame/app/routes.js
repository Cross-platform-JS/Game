// const db=require("../config/db")

// module.exports = function(app, passport) {
// 	//主界面
// 	app.get('/', function(req, res) {
// 		res.render('index');
// 	});
// 	//登陆界面
// 	app.get('/login', function(req, res) {
// 		res.render('login', { message: req.flash('loginMessage') });
// 	});

// 	app.post('/login', passport.authenticate('local-login', {
//             successRedirect : '/profile',
//             failureRedirect : '/login',
//             failureFlash : true
// 		}),
//         function(req, res) {
//             console.log("hello");

//             if (req.body.remember) {
//               req.session.cookie.maxAge = 1000 * 60 * 30;
//             } else {
//               req.session.cookie.expires = false;
//             }
// 		res.redirect('/');
// 	    });
// 	//注册界面
// 	app.get('/signup', function(req, res) {
// 		res.render('signup', { message: req.flash('signupMessage') });
// 	});

// 	app.post('/signup', passport.authenticate('local-signup', {
// 		successRedirect : '/profile',
// 		failureRedirect : '/signup',
// 		failureFlash : true
// 	}));
// 	//用户信息界面
// 	app.get('/profile', isLoggedIn, function(req, res) {
// 		res.render('profile', {
// 			user : req.user
// 		});
// 	});
// 	//注销请求
// 	app.get('/logout', function(req, res) {
// 		req.logout();
// 		res.redirect('/');
// 	});
// 	//游戏界面
// 	app.get('/game', isLoggedIn, function(req, res) {
// 		res.render('game', {
// 			user : req.user
// 		});
// 	});
// 	//排行榜
// 	app.get('/RankingList', isLoggedIn, function(req, res) {
// 		db.query("SELECT id,username,score FROM users order by score DESC",[],function(results,fields){
// 			console.log(results);
// 			res.render('rankinglist',{
// 				user1: results[0],
// 				user2: results[1],
// 				user3: results[2],
// 				user4: results[3],
// 				user5: results[4],
// 				user6: results[5],
// 				user7: results[6],
// 				user8: results[7],
// 				user9: results[8],
// 				user10: results[9]
// 			});
// 		})
// 	});

// 	app.post('/RankingList', isLoggedIn,function(req,res){
// 		// console.log(req.body);
// 		// console.log(req.body.user);
// 		const score= req.body.score;
// 		const name = req.body.user;
// 		db.query("SELECT score FROM users where username='"+name+"'",[],function(results,fields){
// 			const old_score = results[0].score;
// 			if(old_score<score||old_score==null){
// 				db.update("UPDATE users SET score = "+score+" WHERE username = '"+name+"'",[])
// 				console.log("分数更新成功");
// 			}
// 		})
// 	}
// 	);
// };

// function isLoggedIn(req, res, next) {
// 	if (req.isAuthenticated())
// 		return next();
// 	res.redirect('/');
// }
