// url的优化
$.ajaxPrefilter(function (params) {
    params.url = "http://api-breakingnews-web.itheima.net" + params.url;

    if(params.url.indexOf("/my") !== -1 ){
      params.headers ={Authorization: localStorage.getItem("token")} 
    }

      // 控制用户访问权限
      params.complete = function (xhr) {
    // 请求完成就会执行的函数（不论是失败还是成功都会执行的）
    // 形参可以获取到xhr对象
    //   console.log(xhr);
    if (
      xhr.responseJSON.status === 1 &&
      xhr.responseJSON.message === "身份认证失败！"
    ) {
      // 回到登录页面重新登录
      // 把token也清除掉
      localStorage.removeItem("token");
      location.href = "login.html";
    }
  };
   
  })

  