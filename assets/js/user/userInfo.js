let form = layui.form;

// 表单验证
form.verify({
   nickname: [
      /^[\S]{1,6}$/
      ,'昵称必须1到6位，且不能出现空格'
    ] 
  });      

// 获取用户信息
function getUserInfo() {
    // console.log(localStorage.getItem("token"));
    $.ajax({
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token")
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0 && res.message === "身份认证失败！") {
                location.href = "/home/login.html"
                return console.log("你出错了");
            }

            form.val("formTest", res.data);
        }
    })
}

getUserInfo();

// 修改用户信息
$("#user-form").submit(function (e) {
    e.preventDefault();
    let data =  $(this).serialize();
    console.log(data);
    $.ajax({
        type: "POST",
        data,
        url: "/my/userinfo",
        success: function (res) {
            console.log(res);
            if(res.status === 0){
                getUserInfo();
                window.parent.getNameAndPortrait();
            }
            
        }
    })
})

// 重置功能

$("[type=reset]").click(function(e){
    e.preventDefault();
    getUserInfo();

})

