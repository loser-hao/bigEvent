// url的优化
$.ajaxPrefilter(function (params) {
    params.url = "http://api-breakingnews-web.itheima.net" + params.url;
  })