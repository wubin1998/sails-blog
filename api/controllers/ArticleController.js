/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // 发布文章页面
	pulish: function(req, res, next) {
    res.view('admin/pulish')
  },
  // 文章列表页面
  list: function(req, res, next) {
    req.query.p <= 0 ? req.query.p = 1 : req.query.p = req.query.p;
    var page = (req.query.p) || 1;
    var pages = 10;
    var skip = (page - 1) * pages
    Article.find({skip: skip ,limit: pages, sort: 'id desc'}, function(err, result) {
      Article.count().exec(function(err, count){
        var totalPage = parseInt(Math.ceil(count / pages))
        res.view('admin/list', {
          data: result,
          totalPage: totalPage,
          page: page
        })
      })
    })
  },
  // 文章编辑页面
  edit: function(req, res, next) {
    res.locals.param = req.param('id')
    res.view('admin/edit')
  }
};
