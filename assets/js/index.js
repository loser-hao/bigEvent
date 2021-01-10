// 获取头像和昵称
function getNameAndPortrait(){
// console.log(localStorage.getItem("token"));
$.ajax({
    url: "/my/userinfo",
    // headers: {
    //     Authorization: localStorage.getItem("token")
    // },
    success: function (res) {
        // console.log(res);
        if(res.status !== 0 && res.message ==="身份认证失败！"){
            location.href = "/home/login.html"
            return console.log("你出错了");
        }
        // console.log(res);
        let username = res.data.username;
        let nickname = res.data.nickname;
        let portraitSrc= res.data.user_pic;
        let showname =  nickname||username;

        $("#welcomeUser").text("欢迎:"+showname)
        // console.log($("#welcomeUser").text());

        if(portraitSrc){
            $(".text-portrait").hide();
            $(".layui-nav-img").attr("src",portraitSrc);
            $(".layui-nav-img").show()
        }else{
            $(".text-portrait").text(showname[0].toUpperCase());
            $(".text-portrait").show();
            $(".layui-nav-img").hide();
        }
    }
})
}

getNameAndPortrait();


// 退出
let layer = layui.layer;
$("#exitBtn").click((e)=>{
    e.preventDefault();
    layer.confirm('确定要退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem("token")
        location.href="/home/login.html"
        layer.close(index);
      })
})

