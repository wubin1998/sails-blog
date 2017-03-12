/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res, next) {
    res.view('admin/index')
  },
  setting: function(req, res, next) {
    res.view('admin/setting')
  },
  edit: function(req, res, next){
    User.update({}, {
      username: req.body.username,
      password: Md5(req.body.password)
    }, function(err, result){
      if (err) return next();
      return res.json({
        data: "",
        msg: "修改成功",
        status: 200
      })
    })
  }
};

