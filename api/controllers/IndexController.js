/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res, next) {
    req.query.p <= 0 ? req.query.p = 1 : req.query.p = req.query.p;
    var page = (req.query.p) || 1;
    var pages = 10;
    var skip = (page - 1) * pages
    Article.find({skip: skip ,limit: pages, sort: 'id desc'}, function(err, result) {
      Article.count().exec(function(err, count){
        var totalPage = parseInt(Math.ceil(count / pages))
        Background.query("select * from background order by rand() limit 1", function(err, arr){
          if (err) return next();
          res.view('homepage', {
            data: result,
            totalPage: totalPage,
            page: page,
            bg: arr
          })
        })
      })
    })
  },
  show: function(req, res, next) {
    var param = req.param('id');
    Article.findOne({id: param}, function(err, result){
      res.view('show', {
        data: result
      })
    })
  }
};

