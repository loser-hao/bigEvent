
// 修改用户密码

$("#user-pwd-form").submit(function (e) {
    e.preventDefault();
    let data =  $(this).serialize();
    console.log(data);
    $.ajax({
        type: "POST",
        data,
        url: "/my/updatepwd",
        success: function (res) {
            console.log(res);
            if(res.status !== 0){
                layui.layer.msg(res.message)
            }else{
                layui.layer.msg(res.message)
            }
            
        }
    })
})

// 表单验证
layui.form.verify({
    pass: [
       /^[\S]{6,12}$/
       ,'昵称必须1到6位，且不能出现空格'
     ],
    newpwd:function(value){
        if(value === $("[name=oldPwd]").val()){
            return "新密码不能与原密码一样"
        }
    },
    repwd:function(value){
        if(value !== $("[name=newPwd]").val()){
            return "密码不一致"
        }
    },
   });      
 