/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: function(req, res, next) {
    var data = req.body;
    data.password = Md5(data.password)
    User.find(data, function(err, record){
      if (err) return next(err);
      if (record.length == 0) {
        return res.json({
          data: "",
          msg: "账号不存在或密码错误",
          status: 404
        })
      } else {
        req.session.username = data.username
        return res.json({
          data: "",
          msg: "登录成功",
          status: 200
        })
      }
    })
  },
  logout: function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
  }
};

