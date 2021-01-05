// 去注册
$("#goReg").click(() => {
  $(".login-form").hide();
  $(".reg-form").show();
});

// 去登录
$("#goLogin").click(() => {
  $(".login-form").show();
  $(".reg-form").hide();
});



// 表单验证
let form = layui.form;
form.verify({
  pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  repass: (value, item) => {
    console.log(value);
    // console.log(item);
    let password = $(".reg-form [name=password]").val();
    console.log(password);

    if (password !== value) {
      return "密码不一致"
    }
  }
});

// 注册表单
let layer = layui.layer;
$(".reg-form").submit(function (e) {
  e.preventDefault();
  let data = $(this).serialize()
  let username = $(this).find("[name=username]").val()
  let password = $(this).find("[name=password]").val()
  console.log(username);

  $.ajax({
    type: "POST",
    url: "/api/reguser",
    data: {
      username, password
    },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg(res.message, function () {
        $("#goLogin").click()
      })

    }
  })
})
// 登录表单
$(".login-form").submit(function (e) {
  e.preventDefault();
  let username = $(this).find("[name=username]").val()
  let password = $(this).find("[name=password]").val()
  console.log(username);
  console.log(password);

  $.ajax({
    type: "POST",
    url: "/api/login",
    data: {
      username, password
    },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      localStorage.setItem("token",res.token);
      layer.msg(res.message, function () {
        // $("#goLogin").click()
        location.href = "/home/index.html";
      })

    }
  })
})