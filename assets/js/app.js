$(function(){
  $('.disabled a').on('click', function(e){
    e.preventDefault();
    return;
  })
  $('#submit_login').submit(function(){
    var dom = {
      username: $(this).find("#username"),
      password: $(this).find("#password")
    }
    var load = layer.load()
    $.post('/user/login', {
      username: dom.username.val(),
      password: dom.password.val()
    })
      .success(function(res){
        layer.close(load)
        if (res.status == 200) {
          layer.msg(res.msg)
          return window.location.href = "/admin"
        } else {
          dom.username.val("")
          dom.password.val("")
          layer.msg(res.msg)
        }
      })
      .error(function(e){
        layer.close(load)
        console.log(e)
      })
  })

  if ($('#content').length > 0) {
    var editor = new wangEditor('content');
    editor.create();

    $('#pulish_article').on('click', function(){
      var load = layer.load();
      var dom = {
        title: $('#title'),
        describe: $('#describe'),
        author: $('#author'),
        content: editor.$txt.html()
      }
      $.post('/article', {
        title: dom.title.val(),
        describe: dom.describe.val(),
        author: dom.author.val(),
        content: dom.content
      })
        .success(function(res){
          layer.close(load)
          if (res.id) {
            dom.title.val("")
            dom.describe.val("")
            dom.author.val("")
            editor.$txt.html("")
            return layer.msg("发布成功")
          }
          return layer.msg("发布失败，请检查")
        })
        .error(function(e){
          layer.close(load)
          layer.msg(e)
          console.log(e)
        })
    })
  }

  $('.js_article_del').on('click', function(){
    var id = $(this).data('id')
    var _self = $(this)
    layer.confirm("是否删除该文章？", {
      btn: ['确定', '取消']
    }, function(index){
      var load = layer.load()
      $.ajax({
        url: '/article/destroy/' + id,
        method: 'DELETE',
        success: function(res) {
          layer.close(load)
          layer.close(index)
          if (res.id) {
            _self.parents('tr').remove()
            return layer.msg("删除成功")
          }
            return layer.msg("删除失败")
        },
        error: function(e) {
          console.log(e)
          layer.close(load)
          layer.close(index)
        }
      })
    })
  })

  if ($("#update_article").length > 0) {
    $.get("/article/" + id)
      .success(function(res){
        $("#title").val(res.title)
        $("#describe").val(res.describe)
        $("#author").val(res.author)
        editor.$txt.html(res.content)
      })
      .error(function(e){
        console.log(e)
      })

    $("#update_article").on('click', function(){
      var load = layer.load()
      $.ajax({
        url: '/article/' + id,
        type: 'PUT',
        data: {
          title: $("#title").val(),
          describe: $('#describe').val(),
          author: $('#author').val(),
          content: editor.$txt.html()
        },
        success: function(res){
          layer.close(load)
          if (res.id) {
            layer.msg("修改成功")
          }
        },
        error: function(e) {
          layer.close(load)
          console.log(e)
        }
      })
    })
  }
  
  $('.setting_password').on('click', function(){
    var p = $('#password');
    var pd = $('#passworded');
    var load = layer.load();
    if (p.val() == pd.val()) {
      $.ajax({
        url: '/user/edit',
        type: 'PUT',
        data: {
          username: username,
          password: pd.val()
        },
        success: function(res){
          layer.close(load)
          if (res.status == 200) {
            p.val("") && pd.val("")
            return layer.msg("修改成功");
          }
          return layer.msg("修改失败")
        },
        error: function(e){
          layer.close(load)
          console.log(e)
        }
      })
    }
  })
})